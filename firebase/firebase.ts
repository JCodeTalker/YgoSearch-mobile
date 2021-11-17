// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/app'
// import admin from 'firebase-admin'
import { getFirestore } from 'firebase/firestore'
// import {  } from 'firebase/'
import 'firebase/auth'
import 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7OYuMume_IAZe7KYjLxnL-09hI26_ZTI",
  authDomain: "ygo-app.firebaseapp.com",
  projectId: "ygo-app",
  storageBucket: "ygo-app.appspot.com",
  messagingSenderId: "274984959082",
  appId: "1:274984959082:web:b2f9eba4b2865a6e2c9e13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()
// export const db = Firestore.
// export const firestoreDb = firebase.firestore()

// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

// export const auth = firebase.auth()
// export const database = firebase.database()