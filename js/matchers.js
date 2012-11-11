YUI.add('primrose-matchers', function (Y) {

  /**
  @class Matchers
  @namespace Primrose
  @constructor
  **/
  var Matchers = function () {};

  Matchers.prototype = {
    /**
    record what the subject should be

    @method toBe
    @param {any} expected
    **/
    toBe: function (expected) {
      this.set('matcher', 'to be ' + expected);

      this.validator = function (subject) {
        return subject === expected;
      }
    }
  };

  Matchers.NAME = 'primrose:matchers';

  Matchers.ATTRS = {
    /**
    description of the matcher

    @attribute matcher
    @type {String}
    **/
    matcher: {
      value: ''
    }
  };

  // export to the Primrose namespace
  Y.namespace('Primrose').Matchers = Matchers;

},
'0.0.1',
{
  requires: []
});
