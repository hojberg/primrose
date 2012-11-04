YUI.add('primrose-spec', function (Y) { 

  /**
  A Spec defines an `it` block

  @class Spec
  @namespace Primrose
  @extends BaseCore
  @uses Primrose.BeforeEach
  @constructor
  **/
  Y.namespace('Primrose').Spec = Y.Base.create('primrose:spec', 
    Y.BaseCore,
    [Y.Primrose.BeforeEach],
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

      return expectation;
    },

    /**
    execute the specification

    @method run
    **/
    run: function () {
      // run any beforeEach blocks
      Y.Array.each(this.get('beforeList'), function (before) {
        before();
      });

      Y.log('IT: ' + this.get('name'), 'debug');
      
      // validate all expectations
      Y.Array.invoke(this.get('expectation'), 'validate');
    }

  },
  {
    ATTRS: {

      /**
      @attribute name
      @type {String}
      **/
      name: {
        value: ''
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
    'primrose-before-each'
  ]
});
