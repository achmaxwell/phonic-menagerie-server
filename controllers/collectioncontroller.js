const { Router } = require("express");
const Express = require("express");
const router = Express.Router();
let validateSession = require("../middleware/validate-jwt");

const { CollectionModel } = require("../models");

//create/add collection
router.post("/add", validateSession,  async (req, res) => {
    const { artist, album, format, cat } = req.body.collection; 
    const id = req.user.id; 
    const item = {
        artist,
        album,
        format,
        cat,
        owner_id: id
    }
    try {
        const newItem = await CollectionModel.create(item);
        res.status(200).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// GET item by owner
router.get("/myItems", validateSession, (async (req, res) => {
    const { id } = req.user;
    try {
        const userItems = await CollectionModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userItems);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}));

//Update
router.put("/update/:idToUpdate", validateSession, async (req, res) => {
    const { artist, album, format, cat } = req.body.collection;
    const itemId = req.params.idToUpdate;
    const userId = req.user.id;

    const query = {
        where: {
            id: itemId,
            owner_id: userId
        }
    };

    const updatedItem = {
        artist: artist,
        album: album,
        format: format,
        cat: cat,
        owner_id: userId
    };

    try {
        const update = await CollectionModel.update(updatedItem, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//Delete a collection
router.delete("/delete/:idToDelete", validateSession, async (req, res) => {
    const ownerId = req.user.id
    const itemId = req.params.idToDelete;

    try {
        const query = {
            where: {
                id: itemId,
                owner_id: ownerId
            }
        };

        await CollectionModel.destroy(query);
        res.status(200).json({ message: "Your item has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;

