import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCNB6m1zQIDLiM2fJIra3Oo6hRaR35BzlU",
  authDomain: "spending-tracker-e814e.firebaseapp.com",
  projectId: "spending-tracker-e814e",
  storageBucket: "spending-tracker-e814e.appspot.com",
  messagingSenderId: "194108005832",
  appId: "1:194108005832:web:d9bddf5048de94c762f4fd",
  measurementId: "G-MSNN9W35PX"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };