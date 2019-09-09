import axios from "../config.js"

export function release(dt) {
  const url = "/api/post/release"
  const data = dt
  return axios.post(url, data)
}
export function wxConfig(localUrl) {
  const url = "api/post/res3"
  const data = {
    url:localUrl
  }
  return axios.post(url, data)
}

export function searchUserOrPost(searchCondition) {
  const url = "api/post/searchUserOrPost"
  const data = {
    searchCondition
  }
  return axios.post(url, data)
}

export function findPeriphery(lng, lat, address, content) {
  const url = "api/post/findPeriphery"
  const data = {
    lng, lat, address, content
  }
  return axios.post(url, data)
}

export function savePostDraft(dt) {
  const url = "/api/post/savePostDraft"
  const data = dt
  return axios.post(url, data)
}
// 发帖的时候回显草稿
export function findPostDraft(userId) {
  const url = "/api/post/findPostDraft"
  const data = {
    userId
  }
  return axios.post(url, data)
}