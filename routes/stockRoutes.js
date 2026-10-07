const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const stockController = require('../controllers/stockController');

console.log(stockController); // ← this will show us what's being exported

router.get("/portfolio/value", protect, stockController.portfolioValue);
router.get("/:symbol", protect, stockController.getStockPrice);

module.exports = router;


