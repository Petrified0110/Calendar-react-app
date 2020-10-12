const admin = require("firebase-admin"); 

exports.addUser = async (req, res, next) => {
    const app = admin.initializeApp({
        apiKey: "AIzaSyBtMp8Ovzylr_umBQnWNT3GFju-dhbln4E",
        projectId: "calendar-cd096",
    },"Calendar");
    
    const db = admin.firestore();

    const { email, password} = req.body;

    //TODO: encrypt password before sending to db
    
    console.log("await");
    const ref = await firestore.collection("users").add({
        email: email,
        password: password
    });
    console.log("awaited");

    const newUser = {id: "0"};
    res.status(200).json({
        status: "success",
        data: {
            message: `user ${newUser.id} was created`,
            user: newUser,
            ref: ref
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