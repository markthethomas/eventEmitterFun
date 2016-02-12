'use strict';
import test from 'ava';

const Emitter = require('../emitter.es5');
const Events = new Emitter();


test('it should be an object', t => {
  t.is(typeof Events, "object");
});

test('can register a callback', t => {
  t.is(typeof Events, "object");
});

test('can register a callback with a scope', t => {
  Events.on('foo', function() {
    return 'bar';
  }, this);
});

test('can trigger an event', t => {
  var bar = 1;

  Events.on('foo', function() {
    bar = 2;
  });

  Events.trigger('foo');

  t.is(bar, 2);
});

test('can trigger an event with arguments', t => {
  var bar = 1;

  Events.on('foo', function(v) {
    bar = v;
  });

  Events.trigger('foo', 5);

  t.is(bar, 5);
});


test('can trigger multiple callbacks on an event', t => {
  (function() {
    var baz = 'HauteLook';

    Events.on('foo', function() {
      t.is(baz, 'Nordstomrack');
    });

    baz = 'Nordstomrack';
  })();

  var bar = 1;
  Events.on('foo', function() {
    bar = 2;
  });

  Events.trigger('foo');
  t.is(bar, 2);
});


test('can remove callbacks from an event', t => {
  var bar = 1;

  Events.on('foo', function() {
    bar += 1;
  });

  Events.trigger('foo');
  Events.off('foo');
  Events.trigger('foo');

  t.is(bar, 2);
});


test('can remove specific callbacks from an event', t => {
  var bar = 1;

  var adder = function(v) {
    bar += v;
  };

  var multiplier = function(v) {
    bar *= v;
  };

  Events.on('foo', adder);
  Events.trigger('foo', 1);
  t.is(bar, 2);

  Events.on('foo', multiplier)
  Events.off('foo', adder);
  Events.trigger('foo', 100);

  t.is(bar, 200);
});
