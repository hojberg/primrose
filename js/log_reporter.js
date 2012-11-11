YUI.add('primrose-log-reporter', function (Y) {

  var LogReporter = function () {};

  LogReporter.prototype = {

    /**
    observes a Suite, Spec or Expectation

    @method observe
    @param {Object} o
    **/
    observe: function (o) {
      o.after('report:run',     this._handleRun,    this);
      o.after('report:result',  this._handleResult, this);
    },

    /**
    handles the result event

    @method _handleResult
    @param {EventFacade}
    @protected
    **/
    _handleRun: function (ev) {
      this._report([
        ev.direction,
        ev.description,
        'RUNNING'
      ]);
    },

    /**
    handles the result event

    @method _handleResult
    @param {EventFacade}
    @protected
    **/
    _handleResult: function (ev) {
      this._report([
        ev.description,
        ev.passed ? 'PASSED' : 'FAILED'
      ]);
    },

    /**
    a simple Y.log adapter for rendering the report

    @method simpleLogAdapter
    @param {Array[String]} detail
    **/
    _report: function (detail) {
      Y.log(detail.join(' '), 'info');
    }

  };

  Y.namespace('Primrose').LogReporter = LogReporter;

});
