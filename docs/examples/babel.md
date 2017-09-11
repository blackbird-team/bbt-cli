## Babel
Command for append [Babel](https://github.com/babel/babel) dependencies

### Usage
```
bbt babel <options>
```

See on [best practies](./babel.md#best-practices)

### Available options
```--type, -t``` Setting the type of project
* __choices__ _one of:_ ["front", "service", "back", "standalone", "npm"]
* __type__ _string_
 
```--presets, --pr``` Set extend presets
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
bbt babel
```
On this case you should see dialog for advanced setting required inputs:

__Step 1__


__Step 2__


__Step 3__


__Step 4__


## options ```--fast```
```
bbt babel -f
```
Running the same steps above with setting default values. 

You will not see dialog for inputs which have defaults.

## options ```--type```
```
bbt babel -t front
```

## options ```--presets```
```
bbt babel --pr <[array]>
```

## options ```--plugins```
```
bbt babel -p <[array]>
```

## options ```--bbt```
```
bbt babel --bbt
```

# Best Practices
```
bbt babel -t <type> --pr <[array]> -p <[array]>
```