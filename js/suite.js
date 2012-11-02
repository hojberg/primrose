YUI.add('primrose-suite', function (Y) { 

  /**
  A Suite defines a `describe` block

  @class Suite
  @namespace Primrose
  @extends BaseCore
  @constructor
  **/
  Y.namespace('Primrose').Suite = Y.Base.create('primrose:suite',
    Y.BaseCore,
    [],
  {

    /**
    add a spec or a suite to the suite

    @method add
    @param {Primrose.Spec|Primrose.Suite} specOrSuite
    **/
    add: function (specOrSuite) {
      this.get('children').push(specOrSuite);
    },

    /**
    run the suite and children

    @method run
    **/
    run: function () {
      var passed = true

      Y.log('>> DESCRIBE: ' + this.get('description'), 'debug');

      Y.Array.each(this.get('children'), function (child) {
        var childResult = child.run();

        if (!childResult) passed = childResult;
      });

      Y.log('<< DESCRIBE: ' + this.get('description'), 'debug');

      this.set('passed', passed);

      return passed;
    }

  },
  {

    ATTRS: {

      /**
      @attribute description
      @type {String}
      **/
      description: {},

      /**
      @attribute specs
      @type {Array[Primrose.Spec]}
      **/
      specs: {
        value: []
      },

      /**
      @attribute suites
      @type {Array[Primrose.Suite]}
      **/
      suites: {
        value: []
      },

      /**
      @attribute children
      @type {Array[Primrose.Spec|Primrose.Suite]}
      **/
      children: {
        value: []
      },

      /**
      does the suite subtree pass
      
      @attribute passed
      @type {Boolean}
      **/
      passed: {
        value: true
      }

    }
 
  });

},
'0.0.1',
{
  requires: [
    'base',
    'primrose-spec'
  ]
});
