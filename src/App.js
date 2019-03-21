import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { getUserFromLocalStorage } from './actions/userActions'
import { connect } from 'react-redux'
import LoginSignupPage from './components/LoginSignupPage'
import Profile from './components/Profile'
import Composition from './components/Composition.js'
import './App.css';

class App extends Component {
  componentDidMount() {
    let token = localStorage.token;
    this.props.getUserFromLocalStorage(token)
  }

  render() {
    return (
      <div className="App">
        {this.props.user ?
          <Redirect to='/login' /> :
          <Switch>
            <Route path='/login' component={LoginSignupPage} />
            <Route path='/signup' component={LoginSignupPage} />
            <Route path='/profile' component={Profile} />
            <Route path='/composition' component={Composition} />
          </Switch>}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserFromLocalStorage: (token) => dispatch(getUserFromLocalStorage(token))
})

export default withRouter(connect(null, mapDispatchToProps)(App))
