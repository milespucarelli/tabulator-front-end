import React from 'react';
import { Dropdown, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logOut } from '../actions/userActions'
import 'semantic-ui-css/semantic.min.css';

const NavBar = (props) => {
  const signOut = () => {
    localStorage.removeItem('token')
    props.logOut()
    props.history.push('/')
  }
  const trigger = <Image avatar size='tiny' src={props.user.image}/>
  return (
    <div id='navbar'>
      <div id='banner-title'>
        <p>TABULATOR</p>
      </div>
      <div id='avatar-container'>
        <Dropdown trigger={trigger} pointing='top right' icon={null}>
          <Dropdown.Menu>
            <Dropdown.Item icon='sign-out' text='Sign Out' onClick={signOut}/>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({user: state.user.userInfo})

const mapDispatchToProps = (dispatch) => ({
  logOut: () => {
    return dispatch(logOut())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
