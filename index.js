var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')

module.exports = Defer
inherits(Defer, EventEmitter)

function Defer (chunkSize) {
  if (!(this instanceof Defer)) return new Defer(chunkSize)
  EventEmitter.call(this)
  this.chunkSize = chunkSize
  this._queue = []
}

Defer.prototype.setStore = function (store) {
  var self = this
  ;(function next () {
    if (self._queue.length === 0) {
      self._store = store
      self.emit('store', store)
      return
    }
    var q = self._queue.shift()
    var args = q.slice(1,-1)
    var cb = q[q.length-1]
    args.push(function () {
      cb.apply(this, arguments)
      next()
    })
    if (store[q[0]]) {
      store[q[0]].apply(store, args)
    } else next()
  })()
}

Defer.prototype.get = function (n, opts, cb) {
  if (this._store) {
    this._store.get(n, opts, cb)
  } else {
    if (typeof opts === 'function') {
      cb = opts
      opts = {}
    }
    if (!cb) cb = noop
    this._queue.push(['get',n,opts,cb])
  }
}

Defer.prototype.put = function (n, buf, opts, cb) {
  if (this._store) {
    this._store.put(n, buf, opts, cb)
  } else {
    if (typeof opts === 'function') {
      cb = opts
      opts = {}
    }
    if (!cb) cb = noop
    this._queue.push(['put',n,buf,opts,cb])
  }
}

Defer.prototype.destroy = function (cb) {
  if (this._store) {
    if (this._store.destroy) this._store.destroy(cb)
  } else {
    this._queue.push(['destroy',cb])
  }
}

Defer.prototype.close = function (cb) {
  if (this._store) {
    if (this._store.close) this._store.close(cb)
  } else {
    this._queue.push(['close',cb])
  }
}

function noop () {}
