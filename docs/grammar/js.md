# JavaScript

## js 面试技巧

基础工程师：基础知识
高级工程师：项目经验
架构师：解决方案

### 几个面试题

-   typeof 能得到哪些类型 `==>` 考点：数据类型
-   === 和 == `==>` 考点：数据类型强制转换
-   window.onload 和 DOMContentLoaded 的区别 `==>` 考点：浏览器渲染过程
-   用 js 创建 10 个 a 标签，点击的时候弹出对应的序号 `==>` 考点：作用域 (为什么不是事件委托？)
-   简述如何实现一个模块加载器，实现类似 require.js 的基本功能 `==>` 考点：模块化
-   实现数组的随机排序 `==>` js 基础算法

## js 基础知识

原型，原型链
作用域，闭包
异步，单线程

### 原型，原型链
知识点
1. 构造函数
```js
function Foo(name,age) {
    this.name = name
    this.age = age
    this.class = 'class-1'
    // return this // 默认有这一行
}

const f = new Foo('lyr', 20) // new 的时候this会先变成一个空对象，

// 扩展
const a = {}; 是 const a = new Object() 的语法糖
const a = []; 是 const a = new Array() 的语法糖
function Foo() {} 是 const a = new Function() 的语法糖

// 使用 instanceof 判断一个函数是否是一个变量的构造函数
// 判断变量是不是数组
// 变量 instanceof Array
```
2. 原型规则和实例, 原型链和instanceof
* 所有的引用类型除了null（数组，对象，函数）都具有对象的特性，可自由扩展属性
* 所有的引用类型除了null（数组，对象，函数）都具有__proto__属性(隐式原型), 属性值是一个普通的对象
* 所有的函数都有一个prototype属性(显式原型), 属性值也是一个普通的对象
* 所有的引用类型除了null（数组，对象，函数）, __proto__属性值指向它的构造函数的prototype属性值
* 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的__proto__(也就是它的构造函数的prototype)中寻找

```js
const obj = {}
const arr = []
function fn() {}
// 所有的引用类型除了null（数组，对象，函数）都具有对象的特性，可自由扩展属性
obj.a = 100
arr.a = 100
fn.a = 100
// 所有的引用类型除了null（数组，对象，函数）都具有__proto__属性, 属性值是一个普通的对象
console.log(obj.__proto__)
console.log(arr.__proto__)
console.log(fn.__proto__)
// 所有的函数都有一个prototype属性, 属性值也是一个普通的对象
console.log(fn.prototype)
// 所有的引用类型除了null（数组，对象，函数）, __proto__属性值指向它的构造函数的prototype属性值
console.log(obj.__proto__ === Object.prototype)
// 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的__proto__(也就是它的构造函数的prototype)中寻找
function Foo(name, age) {
    this.name = name // this指的时实例f
}
Foo.prototype.alertName = function() {
    alert(this.name) // this指的时实例f
}
const f = new Foo('lyr')
f.printName = function() {
    console.log(this.name) // this指的时实例f
}
f.printName()
f.alertName()
for (var item in f) {
    if(f.hasOwnProperty(item)) {
        // 只遍历本身的属性，不遍历原型的属性
        // 高级浏览器已经在for in中屏蔽的来自原型的属性
    }
}

// 原型链
f.toString() // 要去f.__proto__.__proto__ ... 中去找

// instanceof
f instanceof Foo; // f的__proto__ 一层一层往上，能否对应到 Foo.prototype
f instanceof Object; // f的__proto__ 一层一层往上，能否对应到 Object.prototype
```

题目1: 如何准确判断一个变量是数组类型: `arr instanceOf Array`
题目2: 描述new一个对象的过程
1. 创建一个新对象
2. this指向这个新对象
3. 执行代码，即对this赋值
4. 返回 this
题目3: 写一个原型链继承的例子
```js
// 封装dom查询到例子
function Elem(id) {
    this.elem = document.getElementById(id)
}
Elem.prototype.html = function(val) {
    var elem = this.elem
    if(val) {
        elem.innerHTML = val
        return this // 链式操作
    } else {
        return elem.innerHTML
    }
}
Elem.prototype.on = function(type, fn) {
    var elem = this.elem
    elem.addEventListener(type, fn)
    return this // 链式操作
}

var div1 = new Elem('div1')
console.log(div1.html())
div1.html('<a>点击</a>').on('click', function() {
    console.log(111)
})
```

### 作用域，闭包
知识点：
1. 执行上下文
js 是解释型语言, 在函数执行之前会把变量定义和函数声明先拿出来占个位，然后解析
范围: 一段script或者一个函数
全局(script): 变量定义, 函数声明
函数: 变量定义, 函数声明, this, arguments

PS: 函数声明 不是 函数表达式 `const a = function() {}`

```js
console.log(a) // undefined
var a = 100
// 等价于
var a = undefined
console.log(a)
a = 100

fn('lyr') // 'lyr' 20
function fn(name) {
    age = 20
    console.log(name, age)
    var age

    console.log(this)
    console.log(arguments)
}
// 等价于
function fn(name) {
    var age
    age = 20
    console.log(name, age)

    console.log(this) // window
    console.log(arguments)
}
fn('lyr')
```

2. this
this在执行时才能确认值, 定义时无法确认
执行的场景：
作为构造函数执行: this指的是实例
作为对象属性执行: this指的是那个对象
作为普通函数执行: this指的是window
call apply bind: this是绑定的那个对象
```js
const a = {
    name: 'a',
    fn: function() {
        console.log(this.name)
    }
}
const b = {name: 'b'}
a.fn() // this === a
a.fn.call(b) // this === b
const fn = a.fn
fn() // this === window

// 构造函数
function Foo(name) {
    const this = {}
    this.name = name
    return this
}
const f = new Foo('lyr')

// call apply bind
function fn1(name, age) {
    console.log(name, this)
}
fn1.call({x: 100}, 'call', 20)
fn1.apply({x: 200}, ['apply', 20])

const fn2 = function(name, age) {
    console.log(name, this)
}.bind({x: 300})
fn2('bind', 20)
```

3. 作用域
没有块级作用域(大括号)
只有函数和全局作用域
es6中有块级作用域
```js
// 没有块级作用域
if(true) {
    var name = 'lyr'
}
console.log(name) // lyr

for(var i = 0; i < 10; i++) {}
console.log(i) // 10
// es6
if(true) {
    const age = 10
}
console.log(age) // error: age is not defined

for(let i = 0; i < 10; i++) {}
console.log(i) // i is not defined
// 函数和全局作用域
var a = 100
function fn() {
    var a = 200
    console.log('fn', a)
}
console.log('global', a)
fn()
```
4. 作用域链
自由变量：当前作用域没有定义的变量
```js
// 定义时的父级作用域
var a = 100
function fn1() {
    var b = 200
    function fn2() {
        var c = 300
        console.log(a, b, c)
    }
    fn2()
}
fn1()
```
5. 闭包
```js
// 父级作用域是定义时候的作用域，而不是执行时候的作用域

// 函数作为返回值
function F1() {
    var a = 100
    const b = function() {
        console.log(a) // a 自由变量，向父级作用域去寻找 -- 函数定义的父级作用域
    }
    return b
}
var f1 = F1() // f1 === b
var a = 2000
f1() // 100, 函数执行是全局作用域

// 函数作为参数
function F1() {
    var a = 100
    const b = function() {
        console.log(a) // a 自由变量，向父级作用域去寻找 -- 函数定义的父级作用域
    }
    return b
}
var f1 = F1() // fn === b
function F2(fn) {
    var a = 300
    fn()
}
F2(f1)
```

题目1: 对变量提升的理解
题目2: this几种不同的使用场景
题目3: 创建10个a标签，点击弹出对应的序号
```js
// 错误
var i, a
for(i = 0; i<10;i++) {
    a = document.createElement('a')
    a.innerHTML = i + '<br>'
    a.addEventListener('click', function(e) {
        e.preventDefault()
        alert(i) // 自由变量，要去父作用域取值, 所有点击的结果都是10
    })
}
// 正确
var i, a
for(i = 0; i<10;i++) {
    (function(i) {
        a = document.createElement('a')
        a.innerHTML = i + '<br>'
        a.addEventListener('click', function(e) {
            e.preventDefault()
            alert(i) // 自由变量，要去父作用域取值
        })
    })(i)
}
```
题目4: 如何理解作用域
    自由变量，作用域链，即自由变量的查找，闭包的两个场景
题目5: 实际开发中闭包的应用：封装变量，收敛权限
```js
function isFirstLoad() {
    var _list = []
    return function(id) {
        if(_list.indexOf(id) >= 0) {
            return false
        } else {
            _list.push(id)
            return true
        }
    }
}
var firstLoad = isFirstLoad()
firstLoad(10) // true
firstLoad(10) // false
firstLoad(20) // true
```
### 异步，单线程
知识点:
1. 什么是异步:
同步: 阻塞
异步: 执行完之后在回来执行。
等待的场景都需要异步
定时任务: setTimeout, setInverval
网络请求: ajax, 动态img加载
事件绑定
2. 前端使用异步的场景
3. 异步和单线程

题目1: 同步和异步的区别？各举一例
题目2: 一个关于setTimeout的笔试题
题目3: 前端使用异步的场景
```js
// alert() 同步

// 结果：start, end, ajax
console.log('start')
$.get('/a.json',function(data) {
    console.log('ajax')
})
console.log('end')

// 结果：start, end, img
console.log('start')
const img = document.createElement('img')
img.onload = function() {
    console.log('img')
}
// img.onerror = function() {
//     console.log('onerror')
// }
console.log('end')

// 结果：start, end, button
console.log('start')
const btn = document.getElementById('btn')
btn.addEventListener('click', function() {
    console.log('btn')
})
console.log('end')

// 异步和单线程
console.log(1)
setTimeout(function() {
    console.log(2)
})
console.log(3)

```
### 其他
知识点
```js
// 日期和math
Date.now() // 当前时间毫秒数
const dt = new Date()
dt.getTime() // 毫秒数
dt.getFullYear() // 年
dt.getMonth() // 月 0-11
dt.getDate() // 日 0-31
dt.getHours() // 时 0-23
dt.getMinutes() // 分 0-59
dt.getSeconds() // 秒 0-59

获取随机数 Math.random()
// 数组和对象
const arr = [1, 2, 3]
arr.forEach((item, index) => {
    console.log(item, index)
})
arr.every((item, index) => {
    if(item < 5) {
        return true
    }
})
arr.some((item, index) => {
    if(item < 5) {
        return true
    }
})

arr.filter((item, index) => {
    if(item < 2) {
        return true
    }
})
arr.sort((a, b) => (a-b))
arr.map((item, index) => {
    return
})

const obj = {a: 1, b: 2}
var key
for(key in obj) {
    if(obj.hasOwnProperty(key)) {
        console.log(key, obj[key])
    }
}
```

1. 获取 2017-06-10 格式的日期
```js
function formatDate(dt) {
    if(!dt) {
        dt = new Date()
    }
    const year = dt.getFullYear()
    const month = dt.getMonth() + 1
    const date = dt.getDate()
    if(month < 10) {
        month = '0' + month
    }
    if(date < 10) {
        date = '0' + date
    }
    return `${year}-${month}-${date}`
}
```
2. 获取随机数，要求是长度一致的字符串格式
```js
const random = Math.random()
random = random = '0000000000'
random = random.slice(0, 10)
console.log(random)

```
3. 一个能遍历对象和数组的通用的forEach函数
```js
function forEach(obj, fn) {
    var key
    if (obj instanceof Array) {
        obj.forEach((item, index) => fn(index, item))
    } else {
        for(key in obj) {
            if(obj.hasOwnProperty(key)) {
                fn(key, obj[key])
            }
        }
    }
}
// 应用
const arr = [1,2,3]
const obj = { x: 1, y: 2}
forEach(arr, (index, item) => {
    console.log(index, item)
})
forEach(obj, (key, val) => {
    console.log(index, item)
})
```

## js-web-api
JS基础知识： ECMA 262标准：定义js基础相关的东西，包括变量类型、原型、作用域、异步（Object, Array, Boolean, String, Math, JSON等）
js-web-api： W3C标准：定义js操作页面的API和全局变量(window, document, navigator.userAgent等)
W3C js相关：DOM 操作、BOM操作、Ajax（包括http协议）、事件绑定、存储（W3C还包括CSS和HTML）

### DOM 操作
Document Object Model: 文档对象模型
知识点：
1. DOM 本质
xml: 可扩展的语言，可以描述任何一个结构化的数据, 标签组成的树，标签可以自定义
html: 特殊的xml，就是一个字符串。这个文件要让js可以处理，就要转化，什么好处理，结构化的东西好处理，浏览器把这个字符串结构化成树，每个元素就是一个对象，让js可以操作。
DOM: 浏览器把拿到等html代码，结构化一个浏览器可以识别并且js可以操作的一个模型。
2. DOM节点操作
Attribute: 标签的属性 style, getAttribute, setAttribute 赋值，取值
prototype: js对象的属性，className 像普通的一样 赋值，取值
```js
// 获取dom节点
docuemnt.getElementById('div1') // 元素
document.getElementsByTagName('div') // 集合
document.getElementsByClassName('.container') // 集合
const pList = document.querySelectorAll('p') // 集合
集合就是类数组: length, arr[0]
const p = pList[0]
p.style.width // 获取样式
p.style.width = '100px' // 修改样式
p.className // 获取class
p.className = 'p1' // 修改class

// prototype
p.nodeName // p 获取元素标签名
p.nodeType // 获取元素标签类型
const obj = { a: 111, b: 222} // obj.a 就是prototype

// Attribute
p.getAttribute('data-name')
p.setAttribute('data-name', 'lyr')
p.getAttribute('style')
p.setAttribute('style', 'font-size: 20px;')
```
3. DOM结构操作（一个树的操作）
新增节点
获取父元素
获取子元素
删除节点
遍历，递归什么的
```js
// 新增节点
var div1 = document.getElementById('div1')
// 新增新节点
var p1 = document.createElement('p')
p1.innerHTML = '1111'
div1.appendChild(p1)
// 移动已有节点(原来的地方就没有了)
var p2 = document.getElementById('p2')
div1.appendChild(p2)
// 获取父元素
p1.parentElement
div1.parentElement
// 获取子元素
div1.childNodes // 数组 [text, p#p1, text, p#p2, text] 会把换行，空格等作为文本显示出来
// 把空节点获取出来，nodeType === 3 是text，nodeType === 1是常规的标签节点。nodeName === 'P' nodeName=== '#text'
// 删除节点
const childNodes = div1.childNodes
div1.removeChild(childNodes[1])
```
题目1: DOM是哪种基本的数据结构？
树
题目2: DOM操作的常用API？
获取DOM节点，以及节点的property和Attribute
获取父节点，子节点
新增节点，删除节点
题目3: DOM节点等attr和property有什么区别？
property: 只是一个js对象的属性修改
attribute：是对html标签属性的修改

### BOM操作
Browser Object Model：浏览器对象模型
知识点
navigator
screen
location
history
```js
// navigator
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')
// screen
screen.width
screen.height
// location
location.href // 全部
location.protocol // 协议 http
location.host // 域名 XXX.com
locatoin.pathname // /aaa.html
location.search // ?a=1111
location.hash // #mid=100
// history
history.back()
history.forward()
```
题目1: 检测浏览器的类型
题目2: 解析url的各部分

### 事件绑定
知识点：
1. 通用事件绑定
2. 事件冒泡
3. 代理
```js
// 一个通用的事件监听函数
var btn = document.getElementById('btn1')
btn.addEventListener('click', function(event) {
    console.log('clicked')
})
function bindEvent(elem, type, fn) {
    elem.addEventListener(type, fn)
}
var a = document.getElementById('link1')
bindEvent(a, 'click', function(e) {
    e.preventDefault() // 阻止默认行为
    alert('clicked')
})
// IE兼容问题
attachEvent

// 事件冒泡, 先触发本身节点事件-->父级元素事件--> ... --> body事件
var child = document.getElementsByTagName('a')
var wrap = document.getElementById('wrap')
var body = document.body
e.stopPropatation() // 阻止冒泡，child不会触发wrap和body事件
// 代理(会随时增加子元素)
wrap.addEventListener('click', function(e) {
    const target = e.target // 事件在哪儿触发的就是target
    if(target.nodeName === 'A') {
        alert(target.innerHTML)
    }
})
```
题目1: 编写一个通用的事件监听函数
```js
function bindEvent(elem, type, selector, fn) {
    if(fn === null) {
        fn = selector
        selector = null
    }
    elem.addEventListener(type, function(e) {
        var target
        if(selector) {
            target = e.targert
            if(target.matches(selector)) {
                fn.call(target, e)
            }
        } else {
            fn(e)
        }
    })
}

// 使用代理
var wrap = document.getElementById('wrap')
bindEvent(wrap, 'click', 'a', function(e) {
    console.log(this.innerHTML)
})
// 不适用代理
var child = document.getElementById('a1')
bindEvent(child, 'click', function(e) {
    console.log(child.innerHTML)
})
```
题目2: 描述事件冒泡流程
DOM 树形结构
冒泡
阻止冒泡
题目3: 对于一个无限下拉加载图片的页面，如何给每个图片绑定事件
代理
### Ajax
知识点：
1. XMLHttpRequest
```js
// XMLHttpRequest
// IE低版本使用 ActiveXObject
var xhr = new XMLHttpRequest()
xhr.open('GET', '/api', false)  // false说明是异步
xhr.onreadystatechange = function() {
    // 这个函数是异步执行的
    if(xhr.readyState === 4) {
        if(xhr.status === 200) {
            alert(xhr.responseText)
        }
    }
}
xhr.send(null)
```
2. 状态码
readyState:
0:未初始化，还没有调用send()方法
1:载入，已经调用send()方法， 正在发送请求
2:载入完成，send()方法执行完成，已经接收全部响应内容
3:交互，正在解析响应内容
4:完成，响应内容解析完成，可以在客户端调用了
status：
2XX: 成功处理请求，如200
3XX: 需要重定向，浏览器直接跳转
4XX：客户端请求错误，404, 未定义的地址
5XX：服务器端错误，500
3. 跨域
前端解决跨域：JSONP
服务器端设置 http header`response.setHeader("Access-Control-Allow-Origin", "http://a.com, http://b.com")`
跨域：浏览器的同源策略，不允许ajax访问其他域的接口，跨域条件：协议、域名、端口，有一个不同就是跨域
但是有3个标签允许跨域加载资源
`<img src="">` 图片提供方可以做一个防盗链的处理,可以用于大点统计，统计网站可能是其他域
`<link href=""></link>` 可以用CDN
`<script src=""></script>`
加载 http://aaa.bbb.com/xxx.html, 服务器不一定真的有一个xxx.html文件, 服务器可以根据请求，动态生成一个文件，返回
同理 `<script src="http://aaa.bbb.com/xxx.html"></script>`
```html
<script>
window.callback = function(data) {
    // 这是我们跨域得到的信息
    console.log(data)
}
</script>
<!-- /该srcipt返回 callback({a: 100, b:200, c: 300}) -->
<script src="ttp://aaa.bbb.com/xxx.js"></script>
```

题目1: 手动编写一个ajax，不依赖三方库
题目2: 跨域的几种实现方式

### 存储

题目1: 描述一下cookie, sessionStorage 和 localStorage 的区别
cookie: 本身用于客户端和服务器端通信，它本身有本地存储功能是被借用的。
使用 document.cookei = xxx 获取和修改内容
存储量：4KB
所有http请求都带着
sessionStorage 和 localStorage
存储量：5M
setItem(key, value)
getItem(key)
IOS safari隐藏模式下，localStorage.getItem会报错，建议统一使用try-catch封装

## 开发环境

版本管理--git
模块化
打包工具
上线回滚

### 版本管理

### 模块化

### 打包工具

## 运行环境

页面渲染
性能优化

浏览器可以通过访问链接来得到页面的内容
通过绘制和渲染，显示出页面的最终样子
整个过程中，我们需要考虑什么问题？

1. 页面加载过程
2. 性能优化
3. 安全性

### 页面渲染

题目 1: 从输入 url 到得到 html 的详细过程
题目 2: window.onload 和 DOMContentLoaded 的区别

-   加载资源的形式
    -   输入 url(或者跳转页面)加载 html（如：http:baidu.com）
    -   加载 html 中的静态资源（js 文件，css 文件，图片等等）
-   加载一个资源的过程
    1. 浏览器根据 DNS 服务器得到域名的 IP 地址
    2. 向这个 IP 的机器发送一个 http 请求
    3. 服务器收到，处理并返回 http 请求
    4. 浏览器得到返回内容
-   浏览器渲染页面的过程
    1. 根据 html 结构生成一个 DOM Tree
    2. 根据 css 生成 CSSOM （DOM Tree, 和 CSSOM 都是结构化处理）
    3. 将 DOM 和 CSSOM 整合成 RenderTree
    4. 根据 RenderTree 开始渲染和展示
    5. 遇到`<script>`时，会执行并阻塞渲染（因为 js 会改变 DOM，所以，js 执行完之后才会继续渲染 RenderTree）

为什么把 css 文件放在 head 中 ？
因为 html 文件是顺序执行的。如果 css 放在 dom 后面，当渲染 dom 的时候会先按照默认的样式渲染，渲染完后发现还有 css 文件就会再渲染一次。
页面会出现跳动或者卡住的状况，性能太差

为什么把 js 文件在 body 后面 ？
因为 js 可以改变 dom 的结构或者内容。js 又是阻塞渲染，放在 html 前面 dom 还没有渲染，无法操作。js 放下面会让页面更快的出来

window.onload 和 DOMContentLoaded 的区别 ？
window.onload：是把所有资源全部加载完才会执行，包括图片视频等
DOMContentLoaded：dom 渲染完即可执行，此时图片视频没有加载完

window.addEventListener('load', function() {
执行该段 js 文件等的时间较长
})
window.addEventListener('DOMContentLoaded', function() {
执行该段 js 文件等的时间较短
})

### 性能优化

-   多使用内存，缓存或者其他方法
-   减少 cpu 计算，减少网络

入手：

-   加载页面和静态资源
    -   静态资源的合并压缩（webpack 打包）
    -   静态资源缓存
    -   使用 CDN 让资源加载更快（在不同区域访问，cnd 会转到就近的地址访问）
    -   使用 ssr 后端渲染，数据直接输出到 html 中（而不是前端写页面，在 ajax 请求数据）
-   页面渲染
    -   css 放在前，js 放在后面
    -   懒加载（图片懒加载，下拉加载更多）
    -   减少 dom 查询，对 dom 查询做缓存
    -   减少 dom 操作，多个 dam 尽量合并在一起执行
    -   事件节流
    -   尽早执行操作（DOMContentLoaded）

```html
<!-- 静态资源缓存：通过链接名称控制缓存，名字变了，链接名称才改变
 <script src="abc_1.js"></srcript> -->

<!-- 懒加载：图片，先用一个很小的图片占位，等页面加载好之后用js获取真正的图片地址 -->
<img id="myImg" src="small.png" data-realsrc="abc.png" />
<script>
	const img1 = document.getElementById('myImg')
	img1.src = img1.getAttribute('abc.png')
</script>

<!-- 缓存DOM查询 -->
<script>
	// 没有缓存
	let i
	for (i = 0; i < document.getElementsByTagName('p').length; i++) {}
	// 缓存
	let i
	const pList = document.getElementsByTagName('p')
	for (i = 0; i < pList.length; i++) {}
</script>

<!-- 合并DOM插入 -->
<script>
	const listNode = document.getElementById('list')
	// 要插入10个li标签
	// createDocumentFragment不会触发dom操作
	const frag = document.createDocumentFragment()
	let x, li
	for (x = 0; x < 10; x++) {
		li = document.createElement('li')
		li.innerHTML = 'List item'
		frag.appendChild(li)
	}

	listNode.appendChild(frag)
</script>

<!-- 事件节流 -->
<script>
	const textarea = document.getElementById('text');
	const timeoutId
	textarea.addEventListener('keyup', () => {
	    if(timeoutId) {
	        clearTimeout(timeoutId)
	    }
	    timeoutId = setTimeout(() => {
	           // 连着输入的时候不超过100ms就什么都不管
	    }, 100)
	})
</script>
```

### 安全性

XSS：跨站请求攻击，在 input 等输入框中插入 script 脚本，写一段程序，
预防：把 < 替换为 `&lt;` > 替换为 `&gt;`，前端替换影响性能，后台替换比较好

XSRF：跨站请求伪造，当你在 A 站生成一个订单，别人收到一个有同样订单信息的的图片，点击之后别人就替你付费了
预防：增加验证流程，如指纹，密码，短信验证码

### 面试技巧

简历：
简单明了，重点突出项目经历和解决方案
博客放入简历中，定期维护更新博客
开源项目

过程中：
加班就像借钱，救急不救穷
千万不要挑战面试官，不要反考面试官（素质）
遇到不会的问题，说出知道的就可以

# 高级 js 面试

## 高级基础

ES6 常用语法 - Class Module Promise
原型高级应用 - 结合 JQ 和 zepto 源码
异步全面讲解 - 从 JQ 再到 promise
虚拟dom - 存在价值，如何使用，diff算法
vue - MVVM, vue响应式, 模版解析， 渲染
React - 组件化，jsx, vdom, setState
hybrid - 基础，和h5对比，上线流程
通讯 - 通讯原理，JS-Bridge封装


### ES6 常用语法

题目1: ES6 模块化如何使用，开发环境如何打包
1. 模块化的基本语法
```js
export default {
    a: 100
}
import utils from './utils'
export function fn1 {}
export const a = {}
import {fn1, a } from './utils'
```
2. 开发环境配置
babel: 将es6转换成es5
webpack: 打包编译，模块化
rollup: 对vue，react等库项目打包

```bash
# babel
npm init
npm install babel-core --save-dev
npm install babel-preset-es2015 babel-preset-latest --save-dev  # 两个preset
创建.babelrc文件
{
    "preset": ["es2015", "latest"], # 最后一个单词是别名
    "plugins": []
}
npm install babel-cli --global
babel --version
创建 index.js文件
运行 babel ./index.js 编译

# webpack
npm install webpack webpack-cli babel-loader@7 --save-dev
配置 webpack.config.js

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: './build/bundle.js'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
        }]
    }
}

配置 package.json 中的scripts
"scripts": {
    "start": "webpack",
}
运行 npm start

# rollup , 暂时放弃，报错解决不了
npm init
npm i rollup rollup-plugin-node-resolve rollup-plugin-babel --save-dev # rollup
npm i @babel/core babel-plugin-external-helpers babel-preset-latest --save-dev # babel
配置 .babelrc
{
    "presets": [
        [
            "latest",
            {
                "es2015": {
                    "modules": false
                }
            }
        ]
    ],
    "plugins": [
        "external-helpers"
    ]
}
# 配置 rollup.config.js

import babel from 'rollup-plugin-babel'
import resolve from "rollup-plugin-node-resolve"

export default {
    entry: 'src/index.js',
    format: 'iife', # amd /  es6 / iife / umd
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**'
        })
    ],
    dest: 'build/bundle.js'
}
# 配置 package.json
"scripts": {
    "start": "rollup -c rollup.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```
3. js的众多模块化标准
AMD： require.js, CMD：commonjs
ES6: import export

```js
```

题目2: class 与 js 构造函数的区别
new 一个对象，以构造函数为模版创造一个对象。该对象有方法有属性，在构造函数中操作将要创造的新对象就叫this
class 是构造函数的语法糖
```js
// JS 构造函数
function Test(x,y) {
    this.x = x;
    this.y = y
}
Test.prototype.add = function() {
    return this.x + this.y
}
const test = new Test(1,2)
console.log(test.add())
// class 基本语法
// typeof Test // function
// Test === Test.prototype.constructor
// test.__proto__ === Test.prototype
class Test extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    render() {
        return (<div>hello</div>)
    }
    componentDidMount() {}
}
class Test {
    constructor(x,y) {
        this.x = x
        this.y = y
    }
    add() {
        return this.x + this.y
    }
}
const test = new Test(1,2)
console.log(m.add())
// 继承
function Animal() {
    this.eat = function() {
        console.log('animal eat')
    }
}
function Dog() {
    this.bark = function() {
        console.log('dog bard')
    }
}
Dog.prototype = new Animal()
const hashiqi = new Dog()

class Animal {
    constructor(name) {
        this.name = name
    }
    eat() {
        console.log(this.name, 'eat')
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name) // 指的就是 Animal, 就是 Animal.prototype.constructor, 只要有extents就要把super() 写上
        this.name = name
    }
    say() {
        console.log(this.name, 'say')
    }
}
const dog = new Dog('哈士奇')
dog.say()
dog.eat()
```

题目3: promise 的基本使用和原理
promise解决callback hell
new Promise 实例，而且要return
new promise 时要传入函数，函数有 resolve reject两个函数
成功时执行resolve() 失败时执行reject()
then监听结果
```js
// promise方法定义
function loadImg(src) {
    return new Promise(function(resolve, reject) {
        const img = document.createElement('img')
        img.onload = function() {
            resolve(img)
        }
        img.onerror = function() {
            reject()
        }
        img.src = src
    })
}
// promise方法使用
const src = "http://xxx.png"
const result = loadImg(src)

result.then(function(img) {
    console.log(img.width)
}, function() {
    console.log('failed')
})
// 可以分步骤写很多个回调函数
result.then(function(img) {
    console.log(img.height)
}, function() {
    console.log('failed')
})
```

题目4: ES6 其他常用功能

let/const
模版变量
解构赋值
块级作用域
函数默认参数
箭头函数（this指向绑定）

```js
const obj = {a: 10, b: 20, c: 30}
const { a, b } = obj
const arr = [1,2,3]
const [x,y,z] = arr // x === arr[0] y === arr[1] z === arr[2]

for(let item in obj) { // var就可以在外部访问到了
    console.log(item)
}
// 编译之后为
for(var _item in obj) {
    console.log(_item)
}
console.log(item) // undefined

function (a, b = 0) {}

() => {
    this // this指向函数体中最近的一层作用域, 而不是window
}
function fn() {
    console.log(this) // { a: 100}
    arr.map(item => {
        console.log(this) // { a: 100 }
    })
    arr.map(function(item) {
        console.log(this) // window
    })
}
fn.call({a: 100})
```

### 原型高级应用

原型如何实际应用

```js
// 使用
var $p = $('p')
var $div1 = $('#div1')
// css html 是原型方法
$p.css('color', 'red')
$p.html()
$div1.css('color', 'blue')
$div1.html()
// jq和zepto通过$()方法实例化对象，每个实例都可以从原型中访问到事先定义好的各种方法

// zepto(从下往上读)
(function(window) {
    var zepto = {}
    function Z (dom, selector) {
        var i, len = dom ? dom.length : 0
        for(i = 0; i<len; i++) {
            this[i] = dom[i]
        }
        this.length = len
        this.selector = selector || ''
    }
    zepto.Z = function(dom, selector) {
        // 出现了new关键字
        return new Z(dom, selector)
    }
    zepto.init = function(selector) {
        // 弱化了源码，只针对原型
        var slice = Array.prototype.slice
        const dom = slice.call(document.querySelectorAll(selector))
        return zepto.Z(dom, selector)
    }
    var $ = function(seletor) {
        return zepto.init(seletor)
    }
    window.$ = $

    $.fn = {
        constructor: zepto.z,
        css: function(key, value) {},
        html: function(value) {
            return 'html: 这是一个字符串'
        }
    }
    Z.prototype = $.fn
})(window)
// jq
(function(window) {
    var jQuery = function(selector) {
        return new jQuery.fn.init(selector)
    }

    jQuery.fn = {
        css: function() {console.log('css')},
        html: function() {return 111}
    }

    // 定义构造函数
    var init = jQuery.fn.init = function(selector) {
        var slice = Array.prototype.slice
        const dom = slice.call(document.querySelectorAll(selector))

        var i, len = dom ? dom.length : 0
        for(i = 0; i<len; i++) {
            this[i] = dom[i]
        }
        this.length = len
        this.selector = selector || ''
    }

    init.prototype = jQuery.fn

    window.$ = jQuery
})(window)
```

原型如何体现它的扩展性（jq,zepto 插件机制）
为什么要将原型赋值给 $.fn 或者 jQuery.fn ？
因为要扩展插件
```js
    // 一个简单的插件
    $.fn.getNodeName = function() {
        return this[0].nodeName
    }
    // 给$.fn增加一个新的属性,增加一个新的功能（一个插件）
    // 为什么要加在 $ 上面，而不是别的什么内部变量，因为只有$会暴露在window上
    // 将插件扩展统一到$.fn.xxx上面
```

### 异步全面讲解

题目1: 什么是单线程和异步有什么关系

单线程：只有一个线程，只能做一件事
原因：避免DOM渲染冲突（解决方案：异步）
浏览器需要渲染DOM,
js可以修改DOM结构
js执行的时候，浏览器DOM渲染会停止
两段js也不能同时执行（都修改DOM就冲突了）
webworker支持多线程，但是不能访问DOM
异步缺点：没有按照书写顺序执行，回调不容易模块化

题目2: 什么是 event-loop 事件轮询
异步的实现方案：event-loop
同步代码直接执行，异步函数放在 异步队列 中，同步代码执行完，轮询执行异步队列的函数
异步队列何时被放入：立即被放入，指定一段时间被放入，ajax请求成功之后被放入

题目3: 是否用过jQuery的Deferred（延迟）
jq1.5之后推出 Deferred
deferred: 无法改变js异步和单线程本质，只能从写法上杜绝 callback 这种形式，但是解耦了代码（语法糖），体现了开放封闭原则
promise标准: 任何不符合标准的东西，终将会被用户抛弃（全球的项目经理认证）
1. 状态变化：pending, fulfilled, rejected
初始状态pending
状态变化：不可逆
pending --> fulfilled
pending --> rejected
2. then
Promise实例必须实现then这个方法
then()必须接收两个函数作为参数，成功失败的回调函数
then()必须返回一个Promise实例，如果没有显式返回，默认就会返回then前面的那个实例

```js
// jq 1.5之前, 现在也可以这么写，但是1.5之前只支持这么写
var ajax = $.ajax({
    url: 'data.json',
    success: function() {
        console.log(1)
    },
    error: function() {
        console.log(0)
    }
})
console.log(ajax) // 返回一个 XHR 对象

// jq 1.5之后
var ajax = $.ajax('data.json')
ajax.done(function() {
    console.log(1)
}).fail(function() {
    console.log(0)
}).done(function() {
    console.log(222)
})
ajax.then(function() {
    console.log(1)
}, function() {
    console.log(0)
}).then(function() {
    console.log(1)
}, function() {
    console.log(0)
})
console.log(ajax) // 返回一个 deferred 对象

// deferred 应用1
var wait = function() {
    var task = function() {
        console.log('执行完成')
        // 1
        // 2
        // 3
    }
    setTimeout(task, 200)
}
wait()
// 在执行完task之后，还要进行一些复杂的操作
function waitHandle() {
    var dtd = $.Deferred()
    // 将 Deferred 适量 dtd, 进行一系列封装之后，返回
    var wait = function(dtd) {
        var task = function() {
            console.log('执行完成')
            dtd.resolve()
            // dtd.reject()
        }
        setTimeout(task, 2000)
        return dtd
    }

    // 返回值是 dtd
    return wait(dtd)
}

var w = waitHandle()
w.then(function() {
    console.log('ok1')
}, function() {
    console.log('error1')
})
w. then(function() {
    console.log('ok2')
}, function() {
    console.log('error2')
})

// dtd的API分为两类，用意不同
第一类：dtd.resolve dtd.reject（主动触发）
第二类：dtd.then dtd.done dtd.fail（被动受监听）
这两类要分开，在外部不能主动触发
var w = waitHandle()
w.reject() // 主动执行完之后，后面的then函数将执行失败的回调
w.then(function() {
    console.log('ok')
}, function() {
    console.log('error')
})
// 解决方法 promise(), 不再返回dtd实例，而是返回promise() 里面只有被动触发的方法
function waitHandle() {
    var dtd = $.Deferred()
    var wait = function(dtd) {
        var task = function() {
            console.log('执行完成')
            dtd.resolve()
            // dtd.reject()
        }
        setTimeout(task, 2000)
        return dtd.promise() // 只有被动触发的方法, 外部不能调用resolve，reject
    }
    return wait(dtd)
}
```

题目4: promise 的标准

```js
// 异常捕获
result.then(function() {
    // 只处理成功的函数
}).then(function() {
}).catch(function(error) {
    // 统一捕获异常
    // 语法报错，和reject报错都可以捕获
})
// 多个串联（A请求的结果是B请求的参数）
var resultA = loadImg(src1)
var resultB = loadImg(src2)
resultA.then(function(dataA) {
    console.log(dataA)
    return resultB
}).then(function(dataB) {
    console.log(dataB)
}).catch(function(ex) {
    console.error(ex)
})
// promise.all() 全部完成, promise.rece() 只有一个完成
// Promise.all Promise.rece 接收一个promise对象数组，待全部完成之后统一执行success
Promise.all([result1, result2]).then(datas => {
    console.log(datas, datas[0], datas[1])
})
Promise.race([result1, result2]).then(data => {
    // 最先执行完成的data
    console.log(data)
})
```

题目5: async/await 的使用(和promise的区别、联系)
then只是将callback拆分了
async/await 是可以用同步的方法写
await 后面必须跟一个Promise实例
需要 babel-polyfill
```js
const load = async function() {
    const result = await loadImg('http://xxx.png')
}
```

## 框架原理

虚拟 DOM - 存在价值，如何使用，diff 算法
MVVM vue - MVVM，vue 响应式，模版解析，渲染
组件化 React - 组件化，JSX，vdom， setState

### 虚拟 DOM(virtual dom)
vdom是一类库
vDom: 用js模拟DOM结构，DOM变化的对比放在js层来做（图灵完备的语言），提高重绘性能
图灵完备的语言：能实现各种逻辑的语言，能做到判断、循环、递归，能实现无限循环无限执行的语言，能实现高复杂逻辑的语言，能实现任何数学算法的语言。
题目1: vdom是什么，为何用会存在vdom?
DOM操作是昂贵的，js运行效率高
尽量减少dom操作，不要推到重来
```js
<ul id="list">
    <li class="item">item1</li>
    <li class="item">item2</li>
</ul>

// 用js模拟
{
    tag: 'ul',
    attrs: {
        id: 'list'
    },
    children: [{
        tag: 'li',
        attrs: {
            className: 'item', // class js的关键字, 所以用className
            children: ['Item 1']
        }
    }, {
        tag: 'li',
        attrs: {
            className: 'item',
            children: ['Item 2']
        }
    }]
}

// 用jq和vDOM分别实现：将一个对象数组展示成一个表格，当修改数组信息，表格也跟着修改。
<div id="container"></div>
<button id="btn-change">change</button>
const data = [{
    name: '张三',
    age: 20
}, {
    name: '李四',
    age: 21
}, {
    name: '王五',
    age: 22
}]
/*jq实现*/
// 每次改变table的整个都会改变，性能不好
// 渲染函数
function render(data) {
    var $container = $('#container')
    // 清空容器
    $container.html('')
    // 拼接table
    var $table = $('<table>')
    $table.append($('<th><td>name</td><td>age</td></th>'))
    data.forEach(item => {
        $table.append($(`<tr><td>${item.name}</td><td>${item.age}</td></tr>`))
    })
    // 渲染到页面
    $container.addend($table)
}
$('#btn-change').click(function() {
    // 修改某一行数据
    data[1].age = 30
    data[2].name = '朱六'
    // 再重新渲染 re-render
    render(data)
})
// 页面加载完立即执行（初次渲染）
render(data)
```
题目2: vdom 如何使用，核心API是什么？
snabbdom: 一个vdom的技术实现库
h('标签名', {...属性...}, [...子元素...])
h('标签名', {...属性...}, '...')
patch(container, vnode)
patch(vnode, newVnode)
```js
<ul id="list">
    <li class="item">item1</li>
    <li class="item">item2</li>
</ul>
var vnode = h('ul#list', {}, [
    h('li.item', {}, 'Item1'),
    h('li.item', {}, 'Item2'),
])
patch(doucment.getElementById('container'), vnode)
var newVnode = h('ul#list', {}, [
    h('li.item', {}, 'aaaaa'),
    h('li.item', {}, 'bbbbb'),
])
patch(vnode, newVnode) // 找出新的vnode和旧的有什么区别，然后替换

// 应用
// 引入snabbdom文件 有 snabbdom.js snabbdom-class.js snabbdom-props.js snabbdom-style.js snabbdom-eventlist.js h.js 这一堆文件
// 引入之后 window.snabbdom就已经有值了
var snabbdom = window.snabbdom
// 定义path
var patch = snabbdom.init([
    snabbdom_class,
    snabbdom_props,
    snabbdom_style,
    snabbdom_eventlisteners
])
// 定义h
var h = snabbdom.h
// 生成 vnode
var vnode = h('ul#list', {}, [
    h('li.item', {}, 'Item1'),
    h('li.item', {}, 'Item2'),
])
patch(doucment.getElementById('container'), vnode)
document.getElementById('btn-change').addEventListener('click', function() {
    // 生成 newVnode
    var newVnode = h('ul#list', {}, [
        h('li.item', {}, 'Item1'),
        h('li.item', {}, 'bbb'),
    ])
    patch(vnode, vnode)
})

/*重做demo*/
var vnode
function render(data) {
    var newVnode = h('table', {}, data.map(item => {
        var tds = []
        var i
        for(i in item) {
            if(item.hasOwnProperty(i)) {
                tds.push(h('td', {}, item[i] + ''))
            }
        }
        return h('tr', {}, tds)
    }))
    if(vnode) {
        // re-render
        patch(vnode, newVnode)
    } else {
        // 初次渲染
        patch(container, newVnode)
    }
    // 存储当前newVode结果
    vnode = newVnode
}

// 初次渲染
render(data)
// 更改变化
document.getElementById('btn-change').addEventListener('click', function() {
    data[1].age = 30
    data[2].name = '朱六'
    // re-render
    render(data)
})
```
题目3: 了解 diff 算法（vdom 的核心算法）
1. 什么是diff算法
linux命令: diff log1.txt log2.txt; 返回两个文件中哪里不一样
git命令: git diff ./index.js; 修改前后的不同
对比两个vDom的异同
2. vdom为何使用diff算法
dom操作要尽量减少，找出必须要更新的，其他不变，找出的过程就要diff算法
3. diff算法的实现流程
patch(container, vnode)
递归，vdom --> 真实的dom节点
patch(vnode, newVnode)
newVnode --> vnode，递归对比，真实的dom节点替换
```js
// patch(container, vnode)
function createElement(vnode) {
    const { tag, attrs, children } = vnode
    if(!tag) {
        return null
    }
    // 创建元素
    const elem = document.createElement(tag)
    // 属性
    let attrName
    for(attrName in attrs) {
        if(attrs.hasOwnProperty(attrName)) {
            elem.setAttribute(attrName, attrs[attrName])
        }
    }
    // 子元素
    children.forEach(childVnode => {
        // 给elem添加子元素
        createElement(childVnode)
    })
    // 返回真实的DOM元素
    return elem
}
// patch(vnode, newVnode)
// 根节点不会变，递归比较变化
function updateChildren(vnode, newVnode) {
    const children = vnode.children || []
    const newChildren = newVnode.children || []

    children.forEach((childVnode, index) => {
        const newChildVnode = newChildren[index]
        if(childVnode.tag === newChildVnode.tag) {
            // 一样，就深层次对比，递归
            updateChildren(childVnode, newChildVnode)
        } else {
            // 不一样，就替换, 替换需要真实的dom节点
            replaceNode(childVnode, newChildVnode)
        }
    })
}
function replaceNode(vnode, newVnode) {
    // 替换需要真实的dom节点
    const elem = vnode.elem
    const newElem = createElement(newVnode)
    // dom替换
}
```
### MVVM vue
BootCDN 引入jq等框架

题目1: 使用jq和使用框架的区别（ vue 或者 react ）
数据和视图分离（解耦，开放封闭原则）：jq中都混在一起了，`var $li = $('<li>${title}</li>')`, ul只是一个空壳。
以数据驱动视图，只关心数据变化，DOM操作被封装：只改数据，不用管视图。jq是直接干预了dom，vue是只更改数据。DOM操作被封装。
```js
// jq 实现todo-list
<input type="text" name="" id="txt-title"/>
<button id="btn-submit">submit</button>
<ul id="ul-list"></ul>
const $txtTitle = $('#txt-title')
const $btnSubmit = $('#btn-submit')
const $ulList = $('#ul-list')
$btnSubmit.click(function() {
    const title = $txtTitle.val()
    if(!title) {
        return
    }
    var $li = $(`<li>${title}</li>`)
    $ulList.append($li)
    $txtTitle.val('')
})
// vue 实现todo-list
<div id="app">
    <input v-model="title"/>
    <button v-on:click="add">submit</button>
    <ul>
        <li v-for="item in list">{{item}}</li>
    </ul>
</div>
const vm = new Vue({
    el: '#app',
    data: {
        title: '',
        list: []
    },
    methods: {
        add: function() {
            this.list.push(this.title)
            this.title = ''
        }
    }
})
```

题目2: 如何理解 MVVM
MVC:
model: 数据
view: 视图，界面
controller： 控制器，逻辑处理
用户 --> view --> controller --> model --> view
用户 --> controller --> model --> view

MVVM:
view: 视图、模版（视图和模型是分离的）
model: 数据，模型，js对象
vm: viewModel, vue实例，链接view、model。view 通过事件监听操作model(v-on 和 methods), model通过数据绑定来操作view
MVVM三要素:
1. 响应式：vue如何监听到data的每个属性变化？ 我们只是 this.title = '' this.list.push(this.title)
2. 模版引擎：vue的模版如何被解析，指令如何处理？模版中并不是真正的html
3. 渲染：vue的模版如何被渲染成html? 以及渲染过程。

题目3: vue 如何实现响应式
关键是 Object.defineProperty
将data的属性代理到vm上

1. 什么是响应式？
修改data属性后，vue立刻监听到
data属性被代理到 vm 上
```js
// data.name, 被代理到vm上了, vm.name 就是data.name
var vm = new Vue({
    el: '#app',
    data: {
        name: 'lyr',
        age: 20
    }
})
```

2. Object.defineProperty IE9以上
```js
// 将对象属性到获取和设置都变成函数, 对象被访问时可以监听到，被设置到时候可以监听到
var obj = {}
var _name = 'lyr'
Object.defineProperty(obj, 'name', {
    get: function() {
        console.log('get')
        return _name
    },
    set: function(newVal) {
        console.log('set')
        _name = newVal
    }
})
console.log(obj.name) // 可以监听到
obj.name = '李月茹' // 可以监听到
```

3. 模拟
```js
// 模拟vue怎么监听name,age
// var vm = new Vue({
//     el: '#app',
//     data: {
//         name: 'lyr',
//         age: 20
//     }
// })

var vm = {}
var data = {
    age: 10,
    name: 'lyr'
}

var key, value
for(key in data) {
    // 命中闭包，新建一个函数，保证key的独立作用域
    (function (key) {
        // 将data属性代理到vm上, data是实例化的时候传进来到参数
        Object.defineProperty(vm, key, {
            get: function() {
                console.log('get')
                return data[key]
            },
            set: function(newVal) {
                console.log('set')
                data[key] = newVal
            }
        })
    })(key)
}
```

题目4: vue 如何解析模版
1. 模版是什么？
本质: 字符串
有逻辑: 如 v-if v-for等
与html格式很像, 但是有很大区别（html是静态的，没有逻辑）
最终要转换为html来显示
模版最终必须转化成js代码，因为：有逻辑（v-if v-for）必须使用js才能实现（图灵完备）；转换成html渲染页面，必须用js才能实现；因此模版最重要要转换成一个js函数（render函数）
* 模版：字符串，有逻辑，嵌入js变量...
* 模版必须转换成js代码（有逻辑，渲染html，js变量）
* render函数什么样子
* render函数执行返回vnode
* updateComponent
```js
// with的用法
var obj = {
    name: 'lyr',
    age: 20,
    getAddress: function() {
        console.log('aaa')
    }
}
// 不用with
function fn() {
    console.log(obj.name)
    console.log(obj.age)
    obj.getAddress()
}
fn()
// 使用with, with有解构的作用
function fn() {
    with(obj) {
        console.log(name)
        console.log(age)
        getAddress()
    }
}
```
2. render函数
模版中所有信息都包含在render函数中
this即vm
price 即this.price即vm.price，即data中的price
_c即this._c即vm._c
```js
<div id="app">
    <p>{{price}}</p>
</div>

// 模版最终转化为
function render() {
    with(this) {
        // this就是vm这个vue实例，_c === vm._c; _v === vm._v; _s === vm._s
        return _c(
            'div',
            {
                attrs: {"id": "app"}
            },
            [
                _c('p', [_v(_s(price))]) // _s 就是toString, _v创建文本节点，_c创建标签
            ]
        )
    }
}

// 从哪里可以看到render函数: 源码中搜索code.render, 打印,就可以找到模版的render函数
// 复杂一点儿的例子，render函数是什么样子的
// v-if v-for v-on都是怎么处理的
// vue2.0开始支持预编译，开发环境写模版，经过工具编译打包，生产环境就是js代码，即上面的render函数。
// react 组件化 jsx模版，经过编译生成js代码，jsx语法已经标准化。
    with(this) {
        return _c(
            'div',
            {
                attrs: {"id": "app"}
            },
            [
                _c('div', [
                    _c(
                        'input',
                        {
                            directives: [{
                                name: 'model',
                                rawName: 'v-model',
                                value: (title),
                                expression: 'title'
                            }],
                            domProps: {
                                value: (title)
                            },
                            on: {
                                input: function($event) {
                                    if($event) {
                                        return title = $event.target.value // vm.title = $event.target.value
                                    }
                                }
                            }
                        }
                    ),
                    _v(""),
                    _c("button", {
                        on: {
                            click: add // vm.add
                        }
                    }, [_v('submit')])
                ]),
                _v(""),
                _c("div", [
                    _c('ul', _l((list), function(item) { // vm._l 是个for循环
                        return _c('li', [_v(_s((item)))])
                    }))
                ])
            ]
        )
    }
```
3. render函数和vdom
vdom核心API: h函数，patch函数
vm._c其实相当于 snabbdom 中的h函数
render函数执行之后返回的是 vnode
updateComponent 实现了vdom的patch, 新旧对比
页面首次渲染执行updateComponent
data每次修改都执行updateComponent
```js

function updateComponent() {
    // vm._render 即上面的render函数，返回 vnode
    vm._update(vm._render())
}
vm._update(vnode) {
    const prevVnode = vm._vnode
    vm._vnode = vnode
    if(!prevVnode) {
        vm.$el = vm.__patch__(vm.$el, vnode)
    } else {
        vm.$el = vm.__patch__(prevVnode, vnode)
    }
}
```

题目5: 介绍 vue 的实现流程
第一步: 解析模版成render函数（h 函数）
* 模版打包的时候就解析成render函数了, 创建vnode的过程，添加属性，事件，解析指令等等。
* with的用法
* 模版中的所有信息都被render函数包含
* 模版中用到的data中的属性，都变成了js变量
* 模版中的v-model v-for v-on 都变成了js逻辑
* render 函数返回 vnode
第二步: 响应式开始监听
* Object.defineProperty
* 将data的属性代理到vm上（with）
第三步: 首次渲染，显示页面，且绑定依赖
* 初次渲染，执行updateComponent执行vm.render()
* 执行render函数，会访问到vm.list vm.title
* 会被响应式的get方法监听到，为什么不监听set（data中有很多属性，用到到走get，没用到不走。未走get的属性，set的时候也无需关心，避免不必要到重复渲染）
* 执行updateComponent,会走到vdom的patch方法
* patch将vnode渲染成DOM, 初次渲染完成
第四步: data属性变化，触发rerender
* 修改属性`this.title = 'aaa'`，被响应式的set监听
* set中执行 updateComponent
* updateComponent 重新执行vm._render()
* 生成vnode和preVnode，通过patch进行对比
* 渲染到html中

### 组件化 React
react以及组件化的一些核心概念
react的实现流程
```js
// to-do-list
class List extends component {
    render() {
        const list = this.props.data
        return <ul>
            {
                list.map((item, index) => <li key={index}>{item}</li>)
            }
        </ul>
    }
}

class Input extends component {
    state = {
        title: ''
    }
    changeValue(e) {
        this.setState({
            title: e.target.value
        })
    }
    submit() {
        this.props.addTitle(this.state.title)
        this.setState({
            title: ''
        })
    }
    render() {
        const { title } = this.state
        return <div>
            <input value={title} onChange={this.changeValue}/>
            <button onClick={this.submit}>submit</button>
        </div>
    }
}

class Todo extends component {
    state = {
        list: ['a', 'b', 'c'],
    }
    addTitle(title) {
        const currentList = this.state.list
        this.setState({
            list: currentList.concat(title)
        })
    }
    render() {
        const { list } = this.state
        return <div>
            <Input addTitle={this.addTitle}></Input>
            <List data={list}></List>
        </div>
    }
}

```
题目1: 对组件化的理解
1. 封装
把视图，数据,变化逻辑（数据驱动视图变化）封装起来：把我要的数据给我，其他就不用管了
2. 复用
props 传递数据: 不同的config展示不同的效果，复用

题目2: jsx 是什么
jsx和vue的模版一样，最终要渲染成html
jsx语法无法被浏览器解析
jsx解析成js才能运行
jsx成为一个独立到标准：说明本身功能已经完备，和其他标准兼容，扩展性没有问题

jsx其实是语法糖，开发环境将jsx编写成js代码，jsx的写法降低了学习成本和编码工作量，但是加大了debug工作量

编译jsx为js的插件
插件：npm i --save-dev babel-plugin-transform-react-jsx
配置 .babelrc：`{ "plugins": ["transform-react-jsx"]}`
执行命令：babel --plugins transform-react-jsx demo.jsx

```js
// jsx
<div>
    <img src="avatar.png" className="profile"/>
    <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>
// jsx会解析成
React.createElement('div', {id: 'div1'}, child1, child2, ...)
React.createElement('div', {id: 'div1'}, [...])

React.createElement('div', null,
    React.createElement('img', { src: 'avatar.png', className: 'profile'}),
    React.createElement('h3', null, [user.firstName, user.lastName].join(' ')),
)

React.createElement('ul', null, [1,2,3].map((item, index) => {
    return React.createElement('li', {key: index}, item)
}))
// 所以，react组件中必须引入React
```

题目3: jsx 和 vdom 的关系
为何需要vdom: jsx就是模版，最终要渲染成html，数据驱动视图，需要用vdom的方式渲染
React.createElement 和 h 都生成vnode, h函数第一次渲染是一个dom节点，React.createElement还可以是自定义组件
何时 patch：初次渲染 ReactDOM.render + 修改state后的re-render（正好符合vdom的应用场景）
* 初次渲染 - ReactDOM.render(<App />, container), 会触发patch(container, vnode), container === decument.getElementById('app')
* rerender - setState, 会触发patch(vnode, newVnode)

自定义组件的解析
自定义组件编译，第一个传入的是构造函数。
初始化实例然后执行render
* div直接渲染成<div>即可，vdom可以做到
* 自定义组件（class）,vdom默认不认识
* 因此，Input等自定义组件组件定义的时候必须声明render函数
* 根据props初始化实例，然后执行实例的render函数。render函数返回的还是vnode对象
```js
import Input from './input/index.js'
import List from './List/index.js'
function render() {
    render() {
        const { list } = this.state
        return <div>
            <Input addTitle={this.addTitle}></Input>
            <List data={list}></List>
        </div>
    }
}

// 编译为
import Input from './input/index.js'
import List from './List/index.js'
function render() {
    return React.createElement('div', null,
        React.createElement('Input', {addTitle: this.addTitle.bind(this)} ),
        React.createElement('List', {data: this.state.list} ),
    )
}

React.createElement('List', {data: this.state.list} )
// 等价于
var list = new List({data: this.state.list}) // 生成实例，返回实例的render函数
var vnode = list.render()
// 每个组件都返回一个render函数，不管有多少层组件，都会一层一层的执行render函数，最终转化成html
```
题目4: 简述 setState 的过程

setState的异步（为什么需要异步）
1. 可能会一次执行多次setState。
2. 你无法规定，限制用户如何使用setState
3. 没有必要每次setState都重新渲染，考虑性能
4. 即便是每次重新渲染，用户也看不到中间效果（js执行的时候，dom渲染是停止的）
vue修改属性也是异步
set中执行updateComponent是异步的

setState的过程

```js
// setState的异步
addTitle(title) {
    const currentList = this.state.list
    console.log(this.state.list) // []
    this.setState({ // 异步
        list: currentList.concat(title)
    })
    console.log(this.state.list) // []
}

addTitle(title = 'aaa') {
    const currentList = this.state.list
    this.setState({
        list: currentList.concat(title)
    })
    this.setState({
        list: currentList.concat(title + 1)
    })
    this.setState({
        list: currentList.concat(title + 2)
    })
    console.log(this.state.list) // [aaa2], 直接执行最后一个，前面两个没有执行
}

// setState的过程
addTitle(title) {
    const currentList = this.state.list
    this.setState({ // 异步
        list: currentList.concat(title)
    }, () => {
        // 每个组件都extend React.Component, Component父类中定义的方法
        // setState中会默认执行这个回调
        this.renderComponent()
    })
}
// 模拟Component
class Component {
    constructor(props) {}

    renderComponent() {
        const prevVnode = this._vnode
        const newVnode = this.render()
        patch(prevVnode, newVnode)
        this._vnode = newVnode
    }
}
```
题目5: 如何比较 react 和 vue
两者的本质区别：
* vue - 本质是 MVVM 框架，由 MVC 发展而来
* React - 本质是前端组件化框架，由后台组件化发展而来
看模版和组件化的区别：
* vue - 使用模版（最初由angular提出）
* React - 使用JSX（已经标准化）
* 模版语法上 - 更倾向 jsx, JSX只有一个规则，大括号中可以放变量表达式
* 模版分离上 - 更倾向 vue, react中模版和js混合在一起，未分离
* react组件化 - react本身就是组件化，没有组件化就不是react
* vue组件化 - vue也支持组件化，不过是在MVVM上的扩展
两者的共同点：
* 都支持组件化
* 都是数据驱动视图
选型：
国内使用，首推vue。文档易读易学，社区够大
团队水平较高，推荐react。组件化和jsx

## app 混合开发

hybrid - 基础，和 H5 的对比，上线流程（前端和 APP 一起开发）
前端客户端通讯：通讯原理，JS-Bridge 封装

### hybrid

APP 中都要内嵌很多页面
server 和客户端要了解
对协议和标准要特别重视

使用场景
NA：体验要求极致，变化不频繁（如头条的首页）
hybrid: 体验要求高，变化频繁（头条的新闻详情页）
h5:体验无要求，不常用（如举报，反馈等）

1. hybrid 是什么，为何用 hybrid ？
   快速迭代，无需审核

-   实现

    -   前端做好静态页面，将文件交给客户端；
    -   客户端将之以文件的形式存进 app 中；
    -   客户端在一个 webview 中使用 file 协议加载静态页面

-   优点

    -   快速的迭代更新，无需 app 审核，因为原生的开发可以拿到地理位置，用户信息等高权限的信息，所以要审核
    -   体验更流畅，和 NA 基本一致
    -   减少开发成本，双端一套代码

-   webview（小浏览器） ？

    -   是 app 的一个组件，app 可以有 webview，也可以没有。
    -   用于加载 h5 页面，即一个小型的浏览器内核

-   file 协议

    -   file 协议(file://)：加载本地的文件是 ，快，hybrid 要用 file 协议。
    -   http 协议(http://)：网络加载，慢

2. hybrid 如何更新上线 ？

-   如何更新每个手机上 app 的本地文件：用户每次打开 app，客户端都去 server 下载最新的静态文件（我们，分版本号，压缩文件上传）

3. hybrid 和 h5 有何区别 ？

-   hybrid:

    -   体验要求高，变化频繁（头条的新闻详情页）
    -   开发成本高，联调，测试，查 bug 都比较麻烦
    -   运维成本高

-   h5:体验无要求，不常用（如举报，反馈等，单次用的）

4. js 如何与客户端如何通信 ？
   js 和客户端通讯的基本形式：调用能力，传递参数，监听回调。（webview ---参数，callback--> 客户端）
   schema 协议:用于前端和客户端的通讯的约定,每个 app 的 schema 都不同，可以自己定义

-   前置问题

    -   微信的 js-sdk： 前端和客户端的一个中间层，让 html 可以调用手机底层的东西（微信公众号等中使用）
    -   js 和客户端通讯的基本形式 （webview ---参数，callback--> 客户端）
    -   schema 协议简介和使用
    -   schema 使用的封装
    -   内置上线：黑客看不到协议

-   新闻详情页适用 hybrid，前端如何获取新闻内容 ？

    -   不能用 ajax 获取。第一跨域，第二速度慢
    -   客户端获取新闻内容，然后 js 通讯拿到内容，再渲染
    -   客户端可以提前获取

### 前端客户端通讯

# js 基本知识点

## js 概观

-   一种基于对象和事件驱动的客户端脚本语言。

-   注释：`// , /\*\*/`

-   变量：区分大小写。声明变量：var

-   标识符：变量，函数，属性的名字，或者函数的参数。

    -   组成规则：
        -   字母、数字、下划线或\$构成;
        -   不能数字开头
        -   不能用关键字和保留字

-   数据类型：

    -   undefined，null（空指针，准备放对象），boolean，number（NaN）,string， object，symbol
    -   NaN:和任何值都不相等，任何涉及 NaN 的操作(NaN/10)都返回 NaN

-   操作符：

    -   typeof 语法：typeof(变量);
    -   返回值：string 类型，可能是 string、number、Boolean、object、undefined、function

-   方法：

    -   number
        -   isNaN(n):判断一个参数是否是非数字，返回 true,false
        -   Number(a):把非数字转为数字
        -   parseInt(a):把非数字转为数字(转换空字符串返回 NaN，提供两个参数 parseInt("0f0", 16))
        -   parseFloat(a):把非数字转为数字(第一个点有效，其余无效)
    -   string
        -   String():将任何类型转为字符串
        -   str.toString():将 str 转换为字符串，返回 str 的一个副本，将它赋给变量

-   类型转换：
    -   转为 Boolean
    -   0 之外的数字都 true;
    -   " "之外的字符都为 true;
    -   null,undefined 都为 false;

## 表达式和操作符

-   表达式：将同种类型的数据（常量，变量，函数等）用运算符按一定的规则连起来

-   操作符：

    -   算数操作符：返回的类型都是 number

        -   ++a: a = a + 1;
        -   a++:

    -   逻辑操作符：
        -   赋值操作符：= , += , -= , \*= , /= , %= ;
        -   比较操作符：
        -   三元操作符：条件 ？执行代码 1 ：执行代码 2（如果条件成立执行 1，否则执行 2）
        -   && || !

## 语句

```js
    if(boolean) {}
    if(表达式) {} else {}
    if(表达式) {} else if {} else {}
    // let val = prompt('请输入'); // 有返回结果。带确定按钮，点取消，值为null
    // new Date().getDay() // 获取星期，返回值number(0-6),周日是0

    switch(判断某个变量) {
        case value:
            document.write('dddd')
            break;
        case value1:
        case value2:
            console.log('aaa')
            break;
        default: console.log('dfskdfsk')
    }

    for(语句1;语句2;语句3) { 被执行代码 }
    // 语句1：循环代码块开始前执行
    // 语句2：代码块循环条件
    // 语句3：代码块执行后执行
    // for嵌套：外层为假时内层不执行；先执行外层再执行内层，直到内层条件为假时再返回外层执行
    // for适合已知循环次数的循环体，while适合未知
    while(条件) { 被执行代码 }
    //至少要执行一次
    do { 被执行代码 } while(j < 10)

    break：彻底退出循环体
    continue：结束本次循环，继续下一次

    // 打印所有0-50之间除20之外的5的倍数
    for() {
        if(n === 20) {
            continue // 本次循环不执行
        }
        console.log(n)
    }
```

## 函数

-   定义：function 函数名([参数]) { 可执行代码 }
-   调用：函数名([参数])
-   返回值：return
-   参数：
    -   arguments 在函数内部参数是由一个叫 arguments 的类数组管理的。
    -   可用[]来访问每一个参数（0 开始的索引），
    -   还有一个 length 属性来确定参数个数

```js
function arrAvg() {
	let sum = 0
	let i
	const len = arguments.length
	for (i = 0; i < len; i++) {
		sum += arguments[1]
	}
	return sum / len
}
// 有返回必须有接收
const req = arrAvg(1, 2, 3, 4)
```

## 内置对象

-   Array
    创建
    const test = new Array(10);如果知道长度就写上
    [{name: 1111}, 'dddd']// 字面量,可以保存任意类型的值
    读取
    ['aaa', 'bbb', 'ccc'][1] // 'bbb'
    赋值
    test[0] = 1
    test[1] = 'ddd'
    长度
    arr.length // number
    arr.length = 3 // 长度超过 3 的被删除。通过设置 length 可以从数组的末尾移除项或者向数组中添加新项
    arr[99] = 'xxx' // 长度为 100
    栈方法
    push() // 在数组尾部顺序添加 1 或多个值，返回值为新的长度 number
    unshift() // 在数组开头添加 1 或多个值，返回值为新的长度 number
    pop() // 删除数组最后一个元素，返回值为删除的那个元素
    shift() // 删除开头的值，返回值为删除的那个元素
    转换方法
    join() // 将数组转换为字符串，返回值为字符串。无参数默认用逗号隔开。参数为分隔符。
    可以用''分开
    reverse() // 颠倒数组中元素的顺序
    sort() // 对数组里的元素排序，返回值是排序后的数组。
    可以接收一个比较函数作为参数
    即使数组中每一项都是数值，sort()比较的也是字符串（比较的是字符串）
    arr.sort((a, b) => a-b)
    连接和截取
    arr1.concat(arr2, arr3 ……) // 返回值为连接好的新数组
    arr.slice(start, [end]) // 从已有的数组中返回选定的元素(start,end 是数组的下标，截取的元素不包含 end)
    无 end,则从 start 到结束。
    slice 有一个负数，则该处的索引即为：数组长度加上该数

          // const a = [1, 3, 4]
          实现b数组对a数组的拷贝
          b = [].concat(a) // 性能较高
          b = a.slice(0)

    删除、插入和替换

-   String
-   Math
-   Date

## DOM 基础

```js
// 查找

// 可以是document也可以是别的DOM元素
const box = document.getElementById('box')
const tags = document.getElementsByTagName('li') // 返回数组
const ulLi = document.getElementById('list1').getElementsByTagName('li')

// 设置样式
ele.style.styleName = styleValue
box.style.color = '#f00'
box.style.fontWeight = 'bold'
// ele: dom元素
// styleName：样式名称,驼峰
// styleValue： 样式值

// 属性
ele.innerHTML // 获取ele元素开始标签和结束标签之间的HTML和文本内容
ele.innerHTML = '' // 设置
ele.className // 获取ele元素的class属性
ele.className = 'cls' // 设置ele元素的class属性 （如果之前有，会替换）
// 操作属性
ele.getAttribute('attribute') // attribute:要获取的html属性，如id，type
// 如果是DOM元素（标签）自带的属性直接用点获取：box.id, box.align。class除外，用box.className
// 如果是你自己设置的用getAttribute("attribute")方法
ele.setAttribute('attribute', value) // 有兼容性
// attribute:要设置的属性名
// value为attribute的值,如果是字符串要加引号
box.setAttribute('isRight', false)
ele.removeAttribute('attribute') // attribute：要删除的属性名称
```

## DOM 事件

-   事件：文档或浏览器窗口中发生的一些特定的交互瞬间

    -   HTML 事件：

                  <tag 事件="执行脚本"></tag>
                      // 在HTML元素上绑定事件
                      // “执行脚本”可以是一个函数的调用，一定要加括号
                      // 在事件触发的函数中，this是对该DOM对象的引用
                      // <div onmouseover="fn(this)" onmouseout="out(this, '#00f')"></div>
                          function fn(_this) { _this就是DOM本身 }

    -   DOM0 级事件：先获取 DOM 然后在 DOM 对象上绑定事件

                  ele.事件 = 执行脚本

                      // 执行脚本可以是一个匿名函数也可是一个函数的调用
                      // const btn = document.getElementById("btn")
                      // btn.onClick = function() {
                          // 给按钮绑定事件，this是对该DOM元素的引用
                          if(this.className==="box1") {
                              this.className = "box2"
                          }
                      }
                      // btn.onclick=clickBtn; // 只写函数名，不写括号，因为加括号就会立即执行

    -   事件类型：

        -   onload: window.onload=function() {} // unload
        -   onchange:域的内容发生改变时发生(select) // 当菜单里的内容发生变化的时候执行脚本
            ```html
            <selece name="" id="menu">
            	<option value="#f00" selected></option>
            	<option value="#ff0"></option>
            </selece>
            <script>
            	// 选中的option的值
            	menu.onchange = function() {
            		if (!this.value) return
            		console.log(this.value, menu.options[menu.selectedIndex].value)
            	}
            </script>
            ```
        -   onfoucs: 获得焦点时触发（input 等框）

            ```js
            // 获取表单元素的值

            input.onblur = function() {
            	console.log(this.value)
            	tip.innerHTML = '<img src="img/right.png">'
            }
            ```

        -   onblur：失去焦点时触发（input 等框）
        -   onsubmit: 表单中的确认按钮被点击 _不是加在按钮上的而是加在表单上的_
        -   onmousedown：鼠标在元素上按下的时候
        -   onmousemove：鼠标指针移动时
        -   onmouseup：在元素上松开按钮的时候
        -   onresize：调整浏览器窗口大小. 经常作用在 window 上，但也可以作用在元素上`window.onresize = function() {}`
        -   onscroll：拖动滚动条 `window.onscroll = function() { // overflow: auto }`

    -   键盘事件

        -   onkeydown: 按下一个键时
        -   onkeypress: 释放一个键时
        -   onkeyup: 按键被松开时
        -   顺序：down - press - up
        -   event 对象 keyCode 这个属性：返回键盘事件触发的值的字符代码或键的代码
        -   event：事件对象，事件的状态，如触发 event 对象的元素，鼠标的位置及状态等

        ```js
        // 字符串也有长度

        document.onkeydown = function(enent) {
        	console.log(event.keyCode)
        	const len = text.value.length
        }
        ```

## BOM

-   浏览器对象模型：提供访问浏览器的功能
-   window:浏览器的一个实例，它既是通过 js 访问浏览器窗口的一个接口，又是 ECMAScript 规定的 global 对象，window 可以省略（window.name === name）。

    -   window 的方法：

        ```js
            alert('XXXXXXX')
            confirm("XXX")
                // 返回值是个Boolean值，需要接收 const tmp = window.confirm('提示信息')。tmp 就是true或者false

            prompt("text, defaultText")
                // text:要在对话框中显示的纯文本;defaultText：默认的输入文本;

                // 返回值：点击取消按钮，返回null；点击确认按钮，返回当前显示的文本(默认或者输入？？)
                // 例子：let message = prompt("请输入姓名", "李月茹") console.log(message)

            open(pageURL,name,parameters)
                // 打开一个新的浏览器窗口或查找一个已命名的窗口
                // pageURL： 子窗口路径
                // name: 子窗口句柄（name声明了新窗口的名字，方便通过name对子窗口进行引用）
                // parameters：窗口参数，各个参数用逗号分隔
                // 在一个页面里打开另一个页面（窗口）

            window.open('newwindow.html', 'newname', "width=400, height=00, left=0, top=0, toolbar = no, menubar = no, scrollbars=no, location=no, status=no")
                // newwindow.html页面与写代码的页面在同一目录,默认打开一个标签页，默认的
                // 可以设置的参数有：
                    width: 窗口宽度,
                    height: 窗口高度,
                    left: 窗口X轴坐标,
                    top: 窗口Y轴坐标,
                    toolbar: 是否显示浏览器工具栏,
                    menubar: 是否显示菜单栏,
                    scrollbars: 是否显示滚动条,
                    location: 是否显示地址字段,
                    status: 是否显示状态栏

            close()
                // 关闭子窗口的。关闭当前窗口，能不能关闭子窗口？？？

            window.close() // 关闭当前窗口

            setTimeout(code, millisec)
                // 超时调用
                    code: 要调用的函数或要执行的代码
                    millisec: 在执行代码前需要等待的毫秒数
                // 返回值：返回一个ID值，通过它取消超时调用

            const timer = setTimeout("alert('aaa')", 4000)
            setTimeout(function() {
                console.log("aaa")
            }, 400)
            const fn = (a,b) => {}
            setTimeout(fn, 500)
            clearTimeout(id_of_settimeout)
            // 清除超时调用。id_of_settimeout：setTimeout()返回的ID值

            clearTimeout(timer)
            setInterval(code, millisec)
            // 间歇调用。millisec: 周期性执行或调用code之间的时间间隔

            const intervalId = setInterval(() => {
                console.log(1111)
            }, 1000)
            setTimeout(() => {
                clearInterval(intervalId)
            }, 10000)
            timer = null // null 释放内存
        ```

-   navigator

    -   navigator 对象: 当前浏览器和操作系统的信息
    -   userAgent 属性：识别浏览器名称，版本，引擎，以及操作系统等信息的内容
        // console.log(navigator.userAgent) // msie,chrome,opera,safari

-   screen

    -   screen 对象：客户端显示屏幕的信息
    -   screen.availWidth // 返回可用的屏幕宽度
    -   screen.availHeight // 返回可用的屏幕高度
    -   window.innerWidth // 窗口的宽高
    -   window.innerHeight

-   history

    -   history 对象：ie8 以上哈希也会生成一条历史记录
    -   方法：
        -   history.back() // 回到历史记录的上一步，相当于 history.go(-1)
        -   history.forward() // history.go(1)

-   location

    -   location 对象：提供了与当前窗口中加载的文档相关的内容，还提供了一些导航的功能，他既是 window 对象的属性，也是 document 对象的属性
    -   属性：
        -   location.href // 返回当前加载页面的完整的 URL
            // console.log(location.href)
        -   location.hash // 返回 URL 中的哈希，#号后的 0 或多个字符，不包含返回空字符串
            ```html
            <!-- console.log(location.hash)
                哈希就是锚点链接
                回到顶部 -->
            <div id="top"></div>
            <div></div>
            <button></button>
            btn.onclick=() => { location.hash = '#top' }
            ```
        -   location.host // 返回服务器名称和端口号
        -   location.hostname // 不带端口号的服务器名称
        -   location.pathname // 返回 URL 中的目录或文件名
        -   location.port // 返回 URL 中指定的端口号
        -   location.protocol // 返回页面使用的协议
        -   location.search // 返回 URL 的查询字符串，这个字符串以问号开头，无为空
    -   方法：
        -   location.href = index.html // 会生成历史记录
        -   location.replace(url) // 重新定向 URL，不会在历史记录中生成新纪录
        -   location.replace('index.html')
        -   location.reload() // 重新加载页面。可能是从缓存中加载的
        -   location.reload(true) // 重新加载页面。从服务器端重新加载

-   document

-   event

## 轮播图小技巧

1. 图片重叠在一起，默认都不显示，加一个 active 的类表示显示，用 js 改变 active 加在哪张图片上

2. 定位时，如果有 left，则再有 right 时，left 先起作用。若想让 right 起作用，让 left: auto

3. 如果有背景图片，再设 background: #fff; 这时会把图片覆盖，这时要用 background-color: #fff;

## 正则表达式

有两种字符: 字符+元字符
元字符(特殊字符): `* + ? \$ ^ . | \ () {} []`
\t: 水平制表符
\v: 垂直制表符
\n: 换行符
\r: 回车符
\0: 空字符
\f: 换页符
\cX: 与 X 对应的控制字符（ctrl + X）

```js
/*
匹配字符串的规则
*/
// 类，[abc]
[abc]: abc中的一个
// 类取反 [^abc]
[^abc]: 不是字符abc的内容
// 范围类[a-z]
[a-z]: 从a到z的任意字符
[a-zA-Z]: a-z,A-Z
[0-9-]: 从0-9和字符-
// 预定义类
. : 除了回车换行之外的所有字符 [^/r/n]
\d: 数字字符[0-9]
\D: 非数字字符[^0-9]
\s: 空白符[\t\n\x0B\f\r]
\S: 非空白符[^\t\n\x0B\f\r]
\w: 单词字符（字母数字下划线）[a-zA-Z_0-0]
\W: 非单词字符[^a-zA-Z_0-0]
// 边界
^: 开头
$: 结尾
\b: 单词边界
\B: 非单词边界
// 量词, {}
?: 出现0次或者一次，最多一次
+: 出现1次或者多次，最少一次
*: 出现0次或者多次，任意次
{n}: 出现n次
{n,m}: 出现n到m次
{n,}: 至少出现n次
// 贪婪模式: 尽可能多的匹配
'12345678'.replace(/\d{3-6}/g, 'X') // X78, 会匹配最大的次数
// 非贪婪模式：一旦匹配成功就不再继续，只要在量词后面加上?即可
'12345678'.replace(/\d{3-6}?/g, 'X') // XX78, 一旦匹配成功就不再继续 123->X 456->X
'123456789'.match(/\d{3-5}?/g)// ["123", '456', '789']
// 分组(): 使量词作用于分组,而不是一个字符; 或 |作用于分组;反向引用 $1可以拿到组匹配到的内容; 忽略分组，在分组内加上?:即可
'a1b2c3d4'.replace(/([a-z]\d){3}/g, "X") // Xd4, 匹配一个字母加一个数字连续出现3次的情况
'2015-02-23'.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$1$2$3')
(?:Byron).(ok)
// 前瞻(?=)(?!), 断言, js不支持后顾
正则表达式是从文本 头->尾，文本尾部方向成为"前"
匹配到一个人叫张三的时候，还得判断他爸爸是不是叫张二
断言要匹配，但是不会被替换
exp(?=assert)
exp(?!assert)
\w(?=\d) //匹配是不是文字, 且该文字后面是数字
// 正则对象的属性,方法
// 属性
global: 是否全文搜索，默认false
ignore case: 是否大小写敏感，默认false
multiline: 多行搜索，默认false
lastIndex: 这一轮匹配完了，下一轮的开始位置。在非全局情况下lastindex不生效
sourch: 正则表达式

const reg = /\w/gim;
reg.global // true
reg.ignoreCase // true
reg.multiline // true
reg.lastIndex // true
reg.sourch // "\w"
// 方法
RegExp.prototype.test(str)
reg.test('dkfsdkfsd') // true
reg.test('$') // false
RegExp.prototype.exec(str)// 没有匹配到返回null,否则返回一个结果数组

// 字符串对象的正则方法
String.prototype.search(reg) // 忽略全局搜索，index或者-1
'dfdsfsd'.search('d')
String.prototype.match(reg)// 数组
String.prototype.split(reg) // 数组
String.prototype.replace(reg, '替换成谁') // 数组， '替换成谁'可以是function(匹配结果,group1 ...groupx ,index,原字符串)

/*
IDE 中规则复杂的字符串查找替换
*/
// 匹配 单词is，\b是单词边界
\bis\b
// http://aaa/bbb/ccc.jpg 去掉所有jpg文件的协议头。 .+任意字符至少一次, 小括号是分组, 用$1可以获取匹配到的内容
http:(\/\/.+\.jps)
$1
// 日期替换： \d数字，{4}重复次数，[-/]或者, ^开头，$结尾, ()分组
^(\d{4})[/-](\d{2})[/-](\d{2})$
$1-$2-$3

/*
js 正则处理字符串
*/
js中通过内置对象RegExp支持正则表达式

有两种方法实例化RegExp对象
字面量: const reg = /\bis\b/g;
构造函数: const reg = new RegExp('\\bis\\b', 'g')
修饰符: g全文搜索, i忽略大小写, m多行搜索（有换行符默认第二行开头也不会匹配,加上m会被匹配）
字符串:  'my name is lyr'.replace(reg, "要替换成的字符串");
```
