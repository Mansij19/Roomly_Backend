const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Grand Palace Hotel",
            location: "Indore",
            price: 2500,
        },
        {
            id: 2,
            name: "Royal Stay",
            location: "Bhopal",
            price: 1800,
        },
    ]);
});

module.exports = router;