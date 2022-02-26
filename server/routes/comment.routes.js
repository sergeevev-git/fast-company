const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware.js");
const Comment = require("../models/Comment.js");

router
    .route("/")
    .get(auth, async (req, res) => {
        try {
            const { orderBy, equalTo } = req.query;
            const list = await Comment.find({ [orderBy]: equalTo });
            res.send(list);
        } catch (error) {
            res.status(500).json({ message: "server error" });
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newComment = await Comment.create({
                ...req.body,
                userId: req.user._id,
            });

            res.status(201).send(newComment);
        } catch (error) {
            res.status(500).json({ message: "server error" });
        }
    });

router.delete("/:commentId", auth, async (req, res) => {
    try {
        const { commentId } = req.params;
        const removedComment = await Comment.findById(commentId);

        if (removedComment.userId.toString() === req.user._id) {
            await removedComment.remove();
            res.status(201).send(null);
        } else {
            res.status(500).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
});

module.exports = router;
