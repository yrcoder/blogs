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
		path: path.resolve(__dirname, '../dist'), // 放在上一层级的dist目录下

		chunkFilename: '[name].chunk.js', // entry入口文件中的名字会走 filename这一项的配置，entry中定义的文件都会被以script标签引入到index.html中。当入口文件中引入的文件被分割打包的文件，就会走chunkFilename这个配置
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
		// CleanWebpackPlugin默认认为webpack.config.js所在的文件夹为根目录，当删除所在的文件夹上一层级的目录时需一个根路径配置
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../'),
		}),
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
@babel/polyfill 是在 window 上绑定了全局对象，如 window.Promise

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
					//     useBuiltIns: 'usage', // polyfill是翻译了很多es6的函数，如果你没有用到则不会打包到文件中，用了该项就不用在项目中手动引入polyfill了
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

## tree Shaking

只支持 ES Module 的引入，因为 import 是静态引入的方法，require 等动态引入是不支持的
就是一个模块（业务代码）中没有被引用到的就不会被打包

```js
// index.js
// 如果没有用Tree Shaking那么 del函数也会被引入
import { add } from './math.js'
add()

// math.js
const add = () => {
	console.log('+++')
}

const del = () => {
	console.log('---')
}

// webpack.config.js
{
    mode: 'development', // 这种模式下默认没有Tree Shaking,设置了也不会把没有引入的函数去掉，因为有source-map功能，如果去掉就错了。但是会有注释提示，webpack已经知道没有引用的模块了。production模式下，该项都不用配置，默认已经生效了
    optimization: {
        usedExports: true // 哪些导出的模块被使用了就打包
    }
}

但是如果没有导出任何东西，就不会打包，
import '@babel/polly-fill'
所以需要设置package.json里sideEffects这一项，其值tree Shaking就不会有任何作用
// package.json
{
    "sideEffects": ['@babel/polly-fill', '*.css']
    "sideEffects": false // 如果没有不需要做tree shaking就设置成false
}
```

## develoment 和 production 模式的区分打包

建 2 个 webpack.config.js 文件，webpack.prod.js 和 webpack.dev.js。通过 package.json 中的 scripts 来控制打包按哪个文件
把相同的提取出来，建一个 webpack.base.js 文件
再把 base 文件和 dev,prod 文件合并，需要一个 merge 的插件
安装 npm install webpack-merge -D

```js
// package.json
{
    "scripts": {
        "dev": "webpack-dev-server --config webpack.dev.js",
        "build": "webpack --config webpack.prod.js",
    },
    // 如果改了路径，将三个文件放入同一个文件夹
    "scripts": {
        "dev": "webpack-dev-server --config ./build/webpack.dev.js",
        "build": "webpack --config ./build/webpack.prod.js",
    }
}

// webpack.dev.js
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8080,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        usedExports: true
    }
}
module.exports = merge(baseConfig, devConfig)
// webpack.prod.js
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map'
}
module.exports = merge(baseConfig, prodConfig)
```

## code splitting 代码分割

当一个文件中引入第三方的库或者包的时候，打包的时候，会把库和业务代码打包到一起，就会生成一个很大的文件。
首次打开页面浏览器就会加载很长时间。当改变业务代码，打包上传，用户重新打开页面还是会加载同样大的文件。
库的代码一般不会改变，库的包和业务代码的包分开：首次同时加载 2 个小的包。
当改变业务代码，打包上传，用户重新打开页面只有重新加载页面代码的文件就可以了，因为三方库的包会缓存。

代码分割和 webpack 无关，只是一个概念，webpack 中有关于代码分割的实现而已
同步：配置 optimization
异步（import）：不需配置

手动代码分割
webpack 入口文件写两个，打包之后 index.js 文件会自动引入两个 js 文件，
然后在 src 里面写一个文件引入三方库，并且挂载在 window 下面

```js
// 手动引入
// localLoadsh.js
// 这样就可以在别的地方使用

import _ from 'loadsh'
window._ = _
// 手动引入配置
{
    entry: {
        localLoadsh: './src/localLoadsh.js',
        main: './src/index.js'
    }
}

// webpack 通过内置的插件自动完成代码分割
// 对于 import _ from 'lodash'这样静态的同步的文件进行分割
// webpack-base-config.js
{
    entry: {
        main: './src/index.js'
    },
	optimization: {
		splitChunks: {
            chunks: 'all', // 会把类库和业务代码分开，默认名称叫 vendors~main.js文件
            chacheGroups: { // 让动态加载自动分割打包的文件，通过魔法注释起的名字完全起作用，不会家vendors~
                vendors: false,
                default: false
            }
		}
	}
}

// 在写业务代码的时候，如果是异步加载的文件，webpack也会自动分割，默认名字是数字，0.js 往后排

function getCOmponent() {
    // import返回的是一个promise
    return import('lodash').then(({default: _ }) => {
        var ele = document.createElement('div')
        ele.innerHTML = _.join(['a', 'b'], '--')
        return ele
    })
    // 如果要让打包的名字不是数字，自己起一个名字，要魔法注释，魔法注释要用官方的插件才起作用
    import(/* webpackChunkName: "lodash" */ 'lodash') // 这样打包的文件叫 vendors~lodash.js。如果需要就叫lodash.js，需要配置optimization
}

// import返回的是一个promise，所以可以用.then
getCOmponent().then(element => document.body.appendChild(element))

// 上面的语法不支持，要装一个babel转译一下

// babel的配置文件
{
    // npm install babel-plugin-dynamic-import-webpack -D
    plugins: ["dynamic-import-webpack"], // 非官方
    // npm install "@babel/plugin-syntax-dynamic-import -D
    plugins: ["@babel/plugin-syntax-dynamic-import"], // 官方

}

```

## SplitChunksPlugin 配置参数

webpack 中可以代码分割是用了 SplitChunksPlugin 插件
webpack 中 splitChunks 的配置参数含义

```js
optimization: {
	splitChunks: {
	},
	// splitChunks的默认配置，就是当 splitChunks为一个空对象时会默认起作用当项
	splitChunks: {
        chunks: 'async', // 说明异步引入的，可以自动分割，同步的不分割。配置成 all 就可以分割了？no,还需要配置cacheGroups。initial是只对同步的代码做分割
        minSize: 30000, // 当引入的库大于 30000 字节的话才进行分割
        maxSize: 0, // 可配置可不配，对大库进行2次拆分
        minChunks: 1, // 打包生成的chunks，到底有几个chunks对库进行引入，大于1才分割
        maxAsyncRequests: 5, // 同时加载大模块最大是5个，代码异步引入前5个的时候进行分割，后面的就不分割了
        maxInitialRequests: 3, // 入口文件引入的库，最多分割3个，超过就不分割了
        automaticNameDelimiter: '~', // 文件生产的名字的链接符
        name: true, // 起名字的时候，cacheGroups组名有效，即前面会加上vendors～
        // 想同步打包也起作用，需要配置cacheGroups
        cacheGroups: {
            // vendors: false， 值可为false
            vendors: {
                test: /[\\/]node_modules[\\/]/, // import 同步引入的包是否是在node_modules中存在，在这里的才可以引入。引入的文件打包后的名字前面会加入vendors这个组名，main是该文件被引入的入口文件是main.js这个文件
                priority: -10, // 组的优先级，数字越大越高
                filename: 'vendors' // 默认打包出的名字叫 vendors~mian.js, filename设置之后打包文件的名字叫 vendors.js
            },
            // default: false。如果不在node_modules中则打包到default组里
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true, // 如果模块被打包过了，就直接用之前的，不要在打包了
                filename: 'common.js'
            }
        }
	}
}
```

## 懒加载 Lazy Loading, Chunk 是什么？

通过 import 异步加载的模块，当函数没有执行的时候，就不会加载
在路由中，一般会懒加载

打包完成之后，生成的每个文件都是一个 chunk

```js
async function getCOmponent() {
	const { default: _ } = await import('lodash')
	const ele = document.createElement('div')
	ele.innerHTML = _.join(['a', 'b'], '-')
	return ele
}

// 当点击的时候才会加载lodash这个库
document.addEventListener('click', () => {
	getComponent().then(ele => {
		document.body.appendChild(ele)
	})
})
```

## 打包分析，Preloading, Prefetching

打包分析: Bundle Analysis, 插件

代码使用率
将交互所用到的函数写成异步加载的形式，提高代码利用率
当点击的时候再去加载所需要用的代码
用户的交互会变慢
当主要逻辑加载完之后

```js
// index.js
document.addEventListener('click', () => {
	// 当点击的时候再去加载所需要用的代码, 魔法注释 /* webpackPrefetch: true*/，是说当主要文件都加载完成后，就可以去加载click.js文件了
	// preload是和主文件一起加载（不使用这个）
	import(/* webpackPrefetch: true*/ './click.js').then(({ default: func }) => {
		func()
	})
})
// click.js
function handleClick() {
	const ele = document.createElement('div')
	element.innerHTML = 'abc'
	document.body.appendChild(ele)
}
export default handleClick
```

## css 文件的代码分割

默认会把 css 文件打包进 js 文件中
插件：MiniCssExtractPlugin，把 css 文件单独打包
目前，该插件不支持热更新，所以该插件只在生产环境中使用
安装 npm install mini-css-extract-plugin -D
该插件还要配置对应的 loader ，
把 style-loader 替换成 MiniCssExtractPlugin.loader

还要更改对应的 tree Shaking 配置，package.json 中 , webpack 配置 optimization

```js
// webpack.prod.js
{
    loader: [{
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
        ]
    }],
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css', // 打包生成的文件被index.html直接引用，就会走filename这个配置
            chunkFilename: '[name].chunk.css'
        })
    ],
    optimization: {
        usedExports: true,
    }
}
// package.json
{
    "sideEffects": ["*.css"]
}
```

单独生成的文件不会压缩合并
要用插件 npm install optimize-css-assets-webpack-plugin -D

```js
// webpack.prod.js
{
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin({})],
    }
}
```

## webpack 与浏览器缓存（caching）

当用户访问网站之后，在更新代码上传之后，如果名字没有变，用户刷新只会用缓存中的文件，不会用新的，这时就需要 hash

```js
// webpack.config.js
{
	// 性能提醒去掉
    performance: false,
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
    },
    // 如果内容没有更改，但是hash值却变了，就加这个配置
    optimization: {
        runtimeChunk: {
            name: 'runtime' // 会多出一个runtime文件。
        }
    }
}
```

## shimming 的作用

webpack 中是基于模块打包的，模块中的变量只能在模块中被使用，别的模块中使用不了
如果是业务代码我们可以手动引入进去，但是如果是第三方的库，加入引用是不行的
就可以用垫片来实现

webpack 自带的插件：webpack.ProvidePlugin

```js
// webpack.base.config.js
{
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery', // 如果在模块中发现了 $ 这个变量，就会在该模块中自动引入jquery这个库
			_: 'lodash',
			_join: ['lodash', 'join'], // 声明一个变量_join，赋值为lodash中的join方法
		}),
	]
}
```

让每个文件的 this 指向 winodw
插件 npm install imports-loader -D

```js
// webpack.base.config.js
{
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: 'imports-loader?this=>window',
					},
				],
			},
		]
	}
}

// index.js
console.log(this === window) // true
```

## 环境变量

webpack.config.js 中 module.exports 可以接收一个全局变量
在 package.json 的 script 里传进来

```js
// webpack.config.js
module.exports = env => {
	if (env && env.production) {
		// 线上环境
	} else {
		// 开发环境
	}
}

// package.json
{
    "scripts": {
        // --env.production  就是往webpack.config.js传了一个全局变量
        "build": "webpack --env.production --config webpack.config.js"
        // --env production webpack.config.js中接收 production。module.exports = production => {console.log(production)}
        "build": "webpack --env production --config webpack.config.js"
        // module.exports = env => {if(env && env.production === 'abc') {console.log('自定义环境')}}
        "build": "webpack --env.production=abc --config webpack.config.js"
    }
}
```

# webpack 案例

## 开发一个库如何通过 webpack 打包

库就是要让别人使用，要考虑两点
自己的打包输出配置可以让别人以各种方式引入，library,libraryTarget。packkage 写好让别人用的文件的位置
在 npm 上面注入一个账号，然后在命令行中运行 npm adduser ，输入用户名和密码之后就可以运行 npm publish 这个命令，然后别人 npm install 就可以用了

```js
// webpack.base.config.js

{
    externals: ['lodash'], // 库打包的过程中如果遇到lodash这个库，就忽略这个库，不要打包到代码中。而是让业务代码去加载这个库
    externals： {
        lodash: {
            commonjs: 'lodash', // commonjs的环境 即 const lodash = require('lodash'),要求变量的名字必须是lodash
            root: '_', // 库以script标签引入，必须引入一个_代码才可以执行，（一般不配）
        }
    },
    output: {
        // 引入库时，会往全局注入一个变量，如果libraryTarget是this,window这个变量会被注入到this或window这个变量中，如果在node中，global，就会注入到global中
        library: 'root',
        // 库在外部怎么样的被引入，umd(通用)指的是commonjs emd的引入方式都可以。如果填umd，则和library没有什么关系，不会变量注入
        // 如果不是umd,libraryTarget变量挂在哪里
        libraryTarget: 'umd'
    }
}

// package.json
{
    "main": "./dist/library.js" // 表示这个项目中要给别人使用的文件是：dist文件夹下面点library.js文件
}

// 使用库的各种方法(library自己写的库)
// esd es6
import library from 'library'
// commonjs
const library = require('library')
//amd
require(['library'], function() {})
// 标签
// 通过标签引入，并且生成一个全局变量，output 中配置 library: 'abc',abc 就是全局变量的名字
<script src="library.js"></srcipt>
// 通过全局变量引入
library.math
```

## PWA 打包配置

PWA：progressive web application

打包后的代码放到后台服务器就可以跑，但是没有的话可以用 http-server 模拟一下
npm install http-server -D
让打包之后的代码在一台服务器上运行起来

如果服务器关闭，网页将不能访问
PWA 是指如果第一次访问成功了，那么在本地会有一个缓存，当服务器关闭就会运行缓存中的内容让之前打开过的页面可以展示出来

webpack 插件 npm install workbox-webpack-plugin -D 可以实现
只有要上线的代码才需要做 PWA 的处理

```js
// package.json
// 让打包之后的代码在一台服务器上运行起来
{
    "scripts": {
        "start": "http-server dist" // 在dist文件夹下开启一个http server
    }
}

// webpack-prod-config.js
const WorkboxPlugin = require("workbox-webpack-plugin")
{
    // sw ==> serviceWorker
    // 会在dist目录下生成一个service-worker.js和precache-manifest.hash串.js文件
    // 在业务代码中引用service-worker.js才能生效
    plugins: [new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true
    })]
}

// index.js
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registraton => {
            console.log(registraton)
        }).catch(error => {
            console.log(error)
        })
    })
}
```

## TypeScript 的打包配置

规范代码,可以提高 js 代码的可维护性,对函数的错误调用报错
后缀一般是 ts / tsx
npm install ts-loader typescript -D
用 typescript 需要创建一个叫 tsconfig.json 文件

对 lodash 的函数的错误调用报错
npm install @type/lodash -D

引入对应的库，安装对应的 type 文件@type/lodash，@type/jquery
哪些库有对应的 type 文件，可以在 TypeSearch 中搜

```js
// index.tsx
// 在typescript中不能 import _ from 'lodash' 引入，要用下面的方法
import * as _ from 'lodash'


class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message
    }
    greet() {
        return _.join(['a', this.greeting], '~')
        // 当 _.join(null) 传错误的参数就会报错
    }
}

let greeter = new Greeter('hi')

alert(greeter.greet())

// webpack.base.config.js
{
    entry: './src/index.tsx',
    module: {
        reles: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/ // node_modules中的不使用该loader
        }]
    }
}

// tsconfig.json

{
    "compilerOptions": {
        "outDir": './dist',
        "module": 'es6', // 在项目中引入模块的方式
        "target": 'es5', // 打包之后语法最终转化成什么形式
        "allowJs": 'js' // 允许引入js命令
    }
}
```

## webpackDevServer 实现请求转发

```js
// webpack-dev-config.js
{
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8080,
        hot: true,
        hotOnly: true,
        proxy: {
            '/react/api': 'http://xxx.xxx.com', // 接口请求 /react/api，就转发到 http://xxx.xxx.com这台服务上
            changeOrigin: true, // 有些网址不让爬虫访问，可能拿不到数据，加上就行了
            // 可以带请求头，模拟登录
            headers: {
                host: 'xxx.xxx.com',
                cookie: 'aaaaaaa'
            },
            historyApiFallback: true, // 单页应用路由，当网址上是http://xxx.xxx.com/a,会去请求后台拿a.html文件，当找不到的时候就是空或者报错，当配置此项之后无论你请求什么都会去拿后台的index.html页面
            historyApiFallback: {
                rewrites: [{
                    // 当路由是abc.html时，实际展示的是 index.html 的内容
                    from: /abc.html/,
                    to: '/index.html'
                }]
            }
        },
        proxy: {
            '/react/api': {
                target: 'http://xxx.xxx.com', // 当请求/react/api是会拿http://xxx.xxx.com里的数据
                pathRewrite: {
                    'header.json': 'demo.json' // 当请求/react/api/header.json是会拿http://xxx.xxx.com里demo.json下到数据，即相当于请求/react/api/demo.json,但是控制台看到是/react/api/header.json
                },
                bypass: function(req, res, proxyOptions) {
                    // 当请求是个页面不是数据的时候不走代理，该返回什么就是什么
                    if(res.headers.accept.indexOf('html') !== -1) {
                        return false
                    }
                }
            }
        },
        // 如果多个路径下都转发
        proxy: [{
            context: ['/auth', '/api'],
            target: 'http://xxx.xxx.com'
        }],
        // 默认proxy不能对根目录进行转发，如果要转发跟路径，就配置index项为空
        proxy: {
            index: '',
            '/': 'http://xxx.xxx.com'
        }
    }
}
```

## EsLint

约束代码
npm install eslint -D
npx eslint --init 生成配置文件
npx eslint src // 通过 eslint 检测 src 文件夹下的代码

npm install babel-eslint -D

vscode 搜索 eslint 插件，会标红 src 代码的问题
不用执行 npx eslint src

```js
// .eslintrc.js
module.exports = {
	exends: '',
	parser: 'babel-eslint',
	rule: {
		'react/prefer-stateless-function': 0,
	},
	globals: {
		document: false, // 不允许把全局变量覆盖
	},
}

直接安装插件可以看到标红，但是如果没有这些插件的编辑器就不能看到这个，所以需要把eslint配置到webpack中，这样所有的人都能看到标红
// npm install eslint-loader -D
// webpack-dev-config.js
{
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader']
        }]
    },
    devServer: {
        overlay: true // 会弹一个层提示我们错误
    }
}
```

## webpack 性能优化

1. node, npm, yarn 安装新的版本
2. 尽可能少的让 loader 打包文件
3. 尽可能少的使用插件，并且保证插件的可靠性，考虑什么 mode 用什么插件
4. resolve 参数合理配置
5. 把引入的第三方库的文件（不会变）只在第一次打包的时候打包进一个文件，之后的打包就不在分析这些库。而是直接引入那个文件。
6. 控制包文件的大小
7. 利用 node 的多进程进行打包，thread-loader, parallel-webpack（多页打包）, happypack 多进程打包
8. 合理使用 sourceMap
9. 结合 stats 分析打包结果

```js
// webpack.base.config.js
{
	module: {
		rules: [
			{
				test: /\.jsx?$/, // x? 是指x这个字符可有可无
				include: path.resolve(__dirname, '../src'),
				use: 'babel-loader',
			},
		]
    },
    resolve: {
        // 当文件中引入模块的时候可以不用带后缀，import aaa from './aaa' 不用写成import aaa from './aaa.js'
        extensions: ['.js', '.jsx'],
        // import aa from './aa/index'和import aa from './aa/child' 可以写成 import aa from './aa'
        mainFiles: ['index', 'child'],
        // 别名
        alias: {
            abc: path.resolve(__dirname, '../src/abc')
        }
    }
}
```

当在文件中引入模块的时候，webpack 会先去 node_module 中找到该模块去打包，我们可以把第三方的库打包进一个文件，然后引入
创建一个打包库文件的 webpack 配置 webpack.dll.js
在 package.json 中配置命令
配置 webpack.base.config.js 文件

```js
// webpack.dll.js
// 将库打包放在 dll文件夹下
// 名字叫 vendors.dll.js;
const path = require('path')
const webpack = require('webpack')
module.exports = {
	mode: 'production',
	entry: {
		vendors: ['react', 'react-dom', 'lodash'],
	},
	output: {
		// [name]：entry的组名vendors
		filename: '[name].dll.js',
		path: path.resolve(__dirname, '../dll'),
		// 挂在一个全局变量下，变量的名字叫 vendors（entry的组名）
		library: '[name]',
	},
	plugins: [
		// 对我们暴露的代码vendors.dll.js进行分析生成一个映射文件 vendors.manifest.json
		new webpack.DllPlugin({
			name: '[name]',
			path: path.resolve(__dirname, '../dll/[name].manifest.json'),
		}),
	],
}

// webpack.base.config.js
{
	plugins: [
        // 结合生成的vendors.manifest.json文件和项目中引入的库，检查是否存在，如果存在就直接用vendors.dll.js文件而不会去node_module里去找
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, '../dll/vendors.dll.js')
        })
		new webpack.DllReferencePlugin({
			manifest: path.resolve(__dirname, '../dll/vendors.manifest.json'),
		}),
	]
}
```

多个包拆分打包

```js
// webpack.dll.js
// dll文件夹下有两个文件 vendors.dll.js 和 react.dll.js
{
    entry: {
        vendors: ['lodash'],
        react: ['react', 'react-dom']
	},
}

// webpack.base.config.js
const fs = require('fs')
const plugins = []
const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
files.forEach(file => {
    if(/.*\.dll.js/.test(file)) {
        plugins.push(new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, '../dll', file)
        }))
    }
    if(/.*\.manifest.json/.test(file)) {
        plugins.push(new webpack.DllReferencePlugin({
            filepath: path.resolve(__dirname, '../dll', file)
        }))
    }
})

module.exports = {
    plugins
}
```

## 多页打包

项目有多个 html 文件
要多个生成 html 插件的实例

```js
// webpack.base.config.js
// 生成多个html，并且每个html文件引入需要script标签
{
    entry: {
        main: 'index.js',
        one: 'one.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            chunks: ['runtime', 'vendors', 'main'] // html文件要引入的js文件
        }),
        new HtmlWebpackPlugin({
            template: 'src/one.html',
            filename: 'one.html',
            chunks: ['runtime', 'vendors', 'one']
        })
    ]
}

// 重构
const getPlugins = (configs) => {
    const plugins = []
    // 添加多个 html
    Object.keys(configs.entry).forEach(item => {
        plugins.push(
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                filename: `${item}.html`,
                chunks: ['runtime', 'vendors', item]
            })
        )
    })
    // 加第三方库的打包文件
    const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
    files.forEach(file => {
        if(/.*\.dll.js/.test(file)) {
            plugins.push(new AddAssetHtmlWebpackPlugin({
                filepath: path.resolve(__dirname, '../dll', file)
            }))
        }
        if(/.*\.manifest.json/.test(file)) {
            plugins.push(new webpack.DllReferencePlugin({
                filepath: path.resolve(__dirname, '../dll', file)
            }))
        }
    })
    return plugins
}

const configs = {
    entry: {
        main: 'index.js',
        one: 'one.js'
    }
    ......
}

configs.plugins = getPlugins(configs)

module.exports = configs
```

# 底层原理和脚手架工具分析

## 如何编写一个 loader

```js
```

## 如何编写一个 plugin

```js
```

## bundler 源码编写

```js
```
