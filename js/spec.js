YUI.add('primrose-spec', function (Y) { 

  /**
  A Spec defines an `it` block

  @class Spec
  @namespace Primrose
  @extends Base
  @uses Primrose.BeforeEach
  @uses Primrose.Reportable
  @constructor
  **/
  Y.namespace('Primrose').Spec = Y.Base.create('primrose:spec', 
    Y.Base,
    [Y.Primrose.BeforeEach, Y.Primrose.Reportable],
  {

    /**
    create an expectation

    @method expect
    @param {any} subject
    @return {Primrose.Expectation}
    **/
    expect: function (subject) {
      return this.add(new Y.Primrose.Expectation({
        subject: subject
      }));
    },

    /**
    add an expectation to the spec 

    @method add
    @param {Primrose.Expectation} expectation
    @return {Primrose.Expectation}
    **/
    add: function (expectation) {
      // add the expectation to the spec
      this.get('expectations').push(expectation);

      // enable bubbling
      expectation.addTarget(this);

      return expectation;
    },

    /**
    execute the specification

    @method run
    **/
    run: function () {
      this._runBeforeList();

      // execute the `it` block - pass in the `expect` method
      this.get('block').call(
        this, 
        Y.bind(this.expect, this)
      );
      
      // validate all expectations
      Y.Array.invoke(this.get('expectations'), 'run');
    },

    /**
    execute any beforeEach blocks

    @method _runBeforeList
    @protected
    **/
    _runBeforeList: function () {
      Y.Array.each(this.get('beforeList'), function (before) {
        before();
      });
    }

  },
  {
    ATTRS: {

      /**
      @attribute description
      @type {String}
      **/
      description: {
        value: '',

        // prefix the description with 'it'
        setter: function (val) {
          return 'it ' + val;
        }
      },

      /**
      @attribute block
      @type {Function}
      **/
      block: {
        value: function () {}
      },

      /**
      @attribute expectations
      @type {Array[Primrose.Expectation]}
      **/
      expectations: {
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
    'collection',
    'primrose-expectation',
    'primrose-before-each',
    'primrose-reportable'
  ]
});
