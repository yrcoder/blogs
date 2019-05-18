# zepto 设计和源码分析

## 原型基础知识

诡异的数组

```js
const arr = [1, 2, 3]
arr.__proto__.addClass = function() {
	alert(111)
}
这样数组就多了一个addClass方法
不知道是不是所有再生成的数组都有这个方法
```

js 的三座大山：

1. 原型和原型链
2. 上下文环境和作用域
3. 单线程和异步

原型和原型链

1. js 中每一个函数都有一个叫 prototype 的属性，不管是自己定义的还是内置的。(Array,Object,Function 都是函数)
2. 所有通过函数 new 出来的东西都有一个`__proto__`属性，指向这个函数的 prototype。(字面量也是 new 的一种)
3. 当你想使用一个对象中的某个功能时，如果对象本身有就直接使用，如果没有就去`__proto__`里去找

prototype 是一个对象，类的所有实例的`__proto__`属性都指向这个对象，类的 prototype 属性也只想这个对象

```js
// 每一个函数都有一个叫 prototype 的属性,prototype的constructor属性指向这个函数本身
const fn = function() {}
fn.prototype // {constructor:f}
fn === fn.prototype.constructor // true

// 实例的`__proto__`属性，就是父类的prototype
const arr = []
arr.__proto__ === Array.prototype // true
arr.push === Array.prototype.push // true

// 实例的`__proto__`属性，默认指向父类的prototype，但是可以硬是让它指向另一个地方，也可以给它添加属性

// 但是之后再生成的数组都没有这个方法
// 但是在它的构造函数的prototype中定义就可以让后来新建的数组都有这个方法
arr.__proto__.constructor.prototype.addClass = function() {
	console.log(1111)
}
```

## 分析源码

### 结构

```js
// 自执行函数避免变量全局污染
var Zepto = (function() {
	var $
	zepto = {}
	// 此处省略800行代码
	$ = function(selector, context) {
		return zepto.init(selector, context)
	}
	return $
})()
window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)

// 执行 $('p') 就是 zepto.init(selector, context)中的selector有了一个实参"p"
```

### init 函数

```js
zepto.init = function(selector, context) {
	var dom
	// 分情况对dom赋值
	// 对框架的应用$(selector)中selector的不同情况进行处理，返回的都是数组
	// 无参数：$()
	// 字符串：$('p'),$('<div>'),$('#app'), $('span', 'div') // 找div中的span
	// 函数：
	// 数组：
	// dom:
	// zepto对象：$($('span'))
	return zepto.Z(dom, selector)
}
```

### Z 函数

```js
// 第一种写法
zepto.Z = function(dom, selector) {
	dom = dom || []
	dom.selector = selector || ''
	dom.__proto__ = $.fn // fn中定义了一堆工具函数
	return dom
}

// 第二种写法
```

### 附

```js
// 数组也可以赋值
const arr = [1, 2, 3]
arr.aa = 'aa'
arr.bb = 123
// 数组也是对象

// 对象数组
const obj = { 0: 'a', 1: 'b', 3: 'c', length: 3 }
obj[1] // b
obj.length // 3
```
