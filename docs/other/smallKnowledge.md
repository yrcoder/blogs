# 小知识点

## 电商所用技术

-   商品数量过大，查询困难，后台必须采用类似百度一样的技术
-   商品数量过大，图片过多，后台需要开发大文件处理服务
-   客服，即时通信技术，前端要 websocket 技术，可能会用到 node 服务器
-   简单的分布式服务器架构：文件处理服务 + 即时通讯服务 + 搜索引擎服务 + 核心业务（订单，商品，支付）

## 表达式的单线程执行

```js
let a = new Proxy(
	{ count: 0 },
	{
		get: function(target, key, reciver) {
			console.log('111')
			return target[key]++
		},
		set: function(target, key, value, reciver) {
			if (value === 23) {
				target[key] = value
			} else {
				throw Error('error')
			}
		},
	}
)

if (a.count === 0 && a.count === 1 && a.count === 2) {
	console.log(1)
}
```

# 正则例子

json 字符串，number
两位小数
"(-?\d+(.\d{1,2})?)"
\$1
4 位小数
"(-?\d+(.\d{1,4})?)"
