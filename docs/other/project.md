# 写好代码

# 组件化

## 通过工具约束产出高质量代码（表面好看）

Eslint(js 语法检测)：
可以配置一个函数最长多少行，一个文件最长多少行
git 和 eslint 结合，不合规范就不能上传

styleLint/csslint(css 语法检测)
css 的作用范围要精确
位置 position，宽高，padding，margin，然后是 background 和 color

命名规范 (vscode 插件: codeSpellCheker)
处理按钮点击的函数：handleBtnClick 或者 buttonClickHandler

代码校验（codeReview）

类型检测（TypeScript 类型检测,Flow 类型检测,Jest 自动化测试工具）
测试驱动的编程

注释，目录结构
基于组件的目录划分，所有组件应用的文件 css 等都写在一个文件夹下
变量名字就是注解，不用写注释。如：createPerson, getDiscountPrice
特殊的业务场景才写注释

## 前端组件化（可复用，可扩展，好维护）

初识组件，组件与模块的区别 ？

模块：不一定指的是什么（webpack）
组件：是页面的一部分

一个最小力度的组件是：元素

## 从面向对象到组件化的前端演进之路

面向过程：内容很多，不可维护
面向对象：组件就是对象，也可以是面向组件。组件负责自己的展示，样式，逻辑，但是除了输入输出和别人没有交互。
组件：每一个组件都一个套路。init()，render(), event()都有这样一个东西
组件化 --> 数据编程（ag 和 vue 和 react 火的原因）
面向数据编程（数据编程）
ag：面向数据但是性能脏检测不行，
react：性能的问题解决了，diff，虚拟 dom 等等
vue：让前端变得简单了，不了解组件化，也是用的组件化编程

```js
// 套路
```

## 怎么写好的组件

组件的大小：组件拆的是否合理，组件不应该超过 300 行
组件间的通信：数据统一管理，把父子组件通信砍掉，这样好维护。一个组件改变了 store 里面，别的组件也会重新渲染。vuex 不会，但是 react 会，用 immutable 可以减少不必要的渲染
通用组件的拆分：细粒度，不要把业务组件写到公共页面中，slot 等，不要有 if-else 判断是从哪儿来的，然后渲染成不同的东西
UI 与逻辑的隔离：redux-saga/mutation（vue）在这里写业务逻辑

## 前端思考

只是把业务写完了，要想明白技术经验该怎么搞
技术能力的沉淀和输出
是不是可以抽出一套东西，属于自己的组件库
造轮子的过程
知识储备和思维广度要兼备
形成自己的技术思考闭环

# 开源项目

1. 源码 code (readme.md)
2. 开发环境: 告诉二次开发者，如何搭建和运行项目
3. 允许他人贡献代码 pull requests
4. 问题 issues : 问题是共享的，而不是私聊的（issues.md）
5. 问题列表和升级计划：当前有哪些问题，以及何时解决何时升级

is-odd：这个东西用户数量特别大，判断奇偶数，只不过考虑了各种数据类型转换

# 表格的溢出隐藏

```css
/*表格 溢出隐藏*/
table {
	width: 100%;
	border-collapse: collapse;
	table-layout: fixed; /* 只有定义了表格的布局算法为fixed，下面td的定义才能起作用。 */
}
td.td_name {
	width: 30%;
}
td {
	border: 1px solid;
	overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
	white-space: nowrap; /* 不换行 */
	text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用*/
}
```

## 搜索框特效
语音输入: chrome有
`<input type="text" x-webkie-speech="">`

## 取消选择和事件代理
当元素中的子元素是动态生成的，不知道具体有什么或者没有什么，就要在父级元素上代理
```js
    wrap.onClick = function(e) {
        const event = e || window.event
        const el = event.srcElement; // srcElement或者target
        if(el.className === 'del') {
            const index = el.getAttribute('index')
            const input = tr[index].getElementsByTagName('input')[0]
            input.checked = false
            input.onclick() // 这样就是手动触发onclick事件
        }
    }
```

## 手风琴

鼠标悬停：css hover, js mouseover
平滑的过渡: { transition: all linear 0.1s}
获取 tagNames 的数组，然后循环执行
手风琴 1: onmouseover dom display="block", onmouseout dom display="none"。 <div onmouseover="fn(this)"></div> function(dom) {可以拿到该 dom}
手风琴 2: 给每一个元素绑定 mouseover 事件 el.addEventListener(el, eventType, callback, false)或者 el.attachEvent(`on${eventType}`, callback), callback 中给该元素增加一个 className="big"（先给去掉所有元素的 big 样式）。子元素触发事件找到其父元素 e.target.parentNode, 给父元素加上 className。

## 鼠标事件

鼠标事件
onmouseover: 鼠标移入元素
onmouseout: 鼠标移出元素
onmousemove: 鼠标在元素上移动
关于元素的宽高位置：
offsetLeft/offsetTop: 元素相对于父元素的左边距，上边距
offsetWidth/offsetHeight: 元素的可视宽高，不包括滚动条
event.clientX/event.clientY: 鼠标相对于文档的左边距和上边距(相当于点在坐标系上的坐标轴(x,y))
offsetLeft 和 style.left: style.left 返回字符串 30px, offsetLeft 返回数值 30; style.left 可读写，offsetLeft: 只读，要改变 div 的位置只能更改 style.left;style.left 需要事先定义否则取值为空,在 css 中定义的没有效果，在 js 代码中识别不了,要在 style 中设置才有用

放大镜：鼠标在小图片上移动时，通过捕捉鼠标在小图片上的位置，定位大图片的相应位置。鼠标移动，放大镜跟随移动，大图跟随向反方向移动
小图片/大图片=放大镜/大图片的局部=放大镜移动的距离/大图片移动的距离 ==> 最终要求出大图片的位移

```js
smallBox.onmousemove = function(e) {
	// 确定放大镜的位置
	let left = e.clientX - demo.offsetLeft - smallBox.offsetLeft - floatBox.offsetWidth / 2
	let top = e.clientY - demo.offsetTop - smallBox.offsetTop - floatBox.offsetHeight / 2
	floatBox.style.left = left + 'px'
	floatBox.style.top = top + 'px'
	// 确定大图片的位置
	let bigImgLeft = (left / (smallBox.offsetWidth - floatBox.offsetWidth)) * (bigImg.offsetWidth - bigBox.offsetWidth)
	let bigImgTop = (top / (smallBox.offsetHeight - floatBox.offsetHeight)) * (bigImg.offsetHeight - bigBox.offsetHeight)
	bigImg.style.left = -bigImgLeft + 'px'
	bigImg.style.top = -bigImgTop + 'px'
}
```

可调大小的面板：鼠标拖拽缩放

给内容盒子添加三个控制元素，鼠标的位置-contentOffsetLeft = 控制元素的 offsetLeft = 控制元素的 style.left; constent.style.width = 控制元素的 style.left - 控制元素的 width(offsetWidth)
在控制元素的 onmousedown 事件中计算

```js
// 没有写完，教程声明的变量太多，把握不住关键
let endX = 0
let endY = 0
let timer = null
document.onmousemove = function(e) {
	const e = window.event || e
	endX = e.pageX
	endY = e.pageY
}
document.onmouseup = function() {
	clearInterval()
}
// 为面板添加控制元素
function Resizable(panel_id, ctrl_id) {
	const panel = document.getElementById(panel_id)
    const ctrl = document.getElementById(ctrl_id)
	const r = docuemnt.createElement('div')
	panel.appendChild(r)

	// 为控制元素添加拖拽处理
	r.addEventListener('mousedown', e => {
        timer = setInterval(() => {
            if(timer) {
                ctrl.style.left =
            }
        }, 10)
    })
}
```

## js 动画

js 动画：开一个定时器，持续的让 dom 的某个属性，宽、高、透明度、top、left 等等以某种速度改变，到某个临界值的时候停止。
关键点：
广告展开效果：imgDom 的高度不断增加, imgDom.style.height+=5 + 'px', 开两个 setTimeout 当高度小于最大高度的时候递归。
倒计时一样：开两个 setTimeout 当高度小于最大高度的时候递归。
图片缓慢缩放：点击按钮让图片放大或者缩小，缓慢就是 setineterval 给一个速度

```js
const img = document.getElementById('Img')
const maxWidth = img.width * 2 // 最大值
const toMax = () => {
	const endWidth = img.width * 1.3 // 每次点击后的宽度
	const timer = setInterval(() => {
		if (img.width < endWidth) {
			if (img.width < maxWidth) {
				img.width = img.width * 1.05
				img.height = img.height * 1.05
			} else {
				console.log('图片已经最大')
				clearInterval(timer)
			}
		} else {
			clearInterval(timer)
		}
	}, 20)
}
```

信息滚动: <marquee direction="right" scrolldelay="500" behavitor="alternate" loop="3" onmouseover="this.stop()" onmouseout="this.start()">默认向左滚动</marquee>
div 模拟，无缝滚动: 克隆一个内容 dom，当第一个内容到底部的时候继续展示第二个。scrollTop, offsetHeight,

## 图片展示
移动端 web 相册：
css3 3D 特效：
css 动画实用技巧：


# 其他
## 固定边栏滚动
思路
1. css position fixed
2. 监听window上的滚动事件
3. 设置fixed条件判断：滚动高度 scrollTop + 屏幕高度 screenHeight > 边栏高度 sideDom.style.height

```js
const $ = function(id) {
    return document.getElementById(id)
}
const addEvent = function(obj, event, fn) {
    if(obj.addEventListener) {
        obj.addEventListener(event, fn, false)
    } else {
        obj.attachEvent('on' + event, fn)
    }
}
const domSider = $('side')
const scrollEvent = function() {
    const sideHeight = domSider.offsetHeight
    const screenHeight = document.documentElement.clientHeight || document.body.clientHeight
    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop
    if(crollHeight + screenHeight > sideHeight) {
        domSider.style.cssText = `position: fixed; right: 0; top: ${-(sideHeight - screenHeight)}px`
    } else {
        domSider.style.position = 'static'
    }
}
addEvent(window, 'scroll', scrollEvent())
addEvent(window, 'resize', scrollEvent())
```
## 回到顶部
锚链接：
document.documentElement.scrollTop: 滚动条的数值，可以读写
setInerval()
事件：window.onload window.onsrcoll
阻止a链接的默认行为：`<a href="javascript:;">`
`<a href="">` 如果是空的则跳到最顶部
```js
window.onload = function() {
    // 页面可视区域的高度
    const clientHeight = document.documentElement.clientHeight
    const btn = document.getElementById('btn')
    const timer = null
    let isTop = true
    btn.onclick = function() {
        timer = setInterval(function() {
            // 获取滚动条的高度
            const osTop = document.documentElement.scrollTop || document.body.scrollTop
            const ispeed = Math.floor(-osTop / 5)
            document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
            isTop = true
            if(osTop === 0) {
                clearInterval(timer)
            }
        }, 30)
    }
    window.onscroll = function() {
        // 按钮的显示隐藏
        const osTop = document.documentElement.scrollTop || document.body.scrollTop
        if(osTop > = clientHeight) {
            obtn.style.display = 'block'
        } else {
            obtn.style.display = 'none'
        }
        // 这个没有弄明白（滚动条滚动的时候用户是否滚动滚轮）
        if(!isTop) {
            clearInterval(timer)
        }
        isTop = false
    }
}
```
## QQ 时光轴
年月为菜单，点击跳转对应日志。滚动日志高亮对应的菜单
1. 页面滚动固定时间菜单
2. 页面滚动的动画效果，日历到农历的转化
3. 菜单点击展开和高亮，同时滚动页面
4. 滚动页面内容自动展开和高亮时序菜单

根据数据找到对应的dom，获取上面的属性值，通过window.onscroll等控制进行操作，
变量的东西可以通过模版字符串写上去，模版和数据进行组合
```js

```

## 新手引导
将每个步骤应该定位的位置事先写好，把每个步骤的框放在一个div中。
每个步骤有对应的index, 循环执行通过index确定要display: block的步骤，其余隐藏。
关闭时将父级关闭。点击下一步index加1。
新手导引，第二次登录就没有了，需要设置cookie, 和后天做个约定就好

## 按钮特效
## 移动 web

## hybrid
