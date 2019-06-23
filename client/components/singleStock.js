import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getStocksThunk} from '../store'

class DisconnetedSingleStock extends Component {
  // ComponentDidMount() {
  //   this.props.getStock()
  // }
  render() {
    return (
      <div>
        <h2>Single Stock Page: </h2>
        <canvas />
      </div>
    )
  }
}

//export default DisconnetedSingleStock

const mapStateToProps = state => {
  console.log('state in mapStateToProps: ', state)
  return {
    stocks: state.stocks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStocks: () => dispatch(getStocksThunk())
  }
}

export const SingleStock = connect(mapStateToProps, mapDispatchToProps)(
  DisconnetedSingleStock
)
