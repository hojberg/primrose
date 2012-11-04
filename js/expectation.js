YUI.add('primrose-expectation', function (Y) {

  /**
  @class Expectation
  @namespace Primrose
  @extends BaseCore
  @constructor
  **/
  Y.namespace('Primrose').Expectation = Y.Base.create('primrose:expectation', 
    Y.BaseCore,
    [],
  {

    /**
    record what the subject should be

    @method toBe
    @param {any} result
    @todo move this to a Matcher mixin
    **/
    toBe: function ( result ) {
      this.set('result', result);
    },

    /**
    validate the expecation

    @method validate
    **/
    validate: function () {
      Y.log('   EXPECT', 'debug');
      return this.get('subject') == this.get('result');
    }

  },
  {
    ATTRS: {

      /**
      @attribute polarity
      **/
      polarity: {
        value: false
      },

      /**
      @attribute subject
      @type {any}
      **/ 
      subject: {},

      /**
      @attribute result
      @type {any}
      **/
      result: {}
    }
  });
},
'0.0.1',
{
  requires: [
    'base'
  ]
});
