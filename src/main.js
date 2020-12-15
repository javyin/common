import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入normalize.css
import 'normalize.css/normalize.css'

import './plugins/common'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
