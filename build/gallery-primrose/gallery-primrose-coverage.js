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
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].code=["YUI.add('gallery-primrose', function (Y, NAME) {","","Y.namespace('Primrose');","","var topSuites = [],","    parent,","    _reporters = [];","","/**","create a new Primrose.Suite and sub suites/specs","","@method describe","**/","Y.Primrose.describe = function (description, specs) {","  var oldParent, suite;","  ","  suite = new Y.Primrose.Suite({","    description: description","  });","","  if (parent) {","    oldParent = parent;","    parent.add(suite);","  }","  else {","    topSuites.push(suite);","  }","","  // specs will be added to the parent","  parent = suite;","","  // add specs to suite","  specs.call(suite);","","  // move out a step again","  if (!oldParent) {","    if (Y.Array.indexOf(topSuites, parent) !== -1) {","      parent = null;","    }","    else {","      parent = oldParent;","    }","  }","","};","","/**","add a block to run before each spec in the current describe subtree","","@method beforeEach","@param {Function} before","**/","Y.Primrose.beforeEach = function (before) {","  if (!parent) {","    throw new Error('\"beforeEach\" was defined out side of a `describe`');","  }","","  parent.addBefores([before]);","};","","/**","create a new Primrose.Spec for the current suite","","@method it","@param {String} description","@param {Function} specification","**/","Y.Primrose.it = function (description, block) {","  if (!parent) {","    throw new Error([","      '\"it',","      description + '\"',","      'was defined out side of a `describe`'","    ].join(' '));","  }","","  var spec = new Y.Primrose.Spec({","    description:  description,","    block:        block","  });","","  parent.add(spec);","};","","/**","add a reporter to listen for results","","@method addReporter","@param {Reporter} reporter","**/","Y.Primrose.addReporter = function (reporter) {","  _reporters.push(reporter);","  Y.Array.each(topSuites, function (suite) {","    reporter.observe(suite);","  });","};","","/**","run all the suites","","@method run","**/","Y.Primrose.run = function () {","  var startTime = new Date(),","      duration;","","  Y.message('Running Primrose specs');","  Y.message('--------------------------');","","  Y.Array.invoke(topSuites, 'run');","  ","  duration = new Date() - startTime;","","  Y.message('--------------------------');","  Y.message('Completed Primrose specs in: ' + duration + 'ms');","};","(function () {","","  /**","  Reportable handles the results of a suite.","","  @class Reportable","  @namespace Primrose","  @extends BaseCore","  @constructor","  **/","  var Reportable = function () {};","","  Reportable.prototype = {","","    initializer: function () {","      Y.Do.before( this.report, this, 'run', this, 'enter');","      Y.Do.after(  this.report, this, 'run', this, 'exit');","","      Y.Do.before( this.report, this, '_runBeforeList', this, 'enter', 'beforeEach' );","      Y.Do.before( this.report, this, '_runBeforeList', this, 'exit',  'beforeEach' );","    },","","    /**","    @method report","    @param {String} executionPoint","    @param {String} [blockType]","    @todo split this function into smaller pieces","    **/","    report: function (executionPoint, blockType) {","      var description = blockType || this.get('description'),","          passed      = this.get('passed');","","      if (Y.Lang.isUndefined( passed ) ) {","        this.fire('report:' + executionPoint, {","          description: description","        });","      }","      else if (executionPoint === 'exit') {","        this.fire('report:result', {","          description: description,","          passed: passed","        });","      }","    },","","    /**","    Fires an error event","","    @method reportError","    @param {Error} exception","    @param {String} description","    **/","    reportError: function (exception, description) {","      this.fire('report:error', {","        description: description || this.get('description'),","        exception: exception","      });","    }","","  };","","  Reportable.NAME = 'primrose:reportable';","","  // export to the Primrose namespace","  Y.namespace('Primrose').Reportable = Reportable;","","}());","/**","Mixin to provide before each ability","","@class BeforeEach","@namespace Primrose","@extends BaseCore","@constructor","**/","Y.namespace('Primrose').BeforeEach = Y.Base.create('primrose:beforeEach',","  Y.BaseCore,","  [],","{","  /**","  add a beforeEach blocks to the suite","","  @method addBefores","  @param {Array[Function]} befores","  **/","  addBefores: function (befores) {","    var allBefores = this.get('beforeList').concat(befores);","    this.set('beforeList', allBefores);","  }","","});","/**","A Suite defines a `describe` block","","@class Suite","@namespace Primrose","@extends Base","@uses Primrose.BeforeEach","@uses Primrose.Reportable","@constructor","**/","Y.namespace('Primrose').Suite = Y.Base.create('primrose:suite',","  Y.Base,","  [Y.Primrose.BeforeEach, Y.Primrose.Reportable],","{","","  /**","  add a spec or a suite to the suite","","  @method add","  @param {Primrose.Spec|Primrose.Suite} child","  **/","  add: function (child) {","    var befores = this.get('beforeList');","","    this.get('children').push(child);","","    // enable bubbling","    child.addTarget(this);","","    // add any beforeEach blocks to the child","    if (befores.length) {","      child.addBefores( befores );","    }","  },","","  /**","  run the suite and children","","  @method run","  **/","  run: function () {","    // run all children","    Y.Array.invoke(this.get('children'), 'run');","  }","","},","{","","  ATTRS: {","","    /**","    @attribute description","    @type {String}","    **/","    description: {},","","    /**","    @attribute children","    @type {Array[Primrose.Spec|Primrose.Suite]}","    **/","    children: {","      value: []","    },","","    /**","    @attribute beforeList","    @type {Array[Function]}","    **/","    beforeList: {","      value: []","    }","","  }","","});","/**","A Spec defines an `it` block","","@class Spec","@namespace Primrose","@extends Base","@uses Primrose.BeforeEach","@uses Primrose.Reportable","@constructor","**/","Y.namespace('Primrose').Spec = Y.Base.create('primrose:spec',","  Y.Base,","  [Y.Primrose.BeforeEach, Y.Primrose.Reportable],","{","","  /**","  create an expectation","","  @method expect","  @param {any} subject","  @return {Primrose.Expectation}","  **/","  expect: function (subject) {","    return this.add(new Y.Primrose.Expectation({","      subject: subject","    }));","  },","","  /**","  add an expectation to the spec","","  @method add","  @param {Primrose.Expectation} expectation","  @return {Primrose.Expectation}","  **/","  add: function (expectation) {","    // add the expectation to the spec","    this.get('expectations').push(expectation);","","    // enable bubbling","    expectation.addTarget(this);","","    return expectation;","  },","","  /**","  safe internal runner to keep track of exceptions","","  @method _exec","  @protected","  **/","  _exec: function (runner, description) {","    try {","      runner.call(this);","    }","    catch (ex) {","      this.reportError(ex, description);","    }","  },","","  /**","  execute the specification","","  @method run","  **/","  run: function () {","    this._exec(this._runBeforeList, 'beforeEach');","","    this._exec(function () {","      // execute the `it` block - pass in the `expect` method","      this.get('block').call( this, Y.bind(this.expect, this) );","","      // validate all expectations","      Y.Array.invoke(this.get('expectations'), 'run');","    }, this.get('description'));","  },","","  /**","  execute any beforeEach blocks","","  @method _runBeforeList","  @protected","  **/","  _runBeforeList: function () {","    Y.Array.each(this.get('beforeList'), function (before) {","      before();","    });","  }","","},","{","  ATTRS: {","","    /**","    @attribute description","    @type {String}","    **/","    description: {","      value: '',","","      // prefix the description with 'it'","      setter: function (val) {","        return 'it ' + val;","      }","    },","","    /**","    @attribute block","    @type {Function}","    **/","    block: {","      value: function () {}","    },","","    /**","    @attribute expectations","    @type {Array[Primrose.Expectation]}","    **/","    expectations: {","      value: []","    },","","    /**","    @attribute beforeList","    @type {Array[Function]}","    **/","    beforeList: {","      value: []","    }","","  }","});","(function () {","  var Lang    = Y.Lang,","      YArray  = Y.Array,","      Matchers;","","  /**","  @class Matchers","  @namespace Primrose","  @constructor","  **/","  Matchers = function () {};","","  Matchers.prototype = {","","    /**","    @method toBe","    @param {any} expected","    **/","    toBe: function (expected) {","      this._match('to be ' + expected, function (subject) {","        return subject === expected;","      });","    },","","    /**","    @method  toBetypeOf","    @param {String} expected","    **/","    toBeTypeof: function (expected) {","      this._match('to be typeof' + expected, function (subject) {","        return typeof subject === expected;","      });","    },","    ","    /**","    @method toMatch","    @param {RegExp} expected","    **/","    toMatch: function (expected) {","      this._match('to match ' + expected, function (subject) {","        return expected.test(subject);","      });","    },","","    /**","    @method toBeDefined","    **/","    toBeDefined: function () {","      this._match('to be defined', function (subject) {","        return typeof subject !== 'undefined';","      });","    },","","    /**","    @method toBeUndefined","    **/","    toBeUndefined: function () {","      this._match('to be defined', function (subject) {","        return typeof subject === 'undefined';","      });","    },","","    /**","    @method toBeNaN","    **/","    toBeNaN: function () {","      this._match('to be NaN', function (subject) {","        return isNaN(subject);","      });","    },","","    /**","    @method toInclude","    @param {Array|String} expected","    **/","    toInclude: function (expected) {","      this._match('to contain ' + expected, function (subject) {","        if (typeof subject === 'string') {","          return subject.indexOf(expected) !== -1;","        }","        else if (Lang.isArray(subject)) {","          return YArray.indexOf(subject, expected) !== -1;","        }","      });","    },","","    /**","    sets up the matcher","","    @method match","    @param {String} description","    @param {Function} validator","    @protected","    **/","    _match: function (description, validator) {","      this.set('matcher', description);","      this.validator = validator;","    }","","  };","","  Matchers.NAME = 'primrose:matchers';","","  Matchers.ATTRS = {","    /**","    description of the matcher","","    @attribute matcher","    @type {String}","    **/","    matcher: {","      value: ''","    }","  };","","  // export to the Primrose namespace","  Y.namespace('Primrose').Matchers = Matchers;","}());","/**","@class Expectation","@namespace Primrose","@extends Base","@uses Primrose.Matchers","@uses Primrose.Reportable","@constructor","**/","Y.namespace('Primrose').Expectation = Y.Base.create('primrose:expectation',","  Y.Base,","  [Y.Primrose.Matchers, Y.Primrose.Reportable],","{","","  /**","  @method run","  **/","  run: function () {","    return this.validate();","  },","","  /**","  reverse the validation","","  @method not","  **/","  not: function () {","    this.set('not', true);","    return this;","  },","","  /**","  to be overwritten by the matcher","","  @method validator","  @param {any} subject","  @return {Boolean}","  @default false","  **/","  validator: function (/* subject */) {","    return false;","  },","","  /**","  validate the matcher","","  @method validate","  **/","  validate: function () {","    var passed = this.validator.call(","      this,","      this.get('subject')","    );","","    if (this.get('not')) {","      passed = !passed;","    }","","    this.set('passed', passed);","","    return passed;","  }","","},","{","  ATTRS: {","","    /**","    @attribute description","    @type {String}","    **/","    description: {","      getter: function () {","        var not = this.get('not') ? 'not ' : '',","            description;","        ","        description = {","          subject:  this.get('subject'),","          not:      not,","          matcher:  this.get('matcher')","        };","","        return Y.Lang.sub(","          'expect {subject} {not}{matcher}',","          description","        );","      }","    },","","    /**","    @attribute not","    @type {Boolean}","    **/","    not: {","      value: false","    },","","    /**","    @attribute subject","    @type {any}","    **/","    subject: {},","","    /**","    @attribute passed","    @type {Boolean}","    **/","    passed: {","      value: false","    }","  }","});","(function () {","  var LogReporter = function () {};","","  LogReporter.prototype = {","","    /**","    indent level","","    @property _level","    @type {Integer}","    @default 0","    @protected","    **/","    _level: 0,","","    /**","    observes a Suite, Spec or Expectation","","    @method observe","    @param {Object} o","    **/","    observe: function (o) {","      o.after('report:enter',   this._handleEnter,  this);","      o.after('report:exit',    this._handleExit,   this);","      o.after('report:result',  this._handleResult, this);","      o.after('report:error',   this._handleError,  this);","    },","","    _indentionSpaces: function () {","      var spaces = '';","","      for (i = 0; i < this._level; i++) {","        spaces += '  ';","      }","","      return spaces;","    },","","    /**","    handles the `enter` event","","    @method _handleEnter","    @param {EventFacade} ev","    @protected","    **/","    _handleEnter: function (ev) {","      this._report([","        this._indentionSpaces(),","        ev.description","      ]);","","      this._level++;","    },","","    /**","    handles the `exit` event","","    @method _handleExit","    @param {EventFacade} ev","    @protected","    **/","    _handleExit: function (/* ev */) {","      this._level--;","    },","","    /**","    handles the `result` event","","    @method _handleResult","    @param {EventFacade} ev","    @protected","    **/","    _handleResult: function (ev) {","      this._report([","        this._indentionSpaces(),","        ev.passed ? '✔' : '✖',","        ev.description","      ]);","    },","","    /**","    handles the `error` event","","    @method _handleError","    @param {EventFacade} ev","    @protected","    **/","    _handleError: function (ev) {","      var ex = ev.exception;","","      this._report([","        this._indentionSpaces(),","        ev.description,","        '=>',","        ex.name + ': ',","        ex.message","      ], 'warn');","    },","","    _report: function (detail, level) {","      level = level || 'info';","      Y.message(detail.join(' '), level);","    }","","  };","","  Y.namespace('Primrose').LogReporter = LogReporter;","","}());","","","}, '@VERSION@', {\"requires\": [\"base\", \"base-core\", \"event-custom\", \"collection\"]});"];
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].lines = {"1":0,"3":0,"5":0,"14":0,"15":0,"17":0,"21":0,"22":0,"23":0,"26":0,"30":0,"33":0,"36":0,"37":0,"38":0,"41":0,"53":0,"54":0,"55":0,"58":0,"68":0,"69":0,"70":0,"77":0,"82":0,"91":0,"92":0,"93":0,"94":0,"103":0,"104":0,"107":0,"108":0,"110":0,"112":0,"114":0,"115":0,"117":0,"127":0,"129":0,"132":0,"133":0,"135":0,"136":0,"146":0,"149":0,"150":0,"154":0,"155":0,"170":0,"178":0,"181":0,"192":0,"203":0,"204":0,"218":0,"230":0,"232":0,"235":0,"238":0,"239":0,"250":0,"293":0,"306":0,"320":0,"323":0,"325":0,"335":0,"336":0,"339":0,"349":0,"351":0,"353":0,"356":0,"367":0,"368":0,"385":0,"415":0,"416":0,"425":0,"427":0,"434":0,"435":0,"444":0,"445":0,"454":0,"455":0,"463":0,"464":0,"472":0,"473":0,"481":0,"482":0,"491":0,"492":0,"493":0,"495":0,"496":0,"510":0,"511":0,"516":0,"518":0,"531":0,"541":0,"550":0,"559":0,"560":0,"572":0,"581":0,"586":0,"587":0,"590":0,"592":0,"605":0,"608":0,"614":0,"644":0,"645":0,"647":0,"666":0,"667":0,"668":0,"669":0,"673":0,"675":0,"676":0,"679":0,"690":0,"695":0,"706":0,"717":0,"732":0,"734":0,"744":0,"745":0,"750":0};
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].functions = {"describe:14":0,"beforeEach:53":0,"it:68":0,"(anonymous 2):93":0,"addReporter:91":0,"run:103":0,"initializer:131":0,"report:145":0,"reportError:169":0,"(anonymous 3):117":0,"addBefores:202":0,"add:229":0,"run:248":0,"expect:305":0,"add:318":0,"_exec:334":0,"(anonymous 4):351":0,"run:348":0,"(anonymous 5):367":0,"_runBeforeList:366":0,"setter:384":0,"(anonymous 7):434":0,"toBe:433":0,"(anonymous 8):444":0,"toBeTypeof:443":0,"(anonymous 9):454":0,"toMatch:453":0,"(anonymous 10):463":0,"toBeDefined:462":0,"(anonymous 11):472":0,"toBeUndefined:471":0,"(anonymous 12):481":0,"toBeNaN:480":0,"(anonymous 13):491":0,"toInclude:490":0,"_match:509":0,"(anonymous 6):415":0,"run:549":0,"not:558":0,"validator:571":0,"validate:580":0,"getter:604":0,"observe:665":0,"_indentionSpaces:672":0,"_handleEnter:689":0,"_handleExit:705":0,"_handleResult:716":0,"_handleError:731":0,"_report:743":0,"(anonymous 14):644":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].coveredLines = 136;
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].coveredFunctions = 51;
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 1);
YUI.add('gallery-primrose', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 3);
Y.namespace('Primrose');

_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 5);
var topSuites = [],
    parent,
    _reporters = [];

/**
create a new Primrose.Suite and sub suites/specs

@method describe
**/
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 14);
Y.Primrose.describe = function (description, specs) {
  _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "describe", 14);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 15);
var oldParent, suite;
  
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 17);
suite = new Y.Primrose.Suite({
    description: description
  });

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 21);
if (parent) {
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 22);
oldParent = parent;
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 23);
parent.add(suite);
  }
  else {
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 26);
topSuites.push(suite);
  }

  // specs will be added to the parent
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 30);
parent = suite;

  // add specs to suite
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 33);
specs.call(suite);

  // move out a step again
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 36);
if (!oldParent) {
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 37);
if (Y.Array.indexOf(topSuites, parent) !== -1) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 38);
parent = null;
    }
    else {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 41);
parent = oldParent;
    }
  }

};

/**
add a block to run before each spec in the current describe subtree

@method beforeEach
@param {Function} before
**/
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 53);
Y.Primrose.beforeEach = function (before) {
  _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "beforeEach", 53);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 54);
if (!parent) {
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 55);
throw new Error('"beforeEach" was defined out side of a `describe`');
  }

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 58);
parent.addBefores([before]);
};

/**
create a new Primrose.Spec for the current suite

@method it
@param {String} description
@param {Function} specification
**/
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 68);
Y.Primrose.it = function (description, block) {
  _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "it", 68);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 69);
if (!parent) {
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 70);
throw new Error([
      '"it',
      description + '"',
      'was defined out side of a `describe`'
    ].join(' '));
  }

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 77);
var spec = new Y.Primrose.Spec({
    description:  description,
    block:        block
  });

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 82);
parent.add(spec);
};

/**
add a reporter to listen for results

@method addReporter
@param {Reporter} reporter
**/
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 91);
Y.Primrose.addReporter = function (reporter) {
  _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "addReporter", 91);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 92);
_reporters.push(reporter);
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 93);
Y.Array.each(topSuites, function (suite) {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 2)", 93);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 94);
reporter.observe(suite);
  });
};

/**
run all the suites

@method run
**/
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 103);
Y.Primrose.run = function () {
  _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "run", 103);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 104);
var startTime = new Date(),
      duration;

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 107);
Y.message('Running Primrose specs');
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 108);
Y.message('--------------------------');

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 110);
Y.Array.invoke(topSuites, 'run');
  
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 112);
duration = new Date() - startTime;

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 114);
Y.message('--------------------------');
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 115);
Y.message('Completed Primrose specs in: ' + duration + 'ms');
};
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 117);
(function () {

  /**
  Reportable handles the results of a suite.

  @class Reportable
  @namespace Primrose
  @extends BaseCore
  @constructor
  **/
  _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 3)", 117);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 127);
var Reportable = function () {};

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 129);
Reportable.prototype = {

    initializer: function () {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "initializer", 131);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 132);
Y.Do.before( this.report, this, 'run', this, 'enter');
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 133);
Y.Do.after(  this.report, this, 'run', this, 'exit');

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 135);
Y.Do.before( this.report, this, '_runBeforeList', this, 'enter', 'beforeEach' );
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 136);
Y.Do.before( this.report, this, '_runBeforeList', this, 'exit',  'beforeEach' );
    },

    /**
    @method report
    @param {String} executionPoint
    @param {String} [blockType]
    @todo split this function into smaller pieces
    **/
    report: function (executionPoint, blockType) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "report", 145);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 146);
var description = blockType || this.get('description'),
          passed      = this.get('passed');

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 149);
if (Y.Lang.isUndefined( passed ) ) {
        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 150);
this.fire('report:' + executionPoint, {
          description: description
        });
      }
      else {_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 154);
if (executionPoint === 'exit') {
        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 155);
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
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "reportError", 169);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 170);
this.fire('report:error', {
        description: description || this.get('description'),
        exception: exception
      });
    }

  };

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 178);
Reportable.NAME = 'primrose:reportable';

  // export to the Primrose namespace
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 181);
Y.namespace('Primrose').Reportable = Reportable;

}());
/**
Mixin to provide before each ability

@class BeforeEach
@namespace Primrose
@extends BaseCore
@constructor
**/
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 192);
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
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "addBefores", 202);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 203);
var allBefores = this.get('beforeList').concat(befores);
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 204);
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
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 218);
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
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "add", 229);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 230);
var befores = this.get('beforeList');

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 232);
this.get('children').push(child);

    // enable bubbling
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 235);
child.addTarget(this);

    // add any beforeEach blocks to the child
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 238);
if (befores.length) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 239);
child.addBefores( befores );
    }
  },

  /**
  run the suite and children

  @method run
  **/
  run: function () {
    // run all children
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "run", 248);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 250);
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
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 293);
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
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "expect", 305);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 306);
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
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "add", 318);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 320);
this.get('expectations').push(expectation);

    // enable bubbling
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 323);
expectation.addTarget(this);

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 325);
return expectation;
  },

  /**
  safe internal runner to keep track of exceptions

  @method _exec
  @protected
  **/
  _exec: function (runner, description) {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_exec", 334);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 335);
try {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 336);
runner.call(this);
    }
    catch (ex) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 339);
this.reportError(ex, description);
    }
  },

  /**
  execute the specification

  @method run
  **/
  run: function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "run", 348);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 349);
this._exec(this._runBeforeList, 'beforeEach');

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 351);
this._exec(function () {
      // execute the `it` block - pass in the `expect` method
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 4)", 351);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 353);
this.get('block').call( this, Y.bind(this.expect, this) );

      // validate all expectations
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 356);
Y.Array.invoke(this.get('expectations'), 'run');
    }, this.get('description'));
  },

  /**
  execute any beforeEach blocks

  @method _runBeforeList
  @protected
  **/
  _runBeforeList: function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_runBeforeList", 366);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 367);
Y.Array.each(this.get('beforeList'), function (before) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 5)", 367);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 368);
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
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "setter", 384);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 385);
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
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 415);
(function () {
  _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 6)", 415);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 416);
var Lang    = Y.Lang,
      YArray  = Y.Array,
      Matchers;

  /**
  @class Matchers
  @namespace Primrose
  @constructor
  **/
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 425);
Matchers = function () {};

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 427);
Matchers.prototype = {

    /**
    @method toBe
    @param {any} expected
    **/
    toBe: function (expected) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toBe", 433);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 434);
this._match('to be ' + expected, function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 7)", 434);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 435);
return subject === expected;
      });
    },

    /**
    @method  toBetypeOf
    @param {String} expected
    **/
    toBeTypeof: function (expected) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toBeTypeof", 443);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 444);
this._match('to be typeof' + expected, function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 8)", 444);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 445);
return typeof subject === expected;
      });
    },
    
    /**
    @method toMatch
    @param {RegExp} expected
    **/
    toMatch: function (expected) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toMatch", 453);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 454);
this._match('to match ' + expected, function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 9)", 454);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 455);
return expected.test(subject);
      });
    },

    /**
    @method toBeDefined
    **/
    toBeDefined: function () {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toBeDefined", 462);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 463);
this._match('to be defined', function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 10)", 463);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 464);
return typeof subject !== 'undefined';
      });
    },

    /**
    @method toBeUndefined
    **/
    toBeUndefined: function () {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toBeUndefined", 471);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 472);
this._match('to be defined', function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 11)", 472);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 473);
return typeof subject === 'undefined';
      });
    },

    /**
    @method toBeNaN
    **/
    toBeNaN: function () {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toBeNaN", 480);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 481);
this._match('to be NaN', function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 12)", 481);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 482);
return isNaN(subject);
      });
    },

    /**
    @method toInclude
    @param {Array|String} expected
    **/
    toInclude: function (expected) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toInclude", 490);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 491);
this._match('to contain ' + expected, function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 13)", 491);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 492);
if (typeof subject === 'string') {
          _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 493);
return subject.indexOf(expected) !== -1;
        }
        else {_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 495);
if (Lang.isArray(subject)) {
          _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 496);
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
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_match", 509);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 510);
this.set('matcher', description);
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 511);
this.validator = validator;
    }

  };

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 516);
Matchers.NAME = 'primrose:matchers';

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 518);
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
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 531);
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
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 541);
Y.namespace('Primrose').Expectation = Y.Base.create('primrose:expectation',
  Y.Base,
  [Y.Primrose.Matchers, Y.Primrose.Reportable],
{

  /**
  @method run
  **/
  run: function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "run", 549);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 550);
return this.validate();
  },

  /**
  reverse the validation

  @method not
  **/
  not: function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "not", 558);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 559);
this.set('not', true);
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 560);
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
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "validator", 571);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 572);
return false;
  },

  /**
  validate the matcher

  @method validate
  **/
  validate: function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "validate", 580);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 581);
var passed = this.validator.call(
      this,
      this.get('subject')
    );

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 586);
if (this.get('not')) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 587);
passed = !passed;
    }

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 590);
this.set('passed', passed);

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 592);
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
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "getter", 604);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 605);
var not = this.get('not') ? 'not ' : '',
            description;
        
        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 608);
description = {
          subject:  this.get('subject'),
          not:      not,
          matcher:  this.get('matcher')
        };

        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 614);
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
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 644);
(function () {
  _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 14)", 644);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 645);
var LogReporter = function () {};

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 647);
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
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "observe", 665);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 666);
o.after('report:enter',   this._handleEnter,  this);
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 667);
o.after('report:exit',    this._handleExit,   this);
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 668);
o.after('report:result',  this._handleResult, this);
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 669);
o.after('report:error',   this._handleError,  this);
    },

    _indentionSpaces: function () {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_indentionSpaces", 672);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 673);
var spaces = '';

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 675);
for (i = 0; i < this._level; i++) {
        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 676);
spaces += '  ';
      }

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 679);
return spaces;
    },

    /**
    handles the `enter` event

    @method _handleEnter
    @param {EventFacade} ev
    @protected
    **/
    _handleEnter: function (ev) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_handleEnter", 689);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 690);
this._report([
        this._indentionSpaces(),
        ev.description
      ]);

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 695);
this._level++;
    },

    /**
    handles the `exit` event

    @method _handleExit
    @param {EventFacade} ev
    @protected
    **/
    _handleExit: function (/* ev */) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_handleExit", 705);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 706);
this._level--;
    },

    /**
    handles the `result` event

    @method _handleResult
    @param {EventFacade} ev
    @protected
    **/
    _handleResult: function (ev) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_handleResult", 716);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 717);
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
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_handleError", 731);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 732);
var ex = ev.exception;

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 734);
this._report([
        this._indentionSpaces(),
        ev.description,
        '=>',
        ex.name + ': ',
        ex.message
      ], 'warn');
    },

    _report: function (detail, level) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_report", 743);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 744);
level = level || 'info';
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 745);
Y.message(detail.join(' '), level);
    }

  };

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 750);
Y.namespace('Primrose').LogReporter = LogReporter;

}());


}, '@VERSION@', {"requires": ["base", "base-core", "event-custom", "collection"]});
