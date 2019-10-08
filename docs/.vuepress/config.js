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
        head: [['link', { rel: 'icon', href: `/favicon.ico` }]],
        nav: [
            { text: '语法', link: '/grammar/htmlCss' },
            { text: '反刍', link: '/ruminate/前端的总结' },
            { text: 'other', link: '/other/createNote' },
            { text: '摘抄', link: '/excerpt/excerpt' },
        ],
        sidebar: {
            '/grammar/': [
                {
                    title: '一层语法',
                    collapsable: false,
                    children: ['htmlCss', 'less', 'js', 'es6', 'vue', 'react', 'managingState', 'router', 'debug'],
                },
                {
                    title: '二层语法',
                    collapsable: false,
                    children: ['webpack', 'git', 'vueSSR', 'reactSSR', 'nginx', 'http', 'node'],
                },
                {
                    title: '三层语法',
                    collapsable: false,
                    children: ['reactDesignPattern', 'jsDesignPattern', 'zepto源码', 'vue源码', 'react源码'],
                },
            ],
            '/ruminate/': [
                {
                    title: '反刍',
                    collapsable: false,
                    children: ['代码'],
                },
            ],
            '/excerpt/': [
                {
                    title: '摘抄',
                    collapsable: false,
                    children: ['excerpt'],
                },
            ],
            '/other/': [
                {
                    title: '小东西记录',
                    collapsable: false,
                    children: ['createNote', 'smallKnowledge', 'project'],
                },
            ],
            // '/date/': [
            // 	{
            // 		title: '日记',
            // 		collapsable: false,
            // 		children: ['2018', '2019'],
            // 	},
            // ],
        },
    },
}
