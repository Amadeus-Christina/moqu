// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import {
  Tabbar, TabbarItem, Popup, Toast, Uploader, Button
} from 'vant'
Vue.use(Tabbar).use(TabbarItem).use(Popup).use(Toast).use(Uploader).use(Button);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
