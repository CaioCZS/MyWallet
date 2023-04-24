import axios from "axios"

function signIn(body) {
  const promise = axios.post(`${process.env.REACT_APP_BASE_URL}/sign-in`, body)
  return promise
}

function signUp(body) {
  const promise = axios.post(`${process.env.REACT_APP_BASE_URL}/sign-up`, body)
  return promise
}

const apiAuth = { signIn, signUp }

export default apiAuth
