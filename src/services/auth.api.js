import axios from "axios"

const BASE_URL = process.env.BASE_API_URL

function signIn(body) {
  const promise = axios.post(`${BASE_URL}/sign-in`, body)
  return promise
}

function signUp(body) {
  const promise = axios.post(`${BASE_URL}/sign-up`, body)
  return promise
}

const apiAuth = { signIn, signUp }

export default apiAuth
