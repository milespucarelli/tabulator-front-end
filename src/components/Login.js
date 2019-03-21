import React from 'react';
import { connect } from 'react-redux'

const Login = (props) => {
  const {email, password, error} = props
  return (
    <div id='login-card'>
      <div id='login-inner-card'>
        <h1 className='header'>Login</h1>
        <form onSubmit={props.submitHandler}>
          <input
            className={error === 'Invalid username or password' ? 'invalid' : ''}
            type='email'
            name='email'
            value={email}
            placeholder='Email...'
            onChange={props.changeHandler}/><br/>
          <input
            className={error === 'Invalid username or password' ? 'invalid' : ''}
            type='password'
            name='password'
            value={password}
            placeholder='Password...'
            onChange={props.changeHandler}/><br/>
          {error === 'Invalid username or password' && <p className='error-text'>{error}</p>}
          <input type='submit' />
        </form>
        <p className='link-caption'>New to Tabulator?</p>
        <p id='link' onClick={props.clickHandler}>Sign Up!</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({error: state.user.error})

export default connect(mapStateToProps)(Login);
