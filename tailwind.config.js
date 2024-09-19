/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [ './src/*.{php,js,tsx}' ],
	theme: {
		screens: {
			sm: '600px',
			md: '782px',
			lg: '960px',
			xl: '1280px',
		},
		extend: {},
	},
	corePlugins: {
		preflight: false,
	},
};
