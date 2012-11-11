YUI.add('primrose-expectation', function (Y) {

  /**
  @class Expectation
  @namespace Primrose
  @extends BaseCore
  @constructor
  **/
  Y.namespace('Primrose').Expectation = Y.Base.create('primrose:expectation', 
    Y.BaseCore,
    [Y.Primrose.Matchers, Y.Primrose.Reporter],
  {

    /**
    @method run
    **/
    run: function () {
      var valid = this.validate();

      return valid;
    },

    /**
    reverse the validation

    @method not
    **/
    not: function () {
      this.set('not', true);
      return this;
    },

    /**
    to be overwritten by the matcher

    @method validator
    @return {Boolean}
    @default false
    **/
    validator: function (subject) {
      return false;
    },

    /**
    validate the matcher

    @method validate
    **/
    validate: function () {
      var result = this.validator.call(
        this, 
        this.get('subject')
      );

      if (this.get('not')) result = !result;

      return result;
    }

  },
  {
    ATTRS: {

      /**
      @attribute not
      **/
      not: {
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
