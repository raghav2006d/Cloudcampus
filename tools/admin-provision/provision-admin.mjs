import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'

const uid = process.argv[2]
if (!uid) {
  console.error('Usage: npm run admin:provision -- <registered-user-uid>')
  process.exit(2)
}
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error('Set GOOGLE_APPLICATION_CREDENTIALS to a trusted local service-account JSON path. Never commit or share this file.')
  process.exit(2)
}

initializeApp({ credential: applicationDefault() })
const auth = getAuth()
const db = getFirestore()
const user = await auth.getUser(uid)
await auth.setCustomUserClaims(uid, { ...user.customClaims, admin: true })
await db.doc(`users/${uid}`).set({
  uid,
  email: user.email ?? '',
  displayName: user.displayName ?? user.email ?? 'Campus administrator',
  role: 'admin',
  updatedAt: FieldValue.serverTimestamp(),
}, { merge: true })
console.log(`Provisioned ${uid} as admin. Have the user sign out and sign in again to refresh the custom claim.`)
