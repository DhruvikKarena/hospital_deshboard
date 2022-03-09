import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAoRYGP7vr2W6PFwM8_WmQ7qBvyCOBBPgE",
    authDomain: "hospital-62481.firebaseapp.com",
    projectId: "hospital-62481",
    storageBucket: "hospital-62481.appspot.com",
    messagingSenderId: "820533431341",
    appId: "1:820533431341:web:11e7abf90d46919f0d7ca4",
    measurementId: "G-V4PMCVVJMM"
  };

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;