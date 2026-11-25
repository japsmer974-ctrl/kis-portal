
/* =========================================
   KIS - FIREBASE CONNECTION
========================================= */

// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBItGsSTEwj3zruqCGcVHHz1aL3S0l5Gsg",
  authDomain: "kis-student-portal.firebaseapp.com",
  projectId: "kis-student-portal",
  storageBucket: "kis-student-portal.firebasestorage.app",
  messagingSenderId: "669653993218",
  appId: "1:669653993218:web:b94af981f949ad0b1d641b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Connect Firebase Authentication
const kisAuth = firebase.auth();

// Connect Cloud Firestore
const kisDb = firebase.firestore();

// Make Firebase services available to other KIS files
window.kisAuth = kisAuth;
window.kisDb = kisDb;

console.log("KIS Firebase connected successfully!");

// Temporary Firebase connection test
window.kisFirebaseReady = true;

