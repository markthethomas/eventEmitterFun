'use strict';

const EventEmitter = require('events');

class Emitter extends EventEmitter {
  off(evt, cb) {
    if (!cb) {
      return this.removeAllListeners(evt);
    }
    return this.removeListener(evt, cb);
  }

  on(evt, cb, thisArg) {
    let callback = thisArg ? cb.bind(thisArg) : cb;
    return super.on.call(this, evt, callback);
  }

  trigger(evt) {
    let args = [].slice.call(arguments, 0);
    return this.emit.apply(this, args);
  }
}

module.exports = Emitter;
