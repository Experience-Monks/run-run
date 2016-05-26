var test = require('tape');
var fs = require('fs');
var path = require('path');

test('no variables', testFile.bind(undefined, 'test-no-var', 'hello test-no-var'));
test('variables', testFile.bind(undefined, 'test-vars', 'hello test-vars and world'));
test('arguments', testFile.bind(undefined, 'test-args', 'hello test-args and mars'));
test('pipe', testFile.bind(undefined, 'test-pipe', 'hello test-pipe and Canada'));
test('npm script shortcut', testFile.bind(undefined, 'test-npm-shortcut', 'hello test-npm-shortcut'));
test('use process.env', testFile.bind(undefined, 'test-read-env', 'hello test-read-env'));

function testFile(file, expectedOut, t) {
  var out = fs.readFileSync(
    path.join(__dirname, 'test-out', file), 
    'utf8'
  );

  t.equal(out, expectedOut);
  t.end();
}