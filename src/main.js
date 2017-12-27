// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// Axios:引入axios
import Axios from 'axios'
import Mint from 'mint-ui'
import Moment from 'moment'
import MyFooter from '@components/common/footer.vue'
import '@static/js/mock.js'
import '../static/js/global.js'
import 'mint-ui/lib/style.css'
import '@static/css/reset.css'
import '@static/css/iconfont.css'
import '@static/css/global.styl'
import '@static/css/style.styl'

import wcView from 'wc-view';
import 'wc-view/style.css';
Vue.use(wcView);

Vue.component('myFooter', MyFooter); // 使用要以my-Swipe
// 定义成全局组件或过滤器，大家都能使用 开始
Vue.filter('convertDate', function(value) {
    return Moment(value).format('YYYY-MM-DD');
});
Vue.use(Mint)
    // Axios:挂载原型
Vue.prototype.$ajax = Axios
Vue.prototype.$mint = Mint
    // Axios:默认配置
    // Axios.defaults.baseURL = 'http://localhost:8080/'
Axios.defaults.baseURL = ''
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Axios:拦截器操作loadding
Axios.interceptors.request.use(function(config) {
    // 显示图标
    Mint.Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    });
    return config;
});
Axios.interceptors.response.use(function(config) {
    // 隐藏图标
    Mint.Indicator.close();
    // 获取到config中的data，进行加工
    return config;
});
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: c => c(App)
})