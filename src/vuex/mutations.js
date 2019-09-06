import {
  // RECORD_ADDRESS,
  SET_USER_INFO,

  CLICK_REPLY,
  POST_DETAILS,
  DYNAMIC_DETAILS,

  CALL,
  POSTIONING,
  IMGLIST,
  VIDEOLIST
} from './mutation-types'

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
  [SET_USER_INFO](state, obj) {
    state.userInfo = obj;
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
