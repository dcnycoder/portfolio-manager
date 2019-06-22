import axios from 'axios'
//import Stocks from

const GET_STOCKS = 'GET_STOCKS'
const GET_STOCK = 'GET_STOCK'

const initialState = [1, 2, 3, 4]

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

const getStock = ticker => {
  return {
    type: GET_STOCK,
    ticker: ticker
  }
}

const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STOCKS:
      return action.stocks
    default:
      return state
  }
}

export default stockReducer
