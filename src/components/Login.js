import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form, Message, Icon } from 'semantic-ui-react'

const Login = (props) => {
  const {email, password, error} = props
  console.log(error)
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
        <Form onSubmit={props.submitHandler} error={error !== 'must log in'}>
          <Form.Field error={error !== 'must log in'}>
            <input
              className='form-input'
              type='email'
              name='email'
              value={email}
              placeholder='Email...'
              onChange={props.changeHandler}/>
          </Form.Field>
          <Form.Field error={error !== 'must log in'}>
            <input
              className='form-input'
              type='password'
              name='password'
              value={password}
              placeholder='Password...'
              onChange={props.changeHandler}/>
          </Form.Field>
          <Message
            className='form-message'
            compact
            hidden={error === 'must log in'}
            error={error !== 'must log in'}
            size='mini'
            header={error}/>
          <Button id='submit-button' type='submit'>Submit</Button>
        </Form>
        <Message id='link-caption' className='form-message' compact size='mini'>
          <Icon name='help' />
          New to <Link to='/'>Tabulator</Link>? <a onClick={props.clickHandler}> Sign Up!</a>
        </Message>
        {/*<p className='link-caption'>New to Tabulator?</p>
        <p id='link' onClick={props.clickHandler}>Sign Up!</p>*/}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({error: state.user.error})

export default connect(mapStateToProps)(Login);
