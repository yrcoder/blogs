# http

输入 url 打开网页
AJAX 获取数据
img 标签加载图片

缓存对 web 服务性能提升最大的一环

-   cache-control
    -   Cache-Control: max-age = 100
    -   public,private: 只能通过客户端缓存还是可以通过代理服务进行缓存
    -   must-revalidate: 缓存过期之后必须要在服务器端验证过之后，才可以继续使用缓存
    -   no-cache,no-store: 是否使用缓存
-   缓存验证
    -   last-modified 配合 if-modified-since 进行验证
    -   etag 配合 if-none-match 进行验证

请求头

-   Content-Type、Content-Encoding: 约束数据类型
-   Cookie 保持会话信息
-   CORS 实现跨域并保持安全性限制

# 基础

## 5 层网络模型介绍

## 发展历史

## HTTP 的三次握手

## URI、URL 和 URN

## HTTP 报文格式

## node 创建 最简单 web 服务

node server.js 启动

```js
// server.js
const http = require('http')
http.createServer(function(request, response) {
	console.log('request come', request.url)
	response.end('123')
}).listen(8888)
```

# 各种特性

## 认识 HTTP 客户端

HTTP 客户端 ==> 浏览器, curl
curl baidu.com
curl www.baidu.com
带各种请求信息
curl -v www.baidu.com

## CORS 跨越请求

```js
```

## 缓存头 Cache-Control

## 缓存验证 last-modified 和 etag

## cookie 和 session

## http 长链接

## 数据协商

## Redirect

## CSP

# nginx 代理以及面向未来的 http

## 安装和基础配置

## nginx 代理配置和代理缓存

## https 解析

## 使用 Nginx 部署 https 服务

## http2 的优势和 nginx 配置 http2
