import axios from 'axios'
//import Stocks from

const GET_STOCKS = 'GET_STOCKS'
const GET_STOCK = 'GET_STOCK'

const initialState = []

const getStocks = stocks => {
  return {
    type: GET_STOCKS,
    stocks: stocks
  }
}

export const getStocksThunk = dispatch => {
  return async dispatch => {
    //get all the stocks from db in the form of array
    //and call the whole array from AlphaVantage

    //tickers.map(async (ticker) => {
    //   const {data} = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=demo`);
    //   console.log('data from alphavantage: ', data);
    // })
    const {data} = await axios.get('/api/stocks')

    console.log('tickers array: ', data)
    dispatch(getStocks(data))
  }
}

const getStock = (ticker, data) => {
  console.log('getStock dispatched!')
  return {
    type: GET_STOCK,
    ticker: ticker,
    data: data
  }
}

export const getStockThunk = function(ticker, dispatch) {
  console.log('getStockThunk called!')
  return (ticker, dispatch) => {
    try {
      const {data} = axios.get(`api/stocks/${ticker}`, (req, res, next) => {
        console.log('data in getStockThunk: ', data)
        //res.send(data);
        dispatch(getStock(ticker, data))
      })
    } catch (error) {
      console.log('error in getStockThunk!')
    }
    dispatch(getStock())
  }
}

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STOCKS:
      return action.stocks
    // case: GET_STOCK:
    //   return
    default:
      return state
  }
}

export default stockReducer
