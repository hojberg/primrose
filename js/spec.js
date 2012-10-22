YUI.add('primrose-spec', function (Y) { 

  /**
  A Spec defines an `it` block

  @class Spec
  @namespace Primrose
  @extends BaseCore
  @constructor
  **/
  Y.namespace('Primrose').Spec = Y.Base.create('primrose:spec', 
    Y.BaseCore,
    [],
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
      var result;

      Y.Array.every(this.get('expectations'), function (expectation) {
        return result = expectation.validate();
      });

      this.set('result', result);

      return result;
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
      @attribute result
      @type {Boolean}
      @default true
      **/
      result: {
        value: true
      }
    }
  });

},
'0.0.1',
{
  requires: [
    'base',
    'collection',
    'primrose-expectation'
  ]
});
