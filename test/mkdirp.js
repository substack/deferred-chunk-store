var test = require('tape')
var defstore = require('../')
var fdstore = require('fd-chunk-store')
var mkdirp = require('mkdirp')
var tmpdir = require('os').tmpdir()
var path = require('path')

test('mkdirp', function (t) {
  t.plan(4)
  var store = defstore(9)
  var dir = path.join(tmpdir, 'deferred-chunk-store-test-' + Math.random())
  store.put(0, Buffer('whatever\n'), function (err) {
    t.ifError(err)
    store.get(0, function (err, buf) {
      t.ifError(err)
      t.deepEqual(buf, Buffer('whatever\n'))
    })
  })

  mkdirp(dir, function (err) {
    t.ifError(err)
    store.setStore(fdstore(9, path.join(dir, 'store')))
  })
})
