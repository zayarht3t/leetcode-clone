// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC37B_d_mdCvaBlV8xsg8b57zuLZKGCL8I",
  authDomain: "leetcode-clone-52bf2.firebaseapp.com",
  projectId: "leetcode-clone-52bf2",
  storageBucket: "leetcode-clone-52bf2.appspot.com",
  messagingSenderId: "347418697342",
  appId: "1:347418697342:web:31005241984d53288c422f"
};

// Initialize Firebase
const app =!getApp.length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

const firebase = getFirestore(app);

export { app, auth, firebase };