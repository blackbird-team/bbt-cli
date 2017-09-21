const StructureDependencies = {
	front: {
		dev: [
			"webpack",
			"webpack-dev-server",
			"extract-text-webpack-plugin",
			"copy-webpack-plugin",
			"uglifyjs-webpack-plugin",
			"clean-webpack-plugin",
			"node-sass",
			"style-loader",
			"css-loader",
			"sass-loader",
			"file-loader",
			"babel-loader",
			"json-loader"
		],
		prod: [
			"bbt-loader",
			"redux-store-controller",
			"react",
			"react-dom",
			"history"
		],
		babel: {
			presets: ["env"],
			plugins: ["babel-plugin-root-import", "babel-eslint"]
		},
		lint: {
			configs: ["bbt", "bbt-react"],
			plugins: ["pre-commit"]
		}
	},
	service: {
		dev: [
			"webpack",
			"clean-webpack-plugin",
			"babili-webpack-plugin",
			"babel-loader",
			"json-loader"
		],
		prod: ["bbt-loader", "redux-store-controller"],
		babel: {
			presets: ["env"],
			plugins: ["babel-plugin-root-import", "babel-eslint"]
		},
		lint: {
			configs: ["bbt"],
			plugins: ["pre-commit"]
		}
	}
};

export default StructureDependencies;
