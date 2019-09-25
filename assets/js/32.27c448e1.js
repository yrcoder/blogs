(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{165:function(t,a,s){"use strict";s.r(a);var n=s(0),o=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"springboot"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#springboot","aria-hidden":"true"}},[t._v("#")]),t._v(" springBoot")]),t._v(" "),s("p",[t._v("微服务：SpringCloud\n第一个 SpringBoot\n自定义属性配置\nController 的使用\nspring-data-jpa(操作数据库)\n事务管理（数据库的事务管理）")]),t._v(" "),s("p",[t._v("用 IDEA 创建\nxml")]),t._v(" "),s("p",[t._v("创建一个 get 接口")]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{attrs:{class:"token comment"}},[t._v('// 在路径中输入localhost:8080/hello，就可以看到"hello Spring Boot"这些字')]),t._v("\n"),s("span",{attrs:{class:"token comment"}},[t._v("// @RestController 声明一个请求的固定写法")]),t._v("\n"),s("span",{attrs:{class:"token comment"}},[t._v("// @RequestMapping 对请求设置url,参数，和请求方式等等")]),t._v("\n"),s("span",{attrs:{class:"token comment"}},[t._v("// 启动命令 mvn spring-boot:run")]),t._v("\n"),s("span",{attrs:{class:"token comment"}},[t._v("// 先编译 mvn install ，进入target目录下会多出来一个.jar的文件，执行命令 java -jar .jar文件名（带后缀）也可以启动")]),t._v("\n"),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@RestController")]),t._v("\n"),s("span",{attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{attrs:{class:"token class-name"}},[t._v("HelloController")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{attrs:{class:"token comment"}},[t._v("// 定义接口")]),t._v("\n    "),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@RequestMapping")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v('"/hello"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" method "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" RequestMethod"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("GET"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("public")]),t._v(" String "),s("span",{attrs:{class:"token function"}},[t._v("say")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v('"hello Spring Boot"')]),t._v("\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("属性配置\n可以是以下两种文件类型\napplication.properties 文件为项目的配置文件\napplication.yml 文件为项目的配置文件（推荐）\n访问路径变为 localhost:8080/aaa/hello")]),t._v(" "),s("div",{staticClass:"language-properties extra-class"},[s("pre",{pre:!0,attrs:{class:"language-properties"}},[s("code",[s("span",{attrs:{class:"token attr-name"}},[t._v("server.post")]),s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token attr-value"}},[t._v("8081")]),t._v("\n"),s("span",{attrs:{class:"token attr-name"}},[t._v("server.context-path")]),s("span",{attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{attrs:{class:"token attr-value"}},[t._v("/aaa")]),t._v("\n")])])]),s("div",{staticClass:"language-yml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("server:\n    post: 8081\n    context-path: /aaa\ncupSize: B\nage: 13\n# 在配置文件中使用配置文件中定义的变量\ncontent: 'cupSize: ${cupSize}, age: ${age}'\nmy:\n    age: 23\n    name: lyr\n")])])]),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@RestController")]),t._v("\n"),s("span",{attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{attrs:{class:"token class-name"}},[t._v("HelloController")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{attrs:{class:"token comment"}},[t._v("// 拿到配置文件里定义的变量")]),t._v("\n    "),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@Value")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v('"${cupSize}"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("private")]),t._v(" String cupSize"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@Value")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v('"${age}"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("private")]),t._v(" Integer age"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@Value")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v('"${content}"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("private")]),t._v(" String content"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{attrs:{class:"token comment"}},[t._v("// 定义接口")]),t._v("\n    "),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@RequestMapping")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v('"/hello"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" method "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" RequestMethod"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("GET"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("public")]),t._v(" String "),s("span",{attrs:{class:"token function"}},[t._v("say")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" cupSize "),s("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" age "),s("span",{attrs:{class:"token operator"}},[t._v("+")]),t._v(" content\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("controller 的使用\n用来接收用户端的请求")]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@Controller")]),t._v(" "),s("span",{attrs:{class:"token comment"}},[t._v("// 处理http请求, 配合模版使用，就是html,类似jsp")]),t._v("\n"),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@RestController")]),t._v(" "),s("span",{attrs:{class:"token comment"}},[t._v("// Spring4之后新加的注解，原来返回json需要@ResponseBody配合@Controller; @RestController = @Controller + @ResponseBody")]),t._v("\n"),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@RequestMapping")]),t._v(" "),s("span",{attrs:{class:"token comment"}},[t._v("// 配置URL映射")]),t._v("\n"),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@PathVariable")]),t._v(" "),s("span",{attrs:{class:"token comment"}},[t._v("// 获取URL里的数据")]),t._v("\n"),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@RequestParam")]),t._v(" "),s("span",{attrs:{class:"token comment"}},[t._v("// 获取请求参数的值")]),t._v("\n"),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@GetMapping")]),t._v(" "),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@PostMapping")]),s("span",{attrs:{class:"token comment"}},[t._v("// 组合注解")]),t._v("\n\n"),s("span",{attrs:{class:"token comment"}},[t._v("// 多个url,value定义成对象")]),t._v("\n"),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@RestController")]),t._v("\n"),s("span",{attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{attrs:{class:"token class-name"}},[t._v("HelloController")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{attrs:{class:"token comment"}},[t._v("// 定义接口")]),t._v("\n    "),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@RequestMapping")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{attrs:{class:"token string"}},[t._v("'/hello'")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v("'/hi'")]),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" method "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" RequestMethod"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("GET"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("public")]),t._v(" String "),s("span",{attrs:{class:"token function"}},[t._v("say")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v('"hello Spring Boot"')]),t._v("\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{attrs:{class:"token comment"}},[t._v("// @RequestMapping 还可以给整个类设定一个URL")]),t._v("\n"),s("span",{attrs:{class:"token comment"}},[t._v("// 访问URL变成 /hello/say")]),t._v("\n"),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@RestController")]),t._v("\n"),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@RequestMapping")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v("'/hello'")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{attrs:{class:"token class-name"}},[t._v("HelloController")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@Autowired")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("private")]),t._v(" GirlProperties girlProperties"),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@RequestMapping")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v('"/say/{id}"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" methods "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" RequestMethod"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("GET"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{attrs:{class:"token comment"}},[t._v("// @GetMapping(value = 'say') 等同于上一句")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("public")]),t._v(" String "),s("span",{attrs:{class:"token function"}},[t._v("say")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" girlProperties"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{attrs:{class:"token function"}},[t._v("getCupSize")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{attrs:{class:"token comment"}},[t._v("// 获取URL参数 /say/:id")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("public")]),t._v(" String "),s("span",{attrs:{class:"token function"}},[t._v("say")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@PathVariable")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v('"id"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" Integer myId"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" myId\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{attrs:{class:"token comment"}},[t._v("// 获取URL 中query参数 /say/?id=23232")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("public")]),t._v(" String "),s("span",{attrs:{class:"token function"}},[t._v("say")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@RequestParam")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token string"}},[t._v('"id"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" Integer myId"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" myId\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{attrs:{class:"token comment"}},[t._v("// 设置url 默认值，是否必传,defaultValue必是字符，不能是inter")]),t._v("\n    "),s("span",{attrs:{class:"token keyword"}},[t._v("public")]),t._v(" String "),s("span",{attrs:{class:"token function"}},[t._v("say")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token annotation punctuation"}},[t._v("@RequestParam")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v('"id"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" required "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token boolean"}},[t._v("false")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" defaultValue "),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v('"0"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" Integer myId"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" myId\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("数据库操作\nSpring-Data-Jpa\nJPA: 定义了一系列对象持久化的标准，目前实现这一规范的产品有 Hibernate、TopLink")]),t._v(" "),s("p",[t._v("事物\n同时操作，要么都成功，要么都失败，只有查询的时候不需要插入")]),t._v(" "),s("p",[t._v("web 进阶")]),t._v(" "),s("ol",[s("li",[t._v("使用@Valid 表单验证")])]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[t._v("\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("使用 AOP 处理请求")]),t._v(" "),s("li",[t._v("统一异常处理")]),t._v(" "),s("li",[t._v("单元测试")])])])}],!1,null,null,null);o.options.__file="springBoot.md";a.default=o.exports}}]);