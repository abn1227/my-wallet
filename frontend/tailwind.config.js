/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'secondary-scroll': {
					DEFAULT: 'rgba(var(--color-secondary-scroll), 1)',
				},
				'accent-scroll': {
					DEFAULT: 'rgba(var(--color-accent-scroll), 1)',
				},
			},
		},
	},
	plugins: [
		require('daisyui'),
		function ({ addUtilities }) {
			addUtilities({
				'.scrollbar-custom': {
					'@apply custom-scrollbar': {},
				},
			});
		},
	],
	daisyui: {
		themes: [
			{
				custom: {
					primary: '#1F3A5F',
					secondary: '#acc2ef',
					accent: '#3D5A80',
					neutral: '#FFFFFF',
					'base-100': '#0F1C2E',
					'base-200': '#1f2b3e',
					'base-300': '#374357',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#FBBD23',
					error: '#F87272',
				},
			},
		],
	},
};
