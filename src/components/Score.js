import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setNotes, loadNotes, fetchCurrentComposition } from '../actions/compositionActions';
import Vex from 'vexflow';
import SVGInteraction from '../modules/SVGInteraction'

class Score extends Component {
  state = {
    clicked: false,
    current: { beat: 0, str: 6 }
  }

  drawRect = (noteCoord, tabCoord) => {
    this.context.rect(noteCoord.right - 15, tabCoord.top, 15, 15)
  }

  handleHover = (e, coords) => {
    this.context = this.renderer.getContext()
    this.staffNoteCoords.forEach(noteCoord => {
      if (!this.state.clicked) {
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
      if (!isNaN(parseInt(e.key)) && e.code.includes('Digit')) {
        this.props.setNotes(
          this.props.tabNotes,
          this.props.staffNotes,
          this.state.current.str,
          parseInt(e.key),
          this.state.current.beat
        )
      } else if (e.key === 'Backspace') {
        this.props.setNotes(
          this.props.tabNotes,
          this.props.staffNotes,
          this.state.current.str,
          '',
          this.state.current.beat
        )
      }
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

    let x = 15, y = 0, w = 320
    for (let i = 0; i < 8; i++) {
      let staff = new Vex.Flow.Stave(x, y, w)
      let tab = new Vex.Flow.TabStave(x, y + 80 , w)
      if (i % 3 === 0) {
        staff.addClef("treble").addTimeSignature("4/4")
        tab.addClef("tab")
        staff.setContext(this.context).draw()
        tab.setContext(this.context).draw()
        let brace = new Vex.Flow.StaveConnector(staff, tab).setType(4)
        let lineRight = new Vex.Flow.StaveConnector(staff, tab).setType(0)
        let lineLeft = new Vex.Flow.StaveConnector(staff, tab).setType(1)
        brace.setContext(this.context).draw()
        lineRight.setContext(this.context).draw()
        lineLeft.setContext(this.context).draw()
        const startX = staff.getNoteStartX()
        tab.setNoteStartX(startX + 2)
      } else {
        staff.setContext(this.context).draw()
        tab.setContext(this.context).draw()
        let lineRight = new Vex.Flow.StaveConnector(staff, tab).setType(i === 7 ? 6 : 0)
        lineRight.setContext(this.context).draw()
      }
      let noteIndex = i * 4
      let tabNotes = this.tabNotes.slice(noteIndex, noteIndex + 4)
      let staffNotes = this.staffNotes.slice(noteIndex, noteIndex + 4)
      Vex.Flow.Formatter.FormatAndDrawTab(this.context, tab, staff, tabNotes, staffNotes, true)
      if (i % 3 !== 0) {
        this.context.svg.removeChild(this.context.svg.lastChild)
      }
      staffNotes.forEach(note => {
        if (note.attrs.el.children[0].classList.contains('vf-note')) {
          const bbox = note.getBoundingBox()
          this.staffNoteCoords.push({ left: bbox.x, right: bbox.x + bbox.w })
        }
        return ''
      })
      x += 320
      if ((i + 1) % 3 === 0) {
        x = 15
        y += 225
      }
    }

    this.tabStringCoords = [
      {top: 125, bottom: 138},
      {top: 138, bottom: 151},
      {top: 151, bottom: 164},
      {top: 164, bottom: 178},
      {top: 178, bottom: 190},
      {top: 190, bottom: 203}
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

    // var voice = create_4_4_voice().addTickables(notes);
    //
    // var vexWriter = new MidiWriter.VexFlow();
    // var track = vexWriter.trackFromVoice(voice);
    // var writer = new MidiWriter.Writer([track]);
    // console.log(writer.dataUri());

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
    if (this.props.currentComposition) {
      this.clearCanvas()
      this.props.loadNotes(this.props.currentComposition)
      this.drawStaffAndTab()
    } else {
      let id = window.location.pathname.split('/').pop()
      this.props.fetchCurrentComposition(id)
    }
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

const mapStateToProps = (state) => (
  {
    tabNotes: state.composition.tabNotes,
    staffNotes: state.composition.staffNotes,
    currentComposition: state.composition.currentComposition
  }
)

const mapDispatchToProps = (dispatch) => ({
  setNotes: (tabNotes, staffNotes, str, fret, beat) => {
    return dispatch(setNotes(tabNotes, staffNotes, str, fret, beat))
  },
  loadNotes: (composition) => {
    return dispatch(loadNotes(composition))
  },
  fetchCurrentComposition: (id) => {
    return dispatch(fetchCurrentComposition(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Score)
