var test = require('tape');
var fs = require('fs');
var path = require('path');

test('no variables', testFile.bind(undefined, 'test-no-var', 'hello test-no-var'));
test('script name', testFile.bind(undefined, 'test-script-name', 'hello test-script-name'));
test('variables', testFile.bind(undefined, 'test-vars', 'hello test-vars and world'));
test('arguments', testFile.bind(undefined, 'test-args', 'hello test-args and mars'));
test('pipe', testFile.bind(undefined, 'test-pipe', 'hello test-pipe and Canada'));

function testFile(file, expectedOut, t) {
  var out = fs.readFileSync(
    path.join(__dirname, 'test-out', file), 
    'utf8'
  );

  t.equal(out, expectedOut);
  t.end();
}