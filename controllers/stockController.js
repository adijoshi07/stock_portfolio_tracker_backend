const portfolio = require('../models/portfolio.js')
const axios = require('axios')
const getStockPrice = async(req,res) =>{
    try{
        const symbol = req.params.symbol;
        const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.STOCK_API_KEY}`);
        const currentPrice = response.data["Global Quote"]["05. price"];
        res.json({
            symbol,
            currentPrice
        });
    }
    catch(error){
        res.status(500).json({
            message : error.message
        });
    }
};

const portfolioValue = async(req,res) =>{
    try{
        const stocks = await portfolio.find({
            user : req.user._id
        });
        let totalInvestment = 0;
        let currentValue = 0;
        for (const stock of stocks){
            const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.stockSymbol}&apikey=${process.env.STOCK_API_KEY}`);
            const currentPrice = parseFloat(response.data["Global Quote"]["05. price"]);
            totalInvestment += stock.buyPrice * stock.quantity;
            currentValue += currentPrice * stock.quantity;
        }
        const profitloss = currentValue - totalInvestment;
        res.json({
            totalInvestment,
            currentValue,
            profitloss
        });
    }
    catch(error){
        res.status(500).json({
            message : error.message
        });
    }
};
module.exports = {getStockPrice, portfolioValue};