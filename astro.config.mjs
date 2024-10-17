// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkBreaks from 'remark-breaks';
import { visit } from 'unist-util-visit';


const site = 'https://cksc-laws.vercel.app/';
//@ts-ignore
const externalAnchorPlugin = () => tree => {
	visit(tree, 'link', (node) => {
		if (/^(https?):\/\/[^\s/$.?#].[^\s]*$/i.test(node.url) && (!node.url.includes(site) || site.includes('edit'))) {
			node.data ??= {};
			node.data.hProperties ??= {};
			node.data.hProperties.target = '_blank';
			node.data.hProperties.rel = 'noopener noreferrer';
		}
	});
}

// https://astro.build/config
export default defineConfig({
	// output: 'server',
	markdown: {
		remarkPlugins: [
			remarkBreaks,
			externalAnchorPlugin,
		],
	},
	site: 'https://cksc-laws.vercel.app/',
	integrations: [
		starlight({
			editLink: {
				baseUrl: 'https://github.com/jx06T/cksc_regulations/tree/master',
			},
			components: {
				SocialIcons: './src/starlight/components/SocialIcons.astro',
				EditLink: './src/starlight/components/EditLink.astro',
				// TableOfContents: './src/starlight/components/TableOfContents/TableOfContentsList.astro',
				MobileTableOfContents:'./src/starlight/components/MobileTableOfContents.astro'
			},
			title: '建中班聯會法規',
			defaultLocale: 'zh',
			customCss: [
				'./src/css/custom.css',
			],
			logo: {
				src: './src/assets/imgbin_law-firm-family-law-legal-aid-bankruptcy-png.png',
			},
			favicon: '/imgbin_law-firm-family-law-legal-aid-bankruptcy-png.png',
			social: {
				instagram: "https://www.instagram.com/cksc79th/",
				linkedin: "https://ckhssc.wordpress.com/"
			},
			locales: {
				root: {
					label: '繁體中文',
					lang: 'zh-Hant-TW', 
				},
			},
			sidebar: [
				{
					label: '憲章',
					autogenerate: { directory: '憲章' },
				},
				{
					label: '主席與副主席',
					autogenerate: { directory: '主席與副主席' },
				},
				{
					label: '行政部門',
					autogenerate: { directory: '行政部門' },
				},
				{
					label: '立法部門',
					autogenerate: { directory: '立法部門' },
				},
				{
					label: '司法部門',
					autogenerate: { directory: '司法部門' },
				},
				{
					label: '命令',
					autogenerate: { directory: '命令' },
				},
				{
					label: '其他文件',
					autogenerate: { directory: '其他文件' },
					// items: [
					// 	// { label: '編輯說明0', slug: '行政部門/學生代表選舉暨職權行使條例' },
					// ],
				},
			],
		}),
	],
});
