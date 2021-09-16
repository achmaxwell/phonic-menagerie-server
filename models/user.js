const { DataTypes } = require("sequelize");
const db = require("../db");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
    return User
}