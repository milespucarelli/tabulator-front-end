import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setNotes } from '../actions/compositionActions';
import Vex from 'vexflow';
import SVGInteraction from '../modules/SVGInteraction'
// import { getCoords } from '../modules/SVGInteraction'
// import * as d3 from "d3";

class Score extends Component {
  state = {
    clicked: false,
    current: { beat: 0, str: 6 }
  }

  drawRect = (noteCoord, tabCoord) => {
    this.context.rect(noteCoord.left, tabCoord.top, 12, 15)
  }

  handleHover = (e, coords) => {
    this.context = this.renderer.getContext()
    this.staffNoteCoords.forEach(noteCoord => {
      if (!this.state.clicked ) {
        if (noteCoord.left < coords.x && coords.x < noteCoord.right) {
          this.tabStringCoords.forEach((tabCoord, index) => {
            if (tabCoord.top < coords.y && coords.y < tabCoord.bottom) {
              this.context.svg.removeChild(this.context.svg.lastChild)
              this.drawRect(noteCoord, tabCoord)
            }
          })
        }
      }
    })
  }

  handleClick = (e, coords) => {
    if (!this.state.clicked) {
      this.tabStringCoords.forEach((tabCoord, tabIndex) => {
        if (tabCoord.top < coords.y && coords.y < tabCoord.bottom) {
          console.log(this.tabStringCoords)
          this.staffNoteCoords.forEach((noteCoord, noteIndex) => {
            if (noteCoord.left < coords.x && coords.x < noteCoord.right && parseInt(tabIndex / 6) === parseInt(noteIndex / 12)) {
              this.setState(
                {
                  clicked: !this.state.clicked,
                  current: { beat: noteIndex, str: tabIndex + 1}
                }
              )
            }
          })
        }
      })
    } else {
      this.setState({ clicked: !this.state.clicked })
    }
  }

  handleInput = (e) => {
    if (this.state.clicked) {
      console.log(e.key)
      this.props.setNotes(
        this.props.tabNotes,
        this.props.staffNotes,
        this.state.current.str,
        parseInt(e.key),
        this.state.current.beat
      )
    }
  }

  clearCanvas = () => {
    this.context.svg.remove()
  }

  createStaffNotesFromState = (staffNotes) => {
    return staffNotes.map(note => {
      let vfNote = new Vex.Flow.StaveNote(note)
      note.keys.forEach((key, index) => {
        if (key.includes('#')) {
          vfNote.addAccidental(index, new Vex.Flow.Accidental("#"))
        }
      })
      return vfNote
    })
  }

  createTabNotesFromState = (tabNotes) => {
    return tabNotes.map(note => new Vex.Flow.TabNote(note))
  }

  drawStaffAndTab = () => {
    this.renderer = new Vex.Flow.Renderer(this.refs.canvas, Vex.Flow.Renderer.Backends.SVG);
    this.renderer.resize(1000, 750);
    this.context = this.renderer.getContext()
    this.staffNotes = this.createStaffNotesFromState(this.props.staffNotes)
    this.tabNotes = this.createTabNotesFromState(this.props.tabNotes)
    this.staffNoteCoords = []

    let x = 30, y = 40, w = 320

    for (let i = 0; i < 9; i++) {
      let staff = null
      let tab = null
      if (i % 3 === 0) {
        staff = new Vex.Flow.Stave(x, y, w)
          .addClef("treble")
          .addTimeSignature("4/4")
          .setContext(this.context)
          .draw()
        tab = new Vex.Flow.TabStave(x, y + 80 , w)
          .addClef("tab")
          .setContext(this.context)
          .draw()
        const startX = staff.getNoteStartX()
        tab.setNoteStartX(startX + 2)
      } else {
        staff = new Vex.Flow.Stave(x, y, w)
          .setContext(this.context)
          .draw()
        tab = new Vex.Flow.TabStave(x, y + 80 , w)
          .setContext(this.context)
          .draw()
      }
      let noteIndex = i * 4
      let tabNotes = this.tabNotes.slice(noteIndex, noteIndex + 4)
      let staffNotes = this.staffNotes.slice(noteIndex, noteIndex + 4)
      Vex.Flow.Formatter.FormatAndDrawTab(this.context, tab, staff, tabNotes, staffNotes, true)
      if (i % 3 !== 0) {
        this.context.svg.removeChild(this.context.svg.lastChild)
      }
      staffNotes.map(note => {
        const bbox = note.getBoundingBox()
        this.staffNoteCoords.push({ left: bbox.x, right: bbox.x + bbox.w })
        return ''
      })
      x += 320
      if ((i + 1) % 3 === 0) {
        x = 30
        y += 225
      }
    }

    this.tabStringCoords = [
      {top: 165, bottom: 178},
      {top: 178, bottom: 191},
      {top: 191, bottom: 204},
      {top: 204, bottom: 218},
      {top: 218, bottom: 230},
      {top: 230, bottom: 243}
    ]

    this.tabStringCoords = this.tabStringCoords.concat([...this.tabStringCoords].map(coord => (
      { top: coord.top + 225, bottom: coord.bottom + 225 }
    )))

    this.tabStringCoords = this.tabStringCoords.concat([...this.tabStringCoords.slice(6, 12)].map(coord => (
      { top: coord.top + 225, bottom: coord.bottom + 225 }
    )))

    this.drawRect(this.staffNoteCoords[this.state.current.beat], this.tabStringCoords[this.state.current.str - 1])

    this.interaction = new SVGInteraction(this.refs.canvas.children[0])
    this.interaction.addEventListener('hover', this.handleHover)
    this.interaction.addEventListener('touchStart', this.handleClick)
    window.addEventListener('keydown', this.handleInput)

    // Create a voice in 4/4 and add above notes
    // this.staffVoice = new Vex.Flow.Voice({num_beats: 4,  beat_value: 4});
    // this.staffVoice.addTickables(this.staffNotes);
    //
    // // Format and justify the notes to 400 pixels.
    // this.staffFormatter = new Vex.Flow.Formatter().joinVoices([this.staffVoice]).format([this.staffVoice], 325)
    //
    // Render voice
    //
    // this.tabVoice = new Vex.Flow.Voice({num_beats: 4,  beat_value: 4});
    // this.tabVoice.addTickables(this.tabNotes);
    // this.formatter = new Vex.Flow.Formatter().joinVoices([this.staffVoice]).format([this.staffVoice, this.tabVoice], 325)
    //
    // this.staffVoice.draw(this.context, this.staff);
    //
    // this.tabVoice.draw(this.context, this.tab);
    //
    // Vex.Flow.Formatter.FormatAndDraw(this.context, this.tab, this.tabNotes)
  }

  componentDidMount() {
    this.drawStaffAndTab()
  }

  componentDidUpdate() {
    this.context = this.renderer.getContext()
    this.clearCanvas()
    this.drawStaffAndTab()
  }

  render() {
    return (
      <div
        id="score"
        ref="canvas"
        className="canvas">
      </div>
    )
  }
}

const mapStateToProps = (state) => ({tabNotes: state.composition.tabNotes, staffNotes: state.composition.staffNotes})

const mapDispatchToProps = (dispatch) => ({
  setNotes: (tabNotes, staffNotes, str, fret, beat) => {
    return dispatch(setNotes(tabNotes, staffNotes, str, fret, beat))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Score)
