// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkBreaks from 'remark-breaks';
import { visit } from 'unist-util-visit';


const site = 'https://cksc-laws.vercel.app/';
//@ts-ignore
const externalAnchorPlugin = () => tree => {
	visit(tree, 'link', (node) => {
		if (/^(https?):\/\/[^\s/$.?#].[^\s]*$/i.test(node.url) && !node.url.includes(site)) {
			node.data ??= {};
			node.data.hProperties ??= {};
			node.data.hProperties.target = '_blank';
			node.data.hProperties.rel = 'noopener noreferrer'; 
		}
	});
}


// https://astro.build/config
export default defineConfig({
	markdown: {
		remarkPlugins: [
			remarkBreaks,
			externalAnchorPlugin,
		],
	},
	site: 'https://cksc-laws.vercel.app/',
	integrations: [
		starlight({
			components: {
				SocialIcons: './src/starlight/components/SocialIcons.astro',
			},
			title: '建中班聯會法規',
			customCss: [
				'./src/css/custom.css',
			],
			logo: {
				src: './src/assets/imgbin_law-firm-family-law-legal-aid-bankruptcy-png.png',
			},
			// favicon: './src/assets/imgbin_law-firm-family-law-legal-aid-bankruptcy-png.png',
			favicon: '/imgbin_law-firm-family-law-legal-aid-bankruptcy-png.png',
			social: {
				instagram: "https://www.instagram.com/cksc79th/",
				linkedin: "https://ckhssc.wordpress.com/"
			},

			sidebar: [
				{
					label: '憲章',
					// items: [
					// 	{ label: '憲章', slug: '憲章/建中班聯會憲章' },
					// ],
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
			],
		}),
	],
});
