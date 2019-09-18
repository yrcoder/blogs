# React ruminate

## 组件之间的通信
架构想采用 mobx 管理http请求的数据，不把组件内的状态变量放在中间。
想重新写一个可以更改组件内变量的事件监听方法，类似于vue的全局事件处理, this.$emit 和 this.$on的触发机制

```js
// 父子组件通信，或通过父组件中转兄弟组件通信
// 1. 在Child1组件的componentDidMount生命周期里面加上this.props.onRef(this),把Child1都传递给父组件
// 2. 父组件里面 <Child1 onRef={this.onRef}/> this.onRef方法为onRef=(ref)=>{this.child1=ref}
// 3. Child2组件触发一个事件的时候，就可以直接这样调用this.child1.onChange(),Child1组件里面就会直接调用onChange函数
class Child1 extends React.Component {
    componentDidMount(){
        this.props.onRef && this.props.onRef(this)
    }
}
class Child2 extends React.Component {
    render() {
        return <div onClick={this.props.onClick}>child2</div>
    }
}
class Parent extends React.Component {
    setChild1Ref = (ref) => {
        this.child1 = ref
    }
    render() {
        return <div>
            <Child1 onRef={this.setChild1Ref}></Child1>
            <Child2 onClick={() => this.child1.onChange()}></Child2>
        </div>
    }
}

// react 为元素添加自定义事件监听器
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        this.myRef.addEventListener('abcEvent', this.abcEvent)
    }

    componentWillUnmount() {
        this.myRef.removeEventListener("abcEvent", this.abcEvent);
    }

    abcEvent = (event) => {
        console.log(event)
    }

    render() {
        return <div ref={this.myRef} />;
    }
}

// 嵌套关系的组件之间通信方法:利用事件的发布订阅模式
// 一个组件触发事件，另一个组件声明组件
// 组件中引入events, 提供了监听、发布、删除等事件处理方法,是一个在浏览器端实现了node事件机制的包
// npm install events --save
// event.js
import { EventEmitter } from "events";
export default new EventEmitter();

// 声明事件
import emitter from './events'
class Child1 extends React.Component {
    componentDidMount(){
        this.eventEmitter = emitter.addListener("myEvent",(msg) => {
            console.log(msg)
        });
    }
    // 组件销毁前移除事件监听
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
    }
    render() {
        return <div>child1</div>
    }
}

// 触发事件
import emitter from './events'
class Child2 extends React.Component {
    onClick = () => {
        emitter.emit('myEvent', {a: 111})
    }
    render() {
        return <div onClick={this.onClick}>child2</div>
    }
}

```

## js自动触发事件, 自定义事件
eventType： 共有5种类型
HTMLEvents:  'abort', 'blur', 'change', 'error', 'focus', 'load', 'reset', 'resize', 'scroll', 'select', 'submit', 'unload'。
UIEevents: 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'keydown', 'keypress', 'keyup'。
MouseEvents: 'click', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup'。
MutationEvents: 'DOMAttrModified', 'DOMNodeInserted', 'DOMNodeRemoved','DOMCharacterDataModified','DOMNodeInsertedIntoDocument', 'DOMNodeRemovedFromDocument', 'DOMSubtreeModified'。

```js
// 自动触发click事件
document.body.onclick=function(){
    alert("hello")
}
var event = document.createEvent('MouseEvents');
// initEvent接受3个参数：
// 事件类型，是否冒泡，是否阻止浏览器的默认行为
event.initEvent("click", false, true);
//触发document上绑定的click事件
document.body.dispatchEvent(event);


// 自定义事件 1
document.body.addEventListener("veb",function(e){
    alert(e.eventType)
})
var event = document.createEvent('HTMLEvents');
event.initEvent("veb", false, true);
//通过eventType传递事件信息
event.eventType="I love Veblen"
document.body.dispatchEvent(event);

// 自定义事件 2
// 当一个事件触发的时候，如果相应的element及其上级元素没有对应的EventListener，就不会有任何回调操作。
// 对于子元素的监听，可以对父元素添加事件托管，让事件在事件冒泡阶段被监听器捕获并执行。这时候，使用event.target就可以获取到具体触发事件的元素。
// 创建事件
var myEvent = new CustomEvent('event_name', {
    detail: {
        // 将需要传递的数据写在detail中，以便在EventListener中获取
        // 数据将会在event.detail中得到
        a: 1111
    },
});

// 事件的监听
//假设listener注册在window对象上
window.addEventListener('event_name', function(event){
    console.log(event.detail);
});

// 事件的触发
// 使用 dispatchEvent 去触发（IE8低版本兼容，使用fireEvent）
if(window.dispatchEvent) {
    window.dispatchEvent(myEvent);
} else {
    window.fireEvent(myEvent);
}
```

复制到剪贴板
```js
render: (text) => {
    const wrap = {
        style: {
            position: 'relative'
        },
    }
    const showText = {
style: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'pointer'
},
        onMouseOver: (e) => {
            if (e.target.offsetWidth < e.target.scrollWidth) {
                e.target.nextSibling.style.display = 'block'
            }
        },
        onMouseOut: (e) => {
            if (e.target.offsetWidth < e.target.scrollWidth) {
                e.target.nextSibling.style.display = 'none'
            }
        },
        onClick: () => {
            const save = (e) => {
                e.clipboardData.setData('text/plain', text); // 剪贴板内容设置
                e.preventDefault();
            }
            document.addEventListener('copy', save)
            document.execCommand('copy'); // 执行copy事件，这时监听函数会执行save函数。
            document.removeEventListener('copy', save); // 移除copy事件
            message.success('拷贝成功!')
        }
    }
    const tooltip = {
        style: {
            display: 'none',
            position: 'absolute',
            top: '30px',
            zIndex: '100',
            width: '100%',
            background: '#fff',
            padding: '10px',
            borderRadius: '6px',
            boxShadow: '1px 1px 8px 0px rgba(0, 0, 0, 0.5)',
            wordBreak: 'break-all'
        }
    }
    return React.createElement('div', wrap, React.createElement('div', showText, text), React.createElement('div', tooltip, text));
},
```

