const express = require('express')
const router = express.Router();
const protect = require('../middleware/authMiddleware')
const {addStock,getStocks,updateStock,deleteStock} = require('../controllers/portfolioController')
router.post("/",protect,addStock);
router.get("/", protect,getStocks);
router.put("/:id",protect,updateStock);
router.delete("/:id",protect,deleteStock);
module.exports = router;