# run-run

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

`run-run` will allow you to define cross-platform environment variables. These environment variables can be used in npm scripts and accessed in Node scripts via `process.env`.

## Usage

[![NPM](https://nodei.co/npm/run-run.png)](https://www.npmjs.com/package/run-run)

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
        "test": "run-run SCRIPT_TO_RUN=test/index.js -- 'npm run run-script'",
        "run-script": "node {SCRIPT_TO_RUN}"
    }
}
```

In the above example `test/index.js` will be injected into: 
```
"run-script": "node {SCRIPT_TO_RUN}"
```
So at runtime it becomes:
```
"run-script": "node test/index.js"
```

`test/index.js` you will be able to also access/use `process.env.SCRIPT_TO_RUN`.

It should be noted for Windows users you should define your variables after the `run-run` command and not before. Doing it this way will ensure your npm scripts will run cross platform.

### Pipe JSON to `run-run`

Example `package.json` using `run-run` with pipes:
```
{
    ... the rest of the stuff defined in package.json,

    scripts: {
        "test": "cat vars.json | run-run -- 'node {SCRIPT_TO_RUN}'"
    }
}
```

`vars.json` would look like this:
```json
{
    "SCRIPT_TO_RUN": "test/index.js"
}
```

Piping environment variables to your scripts is very powerful. For instance using [`inquirer`](https://www.npmjs.com/package/inquirer) you could write a small node script where a user can select a file to run and this could be piped to `run-run`.

### Environment variables through `run-run` arguments

Example `package.json` using `run-run` with arguments:
```
{
    ... the rest of the stuff defined in package.json,

    scripts: {
        "test": "run-run --SCRIPT_TO_RUN test/index.js -- 'node {SCRIPT_TO_RUN}'"
    }
}
```




## Similar Projects

- [http://npmjs.com/cross-env](cross-env)
- [http://npmjs.com/cross-env](better-npm-run)


## License

MIT, see [LICENSE.md](http://github.com/Jam3/run-run/blob/master/LICENSE.md) for details.
