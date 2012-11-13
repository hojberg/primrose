YUI.add('primrose-log-reporter', function (Y) {

  var LogReporter = function () {};

  LogReporter.prototype = {

    /**
    indentian level

    @property _level
    @type {Integer}
    @default 0
    @protected
    **/
    _level: 0,

    /**
    observes a Suite, Spec or Expectation

    @method observe
    @param {Object} o
    **/
    observe: function (o) {
      o.after('report:enter',   this._handleEnter,  this);
      o.after('report:exit',    this._handleExit,   this);
      o.after('report:result',  this._handleResult, this);
      o.after('report:error',   this._handleError,  this);
    },

    _indentionSpaces: function () {
      var spaces = '';

      for (i = 0; i < this._level; i++) {
        spaces += '  ';
      }

      return spaces; 
    },

    /**
    handles the `enter` event

    @method _handleEnter
    @param {EventFacade}
    @protected
    **/
    _handleEnter: function (ev) {
      this._report([
        this._indentionSpaces(),
        ev.description
      ]);

      this._level++;
    },

    /**
    handles the `exit` event

    @method _handleExit
    @param {EventFacade}
    @protected
    **/
    _handleExit: function (ev) {
      this._level--;
    },

    /**
    handles the `result` event

    @method _handleResult
    @param {EventFacade}
    @protected
    **/
    _handleResult: function (ev) {
      this._report([
        this._indentionSpaces(),
        ev.description,
        '=>',
        ev.passed ? 'PASSED' : 'FAILED'
      ]);
    },

    /**
    handles the `error` event

    @method _handleError
    @param {EventFacade}
    @protected
    **/
    _handleError: function (ev) {
      var ex = ev.exception;

      this._report([
        this._indentionSpaces(),
        ev.description,
        '=>',
        ex.name + ': ',
        ex.message
      ], 'warn');

      //Y.log(ex, 'warn');
    },

    /**
    a simple Y.log adapter for rendering the report

    @method report
    @param {Array[String]} detail
    @param {String} level 
      @default 'info'
    **/
    _report: function (detail, level) {
      level = level || 'info';
      Y.log(detail.join(' '), level);
    }

  };

  Y.namespace('Primrose').LogReporter = LogReporter;

});
