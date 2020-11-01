// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyD-DfkQjJCanpVi7BcSoSO8Lg8EzwgYPwo",
    authDomain: "angular-pwa-platzi-f553a.firebaseapp.com",
    databaseURL: "https://angular-pwa-platzi-f553a.firebaseio.com",
    projectId: "angular-pwa-platzi-f553a",
    storageBucket: "angular-pwa-platzi-f553a.appspot.com",
    messagingSenderId: "80018166042",
    appId: "1:80018166042:web:0cc5119b82d6a85527dca3"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();