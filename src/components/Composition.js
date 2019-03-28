import React from 'react';
import Score from './Score'
import NavBar from './NavBar'

class Composition extends React.Component {
  render() {
    return (
      <div className="page">
        <NavBar />
        <div id='editor'>
          <Score />
        </div>
      </div>
    )
  }
}

export default Composition
