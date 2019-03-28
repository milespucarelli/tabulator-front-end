import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import UserInfo from './UserInfo'
import TabContainer from './TabContainer'
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
                <UserInfo/>
                <TabContainer/>
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
