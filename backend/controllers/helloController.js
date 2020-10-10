


exports.helloWorld = async (req, res, next) => {
    res.status(200).json({
        jello: "World"
    });

};