YUI.add('primrose-reportable', function (Y) { 

  /**
  Reportable handles the results of a suite.

  @class Reportable
  @namespace Primrose
  @extends BaseCore
  @constructor
  **/
  var Reportable = function () {};

  Reportable.prototype = {
    /**
    initialize the reporter subscriptions

    @todo intercept addBefores and inject an explicit report into beforeEach blocks
    **/
    initializer: function () {
      Y.Do.before( this.report, this, 'run', this, 'enter');
      Y.Do.after(  this.report, this, 'run', this, 'exit');

      Y.Do.before( this.report, this, '_runBeforeList', this, 'enter', 'beforeEach' );
      Y.Do.before( this.report, this, '_runBeforeList', this, 'exit',  'beforeEach' );
    },

    /**
    handle the report subscriptions

    @method report
    @param {String} executionPoint
    @param {String} [blockType]
    @todo split this function into smaller pieces
    **/
    report: function (executionPoint, blockType) {
      var klass       = this.name,
          description = blockType || this.get('description'),
          passed      = this.get('passed'),
          description;

      if (Y.Lang.isUndefined( passed ) ) {
        this.fire('report:' + executionPoint, {
          description: description
        });
      }
      else if (executionPoint === 'exit') {
        this.fire('report:result', {
          description: description,
          passed: passed
        });
      }

    }

  };

  Reportable.NAME = 'primrose:reportable';

  // export to the Primrose namespace
  Y.namespace('Primrose').Reportable = Reportable;

},
'0.0.1',
{
  requires: [
    'event-custom'
  ]
});
