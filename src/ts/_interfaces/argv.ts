export enum TYPE {
	FRONTEND = "frontend",
	BACKEND = "backend",
	FULLSTACK = "fullstack",
	LIB = "lib",
	CLI = "cli"
}

export enum PARAMETER {
	TYPE = "type"
}

export enum FLAG {
	YES = "yes",
	FORCE = "force",

	VERSION = "version",
	HELP = "help"
}

export enum ALIAS {
	TYPE = "t",
	YES = "y",
	FORCE = "f",
	VERSION = "v",
	HELP = "h"
}

export interface IParameters {
	optional: string[];
	[PARAMETER.TYPE]?: TYPE;
	[ALIAS.TYPE]?: TYPE;
}

export interface IFlags {
	[FLAG.YES]?: boolean;
	[ALIAS.YES]?: boolean;
	[FLAG.FORCE]?: boolean;
	[ALIAS.FORCE]?: boolean;
	[FLAG.VERSION]?: boolean;
	[ALIAS.VERSION]?: boolean;
	[FLAG.HELP]?: boolean;
	[ALIAS.HELP]?: boolean;
}

