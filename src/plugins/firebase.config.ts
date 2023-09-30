// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY_FIREBASE,
  authDomain: 'my-daily-discoveries-app.firebaseapp.com',
  projectId: 'my-daily-discoveries-app',
  storageBucket: 'my-daily-discoveries-app.appspot.com',
  messagingSenderId: '437073670472',
  appId: '1:437073670472:web:f6652e40d58012d82cc37d'
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
