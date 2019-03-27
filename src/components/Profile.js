import React, { Component } from 'react';
import NavBar from './NavBar'
import UserInfo from './UserInfo';
import '../styles/Profile.css'

class Profile extends Component {

  render() {
    return (
      <div id='page'>
        <NavBar />
        <div id='master-container'>
          <UserInfo/>
        </div>
      </div>
    );
  }

}

export default Profile;
