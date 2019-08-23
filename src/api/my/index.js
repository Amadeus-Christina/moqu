import axios from "../config.js"

export function myInformation(userId) {
  const url = "/api/user/myInformation"
  const data = {
    userId
  }
  return axios.post(url, data)
}

export function myAlbum(userId) {
  const url = "/api/user/myAlbum"
  const data = {
    userId
  }
  return axios.post(url, data)
}

export function findAllMemberCardPrice() {
  const url = "/api/memberCard/findAllMemberCardPrice"
  const data = {
  }
  return axios.post(url, data)
}


export function buyCard(userId, cardTypeId, buyMoney) {
  const url = "/api/memberCard/buyCard"
  const data = {
    userId,
    cardTypeId,
    buyMoney
  }
  return axios.post(url, data)
}

export function findPayPlan() {
  const url = "/api/payPlan/findPayPlan"
  const data = {
  }
  return axios.post(url, data)
}

export function intercommunication(userId, beAttentionUserId) {
  const url = "/api/user/intercommunication"
  const data = {
    userId,
    beAttentionUserId
  }
  return axios.post(url, data)
}
