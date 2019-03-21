const initialState = {
  tabNotes: [],
  staffNotes: [],
  keySig: 'C',
  timeSig: '4/4'
}

const compositionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TAB_NOTES': {
      return { ...state, tabNotes: action.payload }
    }
    case 'SET_STAFF_NOTES': {
      return { ...state, staffNotes: action.playload }
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
