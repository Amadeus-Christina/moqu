import axios from "../config.js"

export function myAttention(userId) {
  const url = "/api/user/myAttention"
  const data = {
    userId
  }
  return axios.post(url, data)
}

export function myFans(userId) {
  const url = "/api/user/myFans"
  const data = {
    userId
  }
  return axios.post(url, data)
}
