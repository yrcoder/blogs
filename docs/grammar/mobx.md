# mobx

## mobx API

1. 可观察的数据

```js
import { observable, isArrayLike } from 'mobx'
// 用 observable 或者 observable.box 将数据变成可观察的数据，即封装了一层
// array object map
const arr = observable([1, 2, 3])
Array.isArray(arr) // false
isArrayLike(arr) // true

const obj = observable({ a: 1, b: 2 })
// extendObservable() ，给可观察的对象添加新的属性

// number string boolean原始数据类型使用observable.box
let num = observable.box(1)
let str = observable.box('abc')
let bool = observable.box(true)

num.set(50)
str.set('xyz')
bool.set(false)
console.log(num.get(), str.get(), bool.get())

// 类，注解只能修饰类和类成员
class Store {
    @observable array = []
    @observable obj = []
    @observable map = []
    @observable str = ''
    @observable num = 0
    @observable bool = false
}
```

2. 对可观察的数据作出反应

```js
import { observable, computed, autorun, when, Reaction } from 'mobx'

const store = new Store()
// computed传人一个无参数的函数，结果foo是个可观察的数据。更多的是作为修饰类的注解
let foo = computed(function() {
    return store.str + '/' + store.num
})
console.log(foo.get())
foo.observe(function(change) {
    // 当store.str，store.num改变的时候执行
    console.log(change)
})

class Store {
    // computed也可以引用其他computed的值，但不可循环引用
    @computed get mixed() {
        return store.str + '/' + store.num
    }
}

// autorun, 当引用是数据发生变化时，自动执行回调函数(autoran的参数)
autoran(() => {
    console.log(store.str)
})
store.str = 'zzz'
// computed的值也是可以被观察的
autoran(() => {
    console.log(store.mixed)
})
store.str = 'aaa'

// when(true, fn)当第一个参数(可观察数据)为true时就去执行第二个函数
when(() => store.bool, () => console.log("it's true"))
store.bool = true

// reaction(one, fn(one))第一个参数的返回值回作为第二个参数的参数
reaction(() => [store.str, store.num], arr => console.log(arr.join('/')))
store.str = 'aaa' // 只有当更改的时候才调用，when 无论如何都会先调用一次
```

3. 修改可观察的数据

```js
    每次手动修改可观察数据都会触发autoran等执行函数，太频繁。比如一个点击操作可以同时更改多个变量，但是视图的更新需要一次就够了
    action可以把多次对autoran的触发合并成一次

import { action, runInAction } from 'mobx'
    class Store {
        @action bar() {
            this.str = 'aaa'
            this.num = 33
        }
        @action.bound barBound() {
            this.str = 'aaa'
            this.num = 33
        }
    }
    store.bar() // 只会触发一次
    const barBound = store.barBound
    barBound()

    runInAction(() => {
        store.str = 'aaa'
        store.num = 33
    })
    // modify调试比较友好，像方法名
    runInAction('modify',() => {
        store.str = 'aaa'
        store.num = 33
    })
```

# mobx-react

```js
// 定义store  store.js
import { observable, action } from 'mobx'

export default class LoginStore {
    // @observable 定义state的关键字，@action 定义action的关键字，好像let，const。没有mutation。一个关键字只能定义一个变量
    @observable
    aaa = 1

    @action
    changeStatus1 = number => {
        this.aaa = number
    }
}
// 将定义好的store注入组件 index.js
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import AppStore from './stores/AppStore'
const stores = {
    appStore: new AppStore(),
}
ReactDOM.render(
    <Provider {...stores}>
        <app />
    </Provider>,
    document.getElementById('root')
)

// 组件中引用 app.js
import { observer, inject } from 'mobx-react'
// @inject() 注入；@observer 引用
// store里的state被注入在props中，好像从父组件中传进来的
@inject('appStore')
@observer
class App extends Component {
    doSomething = async () => {
        this.props.appStore.changeStatus(123123)
    }
    render() {
        return (
            <div>
                <button
                    onClick={() => {
                        this.doSomething()
                    }}
                >
                    获取
                </button>
                <p>{this.props.appStore.aaa}</p>
            </div>
        )
    }
}
```

## 应用

::: tip 吾注

1. store 里定义可观察的变量和更改变量的方法`@observable @computed @action from mob`类
2. 将类的实例注入到 react 根组件`Provider from 'mobx-react'`，直接绑定各个 store 实例，而不是写一个总 store
3. 在组件中注入`@inject('nav')`,监听组件当对应变量变化的时候重新渲染`@observer`。`@observer和@inject from mobx-react`。
4. 同时引入 mobx 和 react-mobx
   :::

::: warning 用 `create-react-app` 用 mobx 的时候会因为不能使用注入语法而报错

1. git add .
2. git commit -am "保存"
   必须先保存才可以安装，不然检测到注入语法还是会报错的
3. npm run eject
4. npm install --save-dev babel-plugin-transform-decorators-legacy
5. npm install @babel/plugin-proposal-decorators
6. 在 package.json 里修改 babel

```js
"babel": {
  "plugins":[
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy":true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose":true
      }
    ]
  ],
  "presets":[
    "react-app"
  ]
}
```

:::

1. 创建 store

```js
import { observable, action, computed } from 'mobx'

class Request {
    @observable _requests = {}
    @computed get requests() {
        return this._requests
    }
    @action addRequests(val) {
        const key = +new Date()
        this._requests[key] = val
    }
}

export default new Request()
```

2. 将 store 注入 react 根组件

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import store from './store'
import App from './view/home/App'

ReactDOM.render(
    <Provider {...store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
```

3. 在组件中引用

```js
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './App.css'

@inject('nav')
@observer
class App extends Component {
    render() {
        return (
            <section className="App">
                <div>{this.props.nav.menus}</div>
                <button
                    onClick={() => {
                        this.props.nav.addMenus(+new Date())
                    }}
                >
                    添加menus
                </button>
            </section>
        )
    }
}

export default App
```
