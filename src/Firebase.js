import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyCMv4wNyVNjfAYISYf7Qr1-Mky6zdkJu4k',
  authDomain: 'datacollection-352511.firebaseapp.com',
  databaseURL: 'https://datacollection-352511-default-rtdb.firebaseio.com',
  projectId: 'datacollection-352511',
  storageBucket: 'datacollection-352511.appspot.com',
  messagingSenderId: '755958177528',
  appId: '1:755958177528:web:23897c0fe9403087eb250d',
  measurementId: 'G-ZBB3LTNT0H',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
