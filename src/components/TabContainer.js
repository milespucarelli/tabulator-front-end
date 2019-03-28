import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createComposition } from '../actions/compositionActions'

class TabContainer extends Component {
  state = {
    clicked: false,
    title: '',
    artist: ''
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  clickHandler = () => {
    this.setState({clicked: !this.state.clicked})
  }

  submitHandler = (e) => {
    e.preventDefault()
    console.log(this.props)
    this.props.createComposition(this.state.title, this.state.artist, this.props.userInfo.id)
  }

  render() {
    return (
      <div id='tab-container'>
        <div id='new-composition'>
          {this.state.clicked ?
            <form onSubmit={this.submitHandler}>
              <p>Create a New Tab!</p>
              <label>
                Title:
                <input
                  name='title'
                  value={this.state.title}
                  placeholder="Like 'MY NEW FAV RIFF'... "
                  onChange={this.changeHandler}/><br/>
              </label>
              <label>
                Artist:
                <input
                  name='artist'
                  value={this.state.artist}
                  placeholder="Will default to username "
                  onChange={this.changeHandler}/><br/>
              </label>
              <input type='submit' />
            </form> :
            <div id='new-composition-button' onClick={this.clickHandler}><p id='plus'>+</p></div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    userInfo: state.user.userInfo
  }
)

const mapDispatchToProps = (dispatch) => ({
  createComposition: (title, artist, id) => dispatch(createComposition(title, artist, id))
})


export default connect(mapStateToProps, mapDispatchToProps)(TabContainer)
