module.exports = {
    title: `YRcoder`,
    base: '/blogs/',
    themeConfig: {
        repo: 'https://github.com/yrcoder',
        // 如果你的文档不在仓库的根部
        docsDir: 'docs',
        // 可选，默认为 master
        docsBranch: 'master',
        // 默认为 true，设置为 false 来禁用
        editLinks: false,
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
                },
                {
                    title: '框架语法',
                    collapsable: false,
                    children: ['vue', 'react'],
                },
            ],
            '/demo/': [
                {
                    title: '基础demo',
                    collapsable: false,
                    children: ['iframe'],
                },
            ],
            '/thinking/': [
                {
                    title: '项目',
                    collapsable: false,
                    children: ['loan'],
                },
            ],
            '/other/': [
                {
                    title: '一些零碎的东西',
                    collapsable: false,
                    children: ['电商所用技术'],
                },
            ],
            '/date/': [
                {
                    title: '2018',
                    collapsable: false,
                    children: ['2018-09'],
                },
            ],
        },
    },
}
