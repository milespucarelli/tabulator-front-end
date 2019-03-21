import React, { Component } from 'react';
import UserInfo from './UserInfo';
import '../styles/Profile.css'

class Profile extends Component {

  render() {
    return (
      <div id='page'>
        <UserInfo/>
      </div>
    );
  }

}

export default Profile;
