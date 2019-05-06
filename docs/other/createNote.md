# docsify & gitbook

## docsify

### [docsify](https://docsify.js.org/#/zh-cn/) 基础用法

> 用法：`初始化`和`起服务`

```bash
$ docsify init ./ # 初始化docsify项目在根目录
$ docsify init ./docs # 初始化在docs目录中
$ docsify server # 初始化在根目录的不用写文件名
$ docsify server docs # 初始化在某个文件夹中如是写
```

> 初始化在根目录中，远程仓库`pages`设置为 master 分支；docs 为 docs 分支。

### 注意事项

-   所有的配置均在`index.html`文件中，插件不需下载，只需用`script`标签引用。
-   如需`导航`，则新建一个`_sidebar.md`文件，在其中写目录。对应的文件需要手动建。

### docsify 创建到发布的过程

1. github 新建一个仓库，配置 pages,克隆到本地
2. 初始化一个 npm 项目（防止有别的包下载，非必须）
3. 安装 docsify（全局安装），初始化 docsify 项目，跑服务本地测试
4. 推到 GitHub

```bash
$ git clone [github url]
$ cd [file name]
$ npm init
$ npm i docsify-cli -g
$ docsify init ./ # 或者 docsify init ./docs
$ docsify sever # 或者 docsify sever docs
$ git add -A
$ git commit -m 'init...'
$ git push -u origin master
```

## gitbook

> 用法`init -- build -- serve`即`初始化 -- 构建成 HTML 文件 -- 跑服务`

```sh
  $ npm init # 初始化一个 npm 项目，会创建package.json文件。因为，gitbook 的插件需要安装
  $ npm install -g gitbook-cli # 安装 gitbook，之后才能用它提供的指令
  $ gitbook init
  $ gitbook build ./ ./docs # 在 docs 文件夹下生成对应的 HTML 文件，为推向GitHub做准备
  $ gitbook serve # 本地测试
  $ # 可以推向 GitHub 了
```

> `gitbook init`后，在目录文件中写下对应的目录，再执行 `gitbook init`就会自动创建对应的 md 文件

### 注意点

-   创建`book.json`文件，在其中配置书的样式
-   `book.json`需要的插件必须用`-d`下载，先初始化一个 npm 项目
-   安装插件的命令 `npm install gitbook-plugin-disqus -g`
-   配置`book.json`的插件项为`"plugins": ["disqus"]`

### 文档链接

-   [简明教程](http://www.chengweiyang.cn/gitbook/index.html)
-   [官方文档](http://gitbook.site/setup.html)
-   [插件](http://gitbook.zhangjikai.com/plugins.html)

## git

> 本地站点到 GitHub 的路径有两条：1. 本地没有项目 2. 本地有项目

-   对于本地没有项目的情况。`$ git clone [github url]`；对于本地有项目的情况`先将项目初始化为git项目，再和远程的仓库连接，把仓库的文件下载到本地，再把本地的文件“添加-提交-推送”`

```bash
$ git init # 将本地初始化为一个git仓库
$ git remote add origin [git url] # 连接远程仓库
$ git pull origin master # 将远程仓库文件拉到本地
$ git add -A # 本地文件推送到远程仓库的三步（添加，提交，推送）
$ git commit -m '提交内容的提示' # -m代表master分支
& git push origin master
```

!> 本地的项目推到 GitHub，必须先在 GitHub 上建一个仓库

> `git push -u origin master` _# 这样写过之后，本仓库的拉和推以后都不用写 master 了，只写 git push origin_

## github

> 把用户托管的项目发布出去，这是 GitHub 的主要功能。

-   创建一个仓库，配置正确`pages`，和本地项目连接，生成一个网站。
-   配置`pages`需要在 master 或 docs 目录下有一个站点入口文件`index.html`。pages 只能发布静态的 HTML 文件。

> 可以从 GitHub 上克隆项目的前提是 —— `设置电脑上的 ssh key`。每台机器上都要设置一次，（c 盘，公钥）

-   ssh key 按照帮助提示上的一步步来（创建，复制，粘贴上传），所有用到 ssh key 的账号都可以用
-   github 创建仓库就是创建项目，创建组织就相当于创建账号（组织下可以创建仓库）
