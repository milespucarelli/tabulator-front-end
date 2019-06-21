import React, { Component } from 'react';
import { getUserFromLogin, createUser } from '../actions/userActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Login from './Login';
import SignUp from './SignUp';
import '../styles/Login.css'

class LoginSignupPage extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    bio: '',
    image: '',
    clicked: this.props.history.location.pathname === '/login',
    invalid: ''
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  loginSubmitHandler = (e) => {
    e.preventDefault()
    const {email, password} = this.state
    this.props.getUserFromLogin({email, password})
  }

  clickHandler = () => {
    this.state.clicked ?
      this.props.history.push('/signup') :
      this.props.history.push('/login')
    this.setState(
      {
        email: '',
        username: '',
        password: '',
        bio: '',
        image: '',
        clicked: !this.state.clicked
      })
  }

  signUpSubmitHandler = (e) => {
    e.preventDefault()
    const {email, username, password, image, bio} = this.state
    return this.props.createUser({email, username, password, image, bio})
  }

  render() {
    let {
      email,
      username,
      password,
      image,
      bio,
      clicked
    } = this.state

    let {
      changeHandler,
      loginSubmitHandler,
      signUpSubmitHandler,
      clickHandler
    } = this

    return (
      <div id='background'>
        <div className='overlay'>
          { this.props.user ?
            <Redirect to='/profile' /> :
            clicked ?
            <Login
              email={email}
              password={password}
              changeHandler={changeHandler}
              submitHandler={loginSubmitHandler}
              clickHandler={clickHandler}/> :
            <SignUp
              email={email}
              username={username}
              password={password}
              image={image}
              bio={bio}
              changeHandler={changeHandler}
              submitHandler={signUpSubmitHandler}
              clickHandler={clickHandler}/>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({user: state.user.userInfo})

const mapDispatchToProps = (dispatch) => ({
  getUserFromLogin: (state) => dispatch(getUserFromLogin(state)),
  createUser: (state) => dispatch(createUser(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignupPage)
