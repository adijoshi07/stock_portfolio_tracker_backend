const portfolio = require('../models/portfolio.js')
const addStock = async(req, res) =>{
    try{

        const {stockSymbol, quantity, buyPrice} = req.body;

        // Validation
        if(!stockSymbol || !quantity || !buyPrice){
            return res.status(400).json({
                message : "All fields are required"
            });
        }

        if(quantity <= 0){
            return res.status(400).json({
                message : "Quantity must be greater than 0"
            });
        }

        if(buyPrice <= 0){
            return res.status(400).json({
                message : "Buy price must be greater than 0"
            });
        }

        const stock = await portfolio.create({
            user : req.user._id,
            stockSymbol,
            quantity,
            buyPrice
        });

        res.status(201).json({
            message : "Stock created successfully",
            stock
        });

    }
    catch(error){
        res.status(500).json({
            message : error.message
        });
    }
}
const getStocks = async(req,res) =>{
    try{
        const stocks = await portfolio.find({user:req.user._id});
        res.json(stocks);
    }
    catch(error){
        res.status(500).json({
            message : error.message
        });
    };
}
const updateStock = async(req,res) =>{
    try{
        const stock = await portfolio.findById(req.params.id);//add portfolio id as param
        if(!stock){
            return res.status(404).json({
                message : "Stock not found"
            });
        }
        if(req.body.quantity && req.body.quantity <= 0){
            return res.status(400).json({
                message : "Quantity must be greater than 0"
            });
        }
        if(req.body.buyPrice && req.body.buyPrice <= 0){
            return res.status(400).json({
                message : "Buy price must be greater than 0"
            });
        }
        //check ownership
        if(stock.user.toString() !== req.user._id.toString()){
            return res.status(401).json({
                message : "Not authorized"
            });
        }
        stock.stockSymbol = req.body.stockSymbol ?? stock.stockSymbol;
        stock.quantity = req.body.quantity ?? stock.quantity;
        stock.buyPrice = req.body.buyPrice ?? stock.buyPrice;

        const updatedstock = await stock.save();
        res.json(updatedstock);
    }
    catch(error){
        res.status(500).json({
            message : error.message
        });
    }
};
const deleteStock = async(req,res) =>{
    try{
        const stock = await portfolio.findById(req.params.id);

        if(!stock){
            return res.status(404).json({
                message : "Stock not found"
            });
        }

        //check ownership
        if(stock.user.toString() !== req.user._id.toString()){
            return res.status(401).json({
                message : "Not authorized"
            });
        }

        await stock.deleteOne();

        res.json({
            message : "Stock deleted successfully"
        });

    }
    catch(error){
        res.status(500).json({
            message : error.message
        });
    }
};
module.exports = {addStock,getStocks,updateStock,deleteStock};

