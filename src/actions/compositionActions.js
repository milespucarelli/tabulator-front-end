export const setNotes = (tabNotes, staffNotes, str, fret, beat) => {
  let changed = false
  const newTabNotes = tabNotes.map((note, index) => {
    if (index !== beat) {
      return note
    } else {
      let newPositions = note.positions.map(position => {
        if (position.str === str || position.str === 0) {
          changed = true
          return {str: str, fret: fret}
        } else {
          return position
        }
      })
      if (!changed) newPositions.push({str: str, fret: fret})
      return { positions: newPositions, duration: 'q'}
    }
  })

  const newStaffNotes = newTabNotes.map((note, index) => {
    if (index !== beat) {
      return staffNotes[index]
    } else {
      let keys = note.positions.map(position => convertTabToNote(position.str, position.fret))
      return {clef: "treble", keys: keys, duration: "q" }
    }
  })

  // const newStaffNotes = staffNotes.map((note, index) => {
  //   if (index !== beat) {
  //     return note
  //   } else {
  //     if (note.duration.includes('r')) {
  //       return { clef: 'treble', keys: [convertTabToNote(str, fret)], duration: 'q' }
  //     } else if (changed) {
  //       const newKeys = note.keys.slice(0, note.keys - 2)
  //       return { clef: 'treble', keys: [...newKeys, convertTabToNote(str, fret)], duration: 'q' }
  //     } else {
  //       const newKeys = [...note.keys, convertTabToNote(str, fret)]
  //       return { clef: 'treble', keys: newKeys, duration: 'q' }
  //     }
  //   }
  // })

  return {
    type: 'SET_NOTES',
    payload: {tabNotes: newTabNotes, staffNotes: newStaffNotes}
  };
};

export const setTimeSig = (timeSig) => {
  return {
    type: 'SET_TIME_SIG',
    timeSig
  };
};

export const setKeySig = (keySig) => {
  return {
    type: 'SET_KEY_SIG',
    keySig
  };
};

function convertTabToNote(str, fret) {
  const TUNING = ['e/5', 'b/4', 'g/4', 'd/4', 'a/3', 'e/3']
  const NOTES = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']

  let stringNote = TUNING[str - 1].split('/')
  let currentNote = stringNote[0]
  let currentOctave = parseInt(stringNote[1])
  let noteIndex = NOTES.findIndex(note => currentNote === note)
  for (let i = 0; i < fret; i++) {
    if (noteIndex === NOTES.length - 1) {
      noteIndex = 0
      currentOctave++
    } else {
      noteIndex++
    }
    currentNote = NOTES[noteIndex]
  }

  return [currentNote, currentOctave].join('/')
}
