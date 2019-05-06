# JavaScript

## js 概观

-   一种基于对象和事件驱动的客户端脚本语言。

-   注释：// , /\*\*/

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
