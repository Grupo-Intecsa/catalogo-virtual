

import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firebase-firestore'

import { firebaseConfig } from './firebaseConfig'

firebase.initializeApp(firebaseConfig)

    
const storage = firebase.storage();
const db = firebase.firestore();
const timestap = firebase.firestore.Timestamp

export { storage, db, timestap }


