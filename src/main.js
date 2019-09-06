// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './vuex/index'
// 防止点击相同的路由报错
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import animated from 'animate.css'
import {
  Tabbar,
  TabbarItem,
  Toast, Checkbox,
  CheckboxGroup, RadioGroup,
  Radio, DatetimePicker, Popup,
  Button, Overlay, Uploader, Swipe, SwipeItem, Loading, ActionSheet,
  Lazyload, Image, Progress, Icon, NoticeBar, Cell, CellGroup
} from 'vant'
Vue.use(animated)
  .use(Toast).use(Tabbar).use(TabbarItem).use(Checkbox).use(CheckboxGroup).use(RadioGroup).use(Radio).use(DatetimePicker)
  .use(Popup).use(Button).use(Overlay).use(Uploader).use(Swipe).use(Loading)
  .use(SwipeItem).use(ActionSheet).use(Lazyload).use(Image).use(Progress).use(Icon).use(NoticeBar).use(Cell).use(CellGroup);


import Cookies from 'js-cookie'


Vue.prototype.$Cookies = Cookies
Vue.prototype.$webUrl = 'https://www.moqushequ.com/'

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
