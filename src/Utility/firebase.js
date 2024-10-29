// we're importing the core Firebase library, as well as the
// functions for authentication and the Firestore database
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDONeztvVWx-V0CSI3z409uRmPqP2ToMWU",
  authDomain: "clone-3e19d.firebaseapp.com",
  projectId: "clone-3e19d",
  storageBucket: "clone-3e19d.appspot.com",
  messagingSenderId: "631267584869",
  appId: "1:631267584869:web:e412c8988c4f5889750f8c",
};

// Initialize the Firebase app. This creates a new instance of the Firebase app, which is the entry point for all  Firebase functionality
const app = firebase.initializeApp(firebaseConfig);

// Get the authentication service for signing in and out of your app
export const auth = getAuth(app);

// Get the Firestore database for storing and retrieving data
export const db = app.firestore();
