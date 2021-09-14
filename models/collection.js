const { DataTypes } = require("sequelize");
const db = require("../db");

// const Collection = db.define("collection", {
//     owner_id: {
//         type: DataTypes.INTEGER
//     },
//     artist: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     album: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     format: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     cat: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
// });

module.exports = (sequelize, DataTypes) => {
    const Collection = sequelize.define("collection", {
        owner_id: {
            type: DataTypes.INTEGER
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false
        },
        album: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        format: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cat: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });
    return Collection
}