import Vue from 'vue'

// 动态加载components里面的组件添加在vue中，然后在main.js中直接引入即可
const componentContext = require.context('@/components', true, /\.vue$/)
componentContext.keys().forEach(component => {
    const componentConfig = componentContext(component).default
    Vue.component(componentConfig.name, componentConfig)
})
