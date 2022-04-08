import React, { useState, createContext } from 'react';
import * as firebase from 'firebase';

import { loginRequest } from './authentication.service';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  //useState creates variables and respective modifier methods
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  //Code to ensure user remains properly authenticated in case of a glitch. Runs whenever authentication changes.
  firebase.auth().onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    }
  });

  //Method for sending authentiaction request
  const onLogin = (email, password) => {
    setIsLoading(true);
    //Firebase method
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.toString());
      });
  };

  //Creates user through Firebase and logs then in
  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError('Error: Passwords do not match');
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.toString());
      });
  };

  //signs out user
  const onLogout = () => {
    setUser(null);
    firebase.auth().signOut();
  };

  //allows other classes to use functions while not "inheriting" them, theyre just borrowing them kinda
  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading,
        user,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
