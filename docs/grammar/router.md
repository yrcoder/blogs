<!-- # router

## react-router

::: tip 吾注

1. router 的配置，（与哪些组件做映射）和 router 的注入。在 react 根组件中引入 router 配置
2. router 的渲染。`<router-view /> <Route/>` 标签写在要渲染到地方
3. router 的渲染和参数的获取，`this.$route.query.id，this.$router.push({name: '', query: {}})`
   :::

::: warning

1. 在根组件中用 withRouter(app) 才可以在 route 组件中用 this.props.history.push({pathname: 'test', search: '?id=1234'})
2. `<router></router>` 标签中间只能有一个根组件（或者标签）
3. react-router-dom 中包含了 react-router 的 API，直接安装 react-router-dom 就可以
   :::

## 将 router 注入根组件

1. HashRouter BrowserRouter MemoryHistory
2. <Router>是个包裹器，下面只能紧跟一个标签或者组件。其中，根组件<App>用 withRouter(app)包裹一层

```js
import React from 'react'
import ReactDOM from 'react-dom'
// HashRouter BrowserRouter MemoryHistory
import { BrowserRouter as Router } from 'react-router-dom'
import App from './view/home/app'
// <Router>是个包裹器，下面只能紧跟一个标签或者组件。其中，根组件<App>用 withRouter(app)包裹一层
ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementId('root')
)
```

## 配置路由文件

1. <Route> 当前要展示的视图，当 url 和 Route 中 path 的值匹配时，就渲染 component 或者 render 中的内容
2. 有 location，history，match 三大 props，在起对应的 component 组件中可以拿到。match 有 params、isExact、path、url 这些属性
3. exact 精确匹配，不然 /test 也会匹配 / 对应的页面

```js
import React from 'react'
import { Route } from 'react-router-dom'
import test from '../view/test'
import one from '../view/one'
import nesting from '../view/nesting'
// <Route> 当前要展示的视图，当url和Route中path的值匹配时，就渲染component或者render中的内容
// 有 location，history，match三大props，在起对应的component组件中可以拿到。match有params、isExact、path、url这些属性
// exact精确匹配，不然 /test 也会匹配 / 对应的页面
export default (
	<div>
		<Route exact path="/one/:id" component={one} />
		<Route path="/test" component={test} />
		<Route path="/nesting" component={nesting} />
	</div>
)
```

## 组件中跳转

1. 根组件中要用 withRouter(app) 包裹一层
2. history 方法：push(),replace(),goBack()
3. push 里带的参数可以在要跳转的组件里 用 this.props.location.query，this.props.location.params 拿到
4. 对于 search 的字符串获取，const params = new URLSearchParams(this.props.location.search); params.get('id')
5. 对于 /one/:id 的获取，this.props.match.params.id。match 还有 path,url 等属性。

```js
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import router from '../../router'

class App extends Component {
	render() {
		return (
			<section>
				<nav>
					<Link to="/one/1234">one</Link>
					<Link to="test">test</Link>
					<Link to="/nesting">nesting</Link>
					<hr />
					<button
						onClick={() => {
							this.props.history.push({
								pathname: 'test',
								search: '?id=1234',
								params: {
									id: 'params--111',
								},
								query: {
									id: 'query--111',
								},
							})
							// this.props.history.replace('/test')
							// this.props.history.goBack() 返回上一页
						}}
					/>
				</nav>
			</section>
		)
	}
}
// 必须用withRouter(App)包裹，否则拿不到值
export default withRouter(App)
```

## 组件中获值

query 和 params 都写在一块儿了

```js
import React, { Component } from 'react'

class test extends Component {
	render() {
		const { history, match } = this.props
		const search = new URLSearchParams(location.search)
		return (
			<section>
				<div>{JSON.stringify(history.location)}</div>
				<div>{JSON.stringify(match.params)}</div>
				<div>{search.get('id')}</div>
				<div>{location.query}</div>
				<div>{location.params}</div>
				<div>/one/:id ===> {match.params.id}</div>
			</section>
		)
	}
}
```

## 嵌套路由

哪个页面里需要路由，就把<Route>配置在哪里。
exact 精确匹配会导致匹配不上
嵌套路由到<Route>的配置写在组件里时，和父组件里到配置不挨着，独立

```js
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

class Child extends Component {
	render() {
		return <div>我是子组件</div>
	}
}

class Nesting extends Component {
	render() {
		const { match } = this.props
		return (
			<section>
				<Link to="/nesting/child-1">child-1</Link>
				<Link to={`${match.url}/child-2`}>child-1</Link>

				<hr />

				<Route path="/nesting/child-1" render={() => <div>child-1</div>} />
				<Route path={`${match.path}/child-2`} component={Child} />
			</section>
		)
	}
}
```

## react-router-config 改写

react-router-config 最主要就是用 renderRoutes 改写了 react-router 里的 Route, 即用自己的方式写了渲染组件。
但是用法和 Route 大体相同，渲染路由的地方都要用，也同 vue 里的 `<router-view></router-view>`
renderRoutes(url->component 的映射, 传给组件的参数)，第一个参数是配好路径的组件，当 url 和组件的 path 相同时渲染该组件，渲染的地方就是 renderRoutes()函数所在的地方，如果配置文件中有子路由，则在引用子路由的地方要写一遍渲染函数。第二个参数是父组件传给子组件的参数，混合到子组件的 props 里。

我同样可以在 App 组件中渲染路由，而不是在根标签处渲染。

`/` 带不带跟路径也会影响渲染

```js
// 引入 router

import React from 'react'
import ReactDOM from 'react-dom'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(<Router>{renderRoutes(router)}</Router>, document.getElementById('root'))

// 路由配置
import App from '../view/home/App'
import one from '../view/one'
import nesting from '../view/nesting'
import test from '../view/test'
import child from '../view/child'
export default [
    {
        path: '/',
        component: App,
        routes: [
            {
                path: '/test',
                component: test,
            },
            {
                path: '/nesting',
                // nesting 组件中要写 renderRoutes() 函数
                component: nesting,
                routes: [
                    {
                        path: 'child',
                        component: child,
                    },
                ],
            },
        ],
    },
    {
        exact: true,
        path: '/one/:id',
        component: one,
    },
]

// 渲染
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

class App extends Component {
    render() {
        const { route } = this.props
        return (
            <section>
                <Link to="/nesting"> nesting </Link>
                {renderRoutes(route.routes, { aaa: '带个东西试试' })}
            </section>
        )
    }
}

export default withRouter(App)

// 接受父组件的参数
const { match, aaa } = this.props

``` -->
