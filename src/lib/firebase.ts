
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2OgxDYXK3o87CbRMiPzcGvC2VVXqoPX8",
  authDomain: "drop-shipping-f3209.firebaseapp.com",
  projectId: "drop-shipping-f3209",
  storageBucket: "drop-shipping-f3209.firebasestorage.app",
  messagingSenderId: "1034805698731",
  appId: "1:1034805698731:web:bf1c3359dac9e2c6c197ee",
  measurementId: "G-MDECGX2N0S"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, storage, googleProvider };
