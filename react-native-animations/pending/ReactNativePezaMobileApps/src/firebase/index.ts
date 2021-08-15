import firebase from 'firebase';
import 'firebase/firestore';

export default () => {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: 'AIzaSyAqg9hS0qLUrJ-WePZV08UnEnVM_vxHLqY',
    authDomain: 'peza-mobile-app.firebaseapp.com',
    databaseURL: 'https://peza-mobile-app-default-rtdb.firebaseio.com/',
    projectId: 'peza-mobile-app',
    storageBucket: 'peza-mobile-app.appspot.com',
    messagingSenderId: '736624304188',
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();
  return db;
};
