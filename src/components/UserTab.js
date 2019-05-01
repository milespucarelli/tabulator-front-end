import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserTab extends Component {

  render() {
    let {id, title, artist} = this.props.composition
    return (
      <div className='userTab' >
        <h1><Link to={`/composition/${id}`}>{title}</Link></h1>
        <h4>{artist}</h4>
      </div>
    );
  }

}

export default UserTab;
