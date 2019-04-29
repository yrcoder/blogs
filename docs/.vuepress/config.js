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
			{ text: 'essay', link: '/essay/excerpt' },
			{ text: 'education', link: '/education/theory' },
		],
		sidebar: {
			'/grammar/': [
				{
					title: '一层语法',
					collapsable: false,
					children: ['htmlCss', 'js', 'es6', 'vue', 'react', 'managingState', 'router', 'weixin'],
				},
				{
					title: '二层语法',
					collapsable: false,
					children: ['webpack', 'git', 'reactSSR', 'nginx'],
				},
				{
					title: '三层语法',
					collapsable: false,
					children: ['springBoot', 'node', 'r', 'computer', 'http', 'shell', 'editor', 'browser'],
				},
				{
					title: '小东西',
					collapsable: false,
					children: ['project', 'frontEnd'],
				},
			],
			'/essay/': [
				{
					title: '随笔',
					collapsable: false,
					children: ['excerpt'],
				},
			],
			'/education/': [
				{
					title: 'education',
					collapsable: false,
					children: ['theory', 'think'],
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
