const admin = require("firebase"); 

var firebaseConfig = {
    apiKey: "AIzaSyBtMp8Ovzylr_umBQnWNT3GFju-dhbln4E",
    authDomain: "calendar-cd096.firebaseapp.com",
    databaseURL: "https://calendar-cd096.firebaseio.com",
    projectId: "calendar-cd096",
    storageBucket: "calendar-cd096.appspot.com",
    messagingSenderId: "134517900389",
    appId: "1:134517900389:web:18f7892ccf5f7e2b20728c",
    measurementId: "G-K4WDD28ERW"
  };

const app = admin.initializeApp(firebaseConfig);
const db = admin.firestore();


exports.addUser = async (req, res, next) => {
    
    const { email, password} = req.body;

    //TODO: encrypt password before sending to db
    
    console.log("await");
    const ref = await db.collection("users").add({
        email: email,
        password: password
    });
    console.log(ref._firestoreClient.clientId);

    const newUser = {id: "0"};
    res.status(200).json({
        status: "success",
        data: {
            message: `user ${newUser.id} was created`,
            user: newUser
        }
    });
};

exports.getUser = (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: {
            message: `user ${user} was found`,
            user: user
        }
    });

};

exports.getUsers = (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: {
            message: `${users.length} were found`,
            users
        }
    });
};

exports.updateUser = (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: {
            message: `${user} was updated`,
            user
        }
    });
};

exports.deleteUser = (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: null
    });
};