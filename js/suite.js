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
    [Y.Primrose.BeforeEach],
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
      Y.log('>> DESCRIBE: ' + this.get('description'), 'debug');

      // run all children
      Y.Array.invoke(this.get('children'), 'run');

      Y.log('<< DESCRIBE: ' + this.get('description'), 'debug');
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
    'primrose-before-each'
  ]
});
