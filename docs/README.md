# 开始中……

::: warning 写在前面
凡事预则立。凡事需坚持。凡事需回顾。
:::

## 如何构建 `vuepress` 文档

::: tip 吾注：
`nav` 项是 `top` 链接。每一个页面可以配置自己单独的 `sidebar`。`sidebar` 是左侧导航，设置方式类似于路由。多页不同的将 `sidebar` 设置为数组对象。`RWASME.md` 文件是默认要找的文件
:::

1. `npm install -g vuepress`
2. 创建一个 `package.json` 文件；配置好编译命令。
3. 创建写博客的文件，并且在 `.vuepress` 文件下创建一个 `config.js`文件，对项目进行配置，主要是对目录的配置。
4. 发布 `github`, 将打包后的文件 `dist/*` 发布到远程仓库。注意两个地方，一、可以用 `.sh` 文件简化发布过程。二、注意配置 `config.js` 里的 `base` 项。
5. 最后再写文档的时候只需要执行发布命令就行。`sh deploy.sh`

```js
    // nav 和 sidebar 的配置
    themeConfig: {
        nav: [
            { text: '语法', link: '/grammar/html' },
            { text: 'demo', link: '/demo/iframe' },
            { text: '思考', link: '/thinking/loan' },
            { text: '其他', link: '/other/电商所用技术' },
            { text: '记录', link: '/date/2018-09' },
        ],
        sidebar: {
            '/grammar/': [
                {
                    title: '基础语法',
                    collapsable: false,
                    children: ['html', 'css', 'BOM', 'DOM', 'js', 'es6'],
                }
            ],
            '/demo/': [
                {
                    title: '基础demo',
                    collapsable: false,
                    children: ['iframe'],
                },
            ],
        }
    }
```

```sh
    $ set -e
    $ npm run build  # 要和自己在 package.json 文件里定义的一致
    $ cd docs/.vuepress/dist
    $ git init
    $ git add -A
    $ git commit -m 'deploy'
    $ git push -f git@github.com:yrcoder/blogs.git master # 可以直接推到 master 分支
    $ cd -
```
