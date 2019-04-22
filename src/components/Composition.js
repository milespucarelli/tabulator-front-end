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
    const url = this.props.history.location.pathname
    const splitUrl = url.split('/')
    const compositionId = parseInt(splitUrl[splitUrl.length - 1])
    return (
      <div className="page">
        <NavBar />
        <div id='editor'>
          <SideBar />
          <Score compositionId={compositionId}/>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentComposition: (id) => dispatch(fetchCurrentComposition(id))
})

export default connect(null, mapDispatchToProps)(Composition)
