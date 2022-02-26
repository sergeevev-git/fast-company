const express = require("express");
const router = express.Router({ mergeParams: true });
const Quality = require("../models/Quality");

router.get("/", async (req, res) => {
    try {
        const list = await Quality.find();

        //    res.status(200).json({ list });
        // .send возвращает просто переменную, не json
        res.status(200).send(list);
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
});

module.exports = router;
