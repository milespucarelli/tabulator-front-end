import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { setComposition } from '../actions/compositionActions'
import { Item, Segment } from 'semantic-ui-react'

class UserTab extends Component {
  clickHandler = () => {
    this.props.setComposition(this.props.composition)
    this.props.history.push(`/composition/${this.props.composition.id}`)
  }

  render() {
    let {title, artist} = this.props.composition
    return (
      <Segment className='userTab'>
        <Item>
          <Item.Header
            as='h1'
            onClick={this.clickHandler}>
              <a className='invert'>{title}</a>
          </Item.Header>
          <Item.Meta as='h3'>{artist}</Item.Meta>
        </Item>
      </Segment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setComposition: () => dispatch(setComposition)
})

export default withRouter(connect(null, mapDispatchToProps)(UserTab));
