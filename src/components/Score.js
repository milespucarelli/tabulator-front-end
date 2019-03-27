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

  componentDidMount() {
    // this.redraw();
    this.renderer = new Vex.Flow.Renderer(this.refs.canvas, Vex.Flow.Renderer.Backends.SVG);
    this.renderer.resize(500, 500);
    this.context = this.renderer.getContext()
    this.staff = new Vex.Flow.Stave(10, 40, 400)
      .addClef("treble")
      .addTimeSignature("4/4")
      .setContext(this.context)
      .draw()
    this.tab = new Vex.Flow.TabStave(10, 120, 400)
      .addClef("tab")
      .setContext(this.context)
      .draw()

    this.staffNotes = this.createStaffNotesFromState(this.props.staffNotes)
    // Create a voice in 4/4 and add above notes
    // this.staffVoice = new Vex.Flow.Voice({num_beats: 4,  beat_value: 4});
    // this.staffVoice.addTickables(this.staffNotes);

    // // Format and justify the notes to 400 pixels.
    // this.staffFormatter = new Vex.Flow.Formatter().joinVoices([this.staffVoice]).format([this.staffVoice], 325)

    // Render voice

    const startX = this.staff.getNoteStartX()
    this.tab.setNoteStartX(startX + 2)

    this.tabNotes = this.createTabNotesFromState(this.props.tabNotes)

    // this.tabVoice = new Vex.Flow.Voice({num_beats: 4,  beat_value: 4});
    // this.tabVoice.addTickables(this.tabNotes);
    // this.formatter = new Vex.Flow.Formatter().joinVoices([this.staffVoice]).format([this.staffVoice, this.tabVoice], 325)

    Vex.Flow.Formatter.FormatAndDrawTab(this.context, this.tab, this.staff, this.tabNotes, this.staffNotes, true)

    // this.staffVoice.draw(this.context, this.staff);
    //
    // this.tabVoice.draw(this.context, this.tab);

    // Vex.Flow.Formatter.FormatAndDraw(this.context, this.tab, this.tabNotes)

    this.staffNoteCoordsArr = this.staffNotes.map(note => {
      return note.getBoundingBox()
    })
    this.staffNoteCoords = this.staffNoteCoordsArr.map(note => {
      return {
        left: note.x,
        right: note.x + note.w
      }
    })
    this.tabStringCoords = [
      {top: 165, bottom: 178},
      {top: 178, bottom: 191},
      {top: 191, bottom: 204},
      {top: 204, bottom: 218},
      {top: 218, bottom: 230},
      {top: 230, bottom: 243}
    ]

    this.drawRect(this.staffNoteCoords[0], this.tabStringCoords[this.tabStringCoords.length - 1])

    this.interaction = new SVGInteraction(this.refs.canvas.children[0])
    this.interaction.addEventListener('hover', this.handleHover)
    this.interaction.addEventListener('touchStart', this.handleClick)
    window.addEventListener('keydown', this.handleInput)
  }

  componentDidUpdate() {
    this.context = this.renderer.getContext()
    this.clearCanvas()
    this.drawStaffAndTab()
  }

  drawStaffAndTab = () => {
    this.renderer = new Vex.Flow.Renderer(this.refs.canvas, Vex.Flow.Renderer.Backends.SVG);
    this.renderer.resize(500, 500);
    this.context = this.renderer.getContext()
    this.staff = new Vex.Flow.Stave(10, 40, 400)
      .addClef("treble")
      .addTimeSignature("4/4")
      .setContext(this.context)
      .draw()
    this.tab = new Vex.Flow.TabStave(10, 120, 400)
      .addClef("tab")
      .setContext(this.context)
      .draw()

    this.staffNotes = this.createStaffNotesFromState(this.props.staffNotes)
    // Create a voice in 4/4 and add above notes
    // this.staffVoice = new Vex.Flow.Voice({num_beats: 4,  beat_value: 4});
    // this.staffVoice.addTickables(this.staffNotes);

    // // Format and justify the notes to 400 pixels.
    // this.staffFormatter = new Vex.Flow.Formatter().joinVoices([this.staffVoice]).format([this.staffVoice], 325)

    // Render voice

    const startX = this.staff.getNoteStartX()
    this.tab.setNoteStartX(startX + 2)

    this.tabNotes = this.createTabNotesFromState(this.props.tabNotes)

    // this.tabVoice = new Vex.Flow.Voice({num_beats: 4,  beat_value: 4});
    // this.tabVoice.addTickables(this.tabNotes);
    // this.formatter = new Vex.Flow.Formatter().joinVoices([this.staffVoice]).format([this.staffVoice, this.tabVoice], 325)

    Vex.Flow.Formatter.FormatAndDrawTab(this.context, this.tab, this.staff, this.tabNotes, this.staffNotes, true)

    // this.staffVoice.draw(this.context, this.staff);
    //
    // this.tabVoice.draw(this.context, this.tab);

    // Vex.Flow.Formatter.FormatAndDraw(this.context, this.tab, this.tabNotes)

    this.staffNoteCoordsArr = this.staffNotes.map(note => {
      return note.getBoundingBox()
    })
    this.staffNoteCoords = this.staffNoteCoordsArr.map(note => {
      return {
        left: note.x,
        right: note.x + note.w
      }
    })
    this.tabStringCoords = [
      {top: 165, bottom: 178},
      {top: 178, bottom: 191},
      {top: 191, bottom: 204},
      {top: 204, bottom: 218},
      {top: 218, bottom: 230},
      {top: 230, bottom: 243}
    ]

    this.drawRect(this.staffNoteCoords[this.state.current.beat], this.tabStringCoords[this.state.current.str - 1])

    this.interaction = new SVGInteraction(this.refs.canvas.children[0])
    this.interaction.addEventListener('hover', this.handleHover)
    this.interaction.addEventListener('touchStart', this.handleClick)
    window.addEventListener('keydown', this.handleInput)
  }

  drawRect = (noteCoord, tabCoord) => {
    // this.context.beginPath()
    // this.context.lineWidth = '1'
    // this.context.strokeStyle('grey')
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
       this.staffNoteCoords.forEach((noteCoord, noteIndex) => {
         if (noteCoord.left < coords.x && coords.x < noteCoord.right) {
           this.tabStringCoords.forEach((tabCoord, tabIndex) => {
             if (tabCoord.top < coords.y && coords.y < tabCoord.bottom) {
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
         this.props.setNotes(this.props.tabNotes, this.props.staffNotes, this.state.current.str, parseInt(e.key), this.state.current.beat)
        //  var notes = [
        //    new Vex.Flow.TabNote({
        //    positions: [],
        //    duration: "qr"}),
        //   new Vex.Flow.TabNote({
        //     positions: [{str: 2, fret: 10},
        //                 {str: 3, fret: 9}],
        //     duration: "q"})
        //   .addModifier(new Vex.Flow.Bend("Full"), 1),
        //
        //   // A single note with a harsh vibrato
        //   new Vex.Flow.TabNote({
        //     positions: [{str: 2, fret: 5}],
        //     duration: "h"})
        //   .addModifier(new Vex.Flow.Vibrato().setHarsh(true).setVibratoWidth(70), 0)
        // ]
       }
     }

   clearCanvas = () => {
     this.context.svg.remove()
   }

  createStaffNotesFromState(staffNotes) {
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

  createTabNotesFromState(tabNotes) {
    return tabNotes.map(note => new Vex.Flow.TabNote(note))
  }

  render() {
    return (
      <div
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
