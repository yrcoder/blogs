# springBoot

微服务：SpringCloud
第一个 SpringBoot
自定义属性配置
Controller 的使用
spring-data-jpa(操作数据库)
事务管理（数据库的事务管理）

用 IDEA 创建
xml

创建一个 get 接口

```java
// 在路径中输入localhost:8080/hello，就可以看到"hello Spring Boot"这些字
// @RestController 声明一个请求的固定写法
// @RequestMapping 对请求设置url,参数，和请求方式等等
// 启动命令 mvn spring-boot:run
// 先编译 mvn install ，进入target目录下会多出来一个.jar的文件，执行命令 java -jar .jar文件名（带后缀）也可以启动
@RestController
public class HelloController {
    // 定义接口
    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String say() {
        return "hello Spring Boot"
    }
}
```

属性配置
可以是以下两种文件类型
application.properties 文件为项目的配置文件
application.yml 文件为项目的配置文件（推荐）
访问路径变为 localhost:8080/aaa/hello

```properties
server.post=8081
server.context-path=/aaa
```

```yml
server:
    post: 8081
    context-path: /aaa
cupSize: B
age: 13
# 在配置文件中使用配置文件中定义的变量
content: 'cupSize: ${cupSize}, age: ${age}'
my:
    age: 23
    name: lyr
```

```java
@RestController
public class HelloController {
    // 拿到配置文件里定义的变量
    @Value("${cupSize}")
    private String cupSize;

    @Value("${age}")
    private Integer age;

    @Value("${content}")
    private String content;
    // 定义接口
    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String say() {
        return cupSize + age + content
    }
}
```

controller 的使用
用来接收用户端的请求

```java
@Controller // 处理http请求, 配合模版使用，就是html,类似jsp
@RestController // Spring4之后新加的注解，原来返回json需要@ResponseBody配合@Controller; @RestController = @Controller + @ResponseBody
@RequestMapping // 配置URL映射
@PathVariable // 获取URL里的数据
@RequestParam // 获取请求参数的值
@GetMapping @PostMapping// 组合注解

// 多个url,value定义成对象
@RestController
public class HelloController {
    // 定义接口
    @RequestMapping(value = {'/hello', '/hi'}, method = RequestMethod.GET)
    public String say() {
        return "hello Spring Boot"
    }
}
// @RequestMapping 还可以给整个类设定一个URL
// 访问URL变成 /hello/say
@RestController
@RequestMapping('/hello')
public class HelloController {
    @Autowired
    private GirlProperties girlProperties;

    @RequestMapping(value = "/say/{id}", methods = RequestMethod.GET)
    // @GetMapping(value = 'say') 等同于上一句
    public String say() {
        return girlProperties.getCupSize()
    }
    // 获取URL参数 /say/:id
    public String say(@PathVariable("id") Integer myId) {
        return myId
    }
    // 获取URL 中query参数 /say/?id=23232
    public String say(@RequestParam("id") Integer myId) {
        return myId
    }
    // 设置url 默认值，是否必传,defaultValue必是字符，不能是inter
    public String say(@RequestParam(value = "id", required = false, defaultValue = "0") Integer myId) {
        return myId
    }
}
```

数据库操作
Spring-Data-Jpa
JPA: 定义了一系列对象持久化的标准，目前实现这一规范的产品有 Hibernate、TopLink

事物
同时操作，要么都成功，要么都失败，只有查询的时候不需要插入

web 进阶

1. 使用@Valid 表单验证

```java

```

2. 使用 AOP 处理请求
3. 统一异常处理
4. 单元测试
