// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDjPKt0SbTqOkZ6CgOrIJ9k2XS3s_1m0NE',

  authDomain: 'crud-testing-react.firebaseapp.com',

  projectId: 'crud-testing-react',

  storageBucket: 'crud-testing-react.appspot.com',

  messagingSenderId: '113476165542',

  appId: '1:113476165542:web:a7014a025e4165a1c43967',

  measurementId: 'G-X4WP589XZC',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
