import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createComposition } from '../actions/compositionActions'
import svg from '../assets/images/add.svg'

class NewTab extends Component {
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
      <div id='new-composition'>
        <h1 id='create-header'>Create A New Tab!</h1>
        {this.state.clicked ?
          <form onSubmit={this.submitHandler}>
            <div className='input-field'>
              <label>Title:</label>
              <input
                id='title-input'
                type='text'
                name='title'
                value={this.state.title}
                placeholder={'...'}
                onChange={this.changeHandler}/><br/>
            </div>
            <div className='input-field'>
              <label>Artist:</label>
                <input
                  id='artist-input'
                  type='text'
                  name='artist'
                  value={this.state.artist}
                  placeholder={`@${this.props.userInfo.username}`}
                  onChange={this.changeHandler}/><br/>
            </div>
            <input type='submit' />
          </form> :
          <img id='plus' alt='add' src={svg} onClick={this.clickHandler}/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ userInfo: state.user.userInfo})

const mapDispatchToProps = (dispatch) => ({
  createComposition: (title, artist, id) => dispatch(createComposition(title, artist, id))
})


export default connect(mapStateToProps, mapDispatchToProps)(NewTab);