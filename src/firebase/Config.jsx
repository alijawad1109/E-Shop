
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDYWNgoyWozgoZgRyXj5Yc6Js7CGf8ELEU",
  authDomain: "my-project-1697614632467.firebaseapp.com",
  projectId: "my-project-1697614632467",
  storageBucket: "my-project-1697614632467.appspot.com",
  messagingSenderId: "624061692613",
  appId: "1:624061692613:web:a0d8494f786ffa461c8eac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const db =getFirestore(app);
export const storage=getStorage(app);
export default app;