if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-primrose/gallery-primrose.js",
    code: []
};
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].code=["YUI.add('gallery-primrose', function (Y, NAME) {","","(function () {","","  /**","  Reportable handles the results of a suite.","","  @class Reportable","  @namespace Primrose","  @extends BaseCore","  @constructor","  **/","  var Reportable = function () {};","","  Reportable.prototype = {","","    initializer: function () {","      Y.Do.before( this.report, this, 'run', this, 'enter');","      Y.Do.after(  this.report, this, 'run', this, 'exit');","","      Y.Do.before( this.report, this, '_runBeforeList', this, 'enter', 'beforeEaches' );","      Y.Do.before( this.report, this, '_runBeforeList', this, 'exit',  'beforeEaches' );","    },","","    /**","    @method report","    @param {String} executionPoint","    @param {String} [blockType]","    @todo split this function into smaller pieces","    **/","    report: function (executionPoint, blockType) {","      var description = blockType || this.get('description'),","          passed      = this.get('passed');","","      if (Y.Lang.isUndefined( passed ) ) {","        this.fire('report:' + executionPoint, {","          description: description","        });","      }","      else if (executionPoint === 'exit') {","        this.fire('report:result', {","          description: description,","          passed: passed","        });","      }","    },","","    /**","    Fires an error event","","    @method reportError","    @param {Error} exception","    @param {String} description","    **/","    reportError: function (exception, description) {","      this.fire('report:error', {","        description: description || this.get('description'),","        exception: exception","      });","    }","","  };","","  Reportable.NAME = 'primrose:reportable';","","  // export to the Primrose namespace","  Y.namespace('Primrose').Reportable = Reportable;","","}());","/**","Mixin to provide before each ability","","@class BeforeEach","@namespace Primrose","@extends BaseCore","@constructor","**/","Y.namespace('Primrose').BeforeEach = Y.Base.create('primrose:beforeEach',","  Y.BaseCore,","  [],","{","  /**","  add a beforeEach blocks to the suite","","  @method addBefores","  @param {Array[Function]} befores","  **/","  addBefores: function (befores) {","    var allBefores = this.get('beforeList').concat(befores);","    this.set('beforeList', allBefores);","  }","","});","/**","A Suite defines a `describe` block","","@class Suite","@namespace Primrose","@extends Base","@uses Primrose.BeforeEach","@uses Primrose.Reportable","@constructor","**/","Y.namespace('Primrose').Suite = Y.Base.create('primrose:suite',","  Y.Base,","  [Y.Primrose.BeforeEach, Y.Primrose.Reportable],","{","","  /**","  add a spec or a suite to the suite","","  @method add","  @param {Primrose.Spec|Primrose.Suite} child","  **/","  add: function (child) {","    var befores = this.get('beforeList');","","    this.get('children').push(child);","","    // enable bubbling","    child.addTarget(this);","","    // add any beforeEach blocks to the child","    if (befores.length) {","      child.addBefores( befores );","    }","  },","","  /**","  run the suite and children","","  @method run","  **/","  run: function () {","    // run all children","    Y.Array.invoke(this.get('children'), 'run');","  }","","},","{","","  ATTRS: {","","    /**","    @attribute description","    @type {String}","    **/","    description: {},","","    /**","    @attribute children","    @type {Array[Primrose.Spec|Primrose.Suite]}","    **/","    children: {","      value: []","    },","","    /**","    @attribute beforeList","    @type {Array[Function]}","    **/","    beforeList: {","      value: []","    }","","  }","","});","/**","A Spec defines an `it` block","","@class Spec","@namespace Primrose","@extends Base","@uses Primrose.BeforeEach","@uses Primrose.Reportable","@constructor","**/","Y.namespace('Primrose').Spec = Y.Base.create('primrose:spec',","  Y.Base,","  [Y.Primrose.BeforeEach, Y.Primrose.Reportable],","{","","  /**","  create an expectation","","  @method expect","  @param {any} subject","  @return {Primrose.Expectation}","  **/","  expect: function (subject) {","    return this.add(new Y.Primrose.Expectation({","      subject: subject","    }));","  },","","  /**","  add an expectation to the spec","","  @method add","  @param {Primrose.Expectation} expectation","  @return {Primrose.Expectation}","  **/","  add: function (expectation) {","    // add the expectation to the spec","    this.get('expectations').push(expectation);","","    // enable bubbling","    expectation.addTarget(this);","","    return expectation;","  },","","  /**","  safe internal runner to keep track of exceptions","","  @method _exec","  @protected","  **/","  _exec: function (runner, description) {","    try {","      runner.call(this);","    }","    catch (ex) {","      this.reportError(ex, description);","    }","  },","","  /**","  execute the specification","","  @method run","  **/","  run: function () {","    this._exec(this._runBeforeList, 'beforeEach');","","    this._exec(function () {","      // execute the `it` block - pass in the `expect` method","      this.get('block').call( this, Y.bind(this.expect, this) );","","      // validate all expectations","      Y.Array.invoke(this.get('expectations'), 'run');","    }, this.get('description'));","  },","","  /**","  execute any beforeEach blocks","","  @method _runBeforeList","  @protected","  **/","  _runBeforeList: function () {","    Y.Array.each(this.get('beforeList'), function (before) {","      before();","    });","  }","","},","{","  ATTRS: {","","    /**","    @attribute description","    @type {String}","    **/","    description: {","      value: '',","","      // prefix the description with 'it'","      setter: function (val) {","        return 'it ' + val;","      }","    },","","    /**","    @attribute block","    @type {Function}","    **/","    block: {","      value: function () {}","    },","","    /**","    @attribute expectations","    @type {Array[Primrose.Expectation]}","    **/","    expectations: {","      value: []","    },","","    /**","    @attribute beforeList","    @type {Array[Function]}","    **/","    beforeList: {","      value: []","    }","","  }","});","(function () {","  var Lang    = Y.Lang,","      YArray  = Y.Array,","      Matchers;","","  /**","  @class Matchers","  @namespace Primrose","  @constructor","  **/","  Matchers = function () {};","","  Matchers.prototype = {","","    /**","    @method toBe","    @param {any} expected","    **/","    toBe: function (expected) {","      this._match('to be ' + expected, function (subject) {","        return subject === expected;","      });","    },","","    /**","    @method  toBetypeOf","    @param {String} expected","    **/","    toBeTypeof: function (expected) {","      this._match('to be typeof' + expected, function (subject) {","        return typeof subject === expected;","      });","    },","    ","    /**","    @method toMatch","    @param {RegExp} expected","    **/","    toMatch: function (expected) {","      this._match('to match ' + expected, function (subject) {","        return expected.test(subject);","      });","    },","","    /**","    @method toBeDefined","    **/","    toBeDefined: function () {","      this._match('to be defined', function (subject) {","        return typeof subject !== 'undefined';","      });","    },","","    /**","    @method toBeUndefined","    **/","    toBeUndefined: function () {","      this._match('to be defined', function (subject) {","        return typeof subject === 'undefined';","      });","    },","","    /**","    @method toBeNaN","    **/","    toBeNaN: function () {","      this._match('to be NaN', function (subject) {","        return isNaN(subject);","      });","    },","","    /**","    @method toInclude","    @param {Array|String} expected","    **/","    toInclude: function (expected) {","      this._match('to contain ' + expected, function (subject) {","        if (typeof subject === 'string') {","          return subject.indexOf(expected) !== -1;","        }","        else if (Lang.isArray(subject)) {","          return YArray.indexOf(subject, expected) !== -1;","        }","      });","    },","","    /**","    sets up the matcher","","    @method match","    @param {String} description","    @param {Function} validator","    @protected","    **/","    _match: function (description, validator) {","      this.set('matcher', description);","      this.validator = validator;","    }","","  };","","  Matchers.NAME = 'primrose:matchers';","","  Matchers.ATTRS = {","    /**","    description of the matcher","","    @attribute matcher","    @type {String}","    **/","    matcher: {","      value: ''","    }","  };","","  // export to the Primrose namespace","  Y.namespace('Primrose').Matchers = Matchers;","}());","/**","@class Expectation","@namespace Primrose","@extends Base","@uses Primrose.Matchers","@uses Primrose.Reportable","@constructor","**/","Y.namespace('Primrose').Expectation = Y.Base.create('primrose:expectation',","  Y.Base,","  [Y.Primrose.Matchers, Y.Primrose.Reportable],","{","","  /**","  @method run","  **/","  run: function () {","    return this.validate();","  },","","  /**","  reverse the validation","","  @method not","  **/","  not: function () {","    this.set('not', true);","    return this;","  },","","  /**","  to be overwritten by the matcher","","  @method validator","  @param {any} subject","  @return {Boolean}","  @default false","  **/","  validator: function (/* subject */) {","    return false;","  },","","  /**","  validate the matcher","","  @method validate","  **/","  validate: function () {","    var passed = this.validator.call(","      this,","      this.get('subject')","    );","","    if (this.get('not')) {","      passed = !passed;","    }","","    this.set('passed', passed);","","    return passed;","  }","","},","{","  ATTRS: {","","    /**","    @attribute description","    @type {String}","    **/","    description: {","      getter: function () {","        var not = this.get('not') ? 'not ' : '',","            description;","        ","        description = {","          subject:  this.get('subject'),","          not:      not,","          matcher:  this.get('matcher')","        };","","        return Y.Lang.sub(","          'expect {subject} {not}{matcher}',","          description","        );","      }","    },","","    /**","    @attribute not","    @type {Boolean}","    **/","    not: {","      value: false","    },","","    /**","    @attribute subject","    @type {any}","    **/","    subject: {},","","    /**","    @attribute passed","    @type {Boolean}","    **/","    passed: {","      value: false","    }","  }","});","(function () {","  var LogReporter = function () {};","","  LogReporter.prototype = {","","    /**","    indent level","","    @property _level","    @type {Integer}","    @default 0","    @protected","    **/","    _level: 0,","","    /**","    observes a Suite, Spec or Expectation","","    @method observe","    @param {Object} o","    **/","    observe: function (o) {","      o.after('report:enter',   this._handleEnter,  this);","      o.after('report:exit',    this._handleExit,   this);","      o.after('report:result',  this._handleResult, this);","      o.after('report:error',   this._handleError,  this);","    },","","    _indentionSpaces: function () {","      var spaces = '';","","      for (i = 0; i < this._level; i++) {","        spaces += '.';","      }","","      return spaces;","    },","","    /**","    handles the `enter` event","","    @method _handleEnter","    @param {EventFacade} ev","    @protected","    **/","    _handleEnter: function (ev) {","      this._report([","        this._indentionSpaces(),","        ev.description","      ]);","","      this._level++;","    },","","    /**","    handles the `exit` event","","    @method _handleExit","    @param {EventFacade} ev","    @protected","    **/","    _handleExit: function (/* ev */) {","      this._level--;","    },","","    /**","    handles the `result` event","","    @method _handleResult","    @param {EventFacade} ev","    @protected","    **/","    _handleResult: function (ev) {","      this._report([","        this._indentionSpaces(),","        ev.passed ? '✔' : '✖',","        ev.description","      ]);","    },","","    /**","    handles the `error` event","","    @method _handleError","    @param {EventFacade} ev","    @protected","    **/","    _handleError: function (ev) {","      var ex = ev.exception;","","      this._report([","        this._indentionSpaces(),","        ev.description,","        '=>',","        ex.name + ': ',","        ex.message","      ], 'warn');","    },","","    _report: function (detail, level) {","      level = level || 'info';","      Y.message(detail.join(' '), level);","    }","","  };","","  Y.namespace('Primrose').LogReporter = LogReporter;","","}());","(function () {","  Y.namespace('Primrose');","","  var topSuites   = [],","      _reporters  = [],","      ancestor;","","  /**","  create a new Primrose.Suite and sub suites/specs","","  @method describe","  @param {String} description","  @param {Function} block the describe block","  **/","  Y.Primrose.describe = function (description, block) {","    var suite = new Y.Primrose.Suite({","      description: description","    });","","    if (ancestor) {","      ancestor.add(suite);","    }","    else {","      topSuites.push(suite);","    }","","    // set up the ancestor for the nested `describe` calls","    ancestor = (function (old) {","      ancestor = suite;","      block.call(suite);","","      return old;","    }(ancestor));","","    return suite;","  };","","  /**","  add a block to run before each spec in the current describe subtree","","  @method beforeEach","  @param {Function} before","  **/","  Y.Primrose.beforeEach = function (before) {","    if (!ancestor) {","      throw new Error('\"beforeEach\" was defined out side of a `describe`');","    }","","    ancestor.addBefores([before]);","  };","","  /**","  create a new Primrose.Spec for the current suite","","  @method it","  @param {String} description","  @param {Function} specification","  **/","  Y.Primrose.it = function (description, block) {","    if (!ancestor) {","      throw new Error([","        '\"it',","        description + '\"',","        'was defined out side of a `describe`'","      ].join(' '));","    }","","    var spec = new Y.Primrose.Spec({","      description:  description,","      block:        block","    });","","    ancestor.add(spec);","  };","","  /**","  add a reporter to listen for results","","  @method addReporter","  @param {Reporter} reporter","  **/","  Y.Primrose.addReporter = function (reporter) {","    _reporters.push(reporter);","    Y.Array.each(topSuites, function (suite) {","      reporter.observe(suite);","    });","  };","","  /**","  run all the suites","","  @method run","  **/","  Y.Primrose.run = function () {","    var startTime = new Date(),","        duration;","","    Y.message('Running Primrose specs');","    Y.message('--------------------------');","","    Y.Array.invoke(topSuites, 'run');","    ","    duration = new Date() - startTime;","","    Y.message('--------------------------');","    Y.message('Completed Primrose specs in: ' + duration + 'ms');","  };","}());","","","}, '@VERSION@', {\"requires\": [\"base\", \"base-core\", \"event-custom\", \"collection\"]});"];
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].lines = {"1":0,"3":0,"13":0,"15":0,"18":0,"19":0,"21":0,"22":0,"32":0,"35":0,"36":0,"40":0,"41":0,"56":0,"64":0,"67":0,"78":0,"89":0,"90":0,"104":0,"116":0,"118":0,"121":0,"124":0,"125":0,"136":0,"179":0,"192":0,"206":0,"209":0,"211":0,"221":0,"222":0,"225":0,"235":0,"237":0,"239":0,"242":0,"253":0,"254":0,"271":0,"301":0,"302":0,"311":0,"313":0,"320":0,"321":0,"330":0,"331":0,"340":0,"341":0,"349":0,"350":0,"358":0,"359":0,"367":0,"368":0,"377":0,"378":0,"379":0,"381":0,"382":0,"396":0,"397":0,"402":0,"404":0,"417":0,"427":0,"436":0,"445":0,"446":0,"458":0,"467":0,"472":0,"473":0,"476":0,"478":0,"491":0,"494":0,"500":0,"530":0,"531":0,"533":0,"552":0,"553":0,"554":0,"555":0,"559":0,"561":0,"562":0,"565":0,"576":0,"581":0,"592":0,"603":0,"618":0,"620":0,"630":0,"631":0,"636":0,"639":0,"640":0,"642":0,"653":0,"654":0,"658":0,"659":0,"662":0,"666":0,"667":0,"668":0,"670":0,"673":0,"682":0,"683":0,"684":0,"687":0,"697":0,"698":0,"699":0,"706":0,"711":0,"720":0,"721":0,"722":0,"723":0,"732":0,"733":0,"736":0,"737":0,"739":0,"741":0,"743":0,"744":0};
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].functions = {"initializer:17":0,"report:31":0,"reportError:55":0,"(anonymous 2):3":0,"addBefores:88":0,"add:115":0,"run:134":0,"expect:191":0,"add:204":0,"_exec:220":0,"(anonymous 3):237":0,"run:234":0,"(anonymous 4):253":0,"_runBeforeList:252":0,"setter:270":0,"(anonymous 6):320":0,"toBe:319":0,"(anonymous 7):330":0,"toBeTypeof:329":0,"(anonymous 8):340":0,"toMatch:339":0,"(anonymous 9):349":0,"toBeDefined:348":0,"(anonymous 10):358":0,"toBeUndefined:357":0,"(anonymous 11):367":0,"toBeNaN:366":0,"(anonymous 12):377":0,"toInclude:376":0,"_match:395":0,"(anonymous 5):301":0,"run:435":0,"not:444":0,"validator:457":0,"validate:466":0,"getter:490":0,"observe:551":0,"_indentionSpaces:558":0,"_handleEnter:575":0,"_handleExit:591":0,"_handleResult:602":0,"_handleError:617":0,"_report:629":0,"(anonymous 13):530":0,"(anonymous 15):666":0,"describe:653":0,"beforeEach:682":0,"it:697":0,"(anonymous 16):722":0,"addReporter:720":0,"run:732":0,"(anonymous 14):639":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].coveredLines = 134;
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].coveredFunctions = 53;
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 1);
YUI.add('gallery-primrose', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 3);
(function () {

  /**
  Reportable handles the results of a suite.

  @class Reportable
  @namespace Primrose
  @extends BaseCore
  @constructor
  **/
  _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 2)", 3);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 13);
var Reportable = function () {};

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 15);
Reportable.prototype = {

    initializer: function () {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "initializer", 17);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 18);
Y.Do.before( this.report, this, 'run', this, 'enter');
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 19);
Y.Do.after(  this.report, this, 'run', this, 'exit');

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 21);
Y.Do.before( this.report, this, '_runBeforeList', this, 'enter', 'beforeEaches' );
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 22);
Y.Do.before( this.report, this, '_runBeforeList', this, 'exit',  'beforeEaches' );
    },

    /**
    @method report
    @param {String} executionPoint
    @param {String} [blockType]
    @todo split this function into smaller pieces
    **/
    report: function (executionPoint, blockType) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "report", 31);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 32);
var description = blockType || this.get('description'),
          passed      = this.get('passed');

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 35);
if (Y.Lang.isUndefined( passed ) ) {
        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 36);
this.fire('report:' + executionPoint, {
          description: description
        });
      }
      else {_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 40);
if (executionPoint === 'exit') {
        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 41);
this.fire('report:result', {
          description: description,
          passed: passed
        });
      }}
    },

    /**
    Fires an error event

    @method reportError
    @param {Error} exception
    @param {String} description
    **/
    reportError: function (exception, description) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "reportError", 55);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 56);
this.fire('report:error', {
        description: description || this.get('description'),
        exception: exception
      });
    }

  };

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 64);
Reportable.NAME = 'primrose:reportable';

  // export to the Primrose namespace
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 67);
Y.namespace('Primrose').Reportable = Reportable;

}());
/**
Mixin to provide before each ability

@class BeforeEach
@namespace Primrose
@extends BaseCore
@constructor
**/
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 78);
Y.namespace('Primrose').BeforeEach = Y.Base.create('primrose:beforeEach',
  Y.BaseCore,
  [],
{
  /**
  add a beforeEach blocks to the suite

  @method addBefores
  @param {Array[Function]} befores
  **/
  addBefores: function (befores) {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "addBefores", 88);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 89);
var allBefores = this.get('beforeList').concat(befores);
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 90);
this.set('beforeList', allBefores);
  }

});
/**
A Suite defines a `describe` block

@class Suite
@namespace Primrose
@extends Base
@uses Primrose.BeforeEach
@uses Primrose.Reportable
@constructor
**/
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 104);
Y.namespace('Primrose').Suite = Y.Base.create('primrose:suite',
  Y.Base,
  [Y.Primrose.BeforeEach, Y.Primrose.Reportable],
{

  /**
  add a spec or a suite to the suite

  @method add
  @param {Primrose.Spec|Primrose.Suite} child
  **/
  add: function (child) {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "add", 115);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 116);
var befores = this.get('beforeList');

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 118);
this.get('children').push(child);

    // enable bubbling
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 121);
child.addTarget(this);

    // add any beforeEach blocks to the child
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 124);
if (befores.length) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 125);
child.addBefores( befores );
    }
  },

  /**
  run the suite and children

  @method run
  **/
  run: function () {
    // run all children
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "run", 134);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 136);
Y.Array.invoke(this.get('children'), 'run');
  }

},
{

  ATTRS: {

    /**
    @attribute description
    @type {String}
    **/
    description: {},

    /**
    @attribute children
    @type {Array[Primrose.Spec|Primrose.Suite]}
    **/
    children: {
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
/**
A Spec defines an `it` block

@class Spec
@namespace Primrose
@extends Base
@uses Primrose.BeforeEach
@uses Primrose.Reportable
@constructor
**/
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 179);
Y.namespace('Primrose').Spec = Y.Base.create('primrose:spec',
  Y.Base,
  [Y.Primrose.BeforeEach, Y.Primrose.Reportable],
{

  /**
  create an expectation

  @method expect
  @param {any} subject
  @return {Primrose.Expectation}
  **/
  expect: function (subject) {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "expect", 191);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 192);
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
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "add", 204);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 206);
this.get('expectations').push(expectation);

    // enable bubbling
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 209);
expectation.addTarget(this);

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 211);
return expectation;
  },

  /**
  safe internal runner to keep track of exceptions

  @method _exec
  @protected
  **/
  _exec: function (runner, description) {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_exec", 220);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 221);
try {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 222);
runner.call(this);
    }
    catch (ex) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 225);
this.reportError(ex, description);
    }
  },

  /**
  execute the specification

  @method run
  **/
  run: function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "run", 234);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 235);
this._exec(this._runBeforeList, 'beforeEach');

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 237);
this._exec(function () {
      // execute the `it` block - pass in the `expect` method
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 3)", 237);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 239);
this.get('block').call( this, Y.bind(this.expect, this) );

      // validate all expectations
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 242);
Y.Array.invoke(this.get('expectations'), 'run');
    }, this.get('description'));
  },

  /**
  execute any beforeEach blocks

  @method _runBeforeList
  @protected
  **/
  _runBeforeList: function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_runBeforeList", 252);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 253);
Y.Array.each(this.get('beforeList'), function (before) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 4)", 253);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 254);
before();
    });
  }

},
{
  ATTRS: {

    /**
    @attribute description
    @type {String}
    **/
    description: {
      value: '',

      // prefix the description with 'it'
      setter: function (val) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "setter", 270);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 271);
return 'it ' + val;
      }
    },

    /**
    @attribute block
    @type {Function}
    **/
    block: {
      value: function () {}
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
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 301);
(function () {
  _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 5)", 301);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 302);
var Lang    = Y.Lang,
      YArray  = Y.Array,
      Matchers;

  /**
  @class Matchers
  @namespace Primrose
  @constructor
  **/
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 311);
Matchers = function () {};

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 313);
Matchers.prototype = {

    /**
    @method toBe
    @param {any} expected
    **/
    toBe: function (expected) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toBe", 319);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 320);
this._match('to be ' + expected, function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 6)", 320);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 321);
return subject === expected;
      });
    },

    /**
    @method  toBetypeOf
    @param {String} expected
    **/
    toBeTypeof: function (expected) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toBeTypeof", 329);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 330);
this._match('to be typeof' + expected, function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 7)", 330);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 331);
return typeof subject === expected;
      });
    },
    
    /**
    @method toMatch
    @param {RegExp} expected
    **/
    toMatch: function (expected) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toMatch", 339);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 340);
this._match('to match ' + expected, function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 8)", 340);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 341);
return expected.test(subject);
      });
    },

    /**
    @method toBeDefined
    **/
    toBeDefined: function () {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toBeDefined", 348);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 349);
this._match('to be defined', function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 9)", 349);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 350);
return typeof subject !== 'undefined';
      });
    },

    /**
    @method toBeUndefined
    **/
    toBeUndefined: function () {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toBeUndefined", 357);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 358);
this._match('to be defined', function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 10)", 358);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 359);
return typeof subject === 'undefined';
      });
    },

    /**
    @method toBeNaN
    **/
    toBeNaN: function () {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toBeNaN", 366);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 367);
this._match('to be NaN', function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 11)", 367);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 368);
return isNaN(subject);
      });
    },

    /**
    @method toInclude
    @param {Array|String} expected
    **/
    toInclude: function (expected) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toInclude", 376);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 377);
this._match('to contain ' + expected, function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 12)", 377);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 378);
if (typeof subject === 'string') {
          _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 379);
return subject.indexOf(expected) !== -1;
        }
        else {_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 381);
if (Lang.isArray(subject)) {
          _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 382);
return YArray.indexOf(subject, expected) !== -1;
        }}
      });
    },

    /**
    sets up the matcher

    @method match
    @param {String} description
    @param {Function} validator
    @protected
    **/
    _match: function (description, validator) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_match", 395);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 396);
this.set('matcher', description);
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 397);
this.validator = validator;
    }

  };

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 402);
Matchers.NAME = 'primrose:matchers';

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 404);
Matchers.ATTRS = {
    /**
    description of the matcher

    @attribute matcher
    @type {String}
    **/
    matcher: {
      value: ''
    }
  };

  // export to the Primrose namespace
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 417);
Y.namespace('Primrose').Matchers = Matchers;
}());
/**
@class Expectation
@namespace Primrose
@extends Base
@uses Primrose.Matchers
@uses Primrose.Reportable
@constructor
**/
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 427);
Y.namespace('Primrose').Expectation = Y.Base.create('primrose:expectation',
  Y.Base,
  [Y.Primrose.Matchers, Y.Primrose.Reportable],
{

  /**
  @method run
  **/
  run: function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "run", 435);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 436);
return this.validate();
  },

  /**
  reverse the validation

  @method not
  **/
  not: function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "not", 444);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 445);
this.set('not', true);
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 446);
return this;
  },

  /**
  to be overwritten by the matcher

  @method validator
  @param {any} subject
  @return {Boolean}
  @default false
  **/
  validator: function (/* subject */) {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "validator", 457);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 458);
return false;
  },

  /**
  validate the matcher

  @method validate
  **/
  validate: function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "validate", 466);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 467);
var passed = this.validator.call(
      this,
      this.get('subject')
    );

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 472);
if (this.get('not')) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 473);
passed = !passed;
    }

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 476);
this.set('passed', passed);

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 478);
return passed;
  }

},
{
  ATTRS: {

    /**
    @attribute description
    @type {String}
    **/
    description: {
      getter: function () {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "getter", 490);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 491);
var not = this.get('not') ? 'not ' : '',
            description;
        
        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 494);
description = {
          subject:  this.get('subject'),
          not:      not,
          matcher:  this.get('matcher')
        };

        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 500);
return Y.Lang.sub(
          'expect {subject} {not}{matcher}',
          description
        );
      }
    },

    /**
    @attribute not
    @type {Boolean}
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
    @attribute passed
    @type {Boolean}
    **/
    passed: {
      value: false
    }
  }
});
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 530);
(function () {
  _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 13)", 530);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 531);
var LogReporter = function () {};

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 533);
LogReporter.prototype = {

    /**
    indent level

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
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "observe", 551);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 552);
o.after('report:enter',   this._handleEnter,  this);
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 553);
o.after('report:exit',    this._handleExit,   this);
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 554);
o.after('report:result',  this._handleResult, this);
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 555);
o.after('report:error',   this._handleError,  this);
    },

    _indentionSpaces: function () {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_indentionSpaces", 558);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 559);
var spaces = '';

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 561);
for (i = 0; i < this._level; i++) {
        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 562);
spaces += '.';
      }

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 565);
return spaces;
    },

    /**
    handles the `enter` event

    @method _handleEnter
    @param {EventFacade} ev
    @protected
    **/
    _handleEnter: function (ev) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_handleEnter", 575);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 576);
this._report([
        this._indentionSpaces(),
        ev.description
      ]);

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 581);
this._level++;
    },

    /**
    handles the `exit` event

    @method _handleExit
    @param {EventFacade} ev
    @protected
    **/
    _handleExit: function (/* ev */) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_handleExit", 591);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 592);
this._level--;
    },

    /**
    handles the `result` event

    @method _handleResult
    @param {EventFacade} ev
    @protected
    **/
    _handleResult: function (ev) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_handleResult", 602);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 603);
this._report([
        this._indentionSpaces(),
        ev.passed ? '✔' : '✖',
        ev.description
      ]);
    },

    /**
    handles the `error` event

    @method _handleError
    @param {EventFacade} ev
    @protected
    **/
    _handleError: function (ev) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_handleError", 617);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 618);
var ex = ev.exception;

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 620);
this._report([
        this._indentionSpaces(),
        ev.description,
        '=>',
        ex.name + ': ',
        ex.message
      ], 'warn');
    },

    _report: function (detail, level) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_report", 629);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 630);
level = level || 'info';
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 631);
Y.message(detail.join(' '), level);
    }

  };

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 636);
Y.namespace('Primrose').LogReporter = LogReporter;

}());
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 639);
(function () {
  _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 14)", 639);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 640);
Y.namespace('Primrose');

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 642);
var topSuites   = [],
      _reporters  = [],
      ancestor;

  /**
  create a new Primrose.Suite and sub suites/specs

  @method describe
  @param {String} description
  @param {Function} block the describe block
  **/
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 653);
Y.Primrose.describe = function (description, block) {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "describe", 653);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 654);
var suite = new Y.Primrose.Suite({
      description: description
    });

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 658);
if (ancestor) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 659);
ancestor.add(suite);
    }
    else {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 662);
topSuites.push(suite);
    }

    // set up the ancestor for the nested `describe` calls
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 666);
ancestor = (function (old) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 15)", 666);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 667);
ancestor = suite;
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 668);
block.call(suite);

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 670);
return old;
    }(ancestor));

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 673);
return suite;
  };

  /**
  add a block to run before each spec in the current describe subtree

  @method beforeEach
  @param {Function} before
  **/
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 682);
Y.Primrose.beforeEach = function (before) {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "beforeEach", 682);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 683);
if (!ancestor) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 684);
throw new Error('"beforeEach" was defined out side of a `describe`');
    }

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 687);
ancestor.addBefores([before]);
  };

  /**
  create a new Primrose.Spec for the current suite

  @method it
  @param {String} description
  @param {Function} specification
  **/
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 697);
Y.Primrose.it = function (description, block) {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "it", 697);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 698);
if (!ancestor) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 699);
throw new Error([
        '"it',
        description + '"',
        'was defined out side of a `describe`'
      ].join(' '));
    }

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 706);
var spec = new Y.Primrose.Spec({
      description:  description,
      block:        block
    });

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 711);
ancestor.add(spec);
  };

  /**
  add a reporter to listen for results

  @method addReporter
  @param {Reporter} reporter
  **/
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 720);
Y.Primrose.addReporter = function (reporter) {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "addReporter", 720);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 721);
_reporters.push(reporter);
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 722);
Y.Array.each(topSuites, function (suite) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 16)", 722);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 723);
reporter.observe(suite);
    });
  };

  /**
  run all the suites

  @method run
  **/
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 732);
Y.Primrose.run = function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "run", 732);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 733);
var startTime = new Date(),
        duration;

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 736);
Y.message('Running Primrose specs');
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 737);
Y.message('--------------------------');

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 739);
Y.Array.invoke(topSuites, 'run');
    
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 741);
duration = new Date() - startTime;

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 743);
Y.message('--------------------------');
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 744);
Y.message('Completed Primrose specs in: ' + duration + 'ms');
  };
}());


}, '@VERSION@', {"requires": ["base", "base-core", "event-custom", "collection"]});
