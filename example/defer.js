var defstore = require('../')
var fdstore = require('fd-chunk-store')
var mkdirp = require('mkdirp')

var store = defstore(9)
store.put(0, 'whatever\n', function (err) {
  if (err) console.error(err)
  else console.log('wrote bytes')
})

mkdirp('/tmp/defstore', function (err) {
  if (err) return console.error(err)
  console.log('made directory')
  store.setStore(fdstore(9, '/tmp/defstore/store'))
})
