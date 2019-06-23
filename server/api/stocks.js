const router = require('express').Router()
const axios = require('axios')
const {Stocks} = require('../db/models/')

router.get('/:ticker', async (req, res, next) => {
  console.log('single stock api route reached!')
  try {
    const {data} = await Stocks.findOne({
      where: {
        ticker: req.params.ticker
      }
    })
    const singleStockPrice = data
    res.send(singleStockPrice)
  } catch (error) {
    console.log('Error getting single stock from db:', error)
    next(error)
  }
})

//to get all stocks on the frontpage:
router.get('/', async function(req, res, next) {
  try {
    console.log("You've successfully reached the stocks route!")
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

    stockPrices = stockPrices.map(stock => {
      //console.log("stock.data: ", stock.data);
      stock = stock.data
      console.log('stock: ', stock)
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
        currentPrice: parseFloat(stockPrices[index])
      }
    })
    console.log('refined stocks: ', stocks)
    res.send(stocks)
  } catch (err) {
    console.log('Error has occured: ', err)
    next(err)
  }
})

module.exports = router
