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
			{ text: '读书笔记', link: '/readingNotes/reactDesignPattern' },
			{ text: '小东西', link: '/other/createNote' },
			{ text: '摘抄', link: '/excerpt/lines' },
		],
		sidebar: {
			'/grammar/': [
				{
					title: '一层语法',
					collapsable: false,
					children: ['htmlCss', 'less', 'js', 'es6', 'vue', 'react', 'managingState', 'router', 'weixin'],
				},
				{
					title: '二层语法',
					collapsable: false,
					children: ['webpack', 'git', 'reactSSR', 'nginx', 'http', 'shell', 'editor', 'browser'],
				},
				{
					title: '三层语法',
					collapsable: false,
					children: ['springBoot', 'node', 'r', 'computer'],
				},
			],
			'/readingNotes/': [
				{
					title: '读书笔记',
					collapsable: false,
					children: ['reactDesignPattern', 'javascript', 'javascript1', 'javascript2', 'javascript3', 'jsDesignPattern'],
				},
				{
					title: 'thinking',
					collapsable: false,
					children: ['html', 'css', 'js', 'react', 'project'],
				},
			],
			'/excerpt/': [
				{
					title: '摘抄',
					collapsable: false,
					children: ['lines', 'essay', 'poetry'],
				},
			],
			'/other/': [
				{
					title: '小东西记录',
					collapsable: false,
					children: ['createNote', 'bugs', 'smallKnowledge'],
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
