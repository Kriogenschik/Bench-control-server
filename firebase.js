// const { initializeApp, cert } = require('firebase-admin/app')
// const { getFirestore } = require('firebase-admin/firestore')

// const serviceAccount = require('./creds.json')

// initializeApp({
//     credential: cert(serviceAccount)
// })

// const db = getFirestore()

// module.exports = { db }

const admin = require('firebase-admin');
const credentials = require('./creds.json');

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const db = admin.firestore();
const auth = admin.a;
// const auth = admin.auth();


module.exports = { db, auth }