import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveNotes } from '../actions/compositionActions'
import playSvg from '../assets/images/play-button.svg'
import pauseSvg from '../assets/images/pause-button.svg'
import MIDISounds from 'midi-sounds-react'

class SideBar extends Component {
  state = {
    clicked: false
  }

  componentDidMount() {
    this.midiSounds.cacheInstrument(335);
  }

  saveHandler = () => {
    this.props.saveNotes(this.props.currentComposition, this.props.tabNotes)
  }

  playHandler = () => {
    if (this.state.clicked) {
      this.midiSounds.stopPlayLoop()
		  this.midiSounds.beatIndex = 0
    } else {
      const strings = { '1': 64, '2': 59, '3': 55, '4': 50, '5': 45, '6': 40 }
      let beats = this.props.tabNotes.map(tabNote => {
        let positions = tabNote.positions.map(position => {
          let {str, fret} = position
          if (fret !== '') {
            return strings[`${str}`] + parseInt(fret)
          } else {
            return 0
          }
        })
        if (positions.includes(0)) {
          return [[], [[335, [], 1/4]]]
        } else {
          return [[], [[335, positions, 1/4]]]
        }
      })
      // beats.forEach((beat, index) => {
      //   if (!beat.includes(0)) {
      //     this.midiSounds.playChordAt(this.midiSounds.contextTime() + 0.25 * index, 335, beat, 0.50)
      //   }
      // })
      this.midiSounds.startPlayLoop(beats, 260, 1/4, this.midiSounds.beatIndex)
    }
    this.setState({clicked: !this.state.clicked})
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
       <img
         id='play'
         src={this.state.clicked ? pauseSvg : playSvg}
         alt='play'
         onClick={this.playHandler}/>
       <MIDISounds
         ref={(ref) => (this.midiSounds = ref)}
         appElementName="root"
         instruments={[335]} />
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
