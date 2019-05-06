# less

## 注释

```js
/* 被编译 */
// 不被编译
```

## 变量

```less
    声明变量
        @变量名: 值;
        @test_width: 300px;

        @class-name-1: .box;
        @bc: background-color;
        @color1: blue;

        @{class-name-1} {
            @{bc}: @color1;
        }

    less变量使用规则:

    定义格式: @变量名: 变量值;

    注意1: 变量名由字母,数字和_和-组成

    注意2: 可以作为选择器, 也可以作为属性名, 也可以做为属性值

    注意3: 变量放在选择器和属性名, 使用形式 @{变量名} 放在属性值这块, 简写 @变量名
```

## 混合

```less
.box {
	width: @test_width;
	heigth: @test_width;

	.border; // 这样直接写进来就起作用，就叫混合
	// 允许我们将已有的 class 和 id 的样式应用到另一个不同的选择器上
}

.border {
	border: solid 5px pink;
}

// 带参数混合
.border_02(@border_width) {
	border: solid yellow @border_width;
}

.box_2 {
	.border_02(30px) // 如涉及到传值（声明时有变量），调用的时候带括号;
}

// 带默认值
.border_03(@border_width: 10px) {
	border: solid yellow @border_width;
}
```

## 匹配模式

```less
// 相当于if

.triangle(top,@w:5px,@c:#ddd) {
	border-width: @w;
	border-color: transparent transparent @c transparent;
	border-style: dashed dashed solid dashed;
}

.triangle(bottom,@w:5px,@c:#ddd) {
	border-width: @w;
	border-color: @c transparent transparent transparent;
	border-style: dashed dashed solid dashed;
}

.triangle(@_,@w:5px,@c:#ddd) {
	// 参数必须写全（和上面保持一致）(如果参数传一个未定义的，就会是这个)
	widht: 0;
	height: 0;
	overflow: hidden;
}

.sanjiao {
	// 应用
	.triangle(bottom, 100px);
}
```

## 运算

```less
@test_01: 400px;
.box {
	width: @test_01 + 20;
	height: (@test_01 + 20) * 5; // 只要有一个是带颜色的就行
	color: #ccc - 10; // 颜色也可以
}
```

## 嵌套规则

```less
a {
	// & 代表上一层选择器
	&:hover {
		color: red;
	}
}
```

## @arguments 变量

```less
.border_arg(@w: 30px, @c: red, @xx: solid) {
	border: @w @c @xx;

	// 等价于 (传的所有变量都带进去)
	border: @arguments;
}
```

## 避免编译（less 不认识的，且需要保留的）

```less
.test {
	width: ~'calc(300px -30px)'; // 因为CSS3里的calc(300px -30px)是让浏览器编译，而非less编译器，所以忽略
	// 滤镜也是
}

// important
.test {
	.border_radius() !important;
}
```

## 导引

```less
// 导引是对参数是否满足一定条件的匹配，不是对参数值得匹配
.class(@a) when(@a > 10) {
	...;
}

.class(@a) when(iscolor(@a)) {
	...;
}

.class(@this-media) when(@this-media = mobile) {
	...;
}

.class(@a) when(@a) {
	...;
} //仅当@a = true 时才可匹配
// 注意，在导引后的when语句中，若是只有单独的值，则除布尔值 true 以外的任何值都被视作假
```

## 内置函数

```less
// abs()表示取绝对值,pow()表示取幂次方,floor()表示向下取整
// 调用方法同js
.box {
	height: abs(-100px);
	width: pow(10px, 2);
}
```

## import

```less
@import 'a.css' @import 'b';
```
