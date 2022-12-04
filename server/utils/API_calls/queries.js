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
    for (const b of bars) {
      console.log(b[1].length, "THIS BARS");
    }
    const allBars = [];
    for await (const b of bars) {
      let barsData = {};
      barsData["Name"] = b[0];
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
    const VWAP = [];
    for (let i = 0; i < data.length; i++) {
      for (let b = 0; b < data[i].Barsdata.length; b++) {
        if (b == 0 && i == 0) {
          VWAP.push(data[i].Barsdata[b]);
        }
        let unique = true;
        for (let x = 0; x < VWAP.length; x++) {
          if (data[i].Barsdata[b].Timestamp == VWAP[x].Timestamp) {
            if (data[i].Barsdata[b].Symbol != VWAP[x].Symbol) {
              VWAP[x].VWAP += data[i].Barsdata[b].VWAP;
            }
            unique = false;
          } else if (x == VWAP.length - 1 && unique == true) {
            VWAP.push(data[i].Barsdata[b]); //
          }
        }
        if (b == data[i].Barsdata.length - 1 && i == data.length - 1) {
          resolve(VWAP);
        }
      }
    }
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

async function getLargeTrades(ticker) {
  return new Promise(async (resolve) => {
    let dateStart = moment().subtract(10, "days").format();
    let datenow = moment().subtract(16, "minutes").format();

    const trades = await alpaca.getTradesV2(ticker, {
      start: dateStart,
      end: datenow, // // timeframe: '1Min' | '5Min' | '15Min' | '1H' | '1D' available
      limit: 10000,
    });

    let done = [];

    for await (const b of trades) {
      // console.log(b);
      if (done.length < 5) {
        done.push(b);
      } else {
        for (let i = 0; i < done.length; i++) {
          let d = done.findIndex((e) => e.ID === b.ID);
          if (done[i].Size <= b.Size && d == -1) {
            done.splice(i, 1);
            done.push(b);
          }
        }
      }
    }
    resolve(done);
  });
}

module.exports = {
  getLargeTrades,
  getBarData,
  dataToBasket,
  getBarsData,
  addBasketHelper,
};

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
