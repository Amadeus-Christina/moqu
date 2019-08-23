import {
  SET_USER_INFO
} from './mutation-types.js'

export default {
  // 存入本人信息
  [SET_USER_INFO](state, obj) {
    state.userInfo = obj;
  },

}
