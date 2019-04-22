import React, { Component } from 'react';
import { connect } from 'react-redux'
import { saveNotes } from '../actions/compositionActions';

class SideBar extends Component {
  clickHandler = () => {
    this.props.saveNotes(this.props.currentComposition, this.props.tabNotes)
  }

  playHandler = () => {
    // var voice = create_4_4_voice().addTickables(notes);
    // var vexWriter = new MidiWriter.VexFlow();
    // var track = vexWriter.trackFromVoice(voice);
    // var writer = new MidiWriter.Writer([track]);
    // console.log(writer.dataUri());
  }

  render() {
    return (
      <div id='sidebar'>
       <button id='save' onClick={this.clickHandler}>Save</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentComposition: state.composition.currentComposition,
  tabNotes: state.composition.tabNotes
})

const mapDispatchToProps = (dispatch) => ({
  saveNotes: (composition, tabNotes) => {
    return dispatch(saveNotes(composition, tabNotes))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
