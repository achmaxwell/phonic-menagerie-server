const express = require("express");
const router = express.Router();
const { UserModel } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const validateIsAdmin = require("../middleware/validate-is-admin");
const validateSession = require("../middleware/validate-jwt");

router.post('/create', async (req, res) => {
    const { email, password, isAdmin } = req.body.user;
    
    try {
        const NewUser = await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 13),
            isAdmin
        })
        
        let token = jwt.sign(
            { id : NewUser.id,
            }, 
            process.env.JWT_SECRET, 
            { expiresIn : 60 * 60 * 24 }
        );
        
        res.status(201).json({
            user: NewUser,
            message: "User successfully created!",
            sessionToken: token
        });
    } catch (error) {
    if (error instanceof UniqueConstraintError) {
        res.status(409).json({
            message: "Email already in use",
        });
    } else {
        res.status(500).json({
        message: "Failed to create user",
        });
    }   
}
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body.user;

    try {
        const LoggedInUser = await UserModel.findOne({
            where: {
                email: email,
            } 
        });
        
        if (LoggedInUser) {
            let passwordComparison = await bcrypt.compare(password, LoggedInUser.password);
            if (passwordComparison) {
                let token = jwt.sign(
                    {id: LoggedInUser.id}, 
                    process.env.JWT_SECRET, 
                    {expiresIn: 60 * 60 * 24}
                );
    
                res.status(200).json({
                    user: LoggedInUser,
                    message: "User successfully logged in!",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "Login failed - Incorrect email or password"
                })
            }
        } else {
            res.status(401).json({
                message: 'Login failed'
            });
        }
    } catch (error) {
        res.status(500).json({ error })
    }
});

//Admin Only

router.get("/allUsers", validateSession, validateIsAdmin, (async (req, res) => {
    console.log(validateIsAdmin())
    await UserModel.findAll().then(user => {
        res.json(user)
    })
    .catch(err => res.status(500).json({error: err}))
}));

module.exports = router;