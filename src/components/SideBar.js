import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveNotes } from '../actions/compositionActions'
import svg  from '../assets/images/play-button.svg'
import Tone from 'tone'
import { SampleLibrary } from '../modules/instruments/Tonejs-Instruments'

class SideBar extends Component {
  saveHandler = () => {
    this.props.saveNotes(this.props.currentComposition, this.props.tabNotes)
  }

  playHandler = () => {
    if (Tone.context.state !== 'running') {
      Tone.context.resume()
    }
    let guitar = SampleLibrary.load({
      instruments: "guitar-electric",
      baseUrl: "/tonejs-instruments/samples/"
    })
    console.log(guitar)
    Tone.Buffer.on('load', () => {
      guitar.release = 0.5
      guitar.toMaster()
      let notes = this.props.staffNotes.map(note => {
        let split = note.keys[0].split("/")
        let letterNote = split[0].charAt(0).toUpperCase() + split[0].slice(1)
        return letterNote + split[1]
      })
      console.log(notes)
      let seq = new Tone.Sequence(function(time, note){
      	guitar.triggerAttack(note, '4n', time)
      }, notes, "4n")
      Tone.Transport.start()
      seq.start(Tone.now())
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
