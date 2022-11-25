import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import app from './../../firebase/Firebase.init';

export const CarContext=createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const ContextApi = ({children}) => {
// loader
const [loader, setLoader]=useState(true);
// userData
const [userData, setUserData]=useState('');
// user type data get database
const [serverUser, setServerUsesr]= useState([]);
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
    // sign-out user
    const signOutuser=()=>{
        return signOut(auth);
    }
    // user track
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, user=>{
            setLoader(false);
            setUserData(user);
        })
        return ()=>unsubscribe();
    },[])

    // user data
    useEffect(()=>{
        if(userData?.email){
            fetch(`http://localhost:5000/users/${userData?.email}`)
            .then(res=>res.json())
            .then(data=>setServerUsesr(data))
        }
    },[userData?.email])

    const provider = {
        createUserEmailPassword,
        loginUserEmailPassword,
        googlePopUp,
        loader,
        userData,
        signOutuser,
        serverUser
    };
    return (
        <CarContext.Provider value={provider}>
            {children}
        </CarContext.Provider>
    );
};

export default ContextApi;