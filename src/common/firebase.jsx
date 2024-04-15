import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  // Your web app's Firebase configuration
    apiKey: "AIzaSyDqIH44Ed7nmDJ__cRCwjuHfKJSsK_IsOA",
    authDomain: "blogwebsite-8e84b.firebaseapp.com",
    projectId: "blogwebsite-8e84b",
    storageBucket: "blogwebsite-8e84b.appspot.com",
    messagingSenderId: "653320513892",
    appId: "1:653320513892:web:facd937dcbfe2a5ea13271"

};

const app = initializeApp(firebaseConfig);

// google auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {

    let user = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user
    })
    .catch((err) => {
        console.log(err)
    })

    return user;
}