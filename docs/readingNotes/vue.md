# vue 源码

[电子书](https://github.com/ustbhuangyi/vue-analysis)

1. 核心: 数据驱动（数据->dom 创建完整流程），组件化（组件创建，组件相关核心概念），响应式原理（响应式实现原理）
2. 编译: parse（模版->AST 树），optimize（优化 AST 树），codegen（AST 树 -> 代码）
3. 扩展: event,v-model,slot,keep-alive,transition
4. 生态: vue-router，vuex

各种 mixin(vue) 是在 vue 原型上挂载了很多方法。 stateMixin `Vue.prototype.$set = set`
initGlobalAPI 是挂载了很多静态方法

## 数据驱动

只分析数据是怎么映射到 dom 的 ？在模版中插入一个变量最终怎么生成 dom 的
数据的变化来驱动视图的变化（响应式原理中分析）

初始化工作，做 uid
传入的参数都 merge 到 \$options 上

```js
import Vue from 'vue'
const options = {
	el: '#app',
	data: {
		message: 'hello',
	},
}
// init的时候：传入的参数都 merge 到 $options 上，可以通过vm.$options.el获取传入的el，vm.$options.data获取传入的data
const app = new Vue(options)
```

## 组件化

## 响应式原理

## parse（模版->AST 树）

## optimize（优化 AST 树）

## codegen（AST 树 -> 代码）

## event

## v-model

## slot

## keep-alive

## transition

## vue-router

## vuex
