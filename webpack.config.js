const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
require('dotenv').config();

const mode = process.env.NODE_ENV || 'development';
const devtool = process.env.NODE_ENV === 'production' ? false : 'eval-source-map';

module.exports = {
	mode,
	devtool,
	entry: path.join(__dirname, 'apps/client/js/index.js'),
	output: {
		path: path.join(__dirname, 'apps/client/public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.json']
	},
	plugins: [
		new ESLintPlugin({
			extensions: ['js', 'json'],
			fix: true,
		})
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: '/node_modules',
				loader: 'babel-loader',
				options: {
					targets: 'last 1 Chrome versions',
					presets: ['@babel/preset-react']
				}
			}
		]
	}
}