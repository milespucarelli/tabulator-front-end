import React, { Component } from 'react';
import { connect } from 'react-redux'
import { saveNotes } from '../actions/compositionActions';
import svg  from '../assets/images/play-button.svg'
import MidiWriter from 'midi-writer-js'

class SideBar extends Component {
  saveHandler = () => {
    this.props.saveNotes(this.props.currentComposition, this.props.tabNotes)
  }



  playHandler = () => {
    let track = new MidiWriter.Track();
    let notes = this.props.staffNotes.map(note => {
      let pitches = note.keys.map(key => {
        let split = key.split("/")
        let letterNote = split[0].charAt(0).toUpperCase() + split[0].slice(1)
        return letterNote + split[1]
      })
      return new MidiWriter.NoteEvent({pitch: pitches, duration: this.convertDuration(note.duration)})
    })
    track.addEvent(notes, function(event, index) {
      return {sequential:true}
    })
    let write = new MidiWriter.Writer(track)
    console.log(write.dataUri())
  }

  convertDuration = (duration) => {
    switch (duration) {
      case 'q':
        return '4'
      default:
        return ''
    }
  }

  render() {
    return (
      <div id='sidebar'>
       <button id='save' onClick={this.saveHandler}>Save</button><br/><br/>
       <img id='play' src={svg} alt='play' onClick={this.playHandler}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentComposition: state.composition.currentComposition,
  tabNotes: state.composition.tabNotes,
  staffNotes: state.composition.staffNotes
})

const mapDispatchToProps = (dispatch) => ({
  saveNotes: (composition, tabNotes) => {
    return dispatch(saveNotes(composition, tabNotes))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
