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
