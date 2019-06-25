import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import NavBar from './NavBar'
import TabDirections from './TabDirections';
import TabContainer from './TabContainer'
import UserInfo from './UserInfo'

class Profile extends Component {
  render() {
    return this.props.user ?
      <div className="page">
        <NavBar history={this.props.history}/>
        <div id='master-container'>
          <TabDirections />
          <TabContainer/>
          <UserInfo/>
        </div>
      </div> :
      <Redirect to='login' />
  }
}

const mapStateToProps = (state) => (
  {
    user: state.user.userInfo
  }
)

export default connect(mapStateToProps)(Profile)
