import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import {Router} from 'react-router-dom'
import history from './history'
import {Main} from './components/main'
import {SingleStock} from './components/singlestock'

import Routes from './routes'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/stock" component={SingleStock} />
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
