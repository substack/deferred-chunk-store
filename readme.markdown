# deferred-chunk-store

expose a child store interface to delay providing an implementation

This module is similar in spirit to [deferred-leveldown][1]

[1]: https://npmjs.com/package/deferred-leveldown

# example

``` js
var defstore = require('deferred-chunk-store')
var fdstore = require('fd-chunk-store')
var mkdirp = require('mkdirp')

var store = defstore(9)
store.put(0, Buffer('whatever\n'), function (err) {
  if (err) console.error(err)
  else console.log('wrote bytes')
})

mkdirp('/tmp/defstore', function (err) {
  if (err) return console.error(err)
  console.log('made directory')
  store.setStore(fdstore(9, '/tmp/defstore/store'))
})
```

# api

``` js
var deferredStore = require('deferred-chunk-store')
```

## var store = deferredStore(chunkSize)

Present a chunk store interface `store` with `chunkSize`.

## store.setStore(otherStore)

Set the underlying implementation to `otherStore`, sending buffered and future
operations in order.

# license

BSD
