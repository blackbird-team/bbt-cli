const BabelPluginOptions = {
	"babel-plugin-root-import": {
		common: [
			{
				rootPathPrefix: "~",
				rootPathSuffix: "src/js"
			}
		],
		bbt: [
			{
				rootPathPrefix: "~",
				rootPathSuffix: "source/js"
			},
			{
				rootPathPrefix: "@",
				rootPathSuffix: "source/js/data"
			}
		]
	}
};

export default BabelPluginOptions;
