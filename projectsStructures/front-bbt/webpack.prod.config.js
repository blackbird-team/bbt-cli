/*	eslint import/no-extraneous-dependencies:0	*/
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	context: `${__dirname}/source/`,
	entry: ['babel-polyfill', `${__dirname}/source/js/index.js`],
	output: {
		path: `${__dirname}/build/`,
		publicPath: "/build/",
		filename: "main.min.js"
	},
	module: {
		rules: [
			{
				test: /\.sass$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "sass-loader"]
				})
			},
			{
				test: /\.(jpg|jpeg|gif|png|woff|woff2|eot|ttf|svg|otf)$/,
				exclude: /\/node_modules\//,
				use: {
					loader: "file-loader",
					options: {
						name: "[path][name].[ext]"
					}
				}
			},
			{
				test: /\.jsx?/,
				use: "babel-loader"
			},
			{
				test: /\.json$/,
				use: "json-loader"
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin([`${__dirname}/build/`]),
		new ExtractTextPlugin({
			filename: "./style/style.min.css",
			disable: false,
			allChunks: true
		}),
		new CopyWebpackPlugin([
			{ from: `${__dirname}/source/img/`, to: `${__dirname}/build/img/` },
			{
				from: `${__dirname}/source/style/img/`,
				to: `${__dirname}/build/style/img/`
			}
		]),
		new UglifyJSPlugin({
			minimize: true,
			output: {
				comments: false
			}
		})
	]
};
