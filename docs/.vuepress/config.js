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
            { text: '教育', link: '/education/theory' },
            { text: '记录', link: '/date/2018' },
            { text: '其他', link: '/other/fingerling' },
            { text: '随笔', link: '/essay/2018' },
            { text: '英文小故事', link: '/english/2018-12' },
        ],
        sidebar: {
            '/grammar/': [
                {
                    title: '基础语法',
                    collapsable: false,
                    children: ['html', 'css', 'BOM', 'DOM', 'js', 'es6', 'npm', 'git'],
                },
                {
                    title: '其他语法',
                    collapsable: false,
                    children: ['vue', 'react', 'springBoot', 'node'],
                },
            ],
            '/education/': [
                {
                    title: '教育',
                    collapsable: false,
                    children: ['theory', 'exam', 'other'],
                },
            ],
            '/other/': [
                {
                    title: '小东西',
                    collapsable: false,
                    children: ['fingerling', 'project'],
                },
            ],
            '/date/': [
                {
                    title: '日记',
                    collapsable: false,
                    children: ['2018', '2019', '2020'],
                },
            ],
            '/essay/': [
                {
                    title: '随笔',
                    collapsable: false,
                    children: ['2018'],
                },
            ],
            '/english/': [
                {
                    title: '英文小故事',
                    collapsable: false,
                    children: ['2018-12'],
                },
            ],
        },
    },
}
