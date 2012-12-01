/**
@class MethodSpy
@namespace Primrose
@extends Y.Primrose.Spy
@constructor
**/
Y.namespace('Primrose').MethodSpy = Y.Base.create('Primrose.methodSpy',
  Y.Primrose.Spy,
  [],
{
    /**
    sets up the spy

    **/
    initializer: function () {
      this.displace();
    },

    /**
    displaces the target method on the host

    @method displace
    **/
    displace: function () {
      var host        = this.get('host'),
          targetName  = this.get('targetName');
      

      this.set('target', host[targetName])
      host[targetName] = Y.bind(replacement, this);
    },

    /**
    replacement method

    @method replacement
    **/
    replacement: function () {
      this.get('occurrences')++;
    }

},
{

  ATTRS: {


    /**
    the method being overridden by replacement
    stored here to be called through if need be

    @attribute target
    **/
    target: {}

  }
});
