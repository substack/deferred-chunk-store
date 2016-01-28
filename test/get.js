var test = require('tape')
var defstore = require('../')
var fdstore = require('fd-chunk-store')
var mkdirp = require('mkdirp')
var tmpdir = require('os').tmpdir()
var path = require('path')

test('get', function (t) {
  t.plan(3)
  var file = path.join(tmpdir, 'deferred-chunk-store-test-' + Math.random())

  var dstore = defstore(9)
  dstore.get(0, function (err, buf) {
    t.ifError(err)
    t.deepEqual(buf, Buffer('whatever\n'))
  })

  var store = fdstore(9, file)
  store.put(0, Buffer('whatever\n'), function (err) {
    t.ifError(err)
    dstore.setStore(fdstore(9, file))
  })
})
