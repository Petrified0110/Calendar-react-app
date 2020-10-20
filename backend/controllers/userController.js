const bcrypt = require('bcryptjs');
const db = require('../utils/db');

exports.addUser = async (req, res, next) => {
    
    const { email, password} = req.body;

    const encryptedPassword = await bcrypt.hash(password, 12);

    const ref = await db.collection("users").add({
        email: email,
        password: encryptedPassword
    });

    console.log(ref._firestoreClient.clientId);

    res.status(200).json({
        status: "success",
        data: {
            message: `user ${email} was created`
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