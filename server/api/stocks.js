const router = require('express').Router()
//const axios = require('axios');
const {Stocks} = require('../db/models/')

//to get all stocks on the frontpage:
router.get('/', async function(req, res, next) {
  try {
    console.log("You've successfully reached the stocks route!")
    //const {data} = await axios.get('https://www.zillow.com/brooklyn-new-york-ny-11220/');

    //, (req, res) => {

    const tickers = await Stocks.findAll({
      attributes: ['ticker']
    })

    // const allPugs = await Pug.findAll({
    //   attributes: ['id', 'name', 'age'] // like saying: SELECT id, name, age from pugs;
    // })

    console.log('got all stocks from db: ', tickers)
    res.send(tickers)
    //res.json(result);
  } catch (err) {
    console.log('Error has occured: ', err)
    next(err)
  }
})

module.exports = router
