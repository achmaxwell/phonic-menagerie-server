const { UserModel } = require("../models")

const validateIsAdmin = async(req, res, next) => {
    const { isAdmin } = req.headers
    if(isAdmin === false) {
        res.status(400).send({ message: "Not Authroized" });
    } else {
        next();
    }
}

module.exports = validateIsAdmin;