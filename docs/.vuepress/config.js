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
			{ text: '记录', link: '/date/2018' },
			{ text: '随笔', link: '/essay/2019' },
			{ text: '教育', link: '/education/theory' },
			{ text: '其他', link: '/other/fingerling' },
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
					children: ['browser', 'http', 'webpack', 'git', 'editor'],
				},
				{
					title: '三层语法',
					collapsable: false,
					children: ['springBoot', 'node', 'r', 'computer'],
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
