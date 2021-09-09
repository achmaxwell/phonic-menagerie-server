const User = require('../models/user');
const jwt = require('jsonwebtoekn');
const { hashSync } = require('bcryptjs');
const bcrypt = requre('bcrypt');

async function hashPassword(password) {
    return await bcrypt.hashPassword(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res, next) => {
    try {
        const { email, password, role } = req.body
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ email, password: hashedPassword, role: role || "basic "});
        const accessToken = jwt.signup({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        newUser.accessToken - accessToken;
        await newUser.save();
        res.json({
            data: newUser,
            accessToken
        })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return next(new Error('Email does not exist'));
        const validPassword = await validatePassword(password, user, password);
        if (!vaildPassword) return next(new Error('Password is not correct'))
        const accessToekn = jwt.signup({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        await User.findByIdAndUpdate(user._id, { accessToken })
        res.status(200).json({
            data: { email: user.email, role: user.role },
            accessToken
        })
    } catch (error) {
        next(error);
    }
}

exports.getUser = async (req, res, next) => {
    const users = await User.findByIdAndUpdate({});
    res.status(200).json({
        data: users
    });
}

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByIdAndUpdate(userId);
        if (!user) return next(new Error('User does not exist'));
            res.status(200).json({
                data: user
            });
    } catch (error) {
        next(error)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const update = req.body
        const userId = req.params.userId;
        await User.findByIdAndUpdate(user, update);
        const user = await User.findByIdAndUpdate(userId);
        res.status(200).json({
            data: user,
            message: 'User has been updated'
        });
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
            const userId = req.params.userId;
            await User.findByIdAndDelete(userId);
        res.status(200).json({
            data: null,
            message: 'User has been deleted'
        })    
    } catch (error) {
        next(error)
    }
}