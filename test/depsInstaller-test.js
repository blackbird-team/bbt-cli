import DepsInstaller from "./../bin/controllers/depsInstaller";


DepsInstaller.append("dev", ["eslint", "eslint-config-prettierdfgdfg", "babel-cli", "sdfsdfkljsd", "babel-core"]);
DepsInstaller.append("prod", ["webpack"]);

DepsInstaller.install("dev")
	.then(() => {
		DepsInstaller.install("prod");
	});


// DepsInstaller.install();