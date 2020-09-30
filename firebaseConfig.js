import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAnoA05myOqtazJpACaHtXZxIZC6IYuX84",
    authDomain: "lifweb-38828.firebaseapp.com",
    databaseURL: "https://lifweb-38828.firebaseio.com",
    projectId: "lifweb-38828",
    storageBucket: "lifweb-38828.appspot.com",
    messagingSenderId: "993866057606",
    appId: "1:993866057606:web:a1a595346ee35d211a0e07",
    measurementId: "G-7JF8H64T69"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;