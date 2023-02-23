import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDBLoPCWRf4t_m-E-343B2l5HVEMu2KaJU",
  authDomain: "lyrics-b8384.firebaseapp.com",
  projectId: "lyrics-b8384",
  storageBucket: "lyrics-b8384.appspot.com",
  messagingSenderId: "1086369280757",
  appId: "1:1086369280757:web:e5deec104b0eca779d0bbc",
  // databaseURL: "https://lyrics-b8384-default-rtdb.firebaseio.com/",
};



// Initialize Firebase
let fireDb = firebase;
try {
  fireDb = firebase.initializeApp(firebaseConfig);
} catch (error) {
  // we skip the “already exists” message which is
  // not an actual error when we’re hot-reloading
  if (!/already exists/.test(error.message)) {
    console.error("Firebase initialization error raised", error.stack);
  }
}

export const fireAuth = fireDb.auth();
export const fireStore = fireDb.firestore();
