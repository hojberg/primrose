YUI.add('primrose-suite', function (Y) { 

  /**
  A Suite defines a `describe` block

  @class Suite
  @namespace Primrose
  @extends BaseCore
  @uses Primrose.BeforeEach
  @constructor
  **/
  Y.namespace('Primrose').Suite = Y.Base.create('primrose:suite',
    Y.BaseCore,
    [Y.Primrose.BeforeEach, Y.Primrose.Reporter],
  {

    /**
    add a spec or a suite to the suite

    @method add
    @param {Primrose.Spec|Primrose.Suite} child
    **/
    add: function (child) {
      var befores = this.get('beforeList');

      this.get('children').push(child);

      // add any beforeEach blocks to the child
      if (befores.length) child.addBefores( befores );
    },

    /**
    run the suite and children

    @method run
    **/
    run: function () {
      // run all children
      Y.Array.invoke(this.get('children'), 'run');
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
      @attribute children
      @type {Array[Primrose.Spec|Primrose.Suite]}
      **/
      children: {
        value: []
      },

      /**
      @attribute beforeList
      @type {Array[Function]}
      **/
      beforeList: {
        value: []
      }

    }
 
  });

},
'0.0.1',
{
  requires: [
    'base',
    'primrose-spec',
    'primrose-before-each',
    'primrose-reporter'
  ]
});
