const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

const nodeModules = {};
fs.readdirSync("node_modules")
	.filter(x => [".bin"].indexOf(x) === -1)
	.forEach(mod => {
		nodeModules[mod] = `commonjs ${mod}`;
	});

const loaders = {
	ts: {
		test: /\.(ts)$/,
		use: ["babel-loader", "ts-loader", "shebang-loader"]
	}
};

module.exports = {
	mode: "production",
	target: "node",
	context: `${__dirname}/src/ts/`,
	entry: [path.resolve(__dirname, "src/ts/index.ts")],
	output: {
		path: path.resolve(__dirname, "bin"),
		filename: "index.min.js"
	},
	module: {
		rules: [loaders.ts]
	},
	resolve: {
		extensions: [".ts"]
	},
	plugins: [new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })]
};
