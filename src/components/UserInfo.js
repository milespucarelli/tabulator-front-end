import React from 'react';
import { connect } from 'react-redux'
// import { Card, Image } from 'semantic-ui-react'

const UserInfo = (props) => (
  // <Card>
  //   <Image src={props.user.image} />
  //   <Card.Content>
  //     <Card.Header>{props.user.username}</Card.Header>
  //     <Card.Description>{props.user.bio}</Card.Description>
  //   </Card.Content>
  // </Card>
  <div id='info-bar'>
    <div id='info-card'>
      <img className='user-avatar' src={props.user.image} alt=''/>
      <h1 className='username'>{props.user.username}</h1>
      <p className='bio'>{props.user.bio}</p>
    </div>
  </div>
)

const mapStateToProps = (state) => ({user: state.user.userInfo})

export default connect(mapStateToProps)(UserInfo)
