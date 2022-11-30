//endpoints

const Alpaca = require("@alpacahq/alpaca-trade-api");
require("dotenv").config();
const moment = require("moment");

const alpaca = new Alpaca({
  keyId: "PKRXN1LVUW50X67PGV34",
  secretKey: "Iy2ZEcBvsXH03LxQfdMezTfJY10B8ye3lQeeJzag",
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

    const bars = await alpaca.getMultiBarsV2(symbol, {
      start: dateStart,
      end: datenow, // it cannot be latest time, we need to keep it 15min behind for free API data.
      timeframe: timeframe, // timeframe: '1Min' | '5Min' | '15Min' | '1H' | '1D' available
      limit: limit, // I have tested this upto 100000
    });
    let barsData = {};
    console.log("Bars data coming: ", bars);
    for (const b of bars) {
      barsData["Name"] = b[0];
      barsData["Barsdata"] = b[1];
    }

    console.log("sending to front end", barsData);

    resolve(barsData);
  });
}
module.exports = { getBarData, getBarsData };

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
