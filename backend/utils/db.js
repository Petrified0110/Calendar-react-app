    const admin = require("firebase"); 

    var firebaseConfig = {
        apiKey: "AIzaSyBtMp8Ovzylr_umBQnWNT3GFju-dhbln4E",
        authDomain: "calendar-cd096.firebaseapp.com",
        databaseURL: "https://calendar-cd096.firebaseio.com",
        projectId: "calendar-cd096",
        storageBucket: "calendar-cd096.appspot.com",
        appId: "1:134517900389:web:18f7892ccf5f7e2b20728c"
    };

    const app = admin.initializeApp(firebaseConfig);
    const db = admin.firestore();

    module.exports = db;