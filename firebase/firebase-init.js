//https://firebase.google.com/docs/admin/setup
const app = require('firebase-admin/app')
console.log("initialize admin firebase")
app.initializeApp({
    credential: applicationDefault(),
});