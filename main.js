import Vue from 'vue'
import App from './App'

// 网络请求模块
import { $http } from '@escook/request-miniprogram'

uni.$http=$http
$http.baseUrl='https://uinav.com/api/public/v1'
// $http.baseUrl='https://www.uinav.com'
// 请求拦截器
$http.beforeRequest=function(options){
  uni.showLoading({
    title:'数据加载中...'
  })
}

// 响应拦截器
$http.afterRequest=function(){
  uni.hideLoading()
}

//消息提示封装方法
uni.$showTips=function(title = '数据加载失败！', duration = 1500){
  uni.showToast({
        title,
        duration,
        icon: 'none',
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
