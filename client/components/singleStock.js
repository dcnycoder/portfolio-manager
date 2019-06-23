import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getStockThunk} from '../store'

class DisconnectedSingleStock extends Component {
  ComponentDidMount() {
    //console.log("singleStock this.props: ", this.props);
    this.props.getStock(req.params.ticker)
  }
  render() {
    console.log('singleStock this.props: ', this.props)
    return (
      <div>
        <h2>Single Stock Page: </h2>
        <canvas>Canvas</canvas>
      </div>
    )
  }
}

//export default DisconnetedSingleStock

const mapStateToProps = state => {
  console.log('state in singleStock mapStateToProps: ', state)
  return {
    stocks: state.stocks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStock: ticker => dispatch(getStockThunk(ticker))
  }
}

export const SingleStock = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedSingleStock
)
