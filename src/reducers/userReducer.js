const initialState = {
  userInfo: '',
  loading: false,
  error: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER_SUCCESS': {
      return {...state, userInfo: action.payload, loading: false}
    }
    case 'LOGIN_USER_ERROR': {
      return {...state, error: action.payload, loading: false}
    }
    case 'LOGIN_USER_PENDING': {
      return {...state, loading: true }
    }
    default:
      return state
  }
}

export default userReducer
