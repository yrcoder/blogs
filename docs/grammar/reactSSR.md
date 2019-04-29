# ReactSSR

stackoverflow.com node 包版本号的问题可以在这个网站

CSR: 客户端渲染, 问题 TTFP 首屏展示时间比较长，不具备 SEO 排名的条件
SSR: 服务器端渲染，主流的 NEXT.js（react）和 nuxt.js(vue)

-   SSR 和同构
-   路由机制的实现
-   框架和 Redux 的融合（数据脱水和注水）
-   SEO 特性
-   预渲染技术
-   中间层

# 概念

1. ssr 用户访问一个网页，只需要加载一个页面，服务器端已经有了东西了
2. csr 用户访问一个网页, 先向后台请求一个空壳页面，再加载一个 js 文件，再执行 js 代码，最后才能看到页面，速度很慢

## 服务器端渲染

页面上的东西是由服务器生成的，浏览器直接展示

用 express 框架创建一个 http 服务器
安装 node express
npm init -y
npm install express --save
node app.js 运行文件

```js
// app.js
var express = require('express')
// 创建一个应用
var app = express()
// 一旦访问根路径，就返回一个‘aaa’
app.get('/', function(req, res) {
	// res.send('aaa')
	res.send(
		`<html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Document</title>
            </head>
            <body>
                <h1>hi！</h1>
            </body>
        </html>`
	)
})
// 根路径监听8080端口
var server = app.listen(8080, function() {
	var host = server.address().address
	var port = server.address().port
	console.log(host, port, '==> aaa')
})
```

## 客户端渲染

npx create-react-app client

一个项目只是返回了一个前端项目的框架，根标签，和 script 的引用，页面中的内容代码是没有的
如果浏览器不允许运行 javascript，那么这个项目就看不见了

优势：

1. 前后端分离，前端负责渲染后端负责提供数据

劣势：

1. 首屏加载时间长
2. seo 搜索引擎优化（爬虫只认识 html 的内容，不认识 js 里的内容）
3. 消耗服务器的性能

# 在服务器端编写 react 代码

客户端渲染的流程
浏览器发送请求 ==> 服务器返回 html ==> 浏览器发送 bundle.js 请求 ==> 服务器返回 bundle.js ==> 浏览器执行 bundle.js 中的 react 代码
服务器短渲染的流程
浏览器发送请求 ==> 服务器运行 react 代码生产页面 ==> 服务器返回页面

将 react 代码写在服务器端
node 环境下是 commonjs 的规范，不支持 es6
配置 webpack
npm install webpack webpack-cli --save
在 node 中用 webpack
npm install webpack-node-externals --save

虚拟 dom: 真实 dom 的 javascript 对象映射
react 组件本质上就是一个虚拟 dom

服务器自动重启
npm install nodemon -g

```js
// index.js
// node代码会被webpack编译代表，webpack中引入了stage-0，所以可以写import 等语法
var express = require('express')
var app = express()
import Home from './components/home.js'
// 客户端渲染react组件的方法，但是在服务器端不能这么用
// import ReactDom from 'react-dom'
// ReactDom.render(<Home />,document.getElementById('root'))
// 服务器端渲染方法
import React from 'react'
import { renderToString } from 'react-dom-server'

const content = renderToString(<Home />)
app.get('/', function(req, res) {
	res.send(
        `<html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Document</title>
            </head>
            <body>
                ${content}
            </body>
        </html>`
    )
})
var server = app.listen(8080)

// react 代码 components/home.js
// import React from 'react' // webpack打包可以执行这段代码，否则这能写require语法
const React  = require('react')
const Home = () => {
	return <div>home</div>
}
module.exports {
    default: Home
}
// export default Home

// webpack.server.js
const path = require('path')
const nodeExternals = require('webpack-node-externals')
module.exports = {
    // require("path") 在浏览器端需要把所有的包都打在bundle.js文件中，在服务器端不需要。环境不同打包的代码是不同
    target: 'node',
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "build")
    },
    // 在node代码中引入express等这些包端时候，不会打包进bundle.js
    externals: [nodeExternals()],
    module: {
        // npm install babel-loader babel-core --save
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                // npm install babel-preset-react --save
                // npm install babel-preset-state-0 --save
                // env，es2015也要安装
                // env 如何根据环境做一些适配
                presets: ['react', 'stage-0', 'es2015', ['env', {
                    targets: {
                        // 编译打包的结果回适配浏览器最后的两个版本，兼容所有浏览器最新的两个版本
                        browsers: ['last 2 versions']
                    }
                }]]
            }
        }]
    }
}

// package.json
// 要开两个窗口，一个执行npm run build，一个执行npm start
{
    "script": {
        // "start": "node ./src/index.js",
        // 运行打包后的文件不是入口文件了
        "start": "node ./build/bundle.js",
        // nodemon 监听build目录(--watch)，只要目录更改，就立即执行(--exec)node ./build/bundle.js命令，重启服务
        "start": "nodemon --watch build --exec node \"./build/bundle.js\"",
        // --watch 监听代码更改自动打包
        "build": 'webpack --config webpack.server.js --watch'
    }
}

// 在一个窗口中执行两个命令
// 安装一个插件 npm-run-all
// npm install npm-run-all -g

{
    // 并行执行（--parallel）以div:开头的所有命令
    "dev": "npm-run-all --parallel dev:**"
    "dev:start": "nodemon --watch build --exec node \"./build/bundle.js\"",
    "dev:build": "webpack --config webpack.server.js --watch",
    "prod:build": ""
}
```

# 同构

`renderToString(<Home/>)`方法不会把组件中的事件也渲染出来，只会渲染页面显示的内容
怎么能执行呢？让这一套代码在服务器端执行一次，再在浏览器（客户端）上执行一次，客户端执行后事件就绑定上了

在浏览器上执行 js 代码

```js
// webpack.client.js
// react的代码以浏览器为运行环境再打包一套
    {
        mode: 'development',
        entry: './src/client/index.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, "public")
        },
        module: {
            rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['react', 'stage-0', 'es2015', ['env', {
                        targets: {
                            browsers: ['last 2 versions']
                        }
                    }]]
                }
            }]
        }
    }
// index.js
import express from 'express'
import Home from './components/home.js'
import React from 'react'
import { renderToString } from 'react-dom-server'
const app = express()
const content = renderToString(<Home />)
// 在本文件引入public文件夹下的所有文件
app.use(express.static('public'))
app.get('/', function(req, res) {
	res.send(
        `<html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Document</title>
            </head>
            <body>
                <div id="root">${content}</div>
            </body>
        </html>`
    )
})
var server = app.listen(8080)
// client/index.js
// 把react的代码挂在root标签上
// 解决`renderToString(<Home/>)`方法不会把组件中的事件也渲染出来
import React from 'react'
import ReactDom from 'react-dom'
import Home from '../components/home'
ReactDom.render(<Home/>, document.getElementById("root"))
// hydrate的脱水和注水，暂时理解成render的含义
ReactDom.hydrate(<Home/>, document.getElementById("root"))

// package.json
// 服务器端的代码打包一遍，客户端的代码也打包一遍
{
    "dev": "npm-run-all --parallel dev:**"
    "dev:start": "nodemon --watch build --exec node \"./build/bundle.js\"",
    "dev:build:server": "webpack --config webpack.server.js --watch",
    "dev:build:client": "webpack --config webpack.client.js --watch"
}
```

# SSR 框架中引入路由机制

同构项目的路由也是服务器端和客户端各执行一次

npm install react-router-dom --save
服务器端路由 staticRouter
server 文件夹下创建一个路由配置页

服务器端路由的渲染只加载首页，当首页完成后，再点击路由的跳转就是客户端 js 控制的跳转了
服务器端和客户端渲染的路由不统一了，就报错

```js
// Routes.js
import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../components/home'
import Login from '../components/login'
export default (
	<div>
		<Route path="/" exact component={Home} />
		<Route path="/" exact component={Login} />
	</div>
)

// 客户端渲染路由
import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from '../components/home'
import Routes from '../Routes'
const app = () => {
	return <BrowserRouter>{Routes}</BrowserRouter>
}
ReactDom.hydrate(<App />, document.getElementById('root'))

// 服务器端渲染路由
import express from 'express'
import Home from './components/home.js'
import React from 'react'
import { renderToString } from 'react-dom-server'
import { StaticRouter } from 'react-router-dom'
import Routes from '../Routes'
const app = express()
// StaticRouter 必须要一个 context属性

app.use(express.static('public'))
// 把 根路径‘/’改成‘*’
app.get('*', function(req, res) {
	// 服务器端路由,不知道当前浏览器的路由是什么，必须从请求中传递给StaticRouter，还要location属性，当前所属路径的位置
	// req.path就是浏览器当前的路由
	const content = renderToString(
		<StaticRouter context={{}} location={req.path}>
			{Routes}
		</StaticRouter>
	)

	res.send(
		`<html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Document</title>
            </head>
            <body>
                <div id="root">${content}</div>
            </body>
        </html>`
	)
})
var server = app.listen(8080)
```

服务器端渲染路由代码优化

```js
// server/index.js
import express from 'express'
import { render } from './utils'

const app = express()
app.use(express.static('public'))
app.get('*', function(req, res) {
	res.send(render(req))
})
var server = app.listen(8080)
// server/utils.js
import React from 'react' // jsx的写法必须引入react
import { renderToString } from 'react-dom-server'
import { StaticRouter } from 'react-router-dom'
import Routes from '../Routes'

export const render = req => {
	const content = renderToString(<StaticRouter location={req.path} context={{}} />)
	return `<html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Document</title>
            </head>
            <body>
                <div id="root">${content}</div>
            </body>
        </html>`
}
```

# SSR 与 Redux 的结合

Store 也需要客户端做一次，服务器端做一次，引入方法两端一样

## 中间层

# Node 作为数据处理的中间层

# 细节问题

# 处理 SSR 中的 css

# SEO 技巧
