# run-run

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

`run-run` will allow you to define cross-platform environment variables. These environment variables can be used in npm scripts and accessed in Node scripts via `process.env`.

## Usage

[![NPM](https://nodei.co/npm/run-run.png)](https://www.npmjs.com/package/run-run)

### Install
```bash
$ npm install run-run --save-dev
```

### Ways to define environment variables

You can define environment variables in three ways with `run-run`.

1. Regular old `VARIABLE_NAME=variableValue`
2. Pipe a JSON object to `run-run` and the variables of that object will be turned into variables.
3. Arguments passed to `run-run` will also be turned into environment variables

### Regular old `VARIABLE_NAME=variableValue`

Example `package.json` using `run-run` with `VARIABLE_NAME=variableValue`:
```
{
  ... the rest of the stuff defined in package.json,

  scripts: {
    "start": "run-run SCRIPT=index.js TMP=temp.js -- 'npm run cp; npm run build'",
    "cp": "cp ./src/{SCRIPT} ./{TMP}",
    "build": "npm run browserify; npm run run-it",
    "browserify": "browserify ./temp.js > {SCRIPT}; rm ./temp.js",
    "run-it": "node {SCRIPT}"
  }
}
```

In the above example `index.js` into `{SCRIPT}` and `temp.js` will be injected into `{TMP}`. So with: 
```
"cp": "cp ./src/{SCRIPT} ./{TMP}",
"browserify": "browserify ./temp.js > {SCRIPT}; rm ./temp.js",
"run-it": "node {SCRIPT}"
```
At runtime they become:
```
"cp": "cp ./src/index.js ./temp.js",
"browserify": "browserify ./temp.js > index.js; rm ./temp.js",
"run-it": "node index.js"
```

When `npm run run-it` is run `index.js` will be able to access the `SCRIPT` and `TMP` variables via `process.env.SCRIPT` and `process.env.TMP`.

It should be noted for Windows users you should define your variables after the `run-run` command and not before. Doing it this way will ensure your npm scripts will run cross platform.

### Pipe JSON to `run-run`

Example `package.json` using `run-run` with pipes:
```
{
  ... the rest of the stuff defined in package.json,

  scripts: {
    "test": "cat vars.json | run-run -- 'node {SCRIPT}'"
  }
}
```

`vars.json` would look like this:
```json
{
  "SCRIPT": "test/index.js"
}
```

Piping environment variables to your scripts is very powerful. For instance using [`inquirer`](https://www.npmjs.com/package/inquirer) you could write a small node script where a user can select a file to run and this could be piped to `run-run`.

### Environment variables through `run-run` arguments

Example `package.json` using `run-run` with arguments:
```
{
  ... the rest of the stuff defined in package.json,

  scripts: {
    "test": "run-run --SCRIPT test/index.js -- 'node {SCRIPT}'"
  }
}
```




## Similar Projects

- [cross-env](http://npmjs.com/cross-env)
- [better-npm-run](http://npmjs.com/better-npm-run)


## License

MIT, see [LICENSE.md](http://github.com/Jam3/run-run/blob/master/LICENSE.md) for details.
