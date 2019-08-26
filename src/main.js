// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'

import {
  Tabbar, TabbarItem, Popup, Toast, Uploader, Button, Swipe, SwipeItem, Lazyload, Checkbox, CheckboxGroup
} from 'vant'
Vue.use(Tabbar).use(TabbarItem).use(Popup).use(Toast).use(Uploader).use(Button).use(Swipe).use(SwipeItem).use(Lazyload).use(Checkbox).use(CheckboxGroup);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
