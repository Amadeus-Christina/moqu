
import {
  SET_USER_INFO,
  GET_USER_INFO,
  SET_VIEW_INFO,
  GET_VIEW_INFO
} from './mutation-types.js'

import { myInformation } from "@/api/my/index.js"

export default {
  setUserInfo(context, userId) {
    return new Promise(resolve => {
      myInformation(userId).then(res => {
        if (res.code == 200) {
          context.commit(SET_USER_INFO, res.data)
          resolve()
        }
      })
    })

  },
  getUserInfo(context) {
    context.commit(GET_USER_INFO)
  },
  setViewInfo(context, userId) {
    return new Promise((resolve) => {
      myInformation(userId).then(res => {
        if (res.code == 200) {
          context.commit(SET_VIEW_INFO, res.data)
          resolve()
        }
      })
    })

  },
  getViewInfo(context) {
    context.commit(GET_VIEW_INFO)
  },
}