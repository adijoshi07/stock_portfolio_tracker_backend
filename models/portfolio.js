const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    stockSymbol:{
        type:String,
        required:true,
        trim:true,
        uppercase:true
    },

    quantity:{
        type:Number,
        required:true,
        min:1
    },

    buyPrice:{
        type:Number,
        required:true,
        min:1
    }

},{timestamps:true});

module.exports = mongoose.model("Portfolio", portfolioSchema);
