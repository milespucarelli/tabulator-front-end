import React from 'react';

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
        <h1 className='header'>Sign Up</h1>
        <form onSubmit={submitHandler}>
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
          <p className='link-caption'>Already a user?</p>
          <p id='link' onClick={clickHandler}>Log In!</p>
        </form>
      </div>
    </div>
  )
};

export default SignUp;
