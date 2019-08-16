# websocket

IM 系统：QQ，微信
延时，迅速响应突发事件的能力
实时推送技术，物联网要求实时通信

IM 发送文字，表情包，图片，IM 发送语音，视频
扩张 IM 信息，红包，Form

websocker 使用
golang 并发优化工作

分布式部署方案

后台：golang
webscoket 组件
channel/goroutine
templete 技术

系统架构
反向代理 nginx
消息总线 MQ/Redis
协议 Udp/Http2

前端
怎么获取语音信息

## 需求分析

发送/接收
实现群聊
高并发=单机最好+分布式+弹性扩容

资源标准化编码
资源信息采集并标准化，转成 content/url
资源编码，终极目标都是拼接一个消息体（JOSN/Xml）
文字--content-->消息体 --> 发送
表情包图片--url--> 消息体 --> 发送
图片语音--上传服务器--返回 url-->消息体 --> 发送
消息体的可扩展性：红包，打卡，签到等本质都是消息的内容不同

消息体核心
type Message struct {
Id // 消息 ID
Userid // 谁发的
Cmd // 群聊还是私聊
Dstid // 对端 ID/群 ID
Media // 消息样式
Content // 消息内容
Pic // 预览图片
Url // 服务 URL
Memo // 简单描述
Amount // 和数字相关的
}

接收消息并解析显示
接收到消息体并进行解析
区分不同显示形式（图片/文字/语音）
界面显示自己发的和别人发的区别

群聊：基本功能没有区别
1 条消息多个参与群聊的终端及时接收到，服务器到流量压力很大
缩略图提高下载和渲染速度
压缩消息体，发送文件路径而不是整个文件
提高资源服务并发能力使用云服务（qos/alioss）,100ms 以内

高并发
单机并发性能最优
分布式部署
应对突发事件弹性扩容

## 架构

前端：webapp + websocket
接入层：websocket
逻辑层：鉴权+登录+关系管理+群聊+单聊+消息下发
存储层：mysql+文件服务器

websocket:
