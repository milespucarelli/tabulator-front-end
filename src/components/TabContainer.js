import React, { Component } from 'react';
import NewTab from './NewTab'
import UserTabContainer from './UserTabContainer'

class TabContainer extends Component {
  render() {
    return (
      <div id='tab-container'>
        <NewTab />
        <UserTabContainer />
      </div>
    );
  }
}

export default TabContainer
