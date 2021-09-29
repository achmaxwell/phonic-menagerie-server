const DefineWishList = (sequelize, DataTypes) => {
    const WishList = sequelize.define("wishlist", {
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
        price: {
            type: DataTypes.STRING,
            allowNull: true
        },
    })
    return WishList
}

module.exports = DefineWishList;