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

export function addAttention(userId, followedId) {
  const url = "/api/user/addAttention"
  const data = {
    userId,
    followedId
  }
  return axios.post(url, data)
}

export function cancelAttention(userId, followedId) {
  const url = "/api/user/cancelAttention"
  const data = {
    userId,
    followedId
  }
  return axios.post(url, data)
}

export function videoAuthentication(videoUrl, userId, imgUrl) {
  const url = "/api/identityAuthentication/videoAuthentication"
  const data = {
    videoUrl,
    userId,
    imgUrl
  }
  return axios.post(url, data)
}


export function uploadWordImg(file) {
  const url = "/admin/adminUpload/uploadWordImg"
  const data = {
    file
  }
  return axios.post(url, data)
}

export function updateCoverImage(userId, coverImage) {
  const url = "/api/user/updateCoverImage"
  const data = {
    userId,
    coverImage
  }
  return axios.post(url, data)
}

export function carAuthentication(frontCardPhone, frontDrivingCard, backDrivingCard, frontLicensePlatePhone,
                                  userId, carMedalId, carModel, carAuthenticationId) {
  const url = "/api/identityAuthentication/carAuthentication"
  const data = {
    frontCardPhone,
    frontDrivingCard,
    backDrivingCard,
    frontLicensePlatePhone,
    userId,
    carMedalId,
    carModel,
    carAuthenticationId
  }
  return axios.post(url, data)
}

export function findAllCarMedal() {
  const url = "/api/identityAuthentication/findAllCarMedal"
  const data = {
  }
  return axios.post(url, data)
}

export function myCarManagement(userId) {
  const url = "/api/identityAuthentication/myCarManagement"
  const data = {
    userId
  }
  return axios.post(url, data)
}


export function userOrCancel(userCarMedalId) {
  const url = "/api/identityAuthentication/userOrCancel"
  const data = {
    userCarMedalId
  }
  return axios.post(url, data)
}

export function uqueryDealerByUserId(userId) {
  const url = "/api/post/queryDealerByUserId"
  const data = {
    userId
  }
  return axios.post(url, data)
}


export function queryMyPromotion(userId) {
  const url = "/api/user/queryMyPromotion"
  const data = {
    userId
  }
  return axios.post(url, data)
}

export function identityAuthentication(identityIdentification, realName, telephone, userId, carNum, position,
                                       professionalCertificate, frontCard, backCard, handCard) {
  const url = "/api/identityAuthentication/identityAuthentication"
  const data = {
    identityIdentification, realName, telephone, userId, carNum, position,
    professionalCertificate, frontCard, backCard, handCard
  }
  return axios.post(url, data)
}

export function queryPromotionDetail() {
  const url = "/api/post/queryPromotionDetail"
  const data = {
  }
  return axios.post(url, data)
}

export function againAuthentication(carAuthenticationId) {
  const url = "/api/identityAuthentication/againAuthentication"
  const data = {
    carAuthenticationId
  }
  return axios.post(url, data)
}

export function addDealer(userId) {
  const url = "/api/post/addDealer"
  const data = {
    userId
  }
  return axios.post(url, data)
}

export function paymentOrder(userId, money, payPlanId) {
  const url = "/api/payPlan/paymentOrder"
  const data = {
    userId,
    money,
    payPlanId
  }
  return axios.post(url, data)
}






