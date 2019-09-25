(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{187:function(t,a,s){"use strict";s.r(a);var n=s(0),r=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"http"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http","aria-hidden":"true"}},[t._v("#")]),t._v(" http")]),t._v(" "),s("p",[t._v("输入 url 打开网页\nAJAX 获取数据\nimg 标签加载图片")]),t._v(" "),s("p",[t._v("缓存对 web 服务性能提升最大的一环")]),t._v(" "),s("ul",[s("li",[t._v("cache-control\n"),s("ul",[s("li",[t._v("Cache-Control: max-age = 100")]),t._v(" "),s("li",[t._v("public,private: 只能通过客户端缓存还是可以通过代理服务进行缓存")]),t._v(" "),s("li",[t._v("must-revalidate: 缓存过期之后必须要在服务器端验证过之后，才可以继续使用缓存")]),t._v(" "),s("li",[t._v("no-cache,no-store: 是否使用缓存")])])]),t._v(" "),s("li",[t._v("缓存验证\n"),s("ul",[s("li",[t._v("last-modified 配合 if-modified-since 进行验证")]),t._v(" "),s("li",[t._v("etag 配合 if-none-match 进行验证")])])])]),t._v(" "),s("p",[t._v("请求头")]),t._v(" "),s("ul",[s("li",[t._v("Content-Type、Content-Encoding: 约束数据类型")]),t._v(" "),s("li",[t._v("Cookie 保持会话信息")]),t._v(" "),s("li",[t._v("CORS 实现跨域并保持安全性限制")])]),t._v(" "),s("h2",{attrs:{id:"基础"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基础","aria-hidden":"true"}},[t._v("#")]),t._v(" 基础")]),t._v(" "),s("h3",{attrs:{id:"_5-层网络模型介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-层网络模型介绍","aria-hidden":"true"}},[t._v("#")]),t._v(" 5 层网络模型介绍")]),t._v(" "),s("h3",{attrs:{id:"发展历史"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#发展历史","aria-hidden":"true"}},[t._v("#")]),t._v(" 发展历史")]),t._v(" "),s("h3",{attrs:{id:"http-的三次握手"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http-的三次握手","aria-hidden":"true"}},[t._v("#")]),t._v(" HTTP 的三次握手")]),t._v(" "),s("h3",{attrs:{id:"uri、url-和-urn"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#uri、url-和-urn","aria-hidden":"true"}},[t._v("#")]),t._v(" URI、URL 和 URN")]),t._v(" "),s("h3",{attrs:{id:"http-报文格式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http-报文格式","aria-hidden":"true"}},[t._v("#")]),t._v(" HTTP 报文格式")]),t._v(" "),s("h3",{attrs:{id:"node-创建-最简单-web-服务"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#node-创建-最简单-web-服务","aria-hidden":"true"}},[t._v("#")]),t._v(" node 创建 最简单 web 服务")]),t._v(" "),s("p",[t._v("node server.js 启动")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{attrs:{class:"token comment"}},[t._v("// server.js")]),t._v("\n"),s("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" http "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token function"}},[t._v("require")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v("'http'")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nhttp"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("createServer")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token keyword"}},[t._v("function")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("request"),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" response"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tconsole"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("log")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v("'request come'")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" request"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("url"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\tresponse"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("end")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v("'123'")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("listen")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token number"}},[t._v("8888")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h2",{attrs:{id:"各种特性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#各种特性","aria-hidden":"true"}},[t._v("#")]),t._v(" 各种特性")]),t._v(" "),s("h3",{attrs:{id:"认识-http-客户端"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#认识-http-客户端","aria-hidden":"true"}},[t._v("#")]),t._v(" 认识 HTTP 客户端")]),t._v(" "),s("p",[t._v("HTTP 客户端 ==> 浏览器, curl\ncurl baidu.com\ncurl www.baidu.com\n带各种请求信息\ncurl -v www.baidu.com")]),t._v(" "),s("h3",{attrs:{id:"cors-跨越请求"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cors-跨越请求","aria-hidden":"true"}},[t._v("#")]),t._v(" CORS 跨越请求")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code")])]),s("h3",{attrs:{id:"缓存头-cache-control"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#缓存头-cache-control","aria-hidden":"true"}},[t._v("#")]),t._v(" 缓存头 Cache-Control")]),t._v(" "),s("h3",{attrs:{id:"缓存验证-last-modified-和-etag"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#缓存验证-last-modified-和-etag","aria-hidden":"true"}},[t._v("#")]),t._v(" 缓存验证 last-modified 和 etag")]),t._v(" "),s("h3",{attrs:{id:"cookie-和-session"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cookie-和-session","aria-hidden":"true"}},[t._v("#")]),t._v(" cookie 和 session")]),t._v(" "),s("h3",{attrs:{id:"http-长链接"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http-长链接","aria-hidden":"true"}},[t._v("#")]),t._v(" http 长链接")]),t._v(" "),s("h3",{attrs:{id:"数据协商"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数据协商","aria-hidden":"true"}},[t._v("#")]),t._v(" 数据协商")]),t._v(" "),s("h3",{attrs:{id:"redirect"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#redirect","aria-hidden":"true"}},[t._v("#")]),t._v(" Redirect")]),t._v(" "),s("h3",{attrs:{id:"csp"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#csp","aria-hidden":"true"}},[t._v("#")]),t._v(" CSP")]),t._v(" "),s("h2",{attrs:{id:"nginx-代理以及面向未来的-http"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx-代理以及面向未来的-http","aria-hidden":"true"}},[t._v("#")]),t._v(" nginx 代理以及面向未来的 http")]),t._v(" "),s("p",[t._v("nginx 是纯粹的做 http 服务的\nmac 用 homebrew 装\nnginx 文件会放在 "),s("code",[t._v("/usr/local/etc/nginx")]),t._v(" 下面\nnginx 的代理功能和缓存功能\nnginx.conf 是 server 的配置文件")]),t._v(" "),s("h3",{attrs:{id:"安装和基础配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装和基础配置","aria-hidden":"true"}},[t._v("#")]),t._v(" 安装和基础配置")]),t._v(" "),s("h3",{attrs:{id:"nginx-代理配置和代理缓存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nginx-代理配置和代理缓存","aria-hidden":"true"}},[t._v("#")]),t._v(" nginx 代理配置和代理缓存")]),t._v(" "),s("h3",{attrs:{id:"https-解析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#https-解析","aria-hidden":"true"}},[t._v("#")]),t._v(" https 解析")]),t._v(" "),s("h3",{attrs:{id:"使用-nginx-部署-https-服务"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用-nginx-部署-https-服务","aria-hidden":"true"}},[t._v("#")]),t._v(" 使用 Nginx 部署 https 服务")]),t._v(" "),s("h3",{attrs:{id:"http2-的优势和-nginx-配置-http2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http2-的优势和-nginx-配置-http2","aria-hidden":"true"}},[t._v("#")]),t._v(" http2 的优势和 nginx 配置 http2")])])}],!1,null,null,null);r.options.__file="http.md";a.default=r.exports}}]);