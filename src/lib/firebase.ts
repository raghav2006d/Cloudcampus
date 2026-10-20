import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

declare global { interface Window { __FIREBASE_CONFIG__?: { apiKey?:string; authDomain?:string; projectId?:string; appId?:string } } }
const runtime = window.__FIREBASE_CONFIG__ ?? {}
const config = {
  apiKey: runtime.apiKey || import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: runtime.authDomain || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: runtime.projectId || import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: runtime.appId || import.meta.env.VITE_FIREBASE_APP_ID,
}
export const firebaseConfigured = Object.values(config).every(Boolean)
export const firebaseSetupMessage = 'Firebase is not configured yet. Copy .env.example to .env.local and enter your Firebase web app settings to enable account and data features.'
const app = firebaseConfigured ? (getApps()[0] ?? initializeApp(config)) : null
export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null
