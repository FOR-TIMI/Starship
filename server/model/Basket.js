const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const tickerSchema = require("./Ticker").schema;

//create a cell that houses a single basket within the "Matrix" 100101
const basketSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    get: (currentTimestamp) => dateFormat(currentTimestamp),
  },
  username: {
    type: String,
    required: true,
  },
  tickers: [tickerSchema],
});

const Basket = model("Basket", basketSchema);

module.exports = Basket;
