// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHSXlLQYA8yS2Gnoe1wdpMNNNFikjftas",
  authDomain: "positive-voltage.firebaseapp.com",
  projectId: "positive-voltage",
  storageBucket: "positive-voltage.appspot.com",
  messagingSenderId: "783499799892",
  appId: "1:783499799892:web:2b86073006f48edf87ecc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;