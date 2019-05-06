# html

## 写在前面

-   页面是承载“素材”，并操纵“素材”，以使其成为网上的“印刷品”。把数据放在规定的盒子里打上相应的标记，才能通过选择器选择，通过 css 进行排版。HTML 只有两种：**块级**和**内联**。前者用来**布局**，后者用来**存放内容**。

-   关于布局，标签出现了**语义化**，关于 **div** 它还有些个很严重的事情，可以**携带数据**，可以成为苹果依然兼容的**输入框**

## 总体

-   web 标准：结构，表现，行为
-   块级元素：自动占满父元素的宽度，独自占一行。
-   内联元素：不能定义宽高，宽度由内容撑起。

## 基本结构

```html
<!DOCTYPE html>
<!-- 命名文档类型，不是 HTML 标签；它是指示 web 浏览器关于页面使用哪个 HTML 版本进行编写的指令。 -->
<html>
	<!-- 说明写的是标记语言 -->
	<head>
		<meta charset="utf-8" />
		<!-- 编码格式（乱码） -->
		<meta
			name="viewport"
			content="width=device-width,
    initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
		/>
		<!-- 以最新翻译 -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="renderer" content="webkit" />
		<title>状态栏里的名称</title>
		<style type="text/css"></style>
		<!-- 被浏览器加载时加载，快，支持旧版本,
    当用js控制DOM去改变样式时只能用link标签-->
		<link rel="stylesheet" type="text/css" href="" />
		<!-- 这个结构里面不能有其他东西，旧版本浏览器不支持，DOM不可控制，
        等页面全部下载完时再被加载，有时开始会无样式 -->
		<style type="text/css">
			@import url();
		</style>
	</head>
	<!--常规标记，属性不分先后（空标记，如<img />）-->
	<body></body>
</html>
```

## 段落

```html
<!-- 标题 -->
<h1>标题</h1>
<!-- 水平线，块元素 -->
<hr />
<!-- 段落 -->
<p>
	<b>加粗</b>
	<strong>加粗，强调</strong>
	<br />
	<!-- 强制换行，文本专用 -->
	<em>倾斜</em>
	<i>倾斜</i>
	&nbsp;
	<!-- 空格 -->
	<span>一小段字</span>
	<img src="../aa.jpg" alt="替换文本" title="鼠标放上的提示信息，大多数标签都有" />
	<a href="目标文件路径及全称/链接地址" title="提示文本" target="_blank"></a>
</p>
```

## 列表

```html
<ul type="1" type="a">
	<li>转为有序</li>
	<!-- 块级 -->
</ul>
<ol>
	<li></li>
</ol>
<dl>
	<dt>名词或图片</dt>
	<dd>解释</dd>
</dl>
```

## 表格

```html
<table rules="rows/cols/all/none/groups"> <!-- rules: 组分割线 -->
    <caption>表格标题</caption>
    <thead>仅一个</thead>
    <tbody>多个</tbody>
    <tfoot>仅一个</tfoot>
    <colgroup span="指定相邻几列为一组">
    决定表格内部分割线rules应该处于的位置</colgroup>
    <col span="3">
    <tr>
        <th>表格列标题</th>
    </tr>
    <tr align="center"> <!-- 行 -->
        <!-- 合并列，合并行 -->
        <td colspan="2" rowspan="2">单元格</td>
    </tr>
    <!-- cellspacing="单元格之间的间距";
    cellpadding="单元格，内容之间的间距"-->
</table>
```

## 表格的 css 属性

```css
    border-spacing: 单元格间距;
    border-collapse: separate（边框分开）/collapse(边框合并);
    empty-cells: show/hide;(无内容单元格);
    table-layout: auto/fixed(固定宽高);
    caption-side: top/right/bottom/left;（表格标题位置）
```

## 表单

```html
<!-- 表单域（表单元素必须写在表单域中）-->
<form name="表单名称" method="post/get" action="index.jsp">
	<fieldser>
		<!-- 可以嵌套别fieldser -->
		<legend>必须是fieldser的第一个元素，标题</legend>
	</fieldser>
	<label for="绑定控件的ID名"></label>
	<input type="text" value="要输入内容的默认值" placeholder="" />
	<input type="password" value="" />
	<input type="submit" value="提交内容" />
	<input type="reset" value="" />
	<input type="radio" name="名字相同说明处在同一组，关联，不显示" checked="checked" checked="disabled" />
	<input type="checdbox" disabled="disabled" />
	<input type="button" value="跳转但不提交" />
	<textarea name="" cols="字符宽度" rows="行数"></textarea>
	<select name="下拉菜单">
		<option>框上内容为第一个option上的内容</option>
	</select>
</form>
```

# css

## 选择器

-   css 权重：
    行内样式（1000）> ID(100) > 类，属性，伪类（10）> 元素，伪元素（1）> \*(0)

-   基本选择器：
    通配符选择器，元素选择器，类选择器，ID 选择器，后代选择器（空格）

-   新增基本选择器：

```css
    子元素选择器：父元素 > 子元素（不包括孙子），
    相邻兄弟选择器：元素 + 兄弟相邻元素（同一个父元素，紧邻在该元素后面），
    通用兄弟选择器：元素 ~ 所有兄弟（选择有同一个父元素的后面的所有兄弟元素，前面的不选），
    群组选择器：逗号（换行）
```

-   属性选择器：对带有指定属性的 HTML 元素设置样式

```css
    Element[attribute]：a[href] {选择有href属性的a标签}；
    Element[attribute = "value"]：a[href = "#"] {选择带有href属性且值为#的a标签}
    Element[attribute ~= "value"]: a[class ~= "two"] {选择带有class属性且多个属性值中有一个是two的a标签}
        <a class="one two"></a><a class="two three"></a>(含有two就会被选中)
    Element[attribute ^= "value"]：a[href = "#"] {选择属性为href且值以value开头的所有元素}
        <a href="#1"></a><a href="#2"></a><a href="#"></a>
    Element[attribute $= "value"]：a[href = "#"] {选择属性为href且值以value结尾的所有元素}
    Element[attribute *= "value"]：a[href = "#"] {选择属性为href且值含有#的所有元素}
    Element[attribute |= "value"]：a[href = "#"] {选择属性为href且值以#或者“#-”开头的所有元素}
    <a href="#" ></a><a href="#-1" ></a>
```

-   伪类选择器：

```css
    动态伪类：不存在于HTML中，只有当用户和网站交互时才体现出来

    锚点伪类：:link, :visited;

    用户行为伪类：:hover, :axtive, :focus(a:hover{} input:focus{})

    UI元素状态伪类：
        :enabled, :disabled, :checked(只有欧朋兼容);（input:enable{} input:disable{}）

    结构类：:nth（被选的Element）
        Element:first-child, {不管相对于那一级别，只要长子是，该长子就被选中，一般配合子元素选择器用：section > div:first-child;section下面的第一个div},
        Element:last-child, {如果最后一个孩子不是指定的element，则不起作用。即，先找最后一个元素，在从中找element指定的元素匹配}
        Element:nth-child(n), 同样先找孩子，如果是对应的标签则起作用。ul > li:nth(3){从1开始数}
            n:具体的数字，或者一个表达式2n,2n+1,2n-1,3n+1(只能是加减)，odd（奇数）even（偶数）
        Element:nth-last-child(n), 同上，倒数
        Element:nth-of-type(n),{匹配特定类型的第几个，也就是，先看类型再计数}
        Element:nth-last-of-type(n),
        Element:first-of-type,
        Element:last-of-type,
        Element:only-child,(匹配该独子)
        Element:only-of-type,(匹配类型独子，即指定的元素是唯一的一个)
        Element:empty(匹配没有子元素包括文本节点的每个元素)
    否定选择器：
        父元素:not(子元素)：nav > a:not(:last-of-type) {border-right: 1px solid red}最后一个a标签没有边框
```

-   伪元素：两个冒号一个也行

```css
    element::first-line{对element元素的第一行文本进行格式，只能用于块级元素}
    element::first-letter{对element元素的第一个字进行格式，只能用于块级元素}
    element::before{在元素的内容前面插入新内容，常用content配合使用}
        div::before{content: "ssss";任何CSS属性}（该伪元素是div的第一个子元素，且是行级元素，内容通过content写入）
    element::after{element的最后一个元素，常清除浮动。父容器高度为0则是塌陷，要清除浮动。display: block;cntent: "";clear:both;}
    element::selection{设置在浏览器中选择文本后的背景色和前景色。background: red;color: #fff;}
```

## css 边框和圆角

    * 圆角：border-radius:1-4个具体值或百分比;(4值：顺时针，左上；3值：左上，两个，右下；2值：对角)

    ```css
        border-radius: 10px;
        border-radius: 50%;
        border-top-left-radius:;
        border-top-right-radius:;
        border-bottom-right-radius:;
        border-bottom-left-radius:;
        /* (案例：圆角+伪类，思考的形状) */
    ```

    *  盒阴影：

    ```css
        box-shadow:水平偏移量（右下为正） 竖直偏移量 模糊（无负值） 扩展 阴影颜色 内外阴影控制;
        box-shadow: 50px 30px 0 0 yellow;
        /* (默认外阴影，insert为内阴影)
        叠加了一层div
        内阴影里也会有字 */
    ```

    * 边界图片：

    ```css
    border-image:source slice width outset repeat;
    border-image-source: url("./s.jpg");
    border-image-slice: number|%|fill;/*(指定图像的边界向内偏移，把背景图片九宫切开，放大填充)*/
    border-image-width: 30%;/*(和上面的相反)*/
    border-image-outset: length|number(2);
    border-image-repeat: repeat|stretched(拉伸)|rounded(铺满)|initial|inherit；
    ```

## 背景

```css
background: color position size repeat origin clip attachment image;
/*(背景图像区域)*/
background-clip: border-box|padding-box|content-box;
/*(指定background-position属性应该是相对位置（左上）)*/
background-origin: border-box|padding-box|content-box;
background-size: cover|contain|百分数|length;
/*(放在前面的图会覆盖后面的图)*/
background-image: url(), url();
```

## 渐变

    在两个或者多个颜色之间显示平稳的过渡
    * 线性渐变

```css
    /*(默认方向从上到下)*/
    background: linear-gradient(direction, color-stop1,……);
    background: linear-gradient(red, blue);
    /* 各内核写法不同 */
    background: -webkit-linear-gradient(begin-direction,color-stop1,color-stop2,..);
    background: -moz-linear-gradient(end-direction,color-stop1,color-stop2,..);
    background: -o-linear-gradient(end-direction,color-stop1,color-stop2,..);
    background:linear-gradient(to end-direction, color-stop1, color-stop2,..);
    background:linear-gradient(to right, color-stop1, color-stop2,..)(从左到右)
    /* 对角写法（各核同上） */
    background:linear-gradient(to right bottom, color-stop1, color-stop2,...)(从左上到右下)
    /* 角度 */
    background: linear-gradient(angle,color-stop1,color-stop2,..)
    background: linear-gradient(45deg,red,blue)
    /* 多个颜色，占比不同 */
    background: linear-gradient(90deg, red 10%, yellow 30%, blue 20%, green)
    /* 透明度渐变 */
    background: linear-gradient(90deg, rgba(255,0,0,0),rgba(255,0,0,.9))
    /* 重复渐变 */
    background: repeating-linear-gradient(color1 length|percentage,color1 length|percentage,...)
    background: repeating-linear-gradient(90deg, red 0%, blue 10%, red 20%)
```

    * 径向渐变

```css
    background: radial-gradient(center,shape size,start-color,...,last-color)
    shape: circle(圆) 椭圆（默认）
    size: closest-side:最近边；farthest-side:最远边；closest-corner:最近角；farthest-corner：最远角
    background: radial-gradient(red, yellow, blue);(默认，中心在原点)
    background: radial-gradient(red 10%, yellow 50%, blue 70%);(默认椭圆，中心在原点)
    background: radial-gradient(closest-corner circle, red, blue)
    background: radial-gradient(30% 70%, closest-corner circle, red, blue)
    background: repeating-radial-gradient(red 0%, blue 10%, red 20%)
    /* 案例 */
    background-color: #abcdef;
    background-size: 100px 100px;
    background: linear-gradient(45deg, red 25%, transparent 25%),
                linear-gradient(-45deg, red 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%,red 75%),
                linear-gradient(-45deg, transparent 75%, red 75%);
```

## CSS3 转换 transform(静态摆放)

transform: none（默认） | transform-function [可以跟好几个]

-   2D 函数

```css
    rotate(角度正数顺时针，负数逆时针)  ：transform: rotate(-45deg);
    translate(x,y)
        transform(200px, 200px)  只有一个参数，第二个默认为0
        translateX(200px)|(50%)正右
        translateY(200px)|(50%)正下
    scale(x, y) 缩放比例
        scale(.5, .5)
        scaleX(.5) 往中间缩
        scaleY(.5) 中间的那一条线不变
    skew(x, y)
        skew(15deg, 15deg)
        skewX(15deg) 平行四边形，正逆时针，负值顺时针
        skewY(90deg) 90deg消失, 像指针一样转动
```

-   3D 函数

```css
    rotate3d(x,y,z,angle):参数不许省略，前三个分别代表旋转方向0不转1转。都不是0，可以是小数，代表角度是deg的多少倍
    rotateX(90deg) 90deg消失
    rotateY(45deg)
    rotateZ(45deg) 正顺时针
    translate3d(x, y, z)都不能省略
    translateZ(200px)
    scale3d(x, y, rotateZ)都不能省略
    scaleZ(.5)
    /* (可以是百分数)坐标原点 */
    transform-origin:left top;
    /* 指定嵌套元素怎样在三维空间中呈现，没有它3d无作用，设置在父元素上 */
    transform-style:flat(默认) | preserve-3d;
    /* 指定观察者距离[z=0]平面的距离，使具有三维位置变换的元素产生透视效果 */
    perspective:none | number;
    /* 指定透视点的位置，默认50% 50% */
    perspective-origin:x-axis y-axis;
    /* 元素背面面向用户时是否可见。 */
    backface-visibility:visible | hidden;
```

> transition 动画需要事件触发,animation 不需触发

## CSS3 过渡

transition：允许 CSS 属性值在一定时间区间内平滑的过渡。在鼠标单击、获得焦点、被点击或对元素有任何改变时触发，并平滑的以动画效果改变 CSS 的属性值

```css
transition-property: none|all（默认）|具体属性的名称;
指定参与过渡的属性transition-duration: time(20s);
过渡持续时间transition-timing-function: ease（平滑）|linear(线性) |ease-in（慢到快）|ease-out（快到慢）|ease-in-out（慢快慢）|step-start（步数）|step-end|steps(

	)
	|cubic-bezier(number, num, num, num);
过渡的动画类型，只可以选一个transition-delay: 0.4s;
延时transition: property duration timing-function delay;
transition: transform 2s ease-in-out 1s;
```

## CSS3 动画

animation: 使元素从一种样式逐渐变化为另一种样式的效果.
顺序：优先判断 name,duration.其他不用按顺序

```css
    /* 设置对象所应用的动画名称 */
    animation-name:none(指定有无动画，可用于覆盖从级联的动画)|keyframename（指定要绑定到选择器的关键帧的名字）;
    /* 用关键帧定义动画(指定属性和属性值)，用animation-name来调用 */
    div { animation-name: animation1;}
    @keyframes animation1 {
        /* 0-100%; from === 0%，to === 100% */
        from { transform: rotateX(0deg);}
        to { transform: rotateY(360deg);}
    }
    animation-duration:.5s;过渡持续时间
    animation-timing-function:linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|
    animation-delay: .5s;延时
    animation-iteration-count:infinite(无限循环)|number(循环次数);
    animation-direction: normal|reverse|alternate(先正常运行再反向运行持续交替，要循环，否则失效)|alternate-reverse（与3相反）|initial|inherit ;
    animation-fill-mode:none（不设置动画之外的状态delay也算）|forwards(设置对象为动画结束状态)|backwards（开始状态）|both（开始或结束状态）;动画不播放时的选值
    animation-play-state:paused(动画暂停)|running（默认，指定正在运行的动画）;
    animation:name duration timing-function delay iteration-count direction fill-mode play-state;
```

-   will-change 原理：提前通知浏览器元素要做什么动画，让浏览器提前准备合适的优化设置
    优化：
    1：position-fixed 代替 background-attachment
    2:带图片的元素放在伪元素中
    3：巧用 will-change.
    3D 才会触发加速引擎。加上 translateZ(),占内存

```CSS
    will-change:
    auto（无特别指定要将做什么动画，只是纯粹的请求）
    |scroll-position（将要改变元素的滚动位置）
    |contents（将要改变元素的内容）
    |<custom-ident>（明确指定将要改变的属性与给定的名称，如transiton）
    |<animateable-feature>（可动画的一些特征值，如left，top,margin）
        will-change: transform;
        will-change: top;
        will-change: margin;
        要remove掉。
```
