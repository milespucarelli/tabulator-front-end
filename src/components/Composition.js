import React from 'react';
import { connect } from 'react-redux'
import { fetchCurrentComposition } from '../actions/compositionActions';
import Score from './Score'
import NavBar from './NavBar'
import SideBar from './SideBar'

class Composition extends React.Component {
  componentDidMount() {
    let url = this.props.history.location.pathname.split('/')
    this.props.fetchCurrentComposition(parseInt(url[url.length - 1]))
  }

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

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentComposition: (id) => dispatch(fetchCurrentComposition(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Composition)
