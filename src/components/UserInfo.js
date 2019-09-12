import React from 'react';
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import {Image, Transformation} from 'cloudinary-react'


const UserInfo = (props) => (
  <div id='info-bar'>
    <Card id='info-card'>
      <div>
        <Image id='user-avatar' cloudName='tabulator' publicId={props.user.image} type='fetch'>
          <Transformation width="150" height="150" gravity="face:center" crop="thumb" />
        </Image>
      </div>
      <Card.Content>
        <Card.Header id='username'>{props.user.username}</Card.Header>
        <Card.Description className='bio'>{props.user.bio}</Card.Description>
      </Card.Content>
    </Card>
  </div>
)

// <div>
//   <img className='user-avatar' src={props.user.image} alt=''/>
//   <h1 className='username'>{props.user.username}</h1>
//   <p className='bio'>{props.user.bio}</p>
// </div>

const mapStateToProps = (state) => ({user: state.user.userInfo})

export default connect(mapStateToProps)(UserInfo)
