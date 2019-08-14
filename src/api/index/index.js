import axios from "../config.js"

export function login(username, password) {
  const url = "/login"
  const data = {
    username,
    password
  }
  return axios.post(url, data)
}
