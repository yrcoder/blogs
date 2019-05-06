# vue

```js
this instanceof Vue
function initMixin (Vue: Class<Component>) {}
function (options?: Object){}
Object.defineProperty()
Object.defineProperty(Vue.prototype, '$data', dataDef)
```

# vue-cli 中加入 vuex，mock，axios

## 写在前面

改建一个 vue 脚手架项目也不像我想的那么简单。按照碰坑的顺序说吧。这篇总论写怎么安装各个模块，使用的话每个都分写到独立的文章。

## nrm

首先是下载脚手架及各种安装包。npm 那个慢哟，让我一度感觉我的流程出了错误。
然后，听说有个 nrm。以前用的 cnpm 让我知道，改变了就不能用 npm 这个命令了，我很疑惑。然而好像除了这个，用各种镜像好像都依然使用 npm 这个命令。

```sh
$ npm install -g nrm
$ nrm ls
$ nrm use taobao
```

然后再用 npm 命令，就更改了下载包的地址了。

## eslint

eslint 脚手架里带的与我的风格有些出入，然后我就直接替换了配置文件，这时，报错。最后解决的方法是配置里的项语法错了。贴上 [eslint 的地址](http://eslint.cn/docs/rules/) 以防以后还会出错。

编辑器格式化的风格也不是我想要的，这时需更改编辑器的配置文件，老实说，配置的是啥，我也不知道，大神给个文件直接替换就行了。

## less-loader

要想在项目中使用 less，还要加入 less 模块。恐怕 webpack 的配置还有各种未知的坑。如，怎么配置服务器的代理？让 localhost 测试和后端服务器连接。

关于 less-loader 的配置，cli 已经在 `build/utils` 里配置过了，只需下载对应的模块就能用了。

```sh

$ npm install less --save-dev
$ npm install less-loader --save-dev
```

## vuex

new 一个 store 实例对象，嵌入到 vue 实例中。

```js
// store/index
import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations, actions, getters } from './global'

//引入各个模块的store
import home from './partial/home'

Vue.use(Vuex)

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules: {
		home,
	},
})

// main.js
import store from './store'

new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>',
})
```

## vue-router

vue-router 的安装同 vuex 一样。New 一个 router 实例，设置各种配置。然后把配置好的实例写入到 vue 对象中。它的配置是各种路由的映射数组。vuex 的配置是一个对象，里面是 state，mutation，action，getters，modules(好像 modules 中的 state 同 组件中的 date 类似，都是一个函数 return 一个对象)。

```js
// router/index
import Vue from 'vue'
import Router from 'vue-router'

// 引入各个模块的路由设置，应是一个对象
import home from './home'

Vue.use(Router)

const routes = [...home]

export default new Router({
	routes,
	linkActiveClass: 'active',
})
```

## axios

axios 的安装不同于 vuex 和 vue-router，它直接引用就可以了。

```js
// axios/index
import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$http = axios

axios.defaults.headers.post['Content-Type']
    = 'application/x-www-form-urlencoded'

// 请求拦截器
axios.interceptors.request.use(config => config, error => Promise.reject(error))

// 响应拦截器
axios.interceptors.request.use(
    response => response,
    error => Promise.reject(error)
)

export default axios

// 将 axios 引入到 main.js 中在组件中直接 this.$http.get() 调用 axios 的方法就可以了。

// main.js
import '@/axios'

// 组件
this.$http.post('/test').then(r => console.log(r))

// 或者，你在 vuex 引入 axios 然后直接用对应的方法。
// 注意：vuex 中能否使用，跟组件中能否使用是相互独立的。即vuex中不能使用 this.$http

// store下面的模块
import Ajax from '@/axios'

export default {
    name: 'home',
    actions: {
        getModuleTest({ commit }) {
            Ajax.get('/test').then(r => {
            })
        }
    }
}

```

## mock

mock 这个东西比较神奇。不知道是 mock 的作用，还是 axios 拦截器的作用，总之，只要配置对应的 url，发送请求就能获得对应的数据。不知道这样就可以获取到数据时，还让我纠结了半天呢。

另外，在设置 url 的时候，url 的变量可以用正则表达式写。在发请求的地方请求体 param 和 query 都表现在 url 上。

```js
// mock/index
import Mock from 'mockjs'
import home from './home'

// Mock.mock( url, post/get , 返回的数据)

const arr = [...home]
arr.forEach(({ url, method, data }) => {
	Mock.mock(url, method, data)
})

// main.js (在main.js引用各种包或者库的时候，mock 和 axios 是放在前面的，不知是先后顺序还是习惯)
import '@/mock'

// mock/home
import Mock from 'mockjs'

const Random = Mock.Random
const data = function() {
	let r = []
	for (let i = 0; i < 10; i++) {
		let item = {
			name: Random.cname(),
		}
		r.push(item)
	}
	return {
		r,
	}
}

export default [
	{
		url: /\/name\/\w+/, // '/name/:id'
		method: 'post',
		data,
	},
]
```

## less

直接在 main.js 引入你写好的 less 文件 `import '@/less/app.less'`，包括各种标签重置的样式。在每个组件中使用的时候再引入。

## element-ui

引入组件和样式文件，然后`vue.use(ElementUI)`

## loadsh

这个真的没什么好说的，下载，引入，然后用就行了。

## 混合的写法

```js
    ** 前导
        * 定义一个混合对象
        * 定义一个使用混合对象的组件
        * 不用注册，就可以使用
    **

    1. 混合里也可以注入混混，方法一样。一个混合选项。
    2. 组件引入 import ， mixins: ['引入的文件名'] , 不管你引入的是什么地方的文件，
    3. 混合文件的写法
    export default {
        methods: {},
        computed: {},
        data() {return {}},
        directives: {},
    }
```

## 自定义指令的写法

```js
    ** 前导
        * 钩子函数：bind，inserted，update，componentUpdated，unbind
        * 钩子函数的参数：
            el: 指令所绑定的元素，可以用来直接操作 DOM ,
            binding: { // 可以解构去除
                name,
                value,oldValue, // 指令的绑定值(计算后的值)
                expression, // 绑定值的字符串形式(计算前的表达式)
                arg, // 传给指令的参数
            },
            vnode, oldVnode
        * 不用注册，就可以使用
    **
    1. 指令在main.js中import，Vue.use(名字)
    2. 写法，
    export default {
        install(Vue) { // 注：该文件中不必引入vue
            Vue.directive('指令名', {
                bind(el, {  // 初始化动作
                    // 此为解构取出值
                    value: { // value字段接收组件应用中指令传入的参数
                        visible,
                        handle
                    }
                }) {
                    // 这种写法是什么意思？
                    // 解构取出值,然后写钩子函数的内容
                },
                update(el, {
                    value: {
                        visible,
                        handle
                    }
                }) {

                },
                unbind(el) {
                    // 指令与元素解绑时调用
                }
            })
        }
    }
    3. 组件应用：<div v-where-close="{ visible: Boolen, handle: Function }"></div>

    鸡肋：局部注册，组件中接受一个 directives 的选项
        directives: {
            focus: {
                // 定义指令
            }
        }
```

## 过滤器写法

```js
    ** 前导
        * 过滤器是函数
    **
    1. 用法 {{ content | MyFilter | filterA('arg1', arg2)}} 或者 <div :info = "content | MyFilter"></div>
    2. MyFilter过滤器函数会将content的值作为第一个参数，连用就将第一个计算后的值做为第二个的首参数。普通字符串 'arg1' 作为第二个参数，表达式 arg2 取值后的值作为第三个参数。
    3. 定义：
        官方定义
            new Vue ({
                filters: {
                    MyFilter(val) {
                        // 逻辑
                    }
                }
            })
        插件方式定义
            export default {
                install(Val) {
                    Vue.filter('MyFilter', (val) => {
                        // 函数逻辑
                    })
                }
            }
            main文件中引用，vue.use()

```

## 插件

```js
    1. 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
    2. Vue.js 的插件应公开方法 install 。第一个参数是 Vue 构造器 , 第二个参数是一个可选的选项对象
    3. 官方写法
    MyPlugin.install = (Vue, options) => {
        // 1. 添加全局方法或属性
        Vue.myGlobalMethod = function () {
            // 逻辑...
        }

        // 2. 添加全局资源
        Vue.directive('my-directive', {
            bind (el, binding, vnode, oldVnode) {
            // 逻辑...
            }
            ...
        })

        // 3. 注入组件
        Vue.mixin({
            created: function () {
            // 逻辑...
            }
            ...
        })

        // 4. 添加实例方法
        Vue.prototype.$myMethod = function (methodOptions) {
            // 逻辑...
        }
    }
    4. 使用插件
    Vue.use(MyPlugin) // 调用 `MyPlugin.install(Vue)`
    Vue.use(MyPlugin, { someOption: true }) // 传入一个选项对象
```

## 其他

```js
    1. Vue.component('组件名', {
        // 传入一个选项对象（自动调用 Vue.extend）
    })
    // 注册或获取全局组件。注册还会自动使用给定的id设置组件的名称
        // 注册组件，传入一个扩展过的构造器
        Vue.component('my-component', Vue.extend({ /* ... */ }))
        // 注册组件，传入一个选项对象（自动调用 Vue.extend）
        Vue.component('my-component', { /* ... */ })
        // 获取注册的组件（始终返回构造器）
        var MyComponent = Vue.component('my-component')

    2. Vue.extend
    // 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
        <div id="mount-point"></div> // 并挂载到一个元素上。(extend的实例，必须挂载到一个元素上)
        // 创建构造器
        var Profile = Vue.extend({
            template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
            data: function () {
                return {
                firstName: 'Walter',
                lastName: 'White',
                alias: 'Heisenberg'
                }
            }
        })
        // 创建 Profile 实例，并挂载到一个元素上。
        new Profile().$mount('#mount-point')
        // 结果 <p>Walter White aka Heisenberg</p>

    3. 例子
        // 定义名为 todo-item 的新组件
        Vue.component('todo-item', {
            template: '<li>这是个待办项</li>'
        })
        // 应用
        <ol>
            <todo-item></todo-item> // 创建一个 todo-item 组件的实例
        </ol>
    4. 拓展 ———— vue实例
         // 每个 Vue 应用都是通过 Vue 函数创建一个新的 Vue 实例开始的
            var vm = new Vue({
                // 选项
                el: '#example',
                data: data
            })
            //  Vue 实例暴露了一些有用的实例属性与方法。它们都有前缀 $
            //  vm.$data === data vm.$el === document.getElementById('example')
```
