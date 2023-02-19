// console.log('auth file s')

import { initializeApp } from "firebase/app";

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useContext, useEffect, useRef, useState } from "react";


const firebaseConfig = {
    apiKey: "AIzaSyBNKTg7r7IjGp9BsYcHYZfL3XO44uv3zIs",
    authDomain: "e-com-4845f.firebaseapp.com",
    projectId: "e-com-4845f",
    storageBucket: "e-com-4845f.appspot.com",
    messagingSenderId: "1056891166770",
    appId: "1:1056891166770:web:f3f7505852d3b747ab1c2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    console.log('authprovider s')
    // console.log(children)
    const auth = useProviderAuth(); // custom hook bheave like normal hook isme usestste use huha h toh ye re-render kr dega agar khuch chnge hua value me
    const ele = <AuthContext.Provider value={auth}>{console.log('children load check start')}{children}{console.log('children load check end')}</AuthContext.Provider>
    console.log('authprovide end')
    return ele;
}

export const userAuth = () => {
    // console.log('userauth called s');
    // console.log('userauth called end');
    return useContext(AuthContext);
}

function useProviderAuth() {

    // console.log('userprovide auth s')

    const [user, setUser] = useState();

    const signUp = (email, password, displayName) => {
        createUserWithEmailAndPassword(auth, email, password).then((user) => {
            updateProfile(user, { displayName });
            setUser(user);
            return user;
        });
    }

    const signIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password).then((user) => {
            setUser(user);
            return user;
        })
    }

    const signOutUser = () => signOut(auth).then(() => setUser(null));

    useEffect(() => {
        const unsubsribe = onAuthStateChanged(auth, (user) => {
            user ? setUser(user) : setUser(null);
        })

        return () => {
            unsubsribe()
        }
    });

    return {
        signIn, signOutUser, signUp, user //,h:console.log('userprovide auth e')
    };
}

export default AuthProvider
// console.log('auth file e')
