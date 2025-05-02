// utils/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../utils/corpwingswebsite-firebase-adminsdk-fbsvc-c883eaa4b7.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'corpwingswebsite.appspot.com',
});

const bucket = admin.storage().bucket();

module.exports = bucket;
