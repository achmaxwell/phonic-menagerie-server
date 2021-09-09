const { Router } = require("express");
const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

const { CollectionModel } = require("../models");

//create/add note
router.post("/add",  async (req, res) => {
    const { artist, album, format, cat } = req.body.notes; 
    const id = req.user.id; 
    const collectionItem = {
        artist,
        album,
        format,
        cat,
        owner_id: id
    }
    try {
        const newItem = await CollectionModel.create(collectionItem);
        res.status(200).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Amelia GET notes by owner
router.get("/myCollection", (async (req, res) => {
    const { id } = req.user;
    try {
        const userItem = await CollectionModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userItem);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}));

//Update a Note
router.put("/update/:idToUpdate", async (req, res) => {
    const { artist, album, format, cat } = req.body.notes;
    const itemId = req.params.idToUpdate;
    const userId = req.user.id;

    const query = {
        where: {
            id: itemId,
            owner_id: userId
        }
    };

    const updatedNote = {
        artist: artist,
        album: album,
        format: format,
        cat: cat,
        owner_id: userId
    };

    try {
        const update = await NotesModel.update(updatedNote, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//Delete a note
router.delete("/delete/:idToDelete", async (req, res) => {
    const ownerId = req.user.id
    const itemId = req.params.idToDelete;

    try {
        const query = {
            where: {
                id: itemId,
                owner_id: ownerId
            }
        };

        await NotesModel.destroy(query);
        res.status(200).json({ message: "Your note has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;
