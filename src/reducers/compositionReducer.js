const initialState = {
  tabNotes: Array.apply(null, Array(36)).map(() => ({ positions:[{str: 0, fret: ''}], duration: 'qr' })),
  staffNotes: Array.apply(null, Array(36)).map(() => ({clef: "treble", keys: ["b/4"], duration: "qr" })),
  keySig: 'C',
  timeSig: '4/4',
  currentComposition: null
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
    case 'SET_NOTES_AND_COMPOSITION': {
      return {
        ...state,
        currentComposition: action.payload.currentComposition,
        tabNotes: action.payload.tabNotes,
        staffNotes: action.payload.staffNotes
      }
    }
    case 'SETUP_EMPTY_COMPOSITION': {
      return { ...initialState, currentComposition: action.payload }
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
