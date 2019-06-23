import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import history from './history'
import {Main} from './components/main'
import {SingleStock} from './components/singleStock'

//import Routes from './routes'

class App extends Component {
  render() {
    return (
      // <Router history={history}></Router>
      <Router>
        <Switch>
          <Route path="/stocks/:ticker" component={SingleStock} />
          <Route path="/" component={Main} />

          {/* <Route path="inbox" component={Inbox}> */}
        </Switch>
      </Router>
    )

    // {/* // return (
    // //   <div>
    // //     <Main />
    // //     {/* <SearchForm /> */}
    // {/* </Router>   </div> */}
  }
}

export default App
