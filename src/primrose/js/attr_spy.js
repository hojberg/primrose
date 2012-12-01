/**
@class AttrSpy
@namespace Primrose
@extends Y.Primrose.Spy
@constructor
**/
Y.namespace('Primrose').AttrSpy = Y.Base.create('Primrose.attrSpy',
  Y.Primrose.Spy,
  [],
{

  initializer: function () {
    this.listen();
  },

  /**
  listens for the target event being fired

  @method listen
  **/
  listen: function () {
    var host        = this.get('host'),
        targetName  = this.get('targetName');
    
    host.on(targetName, this.increment, this);
  }

},
{

  ATTRS: {

    /**
    @attribute getOccurrences
    @type {Number}
    **/
    getOccurrences: {
      value: 0
    },

    /**
    @attribute setOccurrences
    @type {Number}
    **/
    setOccurrences: {
      value: 0
    },

    /**
    @attribute getOccurred
    @type {Booolean}
    **/
    getOccurred: {
      getter: function () {
        return this.get('getOccurrences') > 0;
      }
    },

    /**
    @attribute setOccurred
    @type {Booolean}
    **/
    setOccurred: {
      getter: function () {
        return this.get('setOccurrences') > 0;
      }
    }

  }

});
