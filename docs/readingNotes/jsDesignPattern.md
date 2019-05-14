# javascript 设计模式

如何成为大师：刻意训练
越不练越不会

## 面向对象

::: tip 为何使用面向对象
程序执行：顺序，判断，循环 -- 结构化（这三种就可以处理所有的程序）<br/>
面向对象：数据结构化<br/>
计算机：结构化的才是最简单的。<br/>
浏览器处理的就是字符串，对字符串的管理<br/>
编程：简单&抽象
:::

三要素：
继承：子类继承父类

-   可以将公共方法抽离出来

封装：数据的权限和保密

-   定义属性（es6 不支持，typescript 支持）

    -   public 完全开放（默认）
    -   protected 对子类开放
    -   private 对自己开放

-   减少耦合，不该外漏的不外漏，一般以`_`开头的属性是 private 的

多态：同一接口不同实现

-   两个子类定义同一个方法，执行的函数不同。即：两个子类定义两个同名的私有方法叫多态

例子：jq 就是一个类，

```js
// 类
class Person {
	constructor(name, age) {
		this.name = name
		this.age = age
	}
	eat() {
		console.log(`${this.name} eating`)
	}
	speak() {
		console.log(`${this.name} speaking`)
	}
}
// 实例
const li = new Person('li', 20)
const yang = new Person('yang', 20)
li.eat()
li.speak()
yang.eat()
yang.speak()

// 继承
// 子类
class Student extends Person {
	constructor(name, age, number) {
		// super是将变量叫个父类处理,super给父类处理在子类中也可以通过this.name拿到值
		super(name, age)
		this.number = number
	}
	study() {
		console.log(`${this.name} study`)
	}
}

const xiaoming = new Student('小明', 10, '454949944')
xiaoming.study()
xiaoming.eat()

// jq
class JQ {
	constructor(selector) {
		let slice = Array.prototype.splice
		let dom = slice.call(document.querySelectorAll(selector))
		let len = dom ? dom.length : 0
		for (let i = 0; i < len; i++) {
			this[i] = dom[i]
		}
		this.length = len
		this.seletor = seletor || ''
	}
	append(node) {}
}
window.$ = function(selector) {
	return new JQ(selector)
}
const $p = $('p')
```

### UML 类图

UML: unified modeling language 统一建模语言
类图：UML 有很多种图，本课程相关的是类图
关系：主要讲泛化（继承）和关联（引用）

```
属性
+: public
-：private
#：protected
```

## 设计原则

::: tip 何为设计
按照哪一种思路或者标准来实现功能<br/>
:::
《unix/linux 设计哲学》

### 什么是设计

-   小即是美，每个程序只做好一件事
-   快速建立原型
-   放弃高效率而取可移植性
-   采用纯文本来存储数据
-   可复用
-   使用 shell 脚本提高杠杆效应和可移植性
-   让每个程序都称为过滤器

小准则

-   允许用户定制环境
-   各部分之和大于整体
-   沉默是金

```sh
# 过滤所有json文件，再过滤带package的
ls | grep *.json | grep 'package'
# 如果什么都没有找到，那就什么都不输出
```

### 5 大设计原则

SOLID 原则

-   S: 单一职责--每个程序只做好一件事,各个部分之间相互利用，保持独立
-   o: 开放封闭--对扩展开放，对修改封闭。增加需求时，扩展新的代码，而不是修改已有的代码
-   l: 李氏置换--子类能够覆盖父类，父类能出现的地方子类就能出现（js 使用少）
-   i: 接口独立--保持接口单一独立，避免出现胖接口（js 使用少）
-   d: 依赖导致--面向接口编程，依赖于抽象而不依赖具体。使用方只关注接口而不关注类的实现（js 使用少）

promise 说明 SO

-   单一职责：每个 then 中的逻辑只做好一件事
-   开放封闭：如果有新的需求，扩展 then，而不是修改之前的

```js
result
	.then(img => {
		// 每个 then 中的逻辑只做好一件事
		console.log(111)
		return img
	})
	.then(img => {
		// 如果有新的需求，扩展 then，而不是修改之前的
		console.log(222)
		return img
	})
	.catch(error => {
		console.log(error)
	})
```

### 面试题 1

-   打车时可以打专车和快车，任何车都有车牌号和名称
-   不同车价格不同，快车每公里 1 元，专车 2 元
-   行程开始时显示车辆信息
-   行程结束时显示打车金额（假定行程就 5 公里）

```js
// car
class Car {
	constructor(number, name) {
		this.name = name
		this.number = number
	}
}
// 快车
class Kuaiche extends Car {
	constructor(number, name) {
		super(number, name)
		this.price = 1
	}
}
// 专车
class Zhuanche extends Car {
	constructor(number, name) {
		super(number, name)
		this.price = 2
	}
}
// 行程
class Trip {
	constructor(car) {
		this.car = car
	}
	start() {
		const { name, number } = this.car
		console.log(name, number, '==>行程开始')
	}
	end() {
		const { price } = this.car
		console.log(price * 5, '==>行程结束，总价')
	}
}

// 计算
const car = new Kuaiche(100, '桑塔纳')
const trip = new Trip(car)

trip.start()
trip.end()
```

### 面试题 2

-   某停车场，分 3 层，每层 100 车位
-   每个车位都能监控到车的驶入和离开
-   车辆进入前，显示每层的空余车位数量
-   车辆进入时，摄像头可识别车牌号和时间
-   车辆出来时，出口显示器显示车牌号和停车时间

```js
// 车辆
class Car {
	constructor(number) {
		this.number = number
	}
}

// 摄像头
class Camera {
	shot(car) {
		return {
			number: car.number,
			inTimes: Date.now(),
		}
	}
}

// 显示屏
class Screen {
	show(car, inTime) {
		console.log(car.number, Date.now() - inTime)
	}
}
// 停车场
class Park {
	constructor(floors) {
		this.floors = floors || []
		this.camera = new Camera()
		this.screen = new Screen()
		this.carList = {} // 存储摄像头拍摄返回的信息
	}
	in(car) {
		// 通过摄像头获取信息
		const info = this.camera.shot(car)
		// 停到某个停车位
		const i = parseInt((Math.random() * 100) % 100)
		const place = this.floors[0].places[i]
		place.in()
		info.place = place
		// 记录信息
		this.carList[car.num] = info
	}
	out(car) {
		// 获取信息
		const info = this.carList[car.number]
		// 将停车位清空
		const place = info.place
		place.out()
		// 显示时间
		this.screen.show(car, info.inTime)
		// 清空记录
		delete this.carList[car.number]
	}
	getEmptyNum() {
		return this.floors.map(floor => {
			return `${floor.index}层还有${floor.getEmptyPlaceNum()}个车位`
		})
	}
}
// 层
class Floor {
	constructor(index, places) {
		this.index = index
		this.places = places || []
	}
	getEmptyPlaceNum() {
		let num = 0
		this.places.forEach(p => {
			if (p.empty) {
				num = num + 1
			}
		})
		return num
	}
}

// 车位
class Place {
	constructor() {
		this.empty = true
	}
	in() {
		this.empty = false
	}
	out() {
		this.empty = true
	}
}

// 测试
// 初始化停车场
const floors = []
for (let i = 0; i < 3; i++) {
	const places = []
	for (let j = 0; j < 100; j++) {
		places[j] = new Place()
	}
	floors[i] = new Floor((i = 1), places)
}
const park = new Park(floors)

// 初始化车辆
const car = new Car(112243093)

console.log(park.getEmptyNum())
park.in(car)
console.log(park.getEmptyNum())
```

## 设计模式

创建型：工厂模式，单例模式

结构型：适配器模式，装饰器模式，代理模式，外观模式

行为型：观察者模式，迭代器模式，状态模式

## 工厂模式（创建型）

将 new 操作单独封装
遇到 new 时就考虑是否要用工厂模式
构造函数和创建者分离
符合开放封闭原则

```js
class Product {
	constructor(name) {
		this.name = name
	}
	init() {
		console.log('init')
	}
	fun1() {
		console.log('fun1')
	}
	fun1() {
		console.log('fun2')
	}
}
class Creator {
	create(name) {
		return new Product(name)
	}
}

// 实例
let creator = new Creator()
let p = creator.create('p1')
p.init()
p.fun1()
```

场景

-   `$('div')`
-   React.createElement
-   vue 异步组件

jquery
`$('div')`就是工厂模式

-   通过工厂把真正的构造函数和使用者隔开
-   `$('div')` 比 `new $('div')`简洁
-   `new $('div')`书写麻烦，jq 的链式操作将成为噩梦
-   一旦 jq 的名字变化，将是灾难性的

```js
// 这个就是工厂模式，将示例return出去
window.$ = function(selector) {
	return new JQ(selector)
}
// React.createElement
class Vnode(tag, attrs, chilren) {

}
React.createElement = function(tag, attrs, children) {
    return new Vnode(tag, attrs, chilren)
}
// 应用
React.createElement('div', null,
    React.createElement('h3', null, '李月茹')
)
// vue
Vue.component('async-example', function(resolve, reject) {
    setTimeout(function() {
        resolve({
            templage: '<div>aaa</div>'
        })
    })
})
```

## 单例模式（创建型）

系统中被唯一使用的
一个类只有一个实例
只有内部才可以 new 实例，只能 new 一次（构造函数私有化）

class 的静态方法，
无论类被 new 多少个，静态方法只有一个

符合单一职责原则，只实例化一个对象

登录框
购物车

```js
class SingleObject {
	login() {
		console.log('login...')
	}
}
// 静态方法，自执行函数，用闭包存储一个初始化的实例
SingleObject.getInstance = (function() {
	let instance
	return function() {
		if (!instance) {
			instance = new SingleObject()
		}
		return instance
	}
})()

// 应用
let obj1 = SingleObject.getInstance()
obj1.login()
let obj2 = SingleObject.getInstance()
obj2.login()
console.log(obj1 === obj2) // true

// 不能直接用 new SingleObject()
```

场景
jq 只有一个`$`
模拟登录框

```js
// jq 只有一个`$`
if (window.jQuery != null) {
	return window.jQuery
} else {
	// 初始化
}

// 模拟登录框
class LoginForm {
	constructor() {
		this.state = 'hide'
	}
	show() {
		if (this.state === 'show') {
			console.log('已经显示')
			return
		}
		this.state = 'show'
		console.log('显示成功')
	}
	hide() {
		if (this.state === 'hide') {
			console.log('已经隐藏')
			return
		}
		this.state = 'hide'
		console.log('隐藏成功')
	}
}
LoginForm.getInstance = (function() {
	let instance
	return function() {
		if (!instance) {
			instance = new LoginForm()
		}
		return instance
	}
})()

// 应用
let login1 = LoginForm.getInstance()
login1.show() // 显示成功
let login2 = LoginForm.getInstance()
login2.show() // 已经显示
let login3 = LoginForm.getInstance()
login3.hide() // 隐藏成功
```

## 适配器模式（结构型）

旧接口格式和使用者不兼容
中间加一个适配转换接口

```js
class Adaptee {
	specificRequest() {
		return '德国标准插头'
	}
}
class Target {
	constructor() {
		this.adaptee = new Adaptee()
	}
	request() {
		let info = this.adaptee.specificRequest()
		return `${info}-转换器-中国标准插头`
	}
}

// 应用
let target = new Target()
target.request()
```

场景
旧接口的封装
vue computed

```js
    // 自己封装的ajax
    ajax({
        url: '',
        type: ''
    }).done(function() {})
    但是因为历史原因，代码中全是$.ajax({})
    // 做一层适配
    const $ = {
        ajax: function(options) {
            return ajax(options)
        }
    }
```

## 装饰器模式（结构型）

为对象添加新的功能
不改变其原有的结果和功能

手机壳

```js
class Circle {
	draw() {
		console.log('画一个圆')
	}
}
class Decorator {
	constructor(circle) {
		this.circle = circle
	}
	draw() {
		this.circle.draw()
		this.setRedBorder(circle)
	}
	setRedBorder() {
		console.log('border')
	}
}

// 应用
let circle = new Circle()
circle.draw()

let dec = new Decorator(circle)
dec.draw()
```

场景
es7 装饰器
core-decorators 库

```js
// es7 装饰器，装饰类
@decorator
class A {}
// 相当于
function decorator(target) {}
class A {}
A = decorator(A) || A
// 加参数
@testDec(true)
class Demo {}
function testDec(isDec) {
	return function(target) {
		target.isDec = isDec
	}
}
// 装饰方法
function readonly(target, name, descriptor) {
	// descriptor属性描述对象（Object.defineProperty中会用到）原来的值如下
	// {
	//     value: specifiedFunction,
	//     enumerable: false,
	//     configurable: true,
	//     writable: true
	// }
	descriptor.writable = false
	return descriptor
}
function log(target, name, descriptor) {
	const oldValue = descriptor.value
	descriptor.value = function() {
		console.log(111)
		return oldValue.apply(this, arguments)
	}
	return descriptor
}
class Person {
	constructor() {
		this.a = '李月茹'
	}
	@log
	@readonly
	name() {
		return this.a
	}
}
const p = new Person()
console.log(p.name())
p.name = function() {} // 报错，因为是只读的
```

## 代理模式（结构型）

使用者无权访问目标对象(有权限或者什么，无权使用，像有权一样)
中间加代理，通过代理做授权和控制
代理和目标对象要有一样的对外方法

```js
class ReadImg {
	constructor(filename) {
		this.filename = filename
		htis.loadFromDisk()
	}

	display() {
		console.log('display..', this.filname)
	}

	loadFromDisk() {
		console.log('loading..', this.filname)
	}
}
class ProxyImg {
	constructor(filename) {
		this.realImg = new ReadImg(filename)
	}
	display() {
		this.realImg.display()
	}
}

// 应用
let proxyImg = new ProxyImg('1.png')
proxyImg.display()
```

场景
网页事件代理,(事件委托)
`jquery $.proxy`
es6 proxy

```js
// 事件代理
// <div id="div1">
// 	<a>a1</a>
// 	<a>a1</a>
// 	<a>a3</a>
// 	<a>a4</a>
// </div>

document.getElementById('div1').addEventListener('click', e => {
	const target = e.target
	if (target.nodeName === 'A') {
		console.log(target.innerHTML)
	}
})
// jquery $.proxy
$('#div1').click(function() {
	// setTimeout里的this指的时window
	setTimeout(
		$.proxy(function() {
			$(this).css('background-color', 'red')
		}, this),
		1000
	)
})

// es6 proxy
// 明星
let star = {
    name: 'a',
    age: 10,
    phone: 2332232323
}
// 经纪人
let agent = new Proxy(start, {
    get: function(target, key) {
        if(key === 'phone') {
            // 经纪人自己的电话
            return 11111
        }
        if(key === 'price') {
            // 明星不报价，经纪人报价
            return 1200000
        }
        return target[key]
    }
    set: function(target, key, val) {
        if(key === 'customPrice') {
            if(val < 100000) {
                console.log('too low')
            } else {
                target[key] = val
                return true
            }
        }
    }
})

// 应用
console.log(agent.name)
console.log(agent.age)
console.log(agent.phone)
console.log(agent.price)

agent.customPrice = 150000
```

## 外观模式（结构型）

为子系统中的一组接口提供了一个高层接口
使用者使用这个高层接口
接口统一化

不符合开放封闭原则，好用不要滥用

传参数，传不同的参数

```js
function bindEvent(ele, type, selector, fn) {
	if ((fn = null)) {
		fn = selector
		selector = null
	}
}

// 调用
bindEvent(ele, 'click', '#div1', fn)
bindEvent(ele, 'click', fn)
```

## 观察者模式（行为型）

```js
```

场景

```js
```

## 迭代器模式（行为型）

```js
```

场景

```js
```

## 状态模式（行为型）

一个对象有状态变化
每次状态变化都会触发一个逻辑
不能总是 if-else 控制

state 和 本体抽离出来
状态的切换是状态这个对象上的，状态的获取是主体这个对象上的

红绿灯

```js
// 状态
class State {
	constructor(color) {
		this.color = color
	}
	handle(context) {
		console.log(this.color)
		context.setState(this)
	}
}
// 主体
class Context {
	constructor() {
		this.state = null
	}
	getState() {
		return this.state
	}
	setState(state) {
		this.state = state
	}
}
// 应用
let context = new Context()
let yellow = new State('yellow')
let red = new State('red')
let green = new State('green')

// 绿灯亮了
green.handle(context) // green
console.log(context.getState()) // 状态 State{color: 'green'}
```

场景
有限状态机（javascript-state-machine）
写一个简单的 promise
promise 三种状态（pending, fullfilled, rejected）
pending --> fullfilled
pending --> rejected
不可逆向变化

```js
// npm install javascript-state-machine
import StateMachine from 'javascript-state-machine'
let fsm = new StateMachine({
	init: '收藏',
	transitions: [
		{
			name: 'doStore',
			from: '收藏',
			to: '取消收藏',
		},
		{
			name: 'deleteStore',
			from: '取消收藏',
			to: '收藏',
		},
	],
	methods: {
		// 监听执行收藏
		onDoStore: function() {
			console.log('收藏成功')
			updateText()
		},
		// 监听取消收藏
		onDeleteStore: function() {
			console.log('取消收藏')
			updateText()
		},
	},
})

let btn = document.getElementById('btn1')
// 按钮点击事件
btn.onClick = () => {
	if (fsm.is('收藏')) {
		fsm.doStore()
	} else {
		fsm.deleteStore()
	}
}
// 更新按钮文案
function updateText() {
	btn.innerHTML = fsm.state
}

// 初始化文案
updateText()

/*
promise
*/
```

## 其他模式

```js
```

场景

```js
```

## 综合示例

用 jquery 做购物车
