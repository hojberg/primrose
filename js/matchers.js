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
      this.validator = function (subject) {
        return subject === expected;
      }
    }
  };

  Matchers.NAME = 'primrose:matchers';

  // export to the Primrose namespace
  Y.namespace('Primrose').Matchers = Matchers;

},
'0.0.1',
{
  requires: [
    'base-core'
  ]
});
