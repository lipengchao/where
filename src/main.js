/*
 * @Description: 
 * @Author: 雪中无处寻
 * @Date: 2020-05-24 14:14:21
 * @LastEditTime: 2020-05-24 14:44:44
 * @LastEditors: 雪中无处寻
 */ 
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'babel-polyfill'
import 'swiper/dist/css/swiper.css'
import axios from 'axios'

fastClick.attach(document.body)
Vue.prototype.$http = axios
Vue.use(VueAwesomeSwiper)


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
