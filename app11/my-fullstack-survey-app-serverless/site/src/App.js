import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
//import Home from './pages/Home/Home'
//import Auth from './pages/Auth/Auth'
import Survey from './pages/Survey/Survey'
import ThankYou from './pages/Thank-You/Thank-you'
//import Dashboard from './pages/Dashboard/Dashboard'
//import { getSession } from './utils'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }


  async componentDidMount() {
    // console.log(getSession())
  }

  render() {
    return (
      <Router>
        <Switch>

          {/* <Route path='/register'>
            <Auth />
          </Route> */}
          <Route exact path='/'>
            <Survey />
          </Route>

          <Route path='/thank-you' exact>
            <ThankYou />
          </Route>

          {/* <Route path='/login'>
            <Auth />
          </Route> */}

          

          {/* <PrivateRoute
            exact
            path='/'
            component={Survey}
          /> */}

        </Switch>
      </Router>
    )
  }
}

/**
 * A component to protect routes.
 * Shows Auth page if the user is not authenticated
 */
// const PrivateRoute = ({ component, ...options }) => {

//   const session = getSession()

//   const finalComponent = session ? Dashboard : Home
//   return <Route {...options} component={finalComponent} />
// }