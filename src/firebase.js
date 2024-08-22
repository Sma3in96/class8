import { initializeApp } from "firebase/app";
import { getAuth }  from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCp4VZ__8YZfntr6PFqEnC2OgEEKXDkPAs",
  authDomain: "class8-c18b8.firebaseapp.com",
  projectId: "class8-c18b8",
  storageBucket: "class8-c18b8.appspot.com",
  messagingSenderId: "85706231900",
  appId: "1:85706231900:web:d5afb745df2c8ba156d699"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
