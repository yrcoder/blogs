# react

react 中子组件中调用父组件的方法，在传递的过程中 this 指向会发生变化,从父组件中传一个 this

```js
// 父组件
<Child formViewEvent={(option, form) => this.formViewEvent(option, form, this)} />

// 子组件
<Button onClick={formViewEvent(btn, formData)}>
	{btn.title}
</Button>
```

安装

```shell
# 脚手架起一个react项目
npm install -g create-react-app
create-react-app react-mobx
```

## bug

Minified React error #200;
id 或者 class 名写错

## react 组件

```js
/**
ReactDom.render(标签或者组件（jsx对象）, 要挂载的dom节点)
ReactDOM.render(<App />, document.getElementById('root'))
注：要挂载的dom节点不能是 document.body
组件和函数：重复的逻辑。通过给组件传人不同的参数，从而显示不同的形态。复杂的组件可以通过简单的组件构成。
*/

// 创建组件
const test = React.createClass({
    render: function() {
        // return 一个小括号
        return <div>abc</div>
    },
})

// 挂载组件
ReactDOM.render(<test />, document.getElementById('root'))

// 拿到父组件传过来的值, this.props.targetVal
const test = React.createClass({
    render: function() {
        // 大括号表示变量
        return <div>{this.props.targetVal}</div>
    },
})
ReactDOM.render(<test targetVal="hi, abc" />, document.getElementById('root'))

// this.props.children, 通过 {...this.props} 传递
const test = React.createClass({
    const style = {
        padding: 10,
        margin: this.props.marginVal
    }
    render: function() {
        return <div style={style}>{this.props.children}</div>
    },
})
ReactDOM.render(<test marginVal="{10}" {...this.props} />, document.getElementById('root'))

// 组件传递就是从父到子，不能跨级
// 组件的状态,state,this.setState
const test = React.createClass({
    // state设置的生命周期
    state: () => {
        // 默认会注入相应的生命周期getInitialState
    },
    getInitialState: function() {
        return {
            num: 0
        }
    },
    action: function() {
        this.setState({
            num: this.state.num + 1
        })
    },
    componentDidMount: function() {
        setInterval(this.action, 1000)
    },
    render: function() {
        return <div>{this.state.num}</div>
    },
})

// 事件
const test = React.createClass({
    action: function(e) {
        if(e.shiftKey === true) {
            console.log('shift 键被按下')
        }
    },
    render: function() {
        return <div onClick={this.action}>abc</div>
    },
})
// 生命周期
getDefaultProps: function() {}
getInitialState: function() {}
```

## react 相应用户输入

```js
// 把组件赋值给一个变量
const test = <test name="aaa" />
ReactDOM.render(<div>{test}</div>, document.getElementById('root'))
// 等同于 ReactDOM.render(<div><test name="aaa" /></div>, document.getElementById('root'))

// 标签内可以直接赋值一个函数
function show() {
    const colors = ['#aaa', '#f00', '#0f0']
    const ran = Math.floor(Math.randow() * colors.length)
    return <test bgColor={color[ran]} />
}
ReactDOM.render(<div>{show()}</div>, document.getElementById('root'))

// 循环组件
// key 跟虚拟dom有关,循环必须要有，而且唯一
function show() {
    const colors = ['#aaa', '#f00', '#0f0']
    const renderData = []
    for (let i = 0; i < colors.length; i++) {
        const ran = Math.floor(Math.randow() * colors.length)
        renderData.push(<test bgColor={color[ran]} key={i + colors[ran]} />)
    }
    return renderData
}
ReactDOM.render(<div>{show()}</div>, document.getElementById('root'))

// DOM 模型操作
// 获取输入框里的值
const test = React.createClass({
    state: () => {
        inputVal: '',
        color: ''
    },
    getVal: function(e) {
        this.setState({
            inputVal: e.target.value
        })
    },
    setColor: function(e) {
        this.setState({
            color: this.state.inputVal
        })
        this._input.value = ""
        this._input.focus()
        // 去掉默认时间，不要把from表单的数据打成一个包发给服务器
        e.preventDefault()
    }
    render: function() {
        const style = {
            backgroundColor: this.state.bgColor
        }
        const self = this
        return <div style={style}>
            <form onSubmit={this.setColor}>
                <input onChange={this.getVal} ref={function(el) {
                    // el就是 input 对象, 传出去才能调用
                    self._input = el
                }}/>
                <button type="submit">提交</button>
            </form>
        </div>
    },
})
```

## react 综合运用

## 其他

### create-react-app 生成的项目文件解读

<code>code 标签中间写代码</code>

引入一个 svg 图片，直接放在 img 标签的 src 即可
import logo from './logo.svg';
<img src={logo} alt="logo" />

引入 css 文件，标签上用 className 直接用
import './App.css';

<header className="App-header"></header>

react 定义 Component 组件
react-dom 把定义好的组件映射到 dom 上

```js
// react 定义 Component 组件
import React, { Component } from 'react'
class App extends Component {
	render() {
		return <div className="App" />
	}
}
export default App

// react-dom 把定义好的组件映射到 dom 上
import ReactDOM from 'react-dom'
import App from './App'
ReactDOM.render(<App />, document.getElementById('root'))
```

react 中事件必须不能执行，即不能带括号，否则就要在里面写一个箭头函数

```js
<button
	onClick={() => {
		this.props.nav.addMenus(+new Date())
	}}
>
	添加menus
</button>
```
