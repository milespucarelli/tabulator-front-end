import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { setComposition } from '../actions/compositionActions'

class UserTab extends Component {
  clickHandler = () => {
    this.props.setComposition(this.props.composition)
    this.props.history.push(`/composition/${this.props.composition.id}`)
  }

  render() {
    let {title, artist} = this.props.composition
    return (
      <div className='userTab' >
        <h1 onClick={this.clickHandler}><a className='invert'>{title}</a></h1>
        <h4>{artist}</h4>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setComposition: () => dispatch(setComposition)
})

export default withRouter(connect(null, mapDispatchToProps)(UserTab));
