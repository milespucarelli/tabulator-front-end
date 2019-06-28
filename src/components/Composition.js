import React from 'react';
import { connect } from 'react-redux'
import Score from './Score'
import NavBar from './NavBar'
import SideBar from './SideBar'

class Composition extends React.Component {
  render() {
    let {title, artist} = this.props.currentComposition || ''
    return (
      <div className="page">
        <NavBar history={this.props.history}/>
        <div id='composition'>
          <div id='composition-banner'>
            <h1 id='comp-banner-text'>{title} - {artist}</h1>
          </div>
          <div id='editor'>
            <SideBar />
            <Score/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentComposition: state.composition.currentComposition
})

export default connect(mapStateToProps)(Composition)
