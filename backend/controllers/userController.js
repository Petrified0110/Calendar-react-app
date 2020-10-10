

exports.addUser = (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: {
            message: `user ${newUser} was created`,
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