import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
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
    this.props.createComposition(this.state.title, this.state.artist, this.props.userInfo.id)
  }

  render() {
    /*<form onSubmit={this.submitHandler}>
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
    </form> */
    return (
      <div id='new-composition'>
        <h1 id='create-header'>Create A New Tab!</h1>
        {this.state.clicked ?
          <Form
            onSubmit={this.submitHandler}
            size='small'
            style={{margin: '0 15%'}}>
            <Form.Field inline width='16'>
              <label>Title:</label>
              <input
                id='title-input'
                className='form-input'
                type='text'
                name='title'
                value={this.state.title}
                placeholder='...'
                onChange={this.changeHandler}/>
            </Form.Field>
            <Form.Field inline width='16'>
              <label>Artist:</label>
              <input
                id='artist-input'
                className='form-input'
                type='text'
                name='artist'
                value={this.state.artist}
                placeholder={`@${this.props.userInfo.username}`}
                onChange={this.changeHandler}/>
            </Form.Field>
            <Button id='submit-button' type='submit'>Create</Button>
          </Form>:
          <img id='plus' alt='add' src={svg} onClick={this.clickHandler}/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    userInfo: state.user.userInfo,
    currentComposition: state.composition.currentComposition
  }
)

const mapDispatchToProps = (dispatch) => ({
  createComposition: (title, artist, id) => dispatch(createComposition(title, artist, id))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewTab));
