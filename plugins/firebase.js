import * as firebase from 'firebase/app'
import 'firebase/auth' //if use firestore

const firebaseConfig = {
    apiKey: 'AIzaSyCsJdN-9B6XMyxpplC4rzl9hd9389X8EJk',
    authDomain: 'shop-b621c.firebaseapp.com',
    databaseURL: 'https://shop-b621c.firebaseio.com',
    projectId: 'shop-b621c',
    storageBucket: 'shop-b621c.appspot.com',
    messagingSenderId: '677852912737',
    appId: '1:677852912737:web:e31fb313bbd5ce686d1e20',
    measurementId: "G-5TXH6FS2D2"
}

let app = null;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}

export default firebase;
