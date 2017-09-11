# bbt-cli &middot; [![npm version](https://img.shields.io/npm/v/bbt-cli.svg)](https://www.npmjs.com/package/bbt-cli) [![node](https://img.shields.io/node/v/gh-badges.svg)](https://github.com/blackbird-team/bbt-cli) [![dependencies Status](https://david-dm.org/blackbird-team/bbt-cli/status.svg)](https://david-dm.org/blackbird-team/bbt-cli) [![devDependencies Status](https://david-dm.org/blackbird-team/bbt-cli/dev-status.svg)](https://david-dm.org/blackbird-team/bbt-cli?type=dev) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/blackbird-team/bbt-cli/master/LICENSE)

CLI helper for project initialization


## Installation

#### Globally

```
npm i -g https://github.com/blackbird-team/bbt-cli
```

#### Locally

```
npm i -D https://github.com/blackbird-team/bbt-cli
```

## Usage
You can call the help instruction by option ```--help``` or his alias ```-h```

#### Globally
```
bbt -h
```
#### Locally
```
node_modules\.bin\bbt -h
```

## Commands

See [common options](#options) which available with all commands

* ```bbt init -h``` _Initialization of the project_ [See examples](/docs/examples/init.md)
    * ```--github``` - \[string] - _Set URI of remote origin repository_ - [See examples](/docs/examples/init.md#options---github)
    * ```--npm``` - \[boolean] - _Switch over run npm init_ - [See examples](/docs/examples/init.md#options---npm)
    
* ```bbt lint -h``` _Append ESLint dependencies_ [See examples](/docs/examples/lint.md)
    * ```--configs``` - \[array] - _Set extends configurations_ - [See examples](/docs/examples/lint.md#options---configs)
    * ```--plugins``` - \[array] - _Set plugins_ - [See examples](/docs/examples/lint.md#options---plugins)
    
* ```bbt babel -h``` _Append Babel dependencies_ [See examples](/docs/examples/babel.md)
    * ```--presets``` - \[array] - _Set extend presets_ - [See examples](/docs/examples/babel.md#options---presets)
    * ```--plugins``` - \[array] - _Set plugins_ - [See examples](/docs/examples/babel.md#options---plugins)
    
## Options

All this options available in use with [commands](#commands) above

* ```--type``` - \[string] - _Setting the type of project_ - [See examples](/docs/examples/init.md#options---type)
* ```--fast``` - \[boolean] - _It will use only defaults and not prompt you for most options_ - [See examples](/docs/examples/init.md#options---fast)
* ```--bbt``` - \[boolean] - _Special option for [BlackBird Team](https://github.com/blackbird-team) Tech Rules support_ - [See examples](/docs/examples/init.md#options---bbt)