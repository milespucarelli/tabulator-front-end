import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import UserInfo from './UserInfo'
import TabContainer from './TabContainer'
import TabDirections from './TabDirections';
import '../styles/Profile.css'

class Profile extends Component {
  render() {
    return (
      <div className="page">
        { this.props.currentComposition ?
            this.props.history.push(`/composition/${this.props.currentComposition.id}`) :
            <>
              <NavBar />
              <div id='master-container'>
                <TabDirections />
                <TabContainer/>
                <UserInfo/>
              </div>
            </>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    currentComposition: state.composition.currentComposition
  }
)

export default connect(mapStateToProps)(Profile)
