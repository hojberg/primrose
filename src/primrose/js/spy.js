/**
@class Spy
@abstract
@namespace Primrose
@extends BaseCore
@constructor
**/
Y.namespace('Primrose').Spy = Y.Base.create('Primrose.Spy',
  Y.BaseCore,
  [],
{

  increment: function () {
    this.get('occurrences')++
  }

},
{

  ATTRS: {

    /**
    host object

    @attribute host
    @type {Object}
    **/
    host: {},

    /**
    name of the method, attr, or event being spied on

    @attribute targetName
    @type {String}
    **/
    targetName: {},
    
    /**
    boolean representing whether target was fired/altered/called

    @attribute hasOccured
    @type {boolean}
    **/
    hasOccurred: {
      valueFn: function () {
        return occurrences > 0;
      }
    },

    /**
    number of times the target was fired/altered/called

    @attribute occurrences
    @type {Integer}
    **/
    occurrences: {
      value: 0
    }

});
