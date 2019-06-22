const router = require('express').Router()
const axios = require('axios')
const {Stocks} = require('../db/models/')

//to get all stocks on the frontpage:
router.get('/', async function(req, res, next) {
  try {
    //console.log("You've successfully reached the stocks route!")
    let tickers = await Stocks.findAll({
      attributes: ['ticker']
    })

    //console.log('got all stocks from db: ', tickers)
    //return the await of the map somehow

    //map through tickers and return array of promises to pass to Promise.all
    let stockPromises = tickers.map(async function(stock) {
      //console.log(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock.ticker}&interval=5min&apikey=MUKS5PNHTEUS1KM2`);
      let result = axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${
          stock.ticker
        }&interval=5min&apikey=MUKS5PNHTEUS1KM2`
      )
      //console.log("result: ", result)
      return result
    })

    //let stockPrices = await stockPromises[0];
    let stockPrices = await Promise.all(stockPromises)

    //return object with tickers and prices:
    //Object.keys(stockPrices)

    stockPrices1 = stockPrices.map(stock => {
      //console.log("stock.data: ", stock.data);
      stock = stock.data
      let intervals = Object.keys(stock['Time Series (5min)'])
      //console.log('intervals: ', intervals)
      let lastClose = stock['Time Series (5min)'][intervals[0]]['4. close']
      //console.log("lastClose: ", lastClose)
      return lastClose
    })

    let stocks = tickers.map((elem, index) => {
      console.log('index: ', index)
      return {
        ticker: elem.ticker,
        currentPrice: parseFloat(stockPrices1[index])
      }
    })
    console.log('refined stocks: ', stocks)
    //console.log("stockPrices.data: ", stockPrices[0]);

    //EXAMPLE:
    //       var promise1 = Promise.resolve(3);
    // var promise2 = 42;
    // var promise3 = new Promise(function(resolve, reject) {
    //   setTimeout(resolve, 100, 'foo');
    // });

    // Promise.all([promise1, promise2, promise3]).then(function(values) {
    //   console.log(values);
    // });
    // expected output: Array [3, 42, "foo"]
    //WAS:
    // const {data} = await axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo');

    // stock.currentPrice = data["Time Series (5min)"]["2019-06-21 16:00:00"]["4. close"];

    //return await?
    // stock = await axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo')
    // .then(
    //   (result) => {
    //     console.log(result);
    //     stock.currentPrice = data["Time Series (5min)"]["2019-06-21 16:00:00"]["4. close"];
    //     console.log("stock.currentPrice: ", stock.currentPrice);
    //     console.log("stock returned: ", stock);
    //     return stock;
    //   }
    // )
    // return stock;

    // console.log("Stock.currentPrice:", stock.currentPrice);
    // console.log("Stock w/price: ", stock);

    //stock.currentPrice = '100';
    //return stock;
    // })

    // console.log("tickers in api returned: ", tickers);
    res.send(stocks)
    //res.json(result);
  } catch (err) {
    console.log('Error has occured: ', err)
    next(err)
  }
})

module.exports = router
