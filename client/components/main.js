import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getStocksThunk} from '../store'

class DisconnectedMain extends Component {
  componentDidMount() {
    this.props.getStocks()
  }
  render() {
    return (
      <div>
        <h3>Welcome to the App!</h3>
        <ul>
          {this.props.stocks.map(elem => {
            return <li>{elem.ticker}</li>
          })}
        </ul>
      </div>
    )
  }
}

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

export const Main = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedMain
)

//export default Main;
