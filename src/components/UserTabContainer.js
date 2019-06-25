import React from 'react';
import { connect } from 'react-redux'
import UserTab from './UserTab';
import { Item } from 'semantic-ui-react'

const UserTabContainer = (props) => {
  let compositions = []
  if (props.userInfo) {
    compositions = props.userInfo.compositions.map(comp => <UserTab key={comp.id} composition={comp}/>)
  }
  return compositions.length > 0 ?
    <Item.Group id='user-tabs'>
      <h1>Your Compositions: </h1>
      {compositions}
    </Item.Group>:
    <div>
      <h1>You don't have any compositions yet!</h1>
      <h2>Create one above</h2>
    </div>
}

const mapStateToProps = (state) => ({ userInfo: state.user.userInfo})

export default connect(mapStateToProps)(UserTabContainer);
