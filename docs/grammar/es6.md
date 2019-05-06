# ES6

## class

::: tip 吾注：
构造函数的 prototype 属性对象会被每个实例继承
构造函数中的 this 指向实例。用 this 在构造函数中创建的属性是实例的属性
构造函数的出现主要是用来“复用代码逻辑”。用 prototype 继承，用 this 多态。
类是构造函数，构造函数是个函数
:::

实例：会有一个 constructor 属性，指向构造函数。实例.constructor === 构造函数 // true

1. instanceof 运算符: 验证原型对象与实例对象之间的关系。 用法：实例 instanceof 构造函数 // true
2. isPrototypeOf()方法：判断某个 proptotype 对象和某个实例之间关系。 用法：构造函数.prototype.isPrototypeOf(实例) // true
3. hasOwnProperty()方法：判断是本地属性还是 prototype 对象属性。用法：实例对象.hasOwnProperty('name') // true
4. in 运算符：判断某个实例是否有某个属性，不管是不是本地属性。用法：属性名 in 实例对象 // true

```js
function Animal(name) {
    this.name = name
}
Animal.proptotype.type = 'abcd'

const a = new Animal('a')
a.name // a，多态
a.type // 'abcd',继承

// 简单继承和多态
class Animal {
    name() {
        return 'Animal'
    }
    say() {
        return this.name()
    }
}

class Dog extends Animal {
    food = "bone"
    name() {
        return 'Dog'
    }
}

const dog = New Dog()
dog.say() // Dog

// 在类中操作实例里的属性。
class Dog extends Animal {
    constructor(name) {
        // 子类必须调用super方法，否则创建实例就报错。
        super('xyz') // 调用父类的constructor().
        // 只有调用super之后，才可以使用this关键字，否则会报错
        this.name = name
    }
    toString() {
        return this.name + '' + super.toString() // 调用父类的toString()
    }
}
```

::: tip 吾注
每一个对象都有**proto**属性，指向对应的构造函数的 prototype 属性
class
子类的`__proto__`属性，表示构造函数的继承，总是指向父类`子类.__proto__ === 父类`
子类 prototype 属性的`__proto__`属性，表示方法的继承，总是指向父类的 prototype 属性。`子类.prototype.__proto__ === 父类.prototype`
:::

## decorator 修饰器（一个特殊的函数）

在声明阶段实现类和类成员（属性和方法）注解的一种语法。

```js
// 类的修饰符有一个参数，类本身
function log(target) {
	// target被修饰的类 如Numberic
	const desc = Object.getOwnPropertyDescriptors(target.prototype)
	for (const key of Object.keys(desc)) {
		// 忽略构造函数constructor
		if (key === 'constructor') {
			continue
		}
		const func = desc[key].value
		if ('function' === typeof func) {
			Object.defineProperty(target.prototype, key, {
				value(...args) {
					console.log('before' + key)
					const ret = func.apply(this, args)
					console.log('after' + key)
					return ret
				},
			})
		}
	}
}
// 类属性的修饰符有三个参数
function readonly(target, key, descriptor) {
	descriptor.writable = false
}

// 类方法修饰器,同属性
function validate(target, key, descriptor) {
	const func = descriptor.value
	descriptor.value = function(...args) {
		for (let num of args) {
			if ('number' !== typeof num) {
				throw new Error(`${num} is not a number`)
			}
		}
		return func.apply(this, arrgs)
	}
}
@log
class Numberic {
	@readonly PI = 3.14

	@validate
	add(...nums) {
		return nums.reduce((p, n) => p + n, 0)
	}
}

new Numberic().add(1, 2) // 调用函数时会打印日志
```

## 数组

```js
{
	let arr = Array.of(3, 4, 5, 6)
	console.log(arr) // [3, 4, 5, 6]
}
{
	const a = 3,
		b = 4,
		c = 'sss'
	let arr = Array.of(a, b, c)
	console.log(arr) // [3, 4, "sss"]
}
{
	// 如果这俩写法没区别，那么这个API的作用是什么
	const a = 3,
		b = 4,
		c = 'sss'
	let arr = [a, b, c]
	console.log(arr) // [3, 4, "sss"]
}
{
	let arr = Array.of()
	console.log(arr) // []
}
{
	// 把类数组变成数组
	let a = document.querySelectorAll('a')
	let aArr = Array.from(a)
	aArr.forEach(item => {
		console.log(item.textContent)
	})
	console.log(
		Array.from([1, 2, 3], item => {
			return item + 2
		})
	) // [3, 4, 5]
}
{
	console.log([1, 2, undefined].fill(7)) // [7, 7, 7]
	console.log([1, 2, 3].fill(7, 1, 3)) // [1, 7, 7](从1开始替到位置3，不包括3)
}
{
	for (let index of [1, 2, 3].keys()) {
		console.log(index) // 0 1 2
	}
	// 报错原因未知
	for (let value of [1, 2, 3]) {
		console.log(value) // 1 2 3
	}
	for (let [index, value] of [1, 2, 3].entries()) {
		console.log([index, value])
	} //[0, 1]
	// [1, 2]
	// [2, 3]
}
{
	console.log([1, 2, 3, 4].copyWithin(0, 3, 4)) // [4, 2, 3, 4] 用从3开始到4结束的位置处的数，替换位置从0开始处的数
}
{
	const a = [1, 2, 3, 4]
	console.log(
		a.find(item => {
			return item > 2
		})
	) // 3 (只返回第一个)
}
{
	const a = [1, 2, 3, 4]
	console.log(
		a.findIndex(item => {
			return item > 2
		})
	) // 2 (只返回第一个的下标)
}
{
	console.log([1, 2, NaN].includes(1)) //true(是否包含这个值)
	console.log([1, 2, NaN].includes(NaN)) //true(是否包含这个值)
}
```

## 对象

```js
{
    let o = 1;
    let k = 2;
    let es6 = {
        o,
        k
    }
    let es6_method = {
        hello() {
            console.log('hello')
        }
    }
    console.log(es6, es6_method.hello()) // hello Object {o: 1, k: 2}
}
{
    // 属性表达式:对象属性的key值可以用一个表达式去写
    let a = 'b';
    let es6 = {
        [a]: 'c'
    }
    console.log(es6) // Object {b: "c"}
}
{
    // 判断两个字符串的值是否相等
    console.log(Object.is('aaa','aaa')) // true
    console.log(Object.is([],[])) // false(因为数组是个引用类型)
    console.log(Object.assign({a: 'a'}, {b: 'b'})) // 浅拷贝，不拷贝继承属性（只拷贝自身属性），和不可枚举属性且只拷贝地址，不拷贝地址中对应内容
    let test = {
        o: 'a',
        k: 'b'
    }
    // Object.entries(test)时，只能用for-of
    for(let [key,value] of Object.entries(test)) {
        console.log([key, value])
    }
}
{
    // 报错，对象暂时不能用扩展运算符
    let {a, b, ...c} = {
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd'
    }
    console.log(a, b, c)
}

// 类与对象
// 有些东西只有在实例中才能用
{
    class Parent {
        // 构造函数
        constructor(name="mukewang") {
            // 给对象的实例增加一个属性name
            // 通过构造函数传入参数
            this.name = name;
        }
    }
    // 生成实例（在实例中传参）
    let v_parent = new Parent('v');//'v'就是name属性的值
    console.log(v_parent) // Parent {name: "v"}
}
{
    // 继承
    class Parent {
        // 构造函数
        constructor(name="mukewang") {
            // 给对象的实例增加一个属性name
            // 通过构造函数传入参数
            this.name = name;
        }
    }
    class Child extends Parent {

    }
    console.log(new Child) // 打印子对象的实例
    // Child {name: "mukewang"}
}
{
    // 子类的实例如何传参
    // 在子类的构造函数中用super方法
    class Parent {
        constructor(name="mukewang") {
            this.name = name;
        }
    }
    class Child extends Parent {
        constructor(name="child") {
            super(name);// super的参数列表就是父类的参数列表，否则就用父类默认的参数列表
            // 如果子类还要用自己的属性，只能写在super后面
            this.type = 'child'
        }
    }
    console.log(new Child('这个地方的参数会覆盖child')) // Child {name: "child"}
}
{
    // getter,setter(这是属性，不是方法)
    class Parent {
        constructor(name="mukewang") {
            this.name = name;
        }
        // 这是属性，不是方法
        get longName() {
            return 'mk' + this.name;
        }
        set longName(value) {
            this.name = value;
        }
    }
    // 我估计，这个地方只能在实例中运行
    let v = new Parent();
    console.log(v.longName) // mkmukewang
    v.longName = 'dddddddddd' // 这是属性，不是方法
    console.log(v.longName) // mkdddddddddd
}
{
    // static,静态方法就是通过类调用，而不是通过实例调用
    class Parent {
        constructor(name="mukewang") {
            this.name = name;
        }
        static tell() {
            console.log('tell')
        }
    }
    Parent.tell() // tell
}
{
    // 静态属性没有console直接就返回了，？
    // 静态属性
    // 类定义完之后直接在类上定义的就是静态属性
    // 没有使用new
    class Parent {
        constructor(name="mukewang") {
            this.name = name;
        }
        static tell() {
            console.log('tell')
        }
    }
    Parent.type = 'test' // test
    console.log(Parent.type) //用的时候直接调用
}
// decorators（不能用）
// 类修饰符
// 是个函数；修改行为；修改类的行为，即拓展类的功能
// core-decorators;类的修饰器库
{
    let readonly = function(target, name, descriptor) {
        descriptor.writable = false
        return descriptor
    }
    class Test {
        @readonly
        time() {
            return '2017'
        }
    }
    let test = new Test();
    test.time = function() {
        console.log('time')
    }
    console.log(test.time())
}
{
    // 类的静态属性，在类本身上调用
    let typename = function(target, name, descriptor) {
        target.myname = 'aaa'
    }
    @typename
    class Test {

    }
    console.log(Test.myname)
}
{
    // 埋点
    let log=(type) => {
        return function(target, name, descriptor) {
            let src_method = descriptor.value
            descriptor.value = (...arg) => {
                src_method.apply(target, arg) {
                    // 埋点的接口
                    console.log(`log${type}`)
                }
            }
        }
    }
    class AD {
        @log('show')
        show() {
            console.log('show')
        }
        @log('click')
        click() {
            console.log('click')
        }
    }
    let ad = new AD()
    ad.show()
    ad.click()
}
```

## 函数

```js
{
	function test(x = 'aa', y = 'bb', c = '默认值的后面不能带没有默认值的变量') {
		console.log(x, y)
	}
	test('dded') // dded bb
}
{
	let x = 'test'
	function test(x, y = x) {
		console.log(x, y)
	}
	test('till') // till till
}
{
	let x = 'test'
	function test(c, y = x) {
		console.log(y)
	}
	test('till') // test
}
{
	function test(...arg) {
		// 是个数组
		for (let v of arg) {
			console.log(v)
		}
	}
	test(1, 2, 3, 5) //1,2,3,5(执行4次)
}
{
	console.log(...[1, 3, 4]) // 1 3 4(把数组的值解出来)
	console.log('a', ...[1, 3, 4]) // a 1 3 4
}
{
	let arrow = v => v * 2
	// let arrow = () => v*2
	// 函数返回值
	arrow(4)
}
{
	// 尾调用：函数的最后是不是函数(提升性能)
	function tail(x) {
		console.log(x)
	}
	function fx(x) {
		return tail(x)
	}
	fx(111111) // 111111
}

// 模块化
// 导出模块
export let A = 123
export function test() {
	console.log('test')
}
export class Hello {
	test() {
		console.log('class')
	}
}
// 引入模块
import { A, test, Hello } from ''
import { A } from '' //需要哪个拿那个
import * as lesson from ''
lesson.A

//
export default {
	A,
	test,
	Hello,
}
import test from ''
// test 就代表default里的东西
```

## generator

```js
{
	// 数组的内置
	const arr = ['aa', 'bb']
	const map = arr[Symbol.iterator]()
	console.info(map.next()) // Object {value: "aa", done: false}
	console.log(map.next()) // Object {value: "bb", done: false}
	console.log(map.next()) // Object {value: undefined, done: true}
}
{
	const obj = {
		start: [1, 2, 3],
		end: [7, 8, 9],
		[Symbol.iterator]() {
			const self = this
			let index = 0
			const arr = self.start.concat(self.end)
			const len = arr.length
			return {
				next() {
					if (index < len) {
						return {
							value: arr[index++],
							done: false,
						}
					}
					return {
						value: arr[index++],
						done: true,
					}
				},
			}
		},
	}

	for (const key of obj) {
		console.log(key) // 1,2,3,7,8,9
	}
}

// generator
// 异步编程的解决方案
// next
// yield*
{
	const tell = function*() {
		yield 'a'
		yield 'b'
		return 'c'
	}
	const k = tell()
	console.log(k.next()) // Object {value: "a", done: false}
	console.log(k.next()) // Object {value: "b", done: false}
	console.log(k.next()) // Object {value: "c", done: true}
	console.log(k.next()) // Object {value: undefined, done: true}
}
{
	const obj = {}
	obj[Symbol.iterator] = function*() {
		yield 1
		yield 2
		yield 3
	}
	for (const value of obj) {
		console.log(value) // 1, 2, 3
	}
}
{
	// 状态机
	const state = function*() {
		while (1) {
			yield 'A'
			yield 'B'
			yield 'C'
		}
	}
	const status = state()
	console.log(status.next()) // Object {value: "A", done: false}
	console.log(status.next()) // Object {value: "B", done: false}
	console.log(status.next()) // Object {value: "C", done: false}
	console.log(status.next()) // Object {value: "A", done: false}
	console.log(status.next()) // Object {value: "B", done: false}
	console.log(status.next()) // Object {value: "C", done: false}
}
{
	// (装插件才能用)
	const state = async function() {
		while (1) {
			await 'A'
			await 'B'
			await 'C'
		}
	}
	const status = state()
	console.log(status.next()) // Object {value: "A", done: false}
	console.log(status.next()) // Object {value: "B", done: false}
	console.log(status.next()) // Object {value: "C", done: false}
	console.log(status.next()) // Object {value: "A", done: false}
	console.log(status.next()) // Object {value: "B", done: false}
	console.log(status.next()) // Object {value: "C", done: false}
}
{
	const draw = function(count) {
		// 抽奖逻辑
		console.log(`剩余${count}次`)
	}
	const residue = function*(count) {
		while (count > 0) {
			count--
			yield draw(count)
		}
	}
	const star = residue(5)
	const btn = document.createElement('button')
	btn.id = 'start'
	btn.textContent = '抽奖'
	document.body.appendChild(btn)
	document.getElementById('start').addEventListener(
		'click',
		() => {
			star.next()
		},
		false
	)
}
{
	// 长轮询
	const ajax = function*() {
		// 对服务端的查询（真实的接口）
		yield new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ code: 0 }) // 如果为1，则不断轮询
			}, 200)
		})
	}
	const pull = function() {
		const generator = ajax()
		const step = generator.next()
		step.value.then(d => {
			if (d.code != 0) {
				setTimeout(() => {
					console.log('wait')
					pull()
				}, 1000)
			} else {
				console.log(d) // Object {code: 0}
			}
		})
	}
	pull()
}
```

## 解构赋值

```js
{
	let a, b
	;[a, b] = [1, 2]
	console.log(a, b) // 1, 2
}

{
	let a, b, rest
	;[a, b, ...rest] = [1, 2, 3, 4, 5]
	console.info(a, b, rest) // 1, 2, [3, 4, 5]
}
{
	// 加一个小括号，貌似不用声明变量
	let a, b
	;({ a, b } = { a: 1, b: 2 }) // 没有括号报错
	console.log(a, b) //1, 2
}
{
	let a, b
	;[a, b, c = 3] = [1, 2]
	console.log(a, b, c) //1, 2, 3
}
{
	let a, b
	;[a, b, c] = [1, 2]
	console.log(a, b, c) //1, 2, undefind(用默认值解决)
}
{
	// 两个变量交换
	let a = 1
	let b = ((2)[(a, b)] = [b, a]) // 我的有报错，说b is not defined(因为在控制台中没有写分号)
	console.log(a, b) // 2, 1
}
{
	// 接收函数结果
	function f() {
		return [1, 2]
	}
	let a, b
	;[a, b] = f()
	console.log(a, b) // 1, 2
}
{
	// 选择接收函数结果（扔掉某个结果）
	function f() {
		return [1, 2, 3, 4]
	}
	let a, b
	;[a, , , b] = f()
	console.log(a, b) //1, 4(中间的被省略了)
}
{
	// 接收函数结果
	function f() {
		return [1, 2, 3, 4]
	}
	let a, b
	;[a, ...b] = f()
	console.log(a, b) //1, [2, 3, 4]
}
// 一个是给对象赋值，一个是给变量赋值
{
	let a, b
	;({ a, b } = { a: 1, b: 2 }) // 没有括号报错
	console.log(a, b) //1, 2
}
{
	let o = {
		p: 44,
		q: true,
	}
	let { p, q } = o
	console.log(p, q) // 44, true
}
{
	let { a = 10, b = 5 } = { a: 3 }
	console.log(a, b) // 3, 5
}
{
	// 防止命名冲突
	let data = {
		title: 'abc',
		test: [
			{
				title: 'test',
				desc: 'dddddddddddddddd',
			},
		],
	}
	let {
		title: esTitle,
		test: [{ title: cnTitle }],
	} = data
	console.log(esTitle, cnTitle) // abc, test
}
```

## set、map、object

```js
// set里的元素必须是唯一的
{
	let list = new Set()
	list.add(5)
	list.add(54)
	console.log(list.size) // 2
}
{
	let arr = [1, 2, 3, 4, 5]
	let list = new Set(arr)
	console.log(list) // Set(5) {1, 2, 3, 4, 5}(下标是0-4)
}
{
	let list = new Set()
	list.add(1)
	list.add(1)
	console.log(list) // Set(1) {1},重复的将不生效
}
{
	let arr = [1, 2, 3, 4, 5, 3, 4, 5]
	let list = new Set(arr)
	console.log(list) // Set(5) {1, 2, 3, 4, 5}
}
{
	let arr = ['add', 'delete', 'clear', 'has']
	let list = new Set(arr)
	console.log(list.has('add')) // true
	console.log(list.delete('add'), list) // true Set(3) {"delete", "clear", "has"}
	list.clear()
	console.log(list) // Set(0) {}
}
{
	// 遍历
	let arr = ['add', 'delete', 'clear', 'has']
	let list = new Set(arr)
	for (let key of list.keys()) {
		console.log(key)
	}
	for (let value of list.values()) {
		console.log(value)
	}
	for (let value of list) {
		console.log(value)
	}
	for (let [key, value] of list.entries()) {
		console.log([key, value])
	}
	list.forEach(item => {
		console.log(item)
	})
	// add ["add", "add"]
	// delete ["delete", "delete"]
	// clear ["clear", "clear"]
	// has ["has", "has"]
}

// weakset
// 与set的区别
// 1、支持的元素不同，只支持Object
// 2、地址的引用，也不会检测是否被垃圾回收掉了
// 没有size属性，没有clear方法，不能遍历
// 有has、delete、add方法，同set
{
	let weakset = new WeakSet()
	let arg = {}
	weakset.add(arg)
	// weakset.add(2)
	console.log(weakset) // WeakSet {Object {}}
}
```

# map

```js
// 数组类型的key值
{
	let map = new Map()
	let arr = ['aaa']

	map.set(arr)
	console.log(map) // Map(1) {["aaa"] => undefined}
	map.set(arr, 456)
	console.log(map) // Map(1) {["aaa"] => 456}
	console.log(map.get(arr)) // 456
}
{
	let map = new Map([['a', 123], ['b', 456]])
	console.log(map) // Map(2) {"a" => 123, "b" => 456}
	console.log(map.size) // 2
	console.log(map.delete('a'), map) // true Map(1) {"b" => 456}
	console.log(map.clear(), map) // undefined Map(0) {}
}
{
	let weakmap = new WeakMap()
	let o = {}
	weakmap.set(o, 123)
	console.log(weakmap.get(o)) // 123
}

// map set 与数组对象的比较
// 增删改查
{
	// 增
	let map = new Map()
	let array = []
	let set = new Set()
	map.set('t', 1)
	array.push({ t: 1 })
	set.add({ t: 1 })
	console.log(map, array, set) // Map(1) {"t" => 1}  [{t: 1}] Set(1) {Object {t: 1}}

	// 查
	let map_exist = map.has('t')
	let array_exist = array.find(item => item.t)
	let set_exist = set.has({ t: 1 }) // false,因为不是一个，要存成一个变量
	console.log(map_exist, array_exist, set_exist) // true Object {t: 1} false

	// 改
	map.set('t', 2)
	array.forEach(item => {
		item.t ? (item.t = 2) : ''
	})
	set.forEach(item => (item.t ? (item.t = 2) : ''))
	console.log(map, array, set) // Map(1) {"t" => 2} [t: 2] Set(1) {Object {t: 2}}

	// 删除
	// 如果一块儿console,则打印不出，因为delete会影响前者（对于array）
	map.delete('t')
	let index = array.findIndex(item => item.t)
	array.splice(index, 1)
	set.forEach(item => (item.t ? set.delete(item) : ''))
	console.log(map, array, set) // Map(0) {} [] Set(0) {}
}
{
	// set、map和Object
	let item = { t: 1 }
	let map = new Map()
	let set = new Set()
	let obj = {}

	// 增
	set.add(item)
	obj['t'] = 1
	map.set('t', 1)
	console.log(map, set, obj) // Map(1) {"t" => 1} Set(1) {Object {t: 1}} Object {t: 1}

	// 查
	console.log({
		map: map.has('t'),
		set: set.has(item),
		obj: 't' in obj,
	}) // Object {map: true, set: true, obj: true}
	// 改
	map.set('t', 2)
	item.t = 2
	obj['t'] = 2
	console.log(map, set, obj) // Map(1) {"t" => 2} Set(1) {Object {t: 2}} Object {t: 2}
	// 删:set删除时要删item，而不是key
	map.delete('t')
	set.delete('t')
	delete obj['t']
	console.log(map, set, obj) // Map(0) {} Set(1) {Object {t: 2}} Object {}
	set.delete(item)
	console.log(map, set, obj) // Map(0) {} Set(0) {} Object {}
}
```

## 数值扩展

```js
{
	// 二进制，八进制，大小写无碍
	console.log(0b11111000) // 248
	console.log(0o707) // 455
}
{
	// Number.isFinite(15)一个数是不是有尽
	console.log(Number.isFinite(15)) // true
	console.log(Number.isFinite(NaN)) // false
	console.log(Number.isFinite('true' / 0)) // false
	console.log(Number.isNaN(NaN)) // true
	console.log(Number.isNaN(0)) // false
}
{
	// Number.inInteger(25)一个数是不是整数
	console.log(Number.isInteger(25)) // true
	console.log(Number.isInteger(25.0)) // true
	console.log(Number.isInteger(25.1)) // false
	console.log(Number.isInteger('25')) // false
}
{
	// 有效数的上下限，是否是有效数
	console.log(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER) // 9007199254740991 -9007199254740991
	console.log(Number.isSafeInteger(10)) // ture
	console.log(Number.isSafeInteger('a')) // false
}
{
	// 取一个小数的整数部分
	console.log(Math.trunc(4.1)) // 4
	console.log(Math.trunc(4.9)) // 4
}
{
	// 判断一个数是正，负，0，还是NaN
	console.log(Math.sign(-3)) // -1
	console.log(Math.sign(0)) // 0
	console.log(Math.sign(3)) // 1
	console.log(Math.sign('-3')) // -1
	console.log(Math.sign('3')) // 1
	console.log(Math.sign('a')) // NaN
}
{
	// 一个数的立方根
	console.log(Math.cbrt(-1)) // -1
	console.log(Math.cbrt(8)) // 2
}
```

## promise

```js
{
	const ajax = function() {
		console.log('执行')
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve()
			}, 1000)
		})
	}
	ajax().then(() => {
		console.log('timeout')
	})
	// 执行
	// Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
	// timeout
}
{
	const ajax = function() {
		console.log('执行')
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve()
			}, 1000)
		})
	}
	ajax()
		.then(
			() =>
				new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve()
					}, 2000)
				})
		)
		.then(() => {
			console.log('timeout2')
		})
}
{
	const ajax = function(num) {
		console.log('执行')
		return new Promise((resolve, reject) => {
			if (num > 5) {
				resolve()
			} else {
				throw new Error('出错了')
			}
		})
	}
	ajax(6)
		.then(() => {
			console.log(6)
		})
		.catch(err => {
			console.log(err)
		})

	ajax(3)
		.then(() => {
			console.log(3)
		})
		.catch(err => {
			console.log(err)
		})
}
{
	// 所有图片加载完再添加到页面
	function loadImg(src) {
		return new Promise((resolve, reject) => {
			const img = document.createElement('img')
			img.src = src
			img.onload = function() {
				resolve(img)
			}
			img.onerror = function(err) {
				reject(err)
			}
		})
	}
	function showImgs(imgs) {
		imgs.forEach(img => {
			document.body.appendChild(img)
		})
	}
	Promise.all([
		loadImg('http://i4.buimg.com/567571/dflef0720bea6832.png'),
		loadImg('http://i4.buimg.com/567571/dflef0720bea6832.png'),
		loadImg('http://i4.buimg.com/567571/dflef0720bea6832.png'),
	]).then(showImgs)
}
{
	// 有一个图片加载完就添加到页面
	function loadImg(src) {
		return new Promise((resolve, reject) => {
			const img = document.createElement('img')
			img.src = src
			img.onload = function() {
				resolve(img)
			}
			img.onerror = function(err) {
				reject(err)
			}
		})
	}
	function showImgs(img) {
		const p = document.createElement('p')
		p.appendChild(img)
		document.body.appendChild(p)
	}
	Promise.race([
		loadImg('http://i4.buimg.com/567571/dflef0720bea6832.png'),
		loadImg('http://i4.buimg.com/567571/dflef0720bea6832.png'),
		loadImg('http://i4.buimg.com/567571/dflef0720bea6832.png'),
	]).then(showImgs)
}
```

## proxy 和 reflect

```js
// 映射对象
{
	let obj = {
		time: '2017-05-02',
		a: '2017-2',
		b: '2017-05',
		name: 'net',
		_r: 123,
	}
	let monitor = new Proxy(obj, {
		// 拦截对象属性的读取
		get(target, key) {
			// 不管你读取什么属性，都将属性值的2017替换成2018
			return target[key].replace('2017', '2018')
		},
		set(target, key, value) {
			// 只允许修改name属性
			if (key === 'name') {
				return (target[key] = value)
			} else {
				return target[key]
			}
		},
		// 拦截key in object操作
		has(target, key) {
			if (key === 'name') {
				return target[key]
			} else {
				return false
			}
		},
		// 拦截delete
		deleteProperty(target, key) {
			if (key.indexOf('_' > -1)) {
				delete target[key]
				return true
			} else {
				return target[key]
			}
		},
		// 拦截Object.keys,Object.getOwnPropertySymbols,Objet.getOwnPropertyNames
		ownKeys(target) {
			return Object.keys(target).filter(item => item != 'time')
		},
	})
	// 用户访问的是monitor
	console.log(monitor.time, monitor.a, monitor.b) // 2018-05-02 2018-2 2018-05
	monitor.time = '2018'
	console.log(monitor.time) // 2018-05-02
	monitor.name = '2018'
	console.log(monitor.name) // 2018
	console.log('name' in monitor, 'time' in monitor) // true false
	delete monitor.time
	console.log(monitor) // Proxy {a: "2017-2", b: "2017-05", name: "2018", _r: 123}
	delete monitor._r
	console.log(monitor) // Proxy {a: "2017-2", b: "2017-05", name: "2018"}
	console.log(Object.keys(monitor)) // ["a", "b", "name", "_r"]
}
// proxy有的方法reflect都有，且用法一致
{
	let obj = {
		time: '2017-05-02',
		a: '2017-2',
		b: '2017-05',
		name: 'net',
		_r: 123,
	}
	console.log(Reflect.get(obj, 'time')) // 2017-05-02
	Reflect.set(obj, 'name', 'aaa')
	console.log(obj.name) // aaa
	console.log(Reflect.has(obj, 'name')) // true
}
// 用在校验里
{
	// 和业务解耦的校验模块
	function validator(target, validator) {
		return new Proxy(target, {
			_validator: validator,
			set(target, key, value, proxy) {
				// 判断当前的对象有无key值，有就可以赋值
				if (target.hasOwnProperty(key)) {
					let va = this._validator[key]
					// 如果存在则正确映射
					if (!!va(value)) {
						return Reflect.set(target, key, value, proxy)
					} else {
						throw Error(`不能设置${key}到${value}`)
					}
				} else {
					throw Error(`${key}不存在`)
				}
			},
		})
	}

	// 过滤选项，校验条件
	const personValidators = {
		name(val) {
			return typeof val === 'String'
		},
		age(val) {
			return typeof val === 'number' && val > 18
		},
	}
	class Person {
		constructor(name, age) {
			;(this.age = age), (this.name = name)
			// 返回一个拦截对象，即操作的不是Person实例，而是proxy对象
			return validator(this, personValidators)
		}
	}
	const person = new Person('lilei', 30)
	console.info(person) // Proxy {age: 30, name: "lilei"}
	person.name = 48 // Uncaught Error: 不能设置name到48
}
```

## 正则与字符串

### 正则

```js
// u修饰符：i,g;y修饰符；s修饰符（没有实现）
{
	// es5
	const regex = new RegExp('xyz', 'i')
	const regex2 = new RegExp(/xyz/i)
	console.log(regex.test('xyz123'), regex2.test('xyz123')) // true true

	// es6
	const regex3 = new RegExp(/xyz/gi, 'i') // 后面的会把前面的覆盖
	console.log(regex3.flags) // i
}
{
	// g,y都是全局匹配，g是从上一次匹配的位置继续匹配，y是必须是紧跟着的下一个位置上是才能匹配成功
	const s = 'bbb_bb_b'
	const a1 = /b+/g
	const a2 = /b+/y
	console.log(1, a1.exec(s), a2.exec(s))
	// 1 ["bbb", index: 0, input: "bbb_bb_b"] ["bbb", index: 0, input: "bbb_bb_b"]
	console.log(2, a1.exec(s), a2.exec(s))
	// 2 ["bb", index: 4, input: "bbb_bb_b"] null
	// 是否开启了y这种匹配模式
	console.log(a1.sticky, a2.sticky) // false true
}
{
	// u修饰符
	// 字符串中有的字符是大于两个字节的要加u修饰符，否则错误
	console.log(1, /^\uD83D/.test('\uD83D\uDC2A')) // true(把'\uD83D\uDC2A'当做是两个字符)
	console.log(1, /^\uD83D/u.test('\uD83D\uDC2A')) // false(把'\uD83D\uDC2A'当做是一个字符)

	console.log(/\u{61}/.test('a')) // false
	console.log(/\u{61}/u.test('a')) // true(大括号包括的是一个字符，但是要加u字符才能识别)

	console.log(`\u{20BB7}`) // 𠮷
	// let s='𠮷'
	console.log('u', /^.$/.test(s)) // u false
	console.log('u', /^.$/u.test(s)) // u true

	console.log(/𠮷{2}/.test('𠮷𠮷')) // false
	console.log(/𠮷{2}/u.test('𠮷𠮷')) // true
}
```

### 字符串

```js
{
	console.log('a', '\u0061') // a a
	console.log('s', '\u20db7') // s ⃛7

	console.log('s', `\u{20db7}`) // s 𠶷
	console.log('s', `\u{20bb7}`) // s 𠮷
}
{
	const s = '𠮷'
	// es5
	console.log(s.length) // 2(因为每两个字节是一个长度)
	console.log(s.charAt(0)) // �
	console.log(s.charAt(1)) // �
	console.log(s.charCodeAt(0)) // 55362
	console.log(s.charCodeAt(1)) // 57271
	// es6

	const s1 = '𠮷a'
	console.log(s1.length) // 3
	console.log(s1.codePointAt(0)) // 134071(十进制码值)
	console.log(s1.codePointAt(0).toString(16)) // 20bb7
	console.log(s1.codePointAt(1)) // 57271
	console.log(s1.codePointAt(2)) // 97
}
{
	// es5(有码值取字符)
	console.log(String.fromCharCode('0x20bb7'))
	// es6(可能存在兼容问题，报错)
	console.log(String.formCodePoint('0x20bb7'))
}
{
	const str = '\u{20bb7}acb'
	for (let i = 0; i < str.length; i++) {
		console.log(str[i]) // 报错
	}
	for (const code of str) {
		console.log(code) // 𠮷, a, c, b,
	}
}
{
	let str = 'string'
	console.log(str.includes('c')) // false
	console.log(str.includes('str')) // true
	console.log(str.startsWith('str')) // true
	console.log(str.endsWith('ng')) // true
}
{
	let str = 'abc'
	console.log(str.repeat(4)) // abcabcabcabc
}
{
	let str = 'abc'
	console.log(`sss${str}`) // sssabc
}
{
	console.log('1'.padStart(2, '0')) // 01
	console.log('1'.padEnd(2, '0')) // 10
}
// 标签模板
{
	// 处理多语言转换，处理xss攻击
	// abc`i am ${user.name},${user.info}`就是abc函数的返回值
	let user = {
		name: 'list',
		info: 'hello world',
	}
	console.log(1, abc`i am ${user.name},${user.info}`)
	// 1 "i am ,,,listhello world"
	function abc(s, v1, v2) {
		console.log(2, s, v1, v2)
		return s + v1 + v2
	}
	// 2 ["i am ", ",", "", raw: Array(3)] "list" "hello world"
	// function abc(s, v1, v2) {
	// console.log(2, s, v1, v2)
	// return s+v1+v2
	// }
}
{
	// raw把斜杠转义，使斜杠不生效
	console.log(String.raw`hi\n${1 + 2}`) // hi\n3
	console.log(`hi\n${1 + 2}`) // hi, 3(分两次打印)
}
```

## Symbol

```js
// 提供一个独一无二的值
{
	const a = Symbol()
	const b = Symbol()
	console.log(a === b) // false
	const c = Symbol.for('c') // c为key值，
	const d = Symbol.for('c') // c为key值，
	console.log(c === d) // true
}
{
	// 通过symbol做key值for in 拿不到这个值
	const a1 = Symbol.for('abc')
	const obj = {
		[a1]: '123',
		abc: 222,
		c: 'ddd',
	}
	console.log(obj) // Object {abc: 222, c: "ddd", Symbol(abc): "123"}

	for (const [key, value] of Object.entries(obj)) {
		console.log(key, value) // abc 222,  c ddd
	}
	Object.getOwnPropertySymbols(obj).forEach(item => {
		console.log(obj[item]) // 123
	})
	Reflect.ownKeys(obj).forEach(item => {
		console.log(item) // abc, c, Symbol(abc)
		console.log('v', obj[item]) // 222, ddd, 123
	})
}
```
