// const webpack = require('webpack')
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                // scss样式预加载到全局，可以直接在vue组件中调用
                additionalData: `@import "@/assets/styles/_variables.scss";`
            }
        }
    }
}
