import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { loadContext } from '../actions/compositionActions';
import Vex from 'vexflow';
import SVGInteraction from '../modules/SVGInteraction'
// import { getCoords } from '../modules/SVGInteraction'
// import * as d3 from "d3";

class Score extends Component {
  state = {
    clicked: false,
    current: { position: 0, stringNumber: 6}
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

    this.staffNotes = this.createNotesFromState(this.props.tabNotes)
    // Create a voice in 4/4 and add above notes
    this.staffVoice = new Vex.Flow.Voice({num_beats: 4,  beat_value: 4});
    this.staffVoice.addTickables(this.staffNotes);

    // Format and justify the notes to 400 pixels.
    this.staffFormatter = new Vex.Flow.Formatter().joinVoices([this.staffVoice]).format([this.staffVoice], 325)

    // Render voice
    this.staffVoice.draw(this.context, this.staff);

    this.staffNoteCoordsArr = this.staffNotes.map(note => {
      console.log(note.getBoundingBox())
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
  }

  drawRect = (noteCoord, tabCoord) => {
    // this.context.beginPath()
    // this.context.lineWidth = '1'
    // this.context.strokeStyle('grey')
    this.context.rect(noteCoord.left, tabCoord.top, noteCoord.right - noteCoord.left, tabCoord.bottom - tabCoord.top)
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
                   current: { position: noteIndex, stringNumber: tabIndex + 1}
                 }
               )
               console.log(this.state)
             }
           })
         }
       })
     } else {
       this.setState({ clicked: !this.state.clicked })
     }
   }

   // handleInput = (e, coords) => {
   //   this.context = this.renderer.getContext()
   //   this.editorBox = this.context.svg.lastChild
   //   this.staffNoteCoords.forEach(noteCoord => {
   //     if (!this.state.clicked ) {
   //       if (noteCoord.left < coords.x && coords.x < noteCoord.right) {
   //         this.tabStringCoords.forEach((tabCoord, index) => {
   //           if (tabCoord.top < coords.y && coords.y < tabCoord.bottom) {
   //
   //           }
   //         })
   //       }
   //     }
   //   })
   // }

   clearCanvas = () => {
     this.context.svg.remove()
   }

  createNotesFromState(tabNotes) {
    if (tabNotes.length < 1) {
      return [
        // A quarter-note rest. Note that the key (b/4) specifies the vertical
        // position of the rest.
        new Vex.Flow.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
        new Vex.Flow.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
        new Vex.Flow.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
        new Vex.Flow.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" })
      ]
    }
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

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(Score)
