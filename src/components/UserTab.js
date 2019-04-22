import React, { Component } from 'react';

class UserTab extends Component {

  render() {
    return (
      <div>
        <h1>{this.props.composition.title}</h1>
        <h4>{this.props.composition.artist}</h4>
      </div>
    );
  }

}

export default UserTab;
