import React, { Component } from 'react';
import Vex from 'vexflow';

class Demo extends Component {
  clearCanvas = () => {
    this.context.svg.remove()
  }

  makeStaffNotes = (staffNotes) => {
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

  makeTabNotes = (tabNotes) => {
    return tabNotes.map(note => new Vex.Flow.TabNote(note))
  }

  drawStaffAndTab = () => {
    this.renderer = new Vex.Flow.Renderer(this.refs.demoCanvas, Vex.Flow.Renderer.Backends.SVG);
    this.renderer.resize(600, 480);
    this.context = this.renderer.getContext()
    let tabNoteArr = [
      { positions:[{str: 6, fret: '2'}], duration: 'q' },
      { positions:[{str: 6, fret: '2'}], duration: 'q' },
      { positions:[{str: 5, fret: '4'}], duration: 'q' },
      { positions:[{str: 6, fret: '2'}], duration: 'q' },
      { positions:[{str: 5, fret: '5'}], duration: 'q' },
      { positions:[{str: 6, fret: '2'}], duration: 'q' },
      { positions:[{str: 5, fret: '4'}], duration: 'q' },
      { positions:[{str: 6, fret: '2'}], duration: 'q' },
      { positions:[{str: 5, fret: '2'}], duration: 'q' },
      { positions:[{str: 6, fret: '5'}], duration: 'q' },
      { positions:[{str: 6, fret: '4'}], duration: 'q' },
      { positions:[{str: 6, fret: '5'}], duration: 'q' },
      { positions:[{str: 5, fret: '2'}], duration: 'q' },
      { positions:[{str: 6, fret: '5'}], duration: 'q' },
      { positions:[{str: 6, fret: '4'}], duration: 'q' },
      { positions:[{str: 6, fret: '0'}], duration: 'q' }
    ]
    let staffNoteArr = [
      { clef: 'treble', keys: ['f#/3'], duration: 'q' },
      { clef: 'treble', keys: ['f#/3'], duration: 'q' },
      { clef: 'treble', keys: ['c#/4'], duration: 'q' },
      { clef: 'treble', keys: ['f#/3'], duration: 'q' },
      { clef: 'treble', keys: ['d/4'], duration: 'q' },
      { clef: 'treble', keys: ['f#/3'], duration: 'q' },
      { clef: 'treble', keys: ['c#/4'], duration: 'q' },
      { clef: 'treble', keys: ['f#/3'], duration: 'q' },
      { clef: 'treble', keys: ['b/3'], duration: 'q' },
      { clef: 'treble', keys: ['a/3'], duration: 'q' },
      { clef: 'treble', keys: ['g#/3'], duration: 'q' },
      { clef: 'treble', keys: ['a/3'], duration: 'q' },
      { clef: 'treble', keys: ['b/3'], duration: 'q' },
      { clef: 'treble', keys: ['a/3'], duration: 'q' },
      { clef: 'treble', keys: ['g#/3'], duration: 'q' },
      { clef: 'treble', keys: ['e/3'], duration: 'q' }
    ]

    this.staffNotes = this.makeStaffNotes(staffNoteArr)
    this.tabNotes = this.makeTabNotes(tabNoteArr)
    let staff1 = new Vex.Flow.Stave(50, 0, 250)
        .addClef("treble")
        .addTimeSignature("4/4")
        .setContext(this.context)
        .draw()
    let tab1 = new Vex.Flow.TabStave(50, 80, 250)
        .addClef("tab")
        .setContext(this.context)
        .draw()
    let brace = new Vex.Flow.StaveConnector(staff1, tab1).setType(4)
    let lineRight = new Vex.Flow.StaveConnector(staff1, tab1).setType(0)
    let lineLeft = new Vex.Flow.StaveConnector(staff1, tab1).setType(1)
    brace.setContext(this.context).draw()
    lineRight.setContext(this.context).draw()
    lineLeft.setContext(this.context).draw()
    const startX = staff1.getNoteStartX()
    tab1.setNoteStartX(startX + 2)
    let tab1Notes = this.tabNotes.slice(0, 4)
    let staff1Notes = this.staffNotes.slice(0, 4)

    let staff2 = new Vex.Flow.Stave(300, 0, 250)
      .setContext(this.context)
      .draw()
    let tab2 = new Vex.Flow.TabStave(300, 80, 250)
      .setContext(this.context)
      .draw()
    let endLineRight = new Vex.Flow.StaveConnector(staff2, tab2).setType(6)
    endLineRight.setContext(this.context).draw()
    let tab2Notes = this.tabNotes.slice(4, 8)
    let staff2Notes = this.staffNotes.slice(4, 8)
    Vex.Flow.Formatter.FormatAndDrawTab(this.context, tab1, staff1, tab1Notes, staff1Notes, true)
    Vex.Flow.Formatter.FormatAndDrawTab(this.context, tab2, staff2, tab2Notes, staff2Notes, true)
    this.context.svg.removeChild(this.context.svg.lastChild)

    let staff3 = new Vex.Flow.Stave(50, 230, 250)
        .addClef("treble")
        .addTimeSignature("4/4")
        .setContext(this.context)
        .draw()
    let tab3 = new Vex.Flow.TabStave(50, 310, 250)
        .addClef("tab")
        .setContext(this.context)
        .draw()
    let brace2 = new Vex.Flow.StaveConnector(staff3, tab3).setType(4)
    let lineRight2 = new Vex.Flow.StaveConnector(staff3, tab3).setType(0)
    let lineLeft2 = new Vex.Flow.StaveConnector(staff3, tab3).setType(1)
    brace2.setContext(this.context).draw()
    lineRight2.setContext(this.context).draw()
    lineLeft2.setContext(this.context).draw()
    const startX2 = staff3.getNoteStartX()
    tab3.setNoteStartX(startX2 + 2)
    let tab3Notes = this.tabNotes.slice(8, 12)
    let staff3Notes = this.staffNotes.slice(8, 12)

    let staff4 = new Vex.Flow.Stave(300, 230, 250)
      .setContext(this.context)
      .draw()
    let tab4 = new Vex.Flow.TabStave(300, 310, 250)
      .setContext(this.context)
      .draw()
    let endLineRight2 = new Vex.Flow.StaveConnector(staff4, tab4).setType(6)
    endLineRight2.setContext(this.context).draw()
    let tab4Notes = this.tabNotes.slice(12, 16)
    let staff4Notes = this.staffNotes.slice(12, 16)
    Vex.Flow.Formatter.FormatAndDrawTab(this.context, tab3, staff3, tab3Notes, staff3Notes, true)
    Vex.Flow.Formatter.FormatAndDrawTab(this.context, tab4, staff4, tab4Notes, staff4Notes, true)
    this.context.svg.removeChild(this.context.svg.lastChild)
  }

  componentDidMount() {
    this.drawStaffAndTab()
  }

  render() {
    return (
      <div
        id="demo-canvas"
        ref="demoCanvas"
        className="canvas">
      </div>
    );
  }

}

export default Demo;
