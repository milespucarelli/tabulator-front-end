import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Form, Message, Icon } from 'semantic-ui-react'

const SignUp = (props) => {
  const {
    username,
    email,
    password,
    bio,
    image,
    changeHandler,
    submitHandler,
    clickHandler
  } = props

  return (
    <div id='signup-card'>
      <div id='signup-inner-card'>
        <h1 className='head'>Sign Up</h1>
        {/* <form onSubmit={submitHandler}>
          <input
            id='username-input'
            type='text'
            name='username'
            value={username}
            placeholder='Username...'
            onChange={changeHandler}/><br/>
          <input
            id='email-input'
            type='email'
            name='email'
            value={email}
            placeholder='Email...'
            onChange={changeHandler}/><br/>
          <input
            id='password-input'
            type='password'
            name='password'
            value={password}
            placeholder='Password...'
            onChange={changeHandler}/><br/>
          <input
            id='avatar-input'
            type='text'
            name='image'
            value={image}
            placeholder='Image Link...'
            onChange={changeHandler}/><br/>
          <textarea
            id='bio'
            type='text'
            name='bio'
            value={bio}
            placeholder='Bio...'
            rows='5'
            onChange={changeHandler}></textarea>
          <input type='submit' />
        </form> */}
        <Form onSubmit={submitHandler}>
          <Form.Field>
            <input
              className='form-input'
              type='text'
              name='username'
              value={username}
              placeholder='Username...'
              onChange={changeHandler}/>
          </Form.Field>
          <Form.Field>
            <input
              className='form-input'
              type='email'
              name='email'
              value={email}
              placeholder='Email...'
              onChange={changeHandler} />
          </Form.Field>
          <Form.Field>
            <input
              className='form-input'
              type='password'
              name='password'
              value={password}
              placeholder='Password...'
              onChange={changeHandler}/>
          </Form.Field>
          <Form.Field>
            <input
              className='form-input'
              type='text'
              name='image'
              value={image}
              placeholder='Image Link...'
              onChange={changeHandler}/>
          </Form.Field>
          <Form.Field>
            <textarea
              className='form-input'
              type='text'
              name='bio'
              value={bio}
              placeholder='Bio...'
              rows='5'
              onChange={changeHandler}></textarea>
          </Form.Field>
          <Button id='submit-button' type='submit'>Submit</Button>
        </Form>
        <Message id='link-caption' className='form-message' compact size='mini'>
          <Icon name='help' />
          Already registered to <Link to='/'>Tabulator</Link>? <a onClick={clickHandler}> Log In!</a>
        </Message>
        {/* <p className='link-caption'>Already a user?</p>
        <p id='link' onClick={clickHandler}>Log In!</p> */}
      </div>
    </div>
  )
};

export default SignUp;
