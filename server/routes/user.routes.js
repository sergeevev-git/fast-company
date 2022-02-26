const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");

router.get("/", auth, async (req, res) => {
    try {
        const list = await User.find();
        res.status(200).send(list);
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
});

router.patch("/:userId", auth, async (req, res) => {
    try {
        const { userId } = req.params;

        if (userId === req.user._id) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
                new: true,
            });

            res.send(updatedUser);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
});

module.exports = router;
