import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveNotes } from '../actions/compositionActions'
import svg from '../assets/images/play-button.svg'
import MIDISounds from 'midi-sounds-react'

class SideBar extends Component {
  componentDidMount() {
    this.midiSounds.cacheInstrument(335);
  }

  saveHandler = () => {
    this.props.saveNotes(this.props.currentComposition, this.props.tabNotes)
  }

  playHandler = () => {
    const strings = { '1': 64, '2': 59, '3': 55, '4': 50, '5': 45, '6': 40 }
    let beats = this.props.tabNotes.map(tabNote => {
      return tabNote.positions.map(position => {
        let {str, fret} = position
        if (fret !== '') {
          return strings[`${str}`] + parseInt(fret)
        } else {
          return 0
        }
      })
    })
    beats.forEach((beat, index) => {
      this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.25 * index, 335, beat, 0.50)
    })
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
       <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[335]} />
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
