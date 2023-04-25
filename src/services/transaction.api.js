import axios from "axios"

function postTransaction(body, token, type) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const promise = axios.post(
    `${process.env.REACT_APP_BASE_URL}/new-transaction/${type}`,
    body,
    config
  )
  return promise
}

function getTransaction(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const promise = axios.get(
    `${process.env.REACT_APP_BASE_URL}/transactions`,
    config
  )
  return promise
}

const apiTransaction = { getTransaction, postTransaction }

export default apiTransaction
