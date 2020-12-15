import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//  可以动态加载modules,新增module之后不需要重新引入
//  require.context可以传入三个参数，1-文件路径 2-是否查找子目录 3-正则匹配要引入的文件
const moduleContext = require.context('./modules', false, /\.js$/)
const modules = {}
moduleContext.keys().forEach(module => {
    modules[module.replace(/(\.\/|\.js)/g, '')] = moduleContext(module).default
})

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules
})
