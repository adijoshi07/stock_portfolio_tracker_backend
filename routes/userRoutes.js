const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
console.log(protect);

router.get("/profile", protect, (req, res) => {

    res.json({
        message: "Profile Route Accessed",
        user: req.user
    });

});

module.exports = router;