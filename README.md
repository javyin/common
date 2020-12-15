# 常用代码，配置

## WebApp自适应

如果需要样式根据视口大小来调整宽度，可以使用 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)

### 安装

```bash
npm install -D postcss-px-to-viewport
```

### 使用

在项目根目录创建文件 **postcss.config.js**

```js
// postcss.config.js
module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            // 这里就是配置项
            unitToConvert: 'px',
            viewportWidth: 750,  // 设计稿视口宽度
            unitPrecision: 5,
            propList: ['*'],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            // 需要忽略的css选择器，包含'ignore'的所有类名的样式都不会被转换
            selectorBlackList: ['ignore'],  
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: [/(\/|\\)(node_modules)(\/|\\)/]
            // landscape: false, // 横屏配置
            // landscapeUnit: 'vw',
            // landscapeWidth: 568
        }
    }
}
```



## SASS应用

前端小伙伴们都知道写css代码是多么繁琐且无聊，所以现在基本都是使用预处理器来书写样式。

这里就介绍一下sass的使用。

### 安装

```bash
npm install sass sass-loader -D
```

### 使用

用vue项目来介绍一下sass的使用

```scss
// src/assets/styles/_variables.scss

// 我们可以在这个文件中定义一些项目中需要用到的常量

$header-height: 50px;
$footer-height: 100px;
$primary-color: #9acd32;
$font-main-color: #333;
$border-color: #e6e6e6;
$s: 14px;
$m: 16px;
$l: 20px;

$width-small: 320px;
$width-medium: 375px;
$width-large: 414px;

$height-small: 667px;
$height-medium: 736px;
$height-large: 812px;

```

这个文件，我们一般都是在哪个组件中使用， 就引入到哪个组件中的样式文件中，但是这样就会非常麻烦，每个需要用到的组件中使用都要引用一次，做了太多重复的事情，我们可以在`vue.config.js`中配置一下，那就可以在项目中所有的scss文件中使用`_variables.scss`中定义好的变量。

```js
// vue.config.js

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                // 这里可以将一些配置项传给sass-loader
                
                // 下面配置可以把_variables.scss文件在项目构建的时候引入到项目中
                additionalData: `@import '@/assets/styles/_variables.scss';`
            }
        }
    }
}
```

### mixin的用法

mixin，我们可以把它当做一个函数来看待，使用方法也很像函数，下面举个例子：

```scss
// 这里定义了border-radius方法
@mixin border-radius($radius) {
    -webkit-border-radius: $radius;
       -moz-border-radius: $radius;
    	-ms-border-radius: $radius;
    		border-radius: $radius;
}

.box {
    //  这里使用，用include关键字来使用
    @include border-radius(10px);
}
```

还有另一种用法，

```scss
// 这里定义了border-radius方法
@mixin border-radius($media) {
    //  可以加入判断
    @if $media == small-screen {
        @content;
    } @else {
        -webkit-border-radius: 10px;
       	   -moz-border-radius: 10px;
    		-ms-border-radius: 10px;
    			border-radius: 10px;
    }
}

.box {
    @include border-radius(large-screen) {
        -webkit-border-radius: 5px;
       	   -moz-border-radius: 5px;
    		-ms-border-radius: 5px;
    			border-radius: 5px;
    }
}
```

上面两种方法编译后的css样式如下:

```css
.box {
    -webkit-border-radius: 10px;
       -moz-border-radius: 10px;
    	-ms-border-radius: 10px;
    		border-radius: 10px;
}

```



## webpack的require.context

同样是以vue项目为例。

现在开发都讲究组件化思想，vue项目也不例外，下面是vue项目的目录结构。

```bash
vue-project/src
|--assets
|--components
|	|--Layout
|	|	|--index.vue
|	|--Header
|	|	|-index.vue
|	|--Hello.vue
|--plugins
|	|--common.js
|--store
|	|--modules
|	|	|--user.js
|	|	|--cart.js
|	|	|--items.js
|	|--index.js
|--views
|--router
|--api
|--utils
|--config
|--main.js
|--app.vue
```

### 动态挂载组件

如果components目录中的组件比较多，且经常复用，每次新增一个组件还需要另外去挂载到vue实例中，比较麻烦且会增加项目体积。所以可以使用require.context来有效的动态挂载组件。

```js
// plugins/common.js

import Vue from 'vue'

// require.context返回的是webpack式的上下文，它有id,keys,resolve等方法
// 											目录路径   是否查找子目录   正则匹配
const componentContext = require.context('@/components', true, /\.vue$/)

// keys方法执行后返回的是符合“'@/components', true, /\.vue$/”条件的文件的路径组成的数组
componentContext.keys().forEach(component=>{
    
    // 当上下文环境传入某个文件路径，就会得到一个标准的es module，使用.default便能返回一个对应模块
    const componentConfig = componentContext(component).default
    
    // Vue.component('组件标签名', 组件)，这里挂载全局组件
    Vue.component(componentConfig.name, componentConfig)
})
```

配置完了之后，在main.js中引入即可

```js
// main.js

import './plugins/common.js'
```

### 动态加载vuex的modules

另外，如果项目达到一定的体量，就会需要用到较多的module,这个时候也可以使用require.context来动态加载，那就省事不少了，不需要每加一个module还得手动去加上，实现代码如下：

```js
// store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 动态加载modules
const moduleContext = require.context('./modules', false, /\.js$/)
const modules = {}
moduleContext.keys().forEach(module =>{
    modules[module.replace(/(\.\/|\.js/g, '')] = moduleContext(module).default
})

export default new Vuex.Store({
    state: {},
    actions: {},
    mutations: {},
    modules
})
```

