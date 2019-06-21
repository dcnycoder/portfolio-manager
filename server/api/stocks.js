const router = require('express').Router()
const axios = require('axios')

router.get('/', async function(req, res, next) {
  try {
    console.log("You've successfully reached the stocks route!")
    //const {data} = await axios.get('https://www.zillow.com/brooklyn-new-york-ny-11220/');

    //, (req, res) => {
    console.log('sold query result: ', data)
    res.send('Data was obtained!')
    //res.json(result);
  } catch (err) {
    console.log('Error has occured: ', err)
    next(err)
  }
})

module.exports = router
