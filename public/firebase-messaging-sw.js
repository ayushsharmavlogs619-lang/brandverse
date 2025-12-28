importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDCbYX5rmE8KwXO-b_Clv5On3vbAxmJlu8",
    authDomain: "brandverse-8207e.firebaseapp.com",
    projectId: "brandverse-8207e",
    storageBucket: "brandverse-8207e.firebasestorage.app",
    messagingSenderId: "790805284794",
    appId: "1:790805284794:web:7d8e2ec29c2b90d70f7f83"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/favicon.ico'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
