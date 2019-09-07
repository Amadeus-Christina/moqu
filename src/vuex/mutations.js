import {
  // RECORD_ADDRESS,
  SET_USER_INFO,
  GET_USER_INFO,

  SET_VIEW_INFO,
  GET_VIEW_INFO,

  CLICK_REPLY,
  POST_DETAILS,
  DYNAMIC_DETAILS,

  CALL,
  POSTIONING,
  IMGLIST,
  VIDEOLIST
} from './mutation-types'

import {myInformation} from "@/api/my/index.js"

export default {
  // 记录当前经度纬度
  // [RECORD_ADDRESS](state, {
  //   latitude,
  //   longitude
  // }) {
  //   state.latitude = latitude;
  //   state.longitude = longitude;
  // },
  // 存入本人信息
  [SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  // 获取本人信息
  [GET_USER_INFO](state) {
    return state.userInfo
  },

  // 存入访问人信息
  [SET_VIEW_INFO](state, userInfo) {
    state.viewInfo = userInfo
  },
  // 获取访问人信息
  [GET_VIEW_INFO](state) {
    return state.viewInfo
  },


  [CLICK_REPLY](state, clickUser) {
    state.replyMessage = clickUser
  },
  [POST_DETAILS](state, detailsObject) {
    state.postDetails = detailsObject
  },
  [DYNAMIC_DETAILS](state, dynamicDetails) {
    state.dynamicDetails = dynamicDetails
  },
  [CALL](state, value) {
    state.call = value
  },
  [POSTIONING](state, value) {
    state.positioning = value
  },
  [IMGLIST](state, value) {
    state.imgList = value
  },
  [VIDEOLIST](state, value) {
    state.videoList = value
  }


}
