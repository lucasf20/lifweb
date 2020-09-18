import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyArrv1bW3oW1PuEF0LDxg_IsySsloRFZBc",
    authDomain: "motoapp1-200d7.firebaseapp.com",
    databaseURL: "https://motoapp1-200d7.firebaseio.com",
    projectId: "motoapp1-200d7",
    storageBucket: "motoapp1-200d7.appspot.com",
    messagingSenderId: "806049323133",
    appId: "1:806049323133:web:22e40f35f5c5fe84b0f914",
    measurementId: "G-5HG4SVEN07"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
