import React from 'react';
import { connect } from 'react-redux'

const UserInfo = (props) => (
  <div id='info-bar'>
    <div id='info-card'>
      <img className='avatar' src={props.user.image} alt=''/>
      <h1 className='username'>{props.user.username}</h1>
      <p className='bio'>{props.user.bio}</p>
    </div>
  </div>
)

const mapDispatchToProps = (state) => ({user: state.user.userInfo})

export default connect(mapDispatchToProps)(UserInfo)
