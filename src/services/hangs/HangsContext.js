import React, { useState, useEffect, createContext, useContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/storage";
import {firebaseConfig} from '../../../apis';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

export const HangsContext = createContext();

//exports values of imported data to all other componets to use
export const HangsContextProvider = ({ children }) => {
  //creates getter and setter methods for variables
  const [hangs, sethangs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);


  //sets hands to the values returned from db request
  const getHangs = async () => {
    await db.collection('hangs').get()
    .then(querySnapshot => {
      sethangs(hangs => [])
        querySnapshot.forEach(documentSnapshot => {
          sethangs(hangs => [...hangs, documentSnapshot.data()])
      });
    })//.then(() => {console.log("--------------------testing saved: ", hangs, "break!----------------------------------------")});
  }
  //gets API data and transforms it to usable data
  const retrieveHangs = async () => {
    setIsLoading(true);
    await getHangs().then( () => {
      setIsLoading(false);
    });
  }
  
  //gets all hangs on first run and any time update is changed
  useEffect(() => {
    retrieveHangs();
  }, [update]);

  //adds values to context provider
  return (
    <HangsContext.Provider value={{ hangs, isLoading, update, setUpdate }}>
      {children}
    </HangsContext.Provider>
  );
}