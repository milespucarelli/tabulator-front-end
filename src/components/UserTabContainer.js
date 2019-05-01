import React from 'react';
import { connect } from 'react-redux'
import UserTab from './UserTab';

const UserTabContainer = (props) => {
  let compositions = []
  if (props.userInfo) {
    compositions = props.userInfo.compositions.map(comp => <UserTab key={comp.id} composition={comp}/>)
  }
  return (
    <div id='user-tabs'>
      <h1>Your Compositions: </h1>
      {compositions}
    </div>
  );
}

const mapStateToProps = (state) => ({ userInfo: state.user.userInfo})

export default connect(mapStateToProps)(UserTabContainer);
