import React, { createContext, useContext, useState, useEffect } from 'react';
//Favourites saved locally
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthenticationContext } from '../authentication/AuthenticationContext';

//Allows a simple way for classes to borrow favourites, add, and remove
export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  //gets Firebase authenticated user
  const { user } = useContext(AuthenticationContext);
  const [favourites, setFavourites] = useState([]);

  //saves new events to local storage
  const saveFavourites = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
    } catch (err) {
      console.log('error saving favourites session', err);
    }
  };

  //loads events from local storage
  const loadFavourites = async (uid) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@favourites-${uid}`);
      return jsonValue !== null ? setFavourites(JSON.parse(jsonValue)) : null;
    } catch (err) {
      console.log('error loading favourites session', err);
    }
  };

  //adds event to favourites
  const add = (hang) => {
    setFavourites([...favourites, hang]);
  };

  const remove = (hang) => {
    const newFavourites = favourites.filter(
      (x) => x.name !== hang.name
    );

    setFavourites(newFavourites);
  };

  //runs whenever "user" changes
  useEffect(() => {
    if (user) {
      loadFavourites(user.uid);
    }
  }, [user]);

  //runs whenever "user" or "favourites" changes
  useEffect(() => {
    if (user) {
      saveFavourites(favourites, user.uid);
    }
  }, [favourites, user]);

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites: add, removeFromFavourites: remove }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
