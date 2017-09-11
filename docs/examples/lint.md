## Lint 
Command for append [ESLint](https://github.com/eslint/eslint) dependencies

### Usage
```
bbt lint <options>
```

See on [best practies](./lint.md#best-practices)

### Available options
```--type, -t``` Setting the type of project
* __choices__ _one of:_ ["front", "service", "back", "standalone", "npm"]
* __type__ _string_
 
```--configs, -c``` Set extends configurations
* __type__ _array_

```--plugins, -p``` Set plugins
* __type__ _array_

```--fast, -f``` It will use only defaults and not prompt you for most options
* __type__ _boolean_
* __default__ _false_

```--bbt``` Special option for [BlackBird Team](https://github.com/blackbird-team) Tech Rules support
* __type__ _boolean_
* __default__ _false_

# Examples

## Call without options

```
bbt lint
```
On this case you should see dialog for advanced setting required inputs:

__Step 1__


__Step 2__


__Step 3__


__Step 4__


## options ```--fast```
```
bbt lint -f
```
Running the same steps above with setting default values. 

You will not see dialog for inputs which have defaults.

## options ```--type```
```
bbt lint -t front
```

## options ```--configs```
```
bbt lint -c <[array]>
```

## options ```--plugins```
```
bbt lint -p <[array]>
```

## options ```--bbt```
```
bbt lint --bbt
```

# Best Practices
```
bbt lint -t <type> -c <[array]> -p <[array]>
```