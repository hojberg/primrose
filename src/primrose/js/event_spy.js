/**
@class EventSpy
@namespace Primrose
@extends Y.Primrose.Spy
@constructor
**/
Y.namespace('Primrose').EventSpy = Y.Base.create('Primrose.eventSpy',
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
      
      host.on(targetName, increment)



      this.set('target', host[targetName])
      host[targetName] = Y.bind(replacement, this);
    },

    /**
    replacement method

    @method increment
    **/
    increment: function () {
      this.get('occurrences')++;
    }

},
{

  ATTRS: {

  }
});
