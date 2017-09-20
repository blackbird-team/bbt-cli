import DirCreator from "./../bin/controllers/dirCreator";

const dir = [
	{
		dir: `/projectsStructures/front-bbt/source/data`,
		files: [
			{ name: "config.json", source: "" },
			{ name: "loaderList.js", source: "" },
			{ name: "storeList.js", source: "" }
		]
	},
	{
		dir: `/projectsStructures/front-bbt/source/js`,
		files: [{ name: "index.js", source: "" }]
	},
	{
		dir: `/projectsStructures/front-bbt/source/js/stores`,
		files: [{ name: "history.js", source: "" }]
	},
	{
		dir: `/projectsStructures/front-bbt/source/js/views`,
		files: [
			{ name: "viewController.js", source: "" },
			{ name: "indexView.js", source: "" }
		]
	},
	{
		dir: `/projectsStructures/front-bbt/source/style/stylesheets`,
		files: [{ name: "main.sass", source: "" }]
	},
	{
		dir: `/projectsStructures/front-bbt/source/style/stylesheets/modules`,
		files: [
			{ name: "colors.sass", source: "" },
			{ name: "typography.sass", source: "" },
			{ name: "grid.sass", source: "" }
		]
	},
	{
		dir: `/projectsStructures/front-bbt/source/style/stylesheets/partials`,
		files: [
			{ name: "base.sass", source: "" },
			{ name: "header.sass", source: "" },
			{ name: "footer.sass", source: "" }
		]
	},
	{
		dir: `/projectsStructures/front-bbt/source/style/stylesheets/vendor`,
		files: [
			{ name: "mixins.sass", source: "" },
			{ name: "reset.sass", source: "" }
		]
	}
];

DirCreator.create(dir);
