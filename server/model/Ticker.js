const { Schema, model } = require("mongoose");

const tickerSchema = new Schema(

    // "symbol": "MHC-BTC"
    // "symbol": "LOKI-BTC"
    {
      ticker: {
        type: String,
        required: true,
      },
      // the name of the market of the item or ticker (stocks or crypto)
      market: {
        type: String,
      },
      //API houses the baseurl for making calls to the Web APIs ()
      API: {
        type: String,
        required: true,
      }
    }
  );

  module.exports = tickerSchema;