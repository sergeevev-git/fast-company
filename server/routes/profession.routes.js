const express = require("express");
const router = express.Router({ mergeParams: true });
const Profession = require("../models/Profession");

router.get("/", async (req, res) => {
    try {
        const list = await Profession.find();

        //    res.status(200).json({ list });
        // .send возвращает просто переменную, не json
        res.status(200).send(list);
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
});

module.exports = router;
