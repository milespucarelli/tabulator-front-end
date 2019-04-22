const setupEmptyComposition = (composition) => ({ type: 'SETUP_EMPTY_COMPOSITION', payload: composition })
const setCurrentComposition = (composition) => ({ type:'SET_CURRENT_COMPOSITION', payload: composition})

export const setNotes = (tabNotes, staffNotes, str, fret, beat) => {
  let string = ((str - 1) % 6) + 1
  let changed = false
  const newTabNotes = tabNotes.map((note, index) => {
    if (index !== beat) {
      return note
    } else {
      let newPositions = note.positions.map(position => {
        if (position.str === string || position.str === 0) {
          changed = true
          return {str: string, fret: fret}
        } else {
          return position
        }
      })
      if (!changed) newPositions.push({str: string, fret: fret})
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

  // if (position.str !== 0) {
  //   return convertTabToNote(position.str, position.fret))
  // } else {
  //   return {['b/4']}
  // }

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

export const fetchCurrentComposition = (compositionId) => {
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/compositions/${compositionId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => dispatch(setCurrentComposition(data.composition)))
      .catch(console.error)
  }
}

const setNotesFromFetch = (composition) => {
  const tabNotes = composition.notes.map(note => {
    let positions = composition.positions.find(position => position.note_id === note.id )
    let newPositions = positions.map(position => {
      if (position.fret) {
        return {str: position.str, fret: parseInt(position.fret)}
      } else {
        return {str: position.str, fret: position.fret}
      }
    })
    return { positions: newPositions, duration: note.duration }
  })

  const staffNotes = tabNotes.map(note => {
    let keys = note.positions.map(position => {
      if (position.str !== 0) {
        return convertTabToNote(position.str, position.fret)
      } else {
        return ['b/4']
      }
    })
    return {clef: "treble", keys: keys, duration: note.duration }
  })

  return {
    type: 'SET_NOTES',
    payload: {tabNotes: tabNotes, staffNotes: staffNotes}
  }
}

export const createComposition = (title, artist, user_id) => {
  return (dispatch) => {
    fetch("http://localhost:3000/api/v1/compositions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify(
        {
          composition:
          {
            title,
            artist,
            user_id
          }
        })
    })
      .then(res => res.json())
      .then(data => dispatch(setupEmptyComposition(data.composition)))
      .catch(console.error)
  }
}

export const fetchNotes = (composition) => {
  return (dispatch) => {
    if (composition) {
      return (dispatch) => {
        fetch(`http://localhost:3000/api/v1/compositions/${composition.id}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            accepts: "application/json"
          }
        })
          .then(res => res.json())
          .then(data => dispatch(setNotesFromFetch(data.composition)))
          .catch(console.error)
      }
    }
  }
}

export const saveNotes = (composition, tabNotes) => {
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/compositions/${composition.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify(
        {
          composition:
          {
            tabNotes
          }
        })
    })
      .then(res => res.json())
      .then(data => dispatch(setupEmptyComposition(data.composition)))
      .catch(console.error)
  }
}

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
