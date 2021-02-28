# yeow

<a href="https://www.npmjs.com/package/yeow"><img src="https://img.shields.io/npm/v/yeow" /></a>

**yeow** is a CLI helper with attitude &mdash; part [meow](https://github.com/sindresorhus/meow), part [yargs](https://github.com/yargs/yargs), and built to spite the both of them.

things yeow **does**:
- parse arguments
- assert types
- fail if given incorrect arguments

things yeow **doesn't do**:
- negate arguments with `--no-`
- interpret arguments as an array
- restrict valid values to a predetermined list

### install
```
$ npm i --save yeow
```

### usage
```js
#!/usr/bin/env node
const args = require("yeow")({
  "exclamation": {
    type: "string",
    required: true
  },
  "int": {
    type: "number",
    aliases: "--integer",
    default: 16
  }
});

console.log(args);
```
```
$ ./logger.js "yeow!"
{ exclamation: 'yeow!', int: 16 }

$ ./logger.js "cool!" --integer 100
{ exclamation: 'cool!', int: 100 }
```

## API

### yeow(obj)
returns an `object` of parsed arguments from the passed `obj`.

#### obj
type: `object`

each key is a human-readable argument name. the value is an object with any of:

##### type
type: `string`

type of the argument.

possible values:
- `string`
- `number`
- `file`

if this is omitted, the argument will become a simple `true`/`false` flag.

##### required
type: `boolean`\
default: `false`

whether the argument is required. required arguments ignore `aliases` and `default`.

the *n*-th argument for which `required` is set to `true` **must** be passed as the *n*-th argument to the program.

##### missing
type: `string`

error message to output if the argument is omitted.

if the argument is not `required`, this will be ignored.

##### aliases
type: `string`

valid aliases for the argument, space-slash-space separated.

example values:
- `-a`
- `-a / --argument`

if the argument is `required`, this will be ignored.

##### extensions
type: `string`

valid file extensions for the argument, space-slash-space separated.

example values:
- `.txt`
- `.js / .jsx`

if the argument's `type` is not `file`, this will be ignored.\
if this is omitted, the argument will accept files of any extension.

##### default
type: `string | number`

a default value the argument will have if it is omitted. the value's type should match the argument's `type`.

if the argument is `required`, this will be ignored.

##### invalid
type: `string`

error message to output if the argument is passed with an invalid type.

### example
```js
const args = require("yeow")({
  "script": {
    type: "file",
    extensions: ".js",
    required: true,
    missing: "a file must be passed",
    invalid: "not a .js file"
  },
  "delay": {
    type: "number",
    aliases: "-d / --delay",
    default: 1
  },
  "input": {
    type: "string",
    aliases: "--input",
  },
  "verbose": {
    aliases: "-v / --verbose"
  }
});
```

### donate
you can support the development of this project and others via Patreon:

[![Support me on Patreon](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Dsporeball%26type%3Dpledges%26suffix%3D%252Fmonth&style=for-the-badge)](https://patreon.com/sporeball)
