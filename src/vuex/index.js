import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	replyMessage:{},//点击回复
	postDetails:JSON.parse(localStorage.getItem('postDetails')),//帖子详情
	userInfo: null,//用户信息
	call:'',
	positioning:'',
	imgList:[],
	videoList:[],
	viewInfo: null
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})