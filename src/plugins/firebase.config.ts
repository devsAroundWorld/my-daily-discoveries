import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY_FIREBASE,
  authDomain: 'my-daily-discoveries-app.firebaseapp.com',
  projectId: 'my-daily-discoveries-app',
  storageBucket: 'my-daily-discoveries-app.appspot.com',
  messagingSenderId: '437073670472',
  appId: '1:437073670472:web:f6652e40d58012d82cc37d'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)