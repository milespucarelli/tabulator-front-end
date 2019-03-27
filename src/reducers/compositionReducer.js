const initialState = {
  tabNotes: [
    { positions:[{str: 0, fret: ''}], duration: 'qr' },
    { positions:[{str: 0, fret: ''}], duration: 'qr' },
    { positions:[{str: 0, fret: ''}], duration: 'qr' },
    { positions:[{str: 0, fret: ''}], duration: 'qr' }
  ],
  staffNotes: [
    {clef: "treble", keys: ["b/4"], duration: "qr" },
    {clef: "treble", keys: ["b/4"], duration: "qr" },
    {clef: "treble", keys: ["b/4"], duration: "qr" },
    {clef: "treble", keys: ["b/4"], duration: "qr" }
  ],
  keySig: 'C',
  timeSig: '4/4'
}

const compositionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTES': {
      return {
        ...state,
        tabNotes: action.payload.tabNotes,
        staffNotes: action.payload.staffNotes
      }
    }
    case 'SET_KEY_SIG': {
      return { ...state, keySig: action.payload }
    }
    case 'SET_TIME_SIG': {
      return { ...state, timeSig: action.payload }
    }
    default:
      return state
  }
}

export default compositionReducer
