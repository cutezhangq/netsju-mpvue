import Vue from 'vue'
import App from './App'
// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(vant)


//  关闭Vue开发中的一些提示
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
