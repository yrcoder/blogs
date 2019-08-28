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

```
<code>code 标签中间写代码</code>

引入一个 svg 图片，直接放在 img 标签的 src 即可
import logo from './logo.svg';
<img src={logo} alt="logo" />

引入 css 文件，标签上用 className 直接用
import './App.css';

<header className="App-header"></header>

react 定义 Component 组件
react-dom 把定义好的组件映射到 dom 上
```

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

## react 高阶

## context && contextType

能够让数据在组件树中传递而不必一级一级手动传递

context: <Provider> <Consumer>
createContext(defaultValue)

```js
// index.jsx(创建，发起)
const BatteryContext = createContext()
render() {
    return (
        <BatteryContext.Provider value={60}>
            <app></app>
        </BatteryContext.Provider>
    )
}
// 子组件(应用)

render() {
    return <BatteryContext.Consumer value={60}>
            {
                data => <div>data</div>
            }
        </BatteryContext.Consumer>
}

// 两个的话就两级嵌套,但是一般只用一个就好
<AContext.Provider value={60}>
<BContext.Provider value={60}>
    <app></app>
</BContext.Provider>
</AContext.Provider>

<AContext.Consumer>
    {
        a => (
            <AContext.Consumer>
                {
                    b => <div>{`${a}_${b}`}</div>
                }
            </AContext.Consumer>
        )
    }
</AContext.Consumer>

// 如果只有一个context,子组件(应用)可以用 contextType 代替Consumer

class Child extends Component {
    static contextType = BatteryContext
    render() {
        const data = this.context
        return <div>{data}</div>
    }
}
```

## hooks redux

redux 原则
单一数据源：应用程序的所有数据都挂载在同一对象下面，方便管理。同一信息量的数据只有一份，避免不同步。
状态不可变：修改数据的前后，数据源不再是同一个对象，可以实现应用程序状态的保存，实现时间旅行的功能。可以避免不按照规定去直接修改数据的行为。
纯函数修改状态：纯函数是没有副作用，不依赖外部变量，同样的输入产生同样的输出。可以精确实现对数据的修改行为。

-   并没有向任何子组件传递，就不用 useCallback
-   用 map 的时候应该用单独的组件把 item 渲染出来，这样才不至于当 list 发生变化的时候所有的 item 都重新渲染一遍
-   useEffect 副作用，当某个 useState 中的值发生变化的时候执行，如果项目中只用执行一次，那么，第二个参数设置为空数组。
-   useEffect 的执行是有顺序的
-   函数组件用 memo 包裹起来 `memo(function() {})`

```js
const inputRef = useRef()

const onSubmit = (e) => {
    e.preventDefault()
    const newText = inputRef.current.value.trim()
    addTodo(newText)
    inputRef.current.value = ""
}
<form onSubmit={onSubmit}>
    <input ref={inputRef}>
</from>
```

用 const [todo, setTodo] = useState([]) 当添加删除 todolist 的时候，不同的操作调用的是同一种方法 setTodos
现在有一种新的写法,用一种纯对象的方法描述对数据的操作

```js
// 整个对象称之为action，然后让每个action都经过一个中心节点函数，在这个函数里面集中处理一些副作用，或者连带更新的行为
{
    // 描述对数据进行了怎样的操作
    type: 'add',
    // 用来描述执行这个操作需要什么额外的参数，可以为空
    payload: todo
}

// 中心函数叫：dispatch
// dispatch如果需要传递到子组件中要用一个useCallback包裹起来, 除了setTodo没有对任何参数进行以来，第二个参数是空数组
const dispatch = useCallback((action) => {
    const { type, payload } = action
    switch(type) {
        case 'set':
            setTodo(payload)
            break;
        case 'add':
            setTodo(todo => [...todo, payload])
            break;
        default:
    }
}, [])

// 调用
useEffect(() => {
    dispatch({type: 'set', payload: todo})
}, [])
```

# 高阶组件

高阶函数：函数可以作为参数被传递，函数可以作为返回值被输出
高阶组件：接收一个组件作为参数并返回一个新组件的函数，高阶组件是一个函数，并不是一个组件

```js
// 函数可以作为参数被传递
// 数组中： some(),map(),forEach(),filter() 都是
setTimeout(() => {
	console.log(1)
}, 1000)

$.get('/api/get', function() {
	console.log('OK')
})

// 函数可以作为返回值被输出
function foo(x) {
	return function() {
		return x
	}
}

// 高阶组件
import React, { Component } from 'react'
function Wrap(Content) {
	return class A extends Component {
		render() {
			return (
				<div>
					<header>公共部分</header>
					<main>
						<Content />
					</main>
				</div>
			)
		}
	}
}
export default Wrap

// 应用
import React, { Component } from 'react'
import Wrap from './wrap'
class A extends Component {
	render() {
		return <div>组件A</div>
	}
}
export default Wrap(A)

// es6语法，装饰器
// 安装依赖：npm i -D babel-preset-stage-2 babel-preset-react-native-stage-0
// .babelrc配置：{"presets": ["react-native-stage-0/decorator-support"]}
import React, { Component } from 'react'
import wrap from './wrap'
@wrap
class A extends Component {
	render() {
		return <div>组件A</div>
	}
}
export default A

```

## 代理方式的高阶组件

返回的新组件类直接继承自 React.Component 类，新组件扮演的角色传人参数组件的一个代理，
在新组件的 render 函数中，将被包裹组件渲染出来，除了高阶组件自己要做的工作，其余功能全都转手给了被包裹的组件

## 继承方式的高阶组件

采用

## 右键列表

方法一:
onContextMenu: (event) => {
console.log("鼠标右击了 1")
},

方法二:
onMouseUp:(e)=>{
if (e.button===2) {
console.log('鼠标右击了 2')
}
},

全局阻止浏览器默认事件（鼠标右击事件等）

document.oncontextmenu = function(){
return false;
}
