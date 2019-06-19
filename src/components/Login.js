import React from 'react';
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

const Login = (props) => {
  const {email, password, error} = props
  return (
    <div id='login-card'>
      <div id='login-inner-card'>
        <h1 className='head'>Login</h1>
        { /*<form onSubmit={props.submitHandler}>
          <input
            className={error === 'Invalid username or password' ? 'invalid' : ''}
            id='email-input'
            type='email'
            name='email'
            value={email}
            placeholder='Email...'
            onChange={props.changeHandler}/><br/>
          <input
            className={error === 'Invalid username or password' ? 'invalid' : ''}
            id='username-input'
            type='password'
            name='password'
            value={password}
            placeholder='Password...'
            onChange={props.changeHandler}/><br/>
          {error === 'Invalid username or password' && <p className='error-text'>{error}</p>}
          <input type='submit' />
        </form> */ }
        <Form onSubmit={props.submitHandler}>
          <Form.Field>
            <input
              className='form-input'
              type='email'
              name='email'
              value={email}
              placeholder='Email...'
              onChange={props.changeHandler}
              error={error === 'Invalid username or password' ? true : undefined}/>
          </Form.Field>
          <Form.Field>
            <input
              className='form-input'
              type='password'
              name='password'
              value={password}
              placeholder='Password...'
              onChange={props.changeHandler}
              error={error === 'Invalid username or password' ? true : undefined}/>
          </Form.Field>
          <Button id='submit-button' type='submit'>Submit</Button>
        </Form>
        <p className='link-caption'>New to Tabulator?</p>
        <p id='link' onClick={props.clickHandler}>Sign Up!</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({error: state.user.error})

export default connect(mapStateToProps)(Login);
