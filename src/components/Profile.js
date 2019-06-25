import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import NavBar from './NavBar'
import UserInfo from './UserInfo'
import TabContainer from './TabContainer'
import TabDirections from './TabDirections';

class Profile extends Component {
  render() {
    if (this.props.currentComposition) {
      return <Redirect to={`/composition/${this.props.currentComposition.id}`}/>
    } else if (this.props.user) {
      return (<div className="page">
        <NavBar history={this.props.history}/>
        <div id='master-container'>
          <TabDirections />
          <TabContainer/>
          <UserInfo/>
        </div>
      </div>)
    } else {
      return <Redirect to='login' />
    }
  }
}

const mapStateToProps = (state) => (
  {
    user: state.user.userInfo,
    currentComposition: state.composition.currentComposition
  }
)

export default connect(mapStateToProps)(Profile)
