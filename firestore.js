// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'; // นำเข้า AsyncStorage


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCglKOR8rpS-2Qs1zTeGBpbvLog8T8ijgw",
  authDomain: "productapp-7f14e.firebaseapp.com",
  projectId: "productapp-7f14e",
  storageBucket: "productapp-7f14e.appspot.com",
  messagingSenderId: "625099840712",
  appId: "1:625099840712:web:4026166c5c73b7315859fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const firestore = getFirestore(app);

export { auth, firestore };