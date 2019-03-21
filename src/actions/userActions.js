const loginUserSuccess = (user) => ({ type: 'LOGIN_USER_SUCCESS', payload: user })
const loginUserError = (error) => ({ type: 'LOGIN_USER_ERROR', payload: error })
const loginUserPending = () => ({ type: 'LOGIN_USER_PENDING' })

export const getUserFromLocalStorage = token => {
  return (dispatch) => {
    dispatch(loginUserPending())
    fetch("http://localhost:3000/api/v1/get_user", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          dispatch(loginUserError(data.error))
        } else {
          dispatch(loginUserSuccess(data.user))
        }
      })
      .catch(console.error)
  }
}

export const getUserFromLogin = (loginObj) => {
  return (dispatch) => {
    dispatch(loginUserPending())
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({user: loginObj})
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          dispatch(loginUserError(data.error))
        } else {
          localStorage.setItem("token", data.jwt)
          dispatch(loginUserSuccess(data.user))
        }
      })
      .catch(console.error)
  }
}

export const createUser = (signupObj) => {
  return (dispatch) => {
    dispatch(loginUserPending())
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({user: signupObj})
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          dispatch(loginUserError(data.error))
        } else {
          localStorage.setItem("token", data.jwt)
          dispatch(loginUserSuccess(data.user))
        }
      })
      .catch(console.error)
  }
}
