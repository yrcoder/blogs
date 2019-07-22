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

## 安全
