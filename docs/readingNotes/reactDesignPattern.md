# react 设计模式和最佳实战

## react 基础

从高级角度介绍了 React 的基本概念

### 声明式编程

-   声明式编程中无须使用变量，也不用在执行过程中持续更新变量的值。声明式编程避免了创建和修改状态
-   只需要描述他们想要实现什么目的，无须列出实现效果的所有步骤
-   React 遵循声明式范式，因此无须告诉它如何与 DOM 交互。你只要声明希望在屏幕上看到的内容，React 就会完成剩下的工作

核心包 react 实现了 React 库的核心特性，react-dom 则包含了与浏览器相关的所有特性。
这样做的理由是，核心包可以用于支持不同的目标平台，如浏览器中的 React DOM 以及移动设备上的 React Native。

## 整理代码

保持代码整洁并遵循编程风格指南。了解函数式编程的基础知识对于使用 React 也很重要

-   为了在代码中使用 JSX 及 ES2015 的特性要安装 Babel,Babel 是 React 社区广泛使用的一个流行 JavaScript 编译器
-   创建 div 元素,运行 Babel 时会将<div />转换成 React.createElement('div')，编写模板时要始终牢记这一点。
-   JSX 不是一门标准语言，需要转译成 JavaScript。由于这一点，有些属性无法使用。用 className 取代 classhtmlFor 取代 for`<label className="awesome-label" htmlFor="name" />`
-   如果设置某个属性却没有赋值，那么 JSX 会默认其值是 true `<button disabled />`
-   属性展开：`const foo = { id: 'bar' }; <div {...foo} />`
-   可以用双花括号封装 JavaScript 表达式以作为属性值 `<button disabled={errors.length} />`
-   render-if，react-only-if， 多个 if-else 渲染模版替代方案
-   循环：`<ul>{users.map(user =><li>{user.name}</li>)} </ul>`

### 函数式编程

函数式编程就是一种声明式范式，能够避免代码副作用，同时它推崇数据不可变，以便更易维护与考量代码。

-   高阶函数接受一个函数作为参数，也可以传入其他参数，最后返回另一个函数。返回的函数通常会添加一些增强的特殊行为。将组件当作函数，并为它们增加一些常用行为
-   纯函数：是指它不产生副作用，也就是说它不会改变自身作用域以外的任何东西
    -   如果函数改变了应用状态、修改了上层作用域定义的变量，或者与 DOM 这样的外部实体发生了交互就是非纯粹函数
    -   它可以运行多次，并且总能得到同样的结果，因为没有将数据存储在其他地方，也没有修改任何东西
    -   函数不会修改变量值，而是创建新的变量，赋新值后再返回变量。操作数据的这种方式称为不可变性
    -   柯里化过程就是将多参数函数转换成单参数函数，这些单参数函数的返回值也是函数
        -   传入第一个参数后，第一个值被保留起来，返回的第二个函数可以多次复用
        -   const add = x => y => x + y;const add1 = add(1); add1(2); add1(3)
-   组合: 函数（和组件）可以结合产生新函数，从而提供更高级的功能与属性
    -   `const add = (x, y) => x + y; const square = x => x * x`
    -   `const addAndSquare = (x, y) => square(add(x, y))`
-   函数式编程与 UI : 可以将 UI 看作传入应用状态的函数
    -   UI = f(state)
    -   希望这是一个幂等函数，即传入相同的应用状态时会返回同样的 UI。
    -   将创建 UI 的组件看作函数,组件可以组合形成最后的 UI

## 可复用组件

保持代码库整洁且可维护，最重要的是开发真正可复用的组件
React 允许将组件定义为无状态函数

-   React 的工作方式很像状态机，每当状态改变就重新渲染
-   只要能根据 props 计算最终值，就不应该将任何数据保存在状态中
    -   `getPrice() {return this.props.currency + this.props.value}`
-   不要把 props 里的数据复制到状态里，直接在 render()方法中计算即可
-   不要把没有参与渲染的数据放进状态

```js
// 第一步先创建可复用的列表组件，通过定义通用的集合属性，对该列表组件做一些抽象并与显示的数据解耦
List.propTypes = {
	collection: React.PropTypes.array,
	textKey: React.PropTypes.string,
	titleKey: React.PropTypes.string,
}
const List = ({ collection, textKey, titleKey }) => (
	<ul>
		{collection.map(item => (
			<Item key={item.id} text={item[textKey]} title={item[titleKey]} />
		))}
	</ul>
)
const Item = ({ text, title }) => (
	<li>
		<h1>{title}</h1>
		{text && <p>{text}</p>}
	</li>
)
Item.propTypes = {
	text: React.PropTypes.string,
	title: React.PropTypes.string,
}
```

## 组合一切

真实应用由不同的组件构成，重要的是让组件之间可以高效地通信，并按照正确的形式组织和搭建层次结构

容器组件 + 表现组件

-   逻辑： 逻辑一般指与 UI 无关的那些东西，如 API 的调用、数据操作以及事件处理器
-   表现： 渲染方法中创建元素用来显示 UI 的部分
-   无状态函数式组件就是纯粹函数，传入状态并返回元素
-   容器组件：
    -   更关心行为部分
    -   负责渲染对应的表现组件；
    -   发起 API 请求并操作数据
    -   定义事件处理器
    -   写作类的形式
-   表现组件：
    -   更关心视觉表现
    -   负责渲染 HTML 标记（或其他组件）
    -   以 props 的形式从父组件接收数据
    -   通常写作无状态函数式组件
-   mixin：不同组件拥有相同行为
-   当高阶函数概念应用在组件上时，我们将它简称为高阶组件
    -   高阶组件其实就是函数，它接收组件作为参数，对组件进行增强后返回
    -   recompose（库）： 可以串联多个高阶组件以尽量保持组件简洁
-   函数子组件：动态地组合组件
    -   const Name = ({ children }) => children('World')
    -   `<Name>{name => <div>Hello, {name}!</div>}</Name>`

## 恰当的获取数据

任何客户端应用在某些时刻都必须处理数据，并且介绍了不同的技巧和方法，让你能够以 React 的方式获取数据

## 为浏览器编写代码

了如何正确使用在浏览器中运行的应用，还讲解了一些高级概念，如事件、动画以及如何与 DOM 交互

## 美化组件

开发美观的 UI 组件，React 可以通过多种方式实现这个目的，

## 服务端渲染

## 提升性能

## 测试与调试

## 需要避免的反模式

## 未来的行动
