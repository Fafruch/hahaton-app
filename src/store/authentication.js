const INITIAL_STATE = {
  signedIn: false,
  username: ''
}

const authentication = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, signedIn: true, username: action.payload.username }
    case "SIGN_OUT":
      return { ...state, signedIn: false, username: '' }
    case "REGISTER":
      return { ...state, signedIn: true, username: action.payload.username }
    default:
      return state
  }
}

export default authentication
