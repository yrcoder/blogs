# webpack

webpack 代码管理工具，模块化管理

# webpack 是什么

-   模块打包工具, 这些模块引入方式都可以识别
    ES Moudule 模块引入方式: import export
    commonjs 模块,nodejs，require() module.exports
    cmd
    amd
-   webpack 本初只能识别 js 文件
    但是现在.css .less .png 这些也可以打包
    用 loader 转化为 js 文件
-   是 nodejs 写的，npm init 符合 npm 规范。
    在 package.json 文件加一项 private: true
    说明项目是私有，不会发布到 npm 的线上仓库，把 main 去掉

// 尽量不要全局安装，因为无法同时跑两个不同 webpack 版本的项目
安装 npm install webpack webpack-cli --save-dev // --save-dev 等于 -D
局部安装 webpack,当运行命令 webpack -v 时不起作用,因为 npm 回去全局查找包，
想要让局部的 webpack 起作用用命令 npx
即：npx webpack -v
npx webpack index.js // 用 webpack 翻译 index.js 这个文件，index.js 是项目的入口文件

npm info webpack // 看 webpack 版本号
npm install webpack@4.2.0 webpack-cli -D// @后面跟版本号
webpack-cli // 作用：可以在命令行中使用 webpack 的命令

## webpack 的配置文件

webpack 默认的配置文件名叫：webpack.config.js
npx webpack // 默认会以 webpack.config.js 为配置文件打包
npx webpack --config myWebpack.js // 以 myWebpack.js 为配置文件打包

```js
const path = require('path')
module.exports = {
	mode: 'production', // 如果没有写，默认模式是 production。有两个值可以被填写：development（不被压缩）
	// entry: './src/index.js',
	entry: {
		main: './src/index.js',
		sub: './src/index.js',
	},
	output: {
		// filename: 'bundle.js', // 默认叫main.js
		filename: [name].js, // 打包成两个文件 main.js和sub.js
		// publicPath: 'http://cdn.com.cn', // 打包生成的index.html文件中引入的js文件src前面会加上该路径
		path: path.resolve(__dirname, 'dist'), // 打包的文件放在哪儿个文件夹下，要跟绝对路径。__dirname是说该文件所在的当前目录的路径, bundle文件夹下bundle.js文件，bundle文件夹跟 webpack.config.js 文件平级
	},
	// 关掉sourceMap的配置，告诉我源代码哪一行有问题。sourceMap是一个打包文件和源文件的映射关系
	// dovement: 'cheap-module-eval-source-map'
	// production: 'cheap-module-source-map'
	devtool: 'none', // 值可为 'source-map'等十几种
}
```

package.json 的 scripts 项简化 webpack 命令

```js
package.json scripts 下的命令会先找本工程的 webpack 包
 {
     "scripts": {
         "dev": "webpack",
         "watch": "webpack --watch", // webpack自动监听文件自动打包
         "serve": "webpack-dev-serve",
         "middleware": "node server.js" // 执行自己起的web服务器
     }
 }
```

# webpack 核心概念

## loader

```js
module.exports = {
	// webpack打包文件的时候，如果不是js文件，就会来这里看规则
	// 需要安装loader
	module: {
		reles: [
			{
				// 以jpg为结尾的文件用file-loader打包
				// 把文件先移动到dist文件夹下，（压缩，改变名称），然后返回该文件的地址
				test: /\.(jpg|png|gif)$/,
				use: {
					loader: 'file-loader', // url-loader,也是可以完成file-loader的所有功能的，但是图片没有打包到dist文件下，但是可以正常显示，url-loader可以打包成base64。所以，图片很小的时候可以直接打包到文件中，大图片生成文件
					options: {
						// placeholder 占位符
						name: '[name].[ext]', // 图片这样的话名字不变，[name]_[hash].[ext]
						outputPath: 'images/', // 打包到dist/images文件夹下
						// limit: 2048, // 在loader 为url-loader时，用这一项就好了，大于limit就生成文件
					},
				},
			},
			{
				// css-loader, 会把通过css语法引入的各个css文件的关系理顺（@import），然后形成一个文件，然后 style-loader 会生产一个style标签挂在html上
				// loader是有执行顺序的，从右到左
				// postcss-loader自动添加厂商前缀的loader，需要一个配置文件postcss.config.js
				// 在配置文件中添加 autoprefixer 插件（需安装）
				test: /\.less$/,
				use: [
					'style-loader',
					{
						// 有配置项写成对象
						loader: 'css-loader',
						options: {
							// 通过@import 引入的文件，也要再走两个loader，默认直接执行后面的style-loader,不会执行前面的loader了
							importLoaders: 2,
							// 本文件引入的样式只在本文件起作用，不是全局的
							modules: true,
						},
					},
					'less-loader',
					'postcss-loader',
				],
			},
			{
				// icon-front
				text: /\.(eot|ttf|svg)$/,,
				use: {
                    loader: 'file-loader'
                },
			},
		],
	},
}
// js
// 因为file-loader返回的是一个地址
import avatar from './avatar.png'
const img = new Image()
img.src = avatar
```

## plugins：让打包更便捷

plugins,可以在 webpack 运行的某个时刻，帮你做一些事情，像生命周期
html-webpack-plugin 就是在打包结束的时候，自动生成一个 index.html，文件自动引入打包后的文件

```js
// html-webpack-plugin: 自动生成一个index.html，该文件自动引入打包后的文件
// 使用插件，先引入插件，然后在 plugins 选项中 new 一个插件的实例
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 打包之前先删除 dist 下的文件
const CleanWebpackPlugin = require('clean-webpack-plugin')

{
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html', // 写一下模版，需要一个挂载dom
		}),
		new CleanWebpackPlugin(['dist']),
	]
}
```

## devServer

```js
// 自动打包, 但是会刷新页面
const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

{
    devServer: {
        // 通过devServer起一个服务器，该服务器起在contentBase定义的文件夹下
        contentBase: './dist',
        open: true, // 自动打开浏览器，打开当前服务页面
        port: 4000,
        // 需要热模块更新，需要配合使用 webpack.HotModuleReplacementPlugin插件，webpack内置的
        hot: true,
        hotOnly: true, // 如果热模块更新失效，那就失效，不要做额外的处理，比如刷新页面
        // 请求代理
        proxy: {
            '/api': 'http://xxx.xxx.com'
        }
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
}
```

当引入两个 js 文件的时候，改了其中一个页面就会刷新，热模块更新的远离是加了下面一段代码

```js
// index.js
import a from './a'
import b from './b'

a()
b()

if (module.hot) {
	module.hot.accept('b', () => {
		document.body.removeChild(document.getElementById('b'))
		b()
	})
}

// a.js
function a() {
    var div = document.createElement('div')
    div.setAttribute('id', 'b')
    div.innterHTML = 1
    div.onclick = function() {
        div.innterHTML = parseInt(div.innerHTML, 10) + 1
    }
    docuemnt.body.appendChild(div)
}
export default a

// b.js
function b() {
    var div = document.createElement('div')
    div.setAttribute('id', 'b')
    div.innterHTML = 200
    docuemnt.body.appendChild(div)
}
export default b
```

## 起自己的服务器

安装 npm install express webpack-dev-middleware -D
服务器要监听 webpack 打包文件的变化然后自动打包，所以要 webpack-dev-middleware 中间件
在 package.json 同级创建一个 server.js 服务

```js
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
// 在node中直接使用webpack
// webpack的编译器
const complier = webpack(config)

const app = express()
app.use(
	webpackDevMiddleware(complier, {
		publicPath: config.output.publicPath,
	})
)

app.listen(3000, () => {
	console.log('server is running')
})
```

## babel 处理 ES6

安装 npm install babel-loader @babel/core -D
安装 npm install @babel/preset-env -D
@babel/preset-env 包含了所有 es6-->es5 的规则
但是不包括 promise，或者数组 map 等，所以需要在根目录引入 import('@babel/polyfill')

```js
{
	module: {
		reles: [
			{
				// 可以创建 .babelrc 文件写这些options里的配置配置
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader', // webpack和es6做了打通，但是不能把es6的语法翻译成es5的语法
				options: {
					// polyfill会污染全局环境，如果写业务代码可以这么配置
					// presets: [['@babel/preset-env', {
					//     useBuiltIns: 'usage', // polyfill是翻译了很多es6的函数，如果你没有用到则不会打包到文件中
					//     targets: {
					//         // 项目打包会运行在 > 67这个环境下
					//         chrome: "67"
					//     }
					// }],
					// 但是写，组件库需要写这个,会用闭包的方式注入，不会污染全局变量
					// 安装 @babel/plugin-transform-runtime
					// 是有执行顺序的，从下网上，从右忘左
					plugins: [
						[
							'@babel/plugin-transform-runtime',
							{
								corejs: 2,
								helpers: true,
								regenerator: true,
								kuseESModules: false,
							},
						],
						// 转换react代码
						'@babel/preset-react',
					],
				},
			},
		]
	}
}
```

# webpack 高级概念

# webpack 案例

# 底层原理和脚手架工具分析

# create-react-app 和 vue-cli 3.0
