import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logOut } from '../actions/userActions'

const NavBar = (props) => {
  const profile = () => {
    props.history.push('/profile')
  }
  const signOut = () => {
    localStorage.removeItem('token')
    props.logOut()
    props.history.push('/')
  }
  const trigger = <Image avatar size='tiny' src={props.user.image}/>
  return (
    <div id='navbar'>
      <div id='banner-title'>
        <Link to='/'><p>TABULATOR</p></Link>
      </div>
      <div id='avatar-container'>
        <Dropdown trigger={trigger} pointing='top right' icon={null}>
          <Dropdown.Menu>
            <Dropdown.Item icon='user circle' text='Profile' onClick={profile}/>
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
