import Vue from 'vue'
import App from './App'
// 阿里图标库
import '../static/iconfont/iconfont.css'


//引入store
import store from './store/index'
Vue.prototype.$store = store;

//  关闭Vue开发中的一些提示
Vue.config.productionTip = false
App.mpType = 'app'


const app = new Vue(App)
app.$mount()
