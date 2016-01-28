# deferred-chunk-store

expose a child store interface to delay providing an implementation

This module is similar in spirit to [deferred-leveldown][1]

[1]: https://npmjs.com/package/deferred-leveldown

# example

``` js
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
