
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDva1Ym1ENqf-uYexJYV6AHqpdwVM6JyCI",
  authDomain: "reactlinks-a00c5.firebaseapp.com",
  projectId: "reactlinks-a00c5",
  storageBucket: "reactlinks-a00c5.appspot.com",
  messagingSenderId: "741072836332",
  appId: "1:741072836332:web:5b5d039ba8c54467bfb7c9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db};