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
			{ text: '教育', link: '/education/theory' },
			{ text: '记录', link: '/date/2018' },
			{ text: '随笔', link: '/essay/2019' },
			{ text: '其他', link: '/other/fingerling' },
		],
		sidebar: {
			'/grammar/': [
				{
					title: '基础语法',
					collapsable: false,
					children: ['htmlCss', 'bom', 'dom', 'js', 'es6', 'git'],
				},
				{
					title: '其他语法',
					collapsable: false,
					children: ['vue', 'react', 'springBoot', 'node', 'mobx', 'router', 'weixin'],
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
					children: ['2019'],
				},
			],
		},
	},
}
