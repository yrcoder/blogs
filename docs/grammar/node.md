# node

## npx

npm install -g npx

## nvm

node 的版本管理器

## npm

查看版本
npm ls react-router react-router-dom react-router-config
引用外部的包
npm outdated

安装来源（淘宝镜像）
npm config get registry

rm -rf node_modules/
mv package-lock.json package-lock.json.bak
npm cache clean --force

git checkout 97c897a
git stash
git stash pop

回退版本
git reset --hard 97c897a
强制提交
git push -f origin develop

把其他的因素注释，是找 bug 的方法
各种版本
谷歌调试器

# 搭建 blog

Nodejs: js 的运行环境
运行在服务器，作为 web server
运行在本地，作为打包构建工具

API 和数据存储
登录和 redis
安全和日志

PM2 多进程
服务端运维

## node 介绍

多个 node 版本，用 nvm
brew install nvm // brew 是 mac 的的下载工具
nvm list
nvm install v10.15.0
nvm use --delete-prefix 8.12.0

es: 只有语法和词法
js: es + webAPI(dom,bom,ajax,event)
nodejs: es + nodejsAPI ==> server

commonjs: nodejs 中默认的模块化规范

```js
// es6的语法可以用
module.exports = {
	a: '',
	b: '',
}
const { a, b } = require()
```

debugger
在 vscode 中进行 debugger 必须在 package.json 中 main 中配置入口文件，它会默认去找
调试和在控制台中调试 js 很像

server 和前端的区别

服务稳定性（PM2 做进程守候）
考虑内存和 cpu 优化和扩展（客户端独占一个浏览器，server 端要承载很多请求，cpu 和内存稀缺）
日志记录（使用 stream 写日志，使用 redis 存 session，要记录日志存储日志分析日志）
安全（要准备接受恶意攻击，如越权操作，数据库攻击。课程会讲解登录验证，预防 xss 攻击和 sql 注入）
集群和服务拆分（如何通过扩展机器和服务拆分来承载大流量）

## 思路分析

数据如何存储 -- 博客，用户，表
如何于前端对接，接口设计 -- 登录接口，博客的增删改查，博客列表的查询，登录有统一的解决方案

## 接口开发

1. http 输入网址到显示，都做了什么 ？
   答：DNS 解析，建立 TCP 连接，发送 http 请求（DNS 解析：通过一个域名解析到一个 ip 地址）
   server 接受到 http 请求，处理并返回
   客户端接收到数据处理数据（渲染页面，执行 js）

2. nodejs 如何处理 http 请求 ？
   get -- querystring `?a=1&b=200`
   post -- postdata
   路由

```js
// get
const http = require('http')
const querystring = require('querystring')
const server = http.createServer((req, res) => {
	const { url, method } = req
	console.log('method:', method)
	console.log('url:', url)
	req.query = querystring.parse(url.split('?')[1])
	console.log('query:', req.query)
	res.end(JSON.stringify(req.query))
})
server.listen(8000)
// post
const server = http.createServer((req, res) => {
	const { url, method } = req
	if (method === 'post') {
		console.log(req.headers['content-type'])
		// 接受数据
		let postData = ''
		// 接收的数据太大的话会分开，然后拼接
		req.on('data', chunk => {
			postData += chunk.toString()
		})
		// 数据传输完触发该事件
		req.on('end', () => {
			console.log(postData)
			res.end('hi') // 是异步的数据所以写在这里
		})
	}
})
```

3. 搭建开发环境
   使用 nodemon 监测文件变化，自动重启 node
   使用 cross-env 设置环境变量，兼容 mac linux 和 windows

npm install nodemon cross-env --save-dev

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    // cross-env兼容不同的环境，nodemon监控文件变化
    "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js"
},
```

初始化路由：
返回假数据：将数据处理和路由分离，以符合设计原则

node 读取文件

```js
const fs = require('fs')
const path = require('path')
const fullFileName = path.resolve(__dirname, 'files', 'a.json')
fs.readFile(fullFileName, (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	console.log(data.toString())
})

// callback方式获取一个文件的内容
function getFileContent(fileName, callback) {
	const fullFileName = path.resolve(__dirname, 'files', fileName)
	fs.readFile(fullFileName, (err, data) => {
		if (err) {
			console.error(err)
			return
		}
		callback(JSON.parse(data.toString()))
	})
}

getFileContent('a.json', aData => {
	console.log(aDate)
})

// promise获取文件内容
function getFileContent(fileName) {
	const promise = new Promise((resolve, reject) => {
		const fullFileName = path.resolve(__dirname, 'files', fileName)
		fs.readFile(fullFileName, (err, data) => {
			if (err) {
				reject(err)
				return
			}
			resolve(JSON.parse(data.toString()))
		})
	})
}

getFileContent('a.json')
	.then(aData => {
		console.log(aData)
		return getFileContent(aData.next)
	})
	.then(bData => {
		console.log(bData)
	})
```

## 连接数据库

1. mysql 介绍、安装和使用（关系型数据库）

mysql workbench：操作 mysql 的客户端，可视化操作
下载地址：https://dev.mysql.com/downloads/workbench/ https://dev.mysql.com/downloads/mysql/

建库：
在 workbench 中，上面有一个添加数据库的按钮，输入 schema name(就是数据库名称)，然后点击右下角对 apply，弹出一个确认框，再点击 apply 就成功了。
左边菜单 schemas 项中就有你创建的库了。
执行 `show databases` sql 语句，查看数据库。

建表：在你创建对 schema 中有一个 table 项，右击创建表。输入表名称，添加 column 列（Datatype: INT、VARCHAR(20)字符 20、LONGTEXT 长字符串、BIGINT(20) 时间 ; pk:主键，NN：不能为空，AI：自增）。点击右下角的 apply，就生成一个创建表对 sql 语句，然后 apply，close。表就创建成功了。
点击 table 上的刷新按钮，Tables 就展开了，可以看到创建的表了
在 table 上右击 `Drop Table` 删除表, `Alter Table`编辑表

表操作：想用 sql 操作某个数据库，先 `use 数据库名称`，成功之后下面有一个绿色的标签。然后可以`show tables`显示表的名称。注释两个横线`-- show tables`

```mysql
链接数据库
use 数据库名称

查看库中所有表名称
show tables

查看版本
select version()

当创建表字段之后才可以增删改查，即改的是记录，不是表结构
增
insert into users(usernaem, `password`, realname) values('lyr', '123', '李月茹')
users：表名字；username：列名称，如果是 mysql 关键字就用引号引起如`password`；values 后面是对应的值，执行（闪电符号）之后表中会添加一条记录（选中之后点击执行）

删
delete from users where username='lisi'; 这个是真的删了
update users set state='0'; 用状态标示删除。

改
update users set realname='李月茹'; 把users表中realname列值都改成李月茹
update users set realname='李月茹' where username='lyr'; 把users表中username='lyr'的记录realname值改成李月茹
当在安全对模式下面update报错，执行一下下面的语句后在执行修改对语句
SET SQL_SAFE_UPDATES=0;

查
select * from users; 查询全部列
select username, id from users; 查询个别列
select * from users where username='lyr'; 查询 username 为 lyr 的记录
select * from users where username='lyr'and`password`='123'; 查询 username 为 lyr并且password为123 的记录
select * from users where username='lyr'or`password`='123'; 查询 username 为 lyr或者password为123 的记录
select * from users where username like '%l%'; 模糊查询like和百分号；查询 username 带 l 的记录
select * from users where username like '%l%' order by id; 根据id 排序，默认为正序，order by id
select * from users where username like '%l%' order by id desc; 根据id 排序，倒序，desc
select * from users where state <> '0'; 查询state不等于0的记录，<> 不等于

表结构的增删改查
create table test(
    id int(11) not null,
    test varchar(128) default null,
    userName varchar(10) default null comment '用户姓名',
    primary key (id)
)

查看创建表结构的sql语句
show create table test sys.test;
如果 use了数据库之后
show create table blogs;


表 column 的操作
添加
alter table sys.test add userName varchar(128) default null comment "用户姓名";
alter table sys.test add oldPassword varchar(128) default null comment "用户姓名";
alter table sys.test add realname varchar(128) default null comment "用户姓名";
修改
alter table sys.test modify realname varchar(512) default null comment "用户真实名";
alter table sys.test change realname user_name varchar(128) default null comment "用户姓名";
删除
alter table sys.test drop realname;
```

2. nodejs 连接 mysql
   新建的数据库用 node 链接的时候会报错
   Error: ER_NOT_SUPPORTED_AUTH_MODE:Client does not support authentication protocol...

```sh
# Mac 进入mysql命令行

# 终端输入进入bin 目录
cd /usr/local/mysql/bin/

# mysql登录,输入密码即可
./mysql -u root -p

# 修改密码规则
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;

# 更新用户密码， 新密码是 password
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

# 刷新权限 （不输入也可以）
FLUSH PRIVILEGES;

# 输入刚刚修改的密码，再次测试连接，搞定
```

## 登录

登录校验

登录信息存储

1. cookie（实现登录的基础） 和 session
   1). 什么是 cookie ?
   答： 存储在浏览器的一段字符串（最大 5kb）；
   跨域不共享，每个网站都有一个 cookie；
   格式 k1=v1;k2=v2; 因此可以存储结构化的数据；
   每次发送 http 请求，会将请求域的 cookie 一起发送给 server；
   server 可以修改 cookie 并返回给浏览器。
   浏览器也可以通过 js 修改 cookie（有限制）。

    2). 客户端 js 操作 cookie,浏览器中查看 cookie ？
    答：requert 中浏览器携带 cookie, response 中`Set-Cookie`项中显示 server 端修改的 cookie
    可以设置 cookie 的有效期
    可以在控制台中通过`document.cookie`查看
    `document.cookie = 'k3=v4'` 在原有的 cookie 后面拼接。

    3). server 端操作 cookie，实现登录验证 ？
    答：查看 cookie: `req.headers.cookie`

2. session 写入 redis(内存数据库)(mysql 是硬盘数据库)
   客户端不能直接暴露 userName，可以暴露对应的 userId,由 server 端对应 userName
   解决方案叫 session: server 存储用户信息（很多信息，多个人应该是），和客户端的 cookie 中相对应

    session 直接 js 变量，放在 nodejs 进程内存中
    第一，进程内存有限，访问量大，内存会暴增。
    第二，正式线上运行是多线程，进程之间内存无法共享，每个进程都有一个变量。

    redis，缓存数据库，放在内存中。访问数据快，量小,断电丢失
    web server 和 redis 拆分为两个单独大服务，双方都是独立的，都是可扩展的（可以扩展成集群），mysql 也是一个单独的服务，也可以扩展。

3. redis
   key: value 类型

```sh
# 安装
brew install redis

redis-server
# 主机端口
redis-cli

set myname lyr
get myname
del myname
keys *
```

node 链接

```js
const redis = require('redis')
// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
	console.error(err)
})

// 测试
redisClient.set('name', 'aaa', redis.print)
redisClient.get('name', (err, val) => {
	if (err) {
		console.error(err)
		return
	}
	console.log('val', val)

	// 退出
	redisClient.quit()
})
```

3. 开发登录功能，和前端联调（用 nginx 反向代理）

登录功能依赖 cookie,必须用浏览器联调
cookie 跨域不共享，前端和 server 必须同域
需要 nginx 代理
nginx:高性能的 web 服务器
一般用于做静态服务，负载均衡（本课用不到）
还有反向代理

```sh
# 下载：
brew install nginx
# 配置文件路径：默认8000端口
/usr/local/etc/nginx/nginx.conf
# 源文件路径
/usr/local/etc/nginx/servers/.
# 测试配置文件格式是否正确
nginx - t
# 启动
nginx
# 重启
nginx -s reload
# 停止
nginx -s stop
# 编辑
sudo vi /usr/local/etc/nginx/nginx.conf
```

## 日志

access log（访问日志）：时间，请求类型，请求路径，客户端信息
自定义日志：包括自定义事件，错误记录
怎么存日志：放在文件中，数据量大。
日志可能拷贝到各个服务器中

1. nodejs 文件操作，nodejs stream

```js
const fs = require('fs')
const path = require('path') // 各个操作系统，文件路径不通，统一一下。

const fileName = path.resolve(__dirname, 'data.text') // 当前目录的data.text

// 读取文件
fs.readFile(fileName, (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	// data是二进制类型，需要转化成字符串
	// 如果内容太多，data也是全部的内容，性能不好
	console.log(data.toString())
})

// 写入文件,如果内容太多，data也是全部的内容，性能不好
const content = '新的内容'
const opt = {
	flag: 'a', // 追加写入。覆盖用w
}
fs.writeFile(fileName, content, opt, err => {
	if (err) {
		console.error(err)
		return
	}
})

// 判断文件是否存在
fs.exists(fileName, exist => {
	console.log(exist) // true, false
})

// IO操作的性能瓶颈
IO：网络IO，文件IO
相比于cpu计算和内存读写，io就是慢
有限的硬件资源下提高io的效率

stream: 就是一个流，两个水桶中间插一个管子, 数据量太大，字符串拼接也是这个原理
标准输入输出，pipe就是管道
process.stdin 获取数据，直接通过管道传递给process.stdout
process.stdin.pipe(process.stdout)

http.createServer((req, res) => {
    if(req.method === 'POST') {
        req.pipe(res) // 一旦接收到请求就把参数返回出去
    }
})

// stream 读取文件, 把one.text中的数据拷贝到two.text
const = fileName1 = path.resolve(__dirname, 'one.text')
const = fileName2 = path.resolve(__dirname, 'two.text')

const readStream = fs.createReadStream(fileName1)
const writeStream = fs.createWriteStream(fileName2)

readStream.pie(writeStream)
readStream.on('data', (chunk) => {
    console.log(chunk.toString())
})
readStream.on('end', () => {
    console.log('copy done')
})

// http请求，返回一个文件内容
http.createServer((req, res) => {
    if(req.method === 'GET') {
        const = fileName1 = path.resolve(__dirname, 'one.text')
        fileName1.pie(res)
    }
})
```

2. 日志的功能开发和使用
   按天拆分日志
   实现方式：linux 的 crontab 命令，即定时任务
   设置定时任务， 格式: `*****command` 分时天月星期
   将 access.log 拷贝并重命名为 2019-02-10.access.log
   清空 access.log 文件，继续积累日志

3. 日志文件拆分，日志内容分析
   日志是按行存储的，一行就是一条日志
   使用 nodejs 的 readline (基于 stream， 效率高)

    日志分析 chrome 的占比

```js
const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 文件名
const fileName = path.resolve(__dirname, 'data.text')
// 创建read Stream （源水桶）
const readStream = fs.createReadStream(filName)

// 创建readline对象
const rl = readline.createInterface({
	input: readStream,
})

let chromeNum = 0
let num = 0

// 逐行读区
rl.on('line', lineData => {
	if (!lineData) {
		return
	}
	// 记录总行数
	sum++
	const arr = lineData.split(' -- ')
	if (arr[2] && arr[2].indexOf('Chrome') > 0) {
		// 累加chrome的数量
		chromeNum++
	}
})

// 监听读取完成
rl.on('close', () => {
	console.log('chrome 的占比:' + chromeNum / sum)
})
```

## 安全

sql 注入：窃取数据库内容
xss 攻击：窃取前端 cookie 内容
密码加密：保障用户信息安全（重要！）
DDOS 攻击：需要硬件和服务来支持（需要 OP 支持），阿里云什么的会做

1. sql 注入
   攻击方式：输入一个 sql 片段，最终拼接成一段攻击代码（字符串，攻击 sql 语句）
   如，输入用户名的地方，不是输入用户名，而是输入一段 sql 片段
   预防措施：使用 mysql 的 escape 函数处理输入内容即可

```sql
select username, realname from users where username='lyr' and password='123';
-- 当输入的是不是用户名，而是 用户名加杠杠空格（-- ）就会变成下面，这样密码就无效了
select username, realname from users where username='lyr'--' and password='123';
-- 当输入 lyr';delete from users; -- 。就会把该用户删除
select username, realname from users where username='lyr';delete from users; --' and password='123';


-- 在js文件中引用 mysql.escape
-- const login = (username, password) => {
--     username = mysql.escape(username)
--     password = mysql.escape(password)

--     username='${username}' ==> username=${username} 单引号去掉
--     const sql = `select username, realname form users where username=${username} and password=${password}`
-- }
```

2. xss 攻击
   攻击方式：在页面展示内容中参杂 js 代码，以获取网页信息
   预防措施：转换生成 js 的特殊字符，安装一个 xss 工具 npm install xss --save
   把尖括号转化基本上就好了，要转的特殊字符：`& => &amp; < => &lt; > => &gt; " => &quot; ' => &#x27; / => &#x2f;`

    ```js
    const xss = require('xss')

    xss(str)
    ```

3. 密码加密
   万一数据库被用户攻破，最不应该泄露的就是用户信息
   攻击方式：获取用户名和密码，再去尝试登录其他系统
   预防措施：将密码加密，即使拿到密码也不知道明文。nodejs 提供的一个库 crypto

```js
const crypto = require('crypto')
// 密匙(随便写,但是要保密)
const SECRET_KEY = 'sdfW_98393#'
// md5 加密
function md5(content) {
	let md5 = crypto.createHash('md5')
	return mds.update(content).digest('hex')
}
// 加密函数
function genPassword(password) {
	const str = `password=${password}&key=${SECRET_KEY}`
}

// 测试
genPassword('123')
```

# express 重构

一个框架就是要

1. 封装一些 api，工具函数
2. 提供一套解决方案
   express 的解决方案就是中间件机制

express 和 koa2 类似于前端的 vue 和 react
express 中间件机制
中间件: 就是一个函数

安装
使用脚手架安装 express-generator
npm install express-generator -g

```js
// app.use() next 参数
const express = require('express')

// 本次http请求的实例
const app = express()

// 如果没有第一个参数，默认执行该中间件，有的话，url命中才执行
// next() 会执行下一个app.use 或者app.get，但是app.post不会执行
app.use((req, res, next) => {
	console.log('aaa', req.method, req.url)
	next()
})

app.use((req, res, next) => {
	req.cookie = {
		userId: 'lyr',
	}
	next()
})

app.use((req, res, next) => {
	setTimeout(() => {
		req.body = {
			a: 100,
			b: 200,
		}
		next()
	})
})

app.use('/api', (req, res, next) => {
	console.log('use', req.method, req.url)
	next()
})

app.get('/api', (req, res, next) => {
	console.log('get', req.method, req.url)
	next()
})

// next不会执行
app.post('/api', (req, res, next) => {
	console.log('post', req.method, req.url)
	next()
})

// 其实这种写法就是中间件中套中间件
function loginCheck(req, res, next) {
	console.log('模拟登录成功')
	setTimeout(() => {
		next()
	})
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
	console.log('/get-cookie', req.method, req.url)
	res.json({
		errno: 0,
		data: req.cookie,
	})
})

app.post('/api/get-post-data', (req, res, next) => {
	console.log('/get-post-data', req.method, req.url)
	res.json({
		errno: 0,
		data: req.body,
	})
})

app.use((req, res, next) => {
	console.log('404')
	res.json({
		errno: 0,
		data: 'not fund',
	})
})

app.listen(3000, () => {
	console.log('start')
})
```

## 登录

## 日志

express 推荐的 morgan 插件

```js
const logger = require('morgan')
const app = express()
app.use(logger('dev'))
// 默认的第二个参数是(即默认输出到控制台上)
app.use(logger('dev'), {
	stream: process.stdout,
})
// 第一个参数的值
// 'dev': 日志的格式, 还有很多

// 线上环境，将日志写入文件
const logFileName = path.join(__dirname, 'logs', 'access.log')
const writeStream = fs.createWriteStream(logFileName, {
	flages: 'a',
})
app.use(
	logger('combined', {
		stream: writeStream,
	})
)
```

## 实现一个简单的中间件

核心 api:app.listen,app.use,app.get,app.post,next 往下传
app.use: 用来注册中间件，先收集起来
遇到 http 请求，根据 path 和 method 判断触发哪些
实现 next 机制，上一个通过 next 触发下一个

思路：
将通过各种方法传人的中间件，依次执行，然后返回
先存储不同类型的中间件，调用 listen 时，通过监听 url 的变化来执行中间件

```js
//
const http = require('http')
const slice = (Array = Array.prototype.slice)

class LikeExpress {
	constructor() {
		// 存放中间件的列表
		this.routes = {
			all: [], // 存储通过app.use()传人的中间件
			get: [],
			post: [],
		}
	}

	register(path) {
		const info = {}
		if (typeof path === 'string') {
			info.path = path
			// 从第二个参数开始，转换为数组，存入stack
			info.stack = slice.call(arguments, 1)
		} else {
			info.path = '/'
			// 从第一个参数开始，转换为数组，存入stack
			info.stack = slice.call(arguments, 0)
		}
		return info
	}
	use() {
		const info = this.register.apply(this, arguments)
		this.routes.all.push(info)
	}
	get() {
		const info = this.register.apply(this, arguments)
		this.routes.get.push(info)
	}
	post() {
		const info = this.register.apply(this, arguments)
		this.routes.post.push(info)
	}
	match(method, url) {
		let stack = []
		if (url === '/favicon.ico') {
			return stack
		}
		// 通过routes, 获取可用的中间件
		let curRoutes = []
		curRoutes = curRoutes.concat(this.routes.all)
		curRoutes = curRoutes.concat(this.routes[method])

		curRoutes.forEach(routeInfo => {
			// 通过路由匹配一层
			if (url.indexOf(routeInfo.path) === 0) {
				stack = stack.concat(routeInfo.stack)
			}
		})
		return stack
	}
	handle(req, res, stack) {
		const next = () => {
			// 拿到第一个匹配的中间件
			const middleware = stack.shift()
			if (middleware) {
				// 执行中间件函数
				middleware(req, res, next)
			}
		}
		next()
	}
	callback() {
		return (req, res) => {
			res.json = data => {
				res.setHeader('Constent-type', 'application/json')
				res.end(JSON.stringify(data))
			}
			const url = req.url
			const method = req.method.toLowerCase()

			// 匹配可用的中间件列表
			const resultList = this.match(method, url)
			// 执行中间件，处理next机制
			this.handle(req, res, resultList)
		}
	}
	listen(...args) {
		// 回调函数中处理请求头和返回数据等东西
		const server = http.createServer(this.callback())
		server.listen(...args)
	}
}

// 工厂函数
module.exports = () => {
	return new LikeExpress()
}
```

# koa2 重构

## 中间件原理

app.use 用来注册中间件，先收集起来
实现 next 机制，
不涉及路由，没有 method 和 path 判断

```js
```

# 上线
