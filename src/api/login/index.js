import axios from "../config.js"

// 微信授权登录后是否需要完善信息
export function judgeIsNeedPerfect(userId) {
  const url = "/api/user/judgeIsNeedPerfect"
  const data = {
    userId
  }
  return axios.post(url, data)
}
// 查询匿名信息
export function queryAnonymous(id) {
  const url = "/api/user/queryAnonymous"
  const data = {
    id
  }
  return axios.post(url, data)
}
// 完善信息
export function userRegistration(realNickName, sex, age, constellation, personInformation, adjectiveId, nameId, headImg, userId) {
  const url = "/api/user/userRegistration"
  const data = {
    realNickName,
    sex,
    age,
    constellation,
    personInformation,
    adjectiveId,
    nameId,
    headImg,
    userId
  }
  return axios.post(url, data)
}
