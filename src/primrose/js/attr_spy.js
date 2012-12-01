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
    /**
    sets up the spy

    **/
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
      
      host.on(targetName, this.increment);
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
    getOccurrences: {
      value: 0
    },

        /**
    @attribute getOccurred
    @type {Booolean}
    **/
    getOccurred: {
      valueFn: function () {
        this.get('getOccurrences') > 0
      }
    },

    /**
    @attribute setOccurred
    @type {Booolean}
    **/
    setOccurred: {
      valueFn: function () {
        this.get('setOccurrences') > 0
      }
    }

  }

});
