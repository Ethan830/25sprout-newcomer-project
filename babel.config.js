const babelConfigForWebpackBuild = {
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: 3,
			},
		],
		'@babel/preset-react',
		'@babel/preset-typescript',
	],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				alias: {
					components: './src/components',
					images: './src/images',
					layouts: './src/layouts',
					models: './src/models',
					routes: './src/routes',
					store: './src/store',
					util: './src/util',
				},
			},
		],
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-syntax-import-meta',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-json-strings',
		'@babel/plugin-transform-react-constant-elements',
	],
};

const babelConfigForJest = {
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: 3,
				targets: {
					node: 'current',
				},
			},
		],
		'@babel/preset-react',
		'@babel/preset-typescript',
	],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				alias: {
					components: './src/components',
					images: './src/images',
					layouts: './src/layouts',
					models: './src/models',
					routes: './src/routes',
					store: './src/store',
					util: './src/util',
				},
			},
		],
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-syntax-import-meta',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-json-strings',
		'@babel/plugin-transform-react-constant-elements',
	],
};

module.exports = api => {
	const isTest = api.env('test');

	if (isTest) {
		return babelConfigForJest;
	}

	return babelConfigForWebpackBuild;
};
