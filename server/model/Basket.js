const { Schema, model } = require('mongoose');


const tickerSchema = require("./Ticker");

//create a cell that houses a single basket within the "Matrix" 100101
const basketSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tickers: [tickerSchema],
});

const Basket = model('Basket', basketSchema);

module.exports = Basket;
