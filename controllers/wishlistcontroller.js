const { Router } = require("express");
const Express = require("express");
const router = Express.Router();
// let validateJWT = require("../middleware/validate-jwt");

const { WishListModel } = require("../models");

//create/add note
router.post("/add",  async (req, res) => {
    const { artist, album, format, cat, price } = req.body.notes; 
    const id = req.user.id; 
    const wishItem = {
        artist,
        album,
        format,
        cat,
        price,
        owner_id: id
    }
    try {
        const newWishItem = await WishListModel.create(wishItem);
        res.status(200).json(newWishItem);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// GET item by owner
router.get("/myWishItems", (async (req, res) => {
    const { id } = req.user;
    try {
        const userWishItems = await WishListModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userWishItems);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}));

//Update a Note
router.put("/update/:idToUpdate", async (req, res) => {
    const { artist, album, format, cat, price } = req.body.notes;
    const wishItemId = req.params.idToUpdate;
    const userId = req.user.id;

    const query = {
        where: {
            id: wishItemId,
            owner_id: userId
        }
    };

    const updatedWishItem = {
        artist: artist,
        album: album,
        format: format,
        cat: cat,
        price: price,
        owner_id: userId
    };

    try {
        const update = await WishListModel.update(updatedWishItem, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//Delete a note
router.delete("/delete/:idToDelete", async (req, res) => {
    const ownerId = req.user.id
    const wishItemId = req.params.idToDelete;

    try {
        const query = {
            where: {
                id: wishItemId,
                owner_id: ownerId
            }
        };

        await WishListModel.destroy(query);
        res.status(200).json({ message: "Your item has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;

