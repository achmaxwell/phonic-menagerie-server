const { sequelize, syncDB } = require("../db")
const { DataTypes } = require("sequelize")

const DefineUser = require("./user")
const DefineCollection = require("./collection")
const DefineWishList = require("./wishlist")


const UserModel = DefineUser(sequelize, DataTypes);
const CollectionModel = DefineCollection(sequelize, DataTypes);
const WishListModel = DefineWishList(sequelize, DataTypes);

UserModel.hasMany(CollectionModel)
CollectionModel.belongsTo(UserModel)

UserModel.hasMany(WishListModel)
WishListModel.belongsTo(UserModel)

syncDB(sequelize, {alter:true})


module.exports = { 
    UserModel,
    CollectionModel,
    WishListModel,
};