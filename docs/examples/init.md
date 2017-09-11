## Init 
Command for initialization of the project 

### Usage
```
bbt init <options>
```

See on [best practies](./init.md#best-practices)

### Available options
```--type, -t``` Setting the type of project
* __choices__ _one of:_ ["front", "service", "back", "standalone", "npm"]
* __type__ _string_
 
```--github, --gh``` Set URI of remote origin repository
* __type__ _string_

```--npm``` Switch over run npm init
* __type__ _boolean_
* __default__ _true_

```--fast, -f``` It will use only defaults and not prompt you for most options
* __type__ _boolean_
* __default__ _false_

```--bbt``` Special option for [BlackBird Team](https://github.com/blackbird-team) Tech Rules support
* __type__ _boolean_
* __default__ _false_

# Examples

## Call without options

```
bbt init
```
On this case you should see dialog for advanced setting required inputs:

__Step 1__
Choise the type of the project

__Step 2__
Set URI of remote origin repository

__Step 3__
Locally Git initialisation

__Step 4__
Run npm initialisation

## options ```--fast```
```
bbt init -f
```
Running the same steps above with setting default values. 

You will not see dialog for inputs which have defaults.

## options ```--type```
```
bbt init -t front
```

## options ```--github```
```
bbt init --gh <URI>
```

## options ```--npm```
```
bbt init --npm false
```

## options ```--bbt```
```
bbt init --bbt
```

# Best Practices
```
bbt init -t <type> --gh <URI>
```