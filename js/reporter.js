YUI.add('primrose-reporter', function (Y) { 

  /**
  A Reporter handles the results of a suite.

  @class Reporter
  @namespace Primrose
  @extends BaseCore
  @constructor
  **/
  Y.namespace('Primrose').Reporter = Y.Base.create('primrose:reporter',
    Y.BaseCore,
    [],
  {

    /**
    initialize the reporter subscriptions

    @todo intercept addBefores and inject an explicit report into beforeEach blocks
    **/
    initializer: function () {
      Y.Do.before( this.report, this, 'run', this, 'before', 'run' );
      Y.Do.after(  this.report, this, 'run', this, 'after',  ''    );

      Y.Do.before( this.report, this, '_runBeforeList', this, 'before', 'beforeList' );
      Y.Do.before( this.report, this, '_runBeforeList', this, 'after',  'beforeList' );
    },

    /**
    handle the report subscriptions

    @method report
    @param {String} executionPoint
    @param {String} blockType
    **/
    report: function (executionPoint, blockType) {
      var klass       = this.name,
          direction   = executionPoint === 'before' ? '>>' : '<<',
          name        = this.get('name')        || '',
          description = this.get('description') || '',
          returned    = Y.Do.originalRetVal,
          result      = '';

      if ( !Y.Lang.isUndefined( returned ) ) {
        result = returned ? 'PASS' : 'FAIL';
      }

      this.simpleLogAdapter([
        direction,
        klass,
        name,
        description,
        blockType,
        result
      ]);
    },

    /**
    a simple Y.log adapter for rendering the report

    @method simpleLogAdapter
    @param {Array[String]} detail
    **/
    simpleLogAdapter: function (detail) {
      Y.log(detail.join(' '), 'info');
    }

  },
  {

    ATTRS: {

    }
 
  });

},
'0.0.1',
{
  requires: [
    'base',
    'event-custom'
  ]
});
