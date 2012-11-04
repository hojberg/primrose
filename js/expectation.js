YUI.add('primrose-expectation', function (Y) {

  /**
  @class Expectation
  @namespace Primrose
  @extends BaseCore
  @constructor
  **/
  Y.namespace('Primrose').Expectation = Y.Base.create('primrose:expectation', 
    Y.BaseCore,
    [Y.Primrose.Matchers],
  {

    /**
    validate the expecation

    @method validate
    **/
    validate: function () {
      Y.log('   EXPECT', 'debug');
      return this.get('subject') === this.get('result');
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
    'base-core',
    'primrose-matchers'
  ]
});
