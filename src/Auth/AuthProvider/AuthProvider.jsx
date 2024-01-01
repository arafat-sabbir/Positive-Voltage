import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  FacebookAuthProvider,
} from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import app from "../Firebase/firebase.config";

export const Context = createContext("");

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);
  const auth = getAuth(app);

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // Sign In With Google
  const signWithGoogle = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Sign In With Facebook
  const signWithFacebook = () => {
    setLoader(true);
    return signInWithPopup(auth, facebookProvider);
  };
  // Sign up With Email And Password
  const signUpUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Update The User Photo And Display Name
  const updateUserProfile = (name, photoUrl) => {
    setLoader(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };
  // Sign In User With Email And Password
  const signInUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Sign Out User
  const signOutUser = () => {
    return signOut(auth);
  };

  const contextValue = {
    signUpUser,
    signInUser,
    signWithGoogle,
    user,
    loader,
    signOutUser,
    updateUserProfile,
    signWithFacebook
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
    });
    return () => unsubscribe();
  }, [auth]);
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
