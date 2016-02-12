'use strict';

var EventEmitter = require('events');

function Emitter() {
  EventEmitter.apply(this, arguments);
}

Emitter.prototype = Object.create(EventEmitter.prototype);
Emitter.prototype.constructor = Emitter;

Emitter.prototype.off = function off(evt, cb) {
  if (!cb) {
    this.removeAllListeners(evt)
  } else {
    this.removeListener(evt, cb);
  }
}

Emitter.prototype.on = function(evt, cb, thisArg) {
  var callback = thisArg ? cb.bind(thisArg) : cb;
  return EventEmitter.prototype.on.call(this, evt, callback);
};


Emitter.prototype.trigger = function trigger(evt) {
  var args = [].slice.call(arguments, 0);
  return EventEmitter.prototype.emit.apply(this, args);
}

module.exports = Emitter;
