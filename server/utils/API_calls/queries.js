//endpoints
const { Ticker } = require("../../model");

const Alpaca = require("@alpacahq/alpaca-trade-api");
require("dotenv").config();
const moment = require("moment");

const alpaca = new Alpaca({
  keyId: process.env.KEYID,
  secretKey: process.env.SECRET_KEY,
});

async function getBarData(symbol, timeframe, limit, days) {
  return new Promise(async (resolve) => {
    let dateStart = moment().subtract(days, "days").format();
    let datenow = moment().subtract(16, "minutes").format();

    const bars = await alpaca.getBarsV2(symbol, {
      start: dateStart,
      end: datenow, // it cannot be latest time, we need to keep it 15min behind for free API data.
      timeframe: timeframe, // timeframe: '1Min' | '5Min' | '15Min' | '1H' | '1D' available
      limit: limit, // I have tested this upto 100000
    });
    // function parseBarsForLoop( bars) {
    // console.log(bars);
    let barsData = [];

    for await (const b of bars) {
      let barsDataParsed = {};
      for (let key in b) {
        if (key == "Timestamp") {
          barsDataParsed[key] = b[key];
        } else {
          barsDataParsed[key] = parseFloat(b[key]);
        }
      }
      barsData.push(barsDataParsed);
    }
    console.table(barsData);

    resolve(barsData);
  });
}

async function getBarsData(symbol, timeframe, limit, days) {
  return new Promise(async (resolve) => {
    let dateStart = moment().subtract(days, "days").format();
    let datenow = moment().subtract(16, "minutes").format();
    console.log(datenow);

    const bars = await alpaca.getMultiBarsV2(symbol, {
      start: dateStart,
      end: datenow, // it cannot be latest time, we need to keep it 15min behind for free API data.
      timeframe: timeframe, // timeframe: '1Min' | '5Min' | '15Min' | '1H' | '1D' available
      limit: limit, // I have tested this upto 100000
    });

    console.log(bars);
    const allBars = [];
    for (const b of bars) {
      let barsData = {};
      barsData["Name"] = b[0];
      console.log(b[0], "this b");
      console.log(b[1], "this b1");
      barsData["Barsdata"] = [];

      for (const i of b[1]) {
        let barsDataParsed = {};
        for (let key in i) {
          if (key == "Symbol" || key == "Timestamp") {
            barsDataParsed[key] = i[key];
          } else if (key == "TradeCount" || key == "Volume") {
            barsDataParsed[key] = parseInt(i[key]);
          } else {
            barsDataParsed[key] = parseFloat(i[key]);
          }
        }
        barsData["Barsdata"].push(barsDataParsed);
      }

      allBars.push(barsData);
    }

    resolve(allBars);
  });
}

function dataToBasket(data) {
  return new Promise((resolve) => {
    console.log(data, "this data");
    const finalArr = [];
    data.map((each, key) => {
      for (let i = 0; i < each.Barsdata.length; i++) {
        if (finalArr.length == 0) {
          finalArr.push(each.Barsdata[i]);
        }
        for (let b = 0; b < finalArr.length; b++) {
          if (each.Barsdata[i].Timestamp === finalArr[b].Timestamp) {
            finalArr[b].VWAP += each.Barsdata[i].VWAP;
            console.log(finalArr[b], each.Barsdata[i]);
          } else {
            finalArr.push(each.Barsdata[i]);
          }
        }
        if (key == data.length - 1 && i == each.Barsdata.length - 1) {
          resolve(finalArr);
        }
      }
    });
  });
}

function addBasketHelper(args) {
  return new Promise((resolve) => {
    let tickers = [];
    args.tickers.map(async (each, key) => {
      const tick = await Ticker.findOne({ symbol: each });
      console.log(tick);
      if (tick == null) {
        let tick = await Ticker.create({ symbol: each, API: "alpaca" });
        tickers.push(tick);
        console.log("creating", tick);
      } else {
        console.log("already", tick);
        tickers.push(tick);
      }
      if (key == args.tickers.length - 1) {
        resolve(tickers);
      }
    });
  });
}
module.exports = { getBarData, dataToBasket, getBarsData, addBasketHelper };

// (async (symbol)=>{

//     //
//     // https://alpaca.markets/docs/api-references/market-data-api/stock-pricing-data/historical/#bars
//     // documentation for this api call
//     //

//   const bars = await alpaca.getBarsV2(symbol,
//     {
//         start: "2022-09-28",
//         end: "2022-11-27", // it cannot be latest time, we need to keep it 15min behind for free API data.
//         timeframe: "1D", // timeframe: '1Min' | '5Min' | '15Min' | '1H' | '1D' available
//         limit: 100, // I have tested this upto 100000

//       });

//       let barsData = [];
//    for await (const b of bars) {
//      barsData.push(b);
//    }
//    console.log("Last 10 daily bars for SPY");
//    console.table(barsData);

// })();
