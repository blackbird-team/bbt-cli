/*	eslint import/no-extraneous-dependencies:0	*/
const MinifyPlugin = require("babel-minify-webpack-plugin");
const fs = require("fs");

const nodeModules = {};
fs
	.readdirSync("node_modules")
	.filter(x => [".bin"].indexOf(x) === -1)
	.forEach(mod => {nodeModules[mod] = `commonjs ${mod}`});

module.exports = {
	context: `${__dirname}/source/`,
	target: "node",
	devtool: 'source-map',
	externals: nodeModules,
	entry: [`${__dirname}/source/js/index.js`],
	output: {
		path: `${__dirname}/bin/`,
		filename: "index.min.js"
	},
	module: {
		rules: [
			{
				test: /\.js?/,
				use: ["babel-loader", "shebang-loader"]
			},
			{
				test: /\.json$/,
				use: "json-loader"
			}
		]
	},
	plugins: [
		new MinifyPlugin()
	]
};