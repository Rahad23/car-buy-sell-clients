import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import app from './../../firebase/Firebase.init';

export const CarContext=createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const ContextApi = ({children}) => {
// loader
const [loader, setLoader]=useState(true);
// userData
const [userData, setUserData]=useState('');
    // create user email and password
    const createUserEmailPassword=(email, password)=>{
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // sign-in email and password
    const loginUserEmailPassword=(email, password)=>{
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // sign-in user google popup
    const googlePopUp=()=>{
        setLoader(true);
        return signInWithPopup(auth, googleProvider);
    }
    // user track
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, user=>{
            setLoader(false);
            setUserData(user);
        })
        return ()=>unsubscribe();
    },[])

    const provider = {
        createUserEmailPassword,
        loginUserEmailPassword,
        googlePopUp,
        loader,
        userData
    };
    return (
        <CarContext.Provider value={provider}>
            {children}
        </CarContext.Provider>
    );
};

export default ContextApi;