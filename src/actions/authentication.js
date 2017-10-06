export const signIn = (data) => {
  return {
    type: "SIGN_IN",
    payload: data
  }
}

export const signOut = () => {
  return {
    type: "SIGN_OUT"
  }
}

export const register = (data) => {
  return {
    type: "REGISTER",
    payload: data
  }
}
