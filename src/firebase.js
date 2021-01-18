import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDKvdWD9pOoBYr-3oyOGJjNDsbIORFzFzw",
    authDomain: "snap-chat-1feff.firebaseapp.com",
    projectId: "snap-chat-1feff",
    storageBucket: "snap-chat-1feff.appspot.com",
    messagingSenderId: "680631734384",
    appId: "1:680631734384:web:e9d1782a3b71577d0e24b5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, storage, provider, auth};