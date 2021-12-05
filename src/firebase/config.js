import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfUSoUY-sb_jK2u_m9H8lnGn9OZikGSVQ",
  authDomain: "cooking-ninja-site-8095e.firebaseapp.com",
  projectId: "cooking-ninja-site-8095e",
  storageBucket: "cooking-ninja-site-8095e.appspot.com",
  messagingSenderId: "400130349487",
  appId: "1:400130349487:web:e40354cfe2a3440738b75a"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
