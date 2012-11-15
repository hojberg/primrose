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
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].code=["YUI.add('gallery-primrose', function (Y, NAME) {","","Y.namespace('Primrose');","","var topSuites = [],","    parent,","    _reporters = [];","","/**","create a new Primrose.Suite and sub suites/specs","","@method describe","**/","Y.Primrose.describe = function (description, specs) {","  var oldParent, suite;","  ","  suite = new Y.Primrose.Suite({","    description: description","  });","","  if (parent) {","    oldParent = parent;","    parent.add(suite);","  }","  else {","    topSuites.push(suite);","  }","","  // specs will be added to the parent","  parent = suite;","","  // add specs to suite","  specs.call(suite);","","  // move out a step again","  if (!oldParent) {","    if (Y.Array.indexOf(topSuites, parent) !== -1) {","      parent = null;","    }","    else {","      parent = oldParent;","    }","  }","","};","","/**","add a block to run before each spec in the current describe subtree","","@method beforeEach","@param {Function} before","**/","Y.Primrose.beforeEach = function (before) {","  if (!parent) {","    throw new Error('\"beforeEach\" was defined out side of a `describe`');","  }","","  parent.addBefores([before]);","};","","/**","create a new Primrose.Spec for the current suite","","@method it","@param {String} description","@param {Function} specification","**/","Y.Primrose.it = function (description, block) {","  if (!parent) {","    throw new Error([","      '\"it',","      description + '\"',","      'was defined out side of a `describe`'","    ].join(' '));","  }","","  var spec = new Y.Primrose.Spec({","    description:  description,","    block:        block","  });","","  parent.add(spec);","};","","/**","add a reporter to listen for results","","@method addReporter","@param {Reporter} reporter","**/","Y.Primrose.addReporter = function (reporter) {","  _reporters.push(reporter);","  Y.Array.each(topSuites, function (suite) {","    reporter.observe(suite);","  });","};","","/**","run all the suites","","@method run","**/","Y.Primrose.run = function () {","  Y.Array.invoke(topSuites, 'run');","};","(function () {","","  /**","  Reportable handles the results of a suite.","","  @class Reportable","  @namespace Primrose","  @extends BaseCore","  @constructor","  **/","  var Reportable = function () {};","","  Reportable.prototype = {","","    initializer: function () {","      Y.Do.before( this.report, this, 'run', this, 'enter');","      Y.Do.after(  this.report, this, 'run', this, 'exit');","","      Y.Do.before( this.report, this, '_runBeforeList', this, 'enter', 'beforeEach' );","      Y.Do.before( this.report, this, '_runBeforeList', this, 'exit',  'beforeEach' );","    },","","    /**","    @method report","    @param {String} executionPoint","    @param {String} [blockType]","    @todo split this function into smaller pieces","    **/","    report: function (executionPoint, blockType) {","      var description = blockType || this.get('description'),","          passed      = this.get('passed');","","      if (Y.Lang.isUndefined( passed ) ) {","        this.fire('report:' + executionPoint, {","          description: description","        });","      }","      else if (executionPoint === 'exit') {","        this.fire('report:result', {","          description: description,","          passed: passed","        });","      }","    },","","    /**","    Fires an error event","","    @method reportError","    @param {Error} exception","    @param {String} description","    **/","    reportError: function (exception, description) {","      this.fire('report:error', {","        description: description || this.get('description'),","        exception: exception","      });","    }","","  };","","  Reportable.NAME = 'primrose:reportable';","","  // export to the Primrose namespace","  Y.namespace('Primrose').Reportable = Reportable;","","}());","/**","Mixin to provide before each ability","","@class BeforeEach","@namespace Primrose","@extends BaseCore","@constructor","**/","Y.namespace('Primrose').BeforeEach = Y.Base.create('primrose:beforeEach',","  Y.BaseCore,","  [],","{","  /**","  add a beforeEach blocks to the suite","","  @method addBefores","  @param {Array[Function]} befores","  **/","  addBefores: function (befores) {","    var allBefores = this.get('beforeList').concat(befores);","    this.set('beforeList', allBefores);","  }","","});","/**","A Suite defines a `describe` block","","@class Suite","@namespace Primrose","@extends Base","@uses Primrose.BeforeEach","@uses Primrose.Reportable","@constructor","**/","Y.namespace('Primrose').Suite = Y.Base.create('primrose:suite',","  Y.Base,","  [Y.Primrose.BeforeEach, Y.Primrose.Reportable],","{","","  /**","  add a spec or a suite to the suite","","  @method add","  @param {Primrose.Spec|Primrose.Suite} child","  **/","  add: function (child) {","    var befores = this.get('beforeList');","","    this.get('children').push(child);","","    // enable bubbling","    child.addTarget(this);","","    // add any beforeEach blocks to the child","    if (befores.length) {","      child.addBefores( befores );","    }","  },","","  /**","  run the suite and children","","  @method run","  **/","  run: function () {","    // run all children","    Y.Array.invoke(this.get('children'), 'run');","  }","","},","{","","  ATTRS: {","","    /**","    @attribute description","    @type {String}","    **/","    description: {},","","    /**","    @attribute children","    @type {Array[Primrose.Spec|Primrose.Suite]}","    **/","    children: {","      value: []","    },","","    /**","    @attribute beforeList","    @type {Array[Function]}","    **/","    beforeList: {","      value: []","    }","","  }","","});","/**","A Spec defines an `it` block","","@class Spec","@namespace Primrose","@extends Base","@uses Primrose.BeforeEach","@uses Primrose.Reportable","@constructor","**/","Y.namespace('Primrose').Spec = Y.Base.create('primrose:spec',","  Y.Base,","  [Y.Primrose.BeforeEach, Y.Primrose.Reportable],","{","","  /**","  create an expectation","","  @method expect","  @param {any} subject","  @return {Primrose.Expectation}","  **/","  expect: function (subject) {","    return this.add(new Y.Primrose.Expectation({","      subject: subject","    }));","  },","","  /**","  add an expectation to the spec","","  @method add","  @param {Primrose.Expectation} expectation","  @return {Primrose.Expectation}","  **/","  add: function (expectation) {","    // add the expectation to the spec","    this.get('expectations').push(expectation);","","    // enable bubbling","    expectation.addTarget(this);","","    return expectation;","  },","","  /**","  safe internal runner to keep track of exceptions","","  @method _exec","  @protected","  **/","  _exec: function (runner, description) {","    try {","      runner.call(this);","    }","    catch (ex) {","      this.reportError(ex, description);","    }","  },","","  /**","  execute the specification","","  @method run","  **/","  run: function () {","    this._exec(this._runBeforeList, 'beforeEach');","","    this._exec(function () {","      // execute the `it` block - pass in the `expect` method","      this.get('block').call( this, Y.bind(this.expect, this) );","","      // validate all expectations","      Y.Array.invoke(this.get('expectations'), 'run');","    }, this.get('description'));","  },","","  /**","  execute any beforeEach blocks","","  @method _runBeforeList","  @protected","  **/","  _runBeforeList: function () {","    Y.Array.each(this.get('beforeList'), function (before) {","      before();","    });","  }","","},","{","  ATTRS: {","","    /**","    @attribute description","    @type {String}","    **/","    description: {","      value: '',","","      // prefix the description with 'it'","      setter: function (val) {","        return 'it ' + val;","      }","    },","","    /**","    @attribute block","    @type {Function}","    **/","    block: {","      value: function () {}","    },","","    /**","    @attribute expectations","    @type {Array[Primrose.Expectation]}","    **/","    expectations: {","      value: []","    },","","    /**","    @attribute beforeList","    @type {Array[Function]}","    **/","    beforeList: {","      value: []","    }","","  }","});","(function () {","  var Lang    = Y.Lang,","      YArray  = Y.Array,","      Matchers;","","  /**","  @class Matchers","  @namespace Primrose","  @constructor","  **/","  Matchers = function () {};","","  Matchers.prototype = {","","    /**","    @method toBe","    @param {any} expected","    **/","    toBe: function (expected) {","      this._match('to be ' + expected, function (subject) {","        return subject === expected;","      });","    },","","    /**","    @method  toBetypeOf","    @param {String} expected","    **/","    toBeTypeof: function (expected) {","      this._match('to be typeof' + expected, function (subject) {","        return typeof subject === expected;","      });","    },","    ","    /**","    @method toMatch","    @param {RegExp} expected","    **/","    toMatch: function (expected) {","      this._match('to match ' + expected, function (subject) {","        return expected.test(subject);","      });","    },","","    /**","    @method toBeDefined","    **/","    toBeDefined: function () {","      this._match('to be defined', function (subject) {","        return typeof subject !== 'undefined';","      });","    },","","    /**","    @method toBeUndefined","    **/","    toBeUndefined: function () {","      this._match('to be defined', function (subject) {","        return typeof subject === 'undefined';","      });","    },","","    /**","    @method toBeNaN","    **/","    toBeNaN: function () {","      this._match('to be NaN', function (subject) {","        return isNaN(subject);","      });","    },","","    /**","    @method toInclude","    @param {Array|String} expected","    **/","    toInclude: function (expected) {","      this._match('to contain ' + expected, function (subject) {","        if (typeof subject === 'string') {","          return subject.indexOf(expected) !== -1;","        }","        else if (Lang.isArray(subject)) {","          return YArray.indexOf(subject, expected) !== -1;","        }","      });","    },","","    /**","    sets up the matcher","","    @method match","    @param {String} description","    @param {Function} validator","    @protected","    **/","    _match: function (description, validator) {","      this.set('matcher', description);","      this.validator = validator;","    }","","  };","","  Matchers.NAME = 'primrose:matchers';","","  Matchers.ATTRS = {","    /**","    description of the matcher","","    @attribute matcher","    @type {String}","    **/","    matcher: {","      value: ''","    }","  };","","  // export to the Primrose namespace","  Y.namespace('Primrose').Matchers = Matchers;","}());","/**","@class Expectation","@namespace Primrose","@extends Base","@uses Primrose.Matchers","@uses Primrose.Reportable","@constructor","**/","Y.namespace('Primrose').Expectation = Y.Base.create('primrose:expectation',","  Y.Base,","  [Y.Primrose.Matchers, Y.Primrose.Reportable],","{","","  /**","  @method run","  **/","  run: function () {","    return this.validate();","  },","","  /**","  reverse the validation","","  @method not","  **/","  not: function () {","    this.set('not', true);","    return this;","  },","","  /**","  to be overwritten by the matcher","","  @method validator","  @param {any} subject","  @return {Boolean}","  @default false","  **/","  validator: function (/* subject */) {","    return false;","  },","","  /**","  validate the matcher","","  @method validate","  **/","  validate: function () {","    var passed = this.validator.call(","      this,","      this.get('subject')","    );","","    if (this.get('not')) {","      passed = !passed;","    }","","    this.set('passed', passed);","","    return passed;","  }","","},","{","  ATTRS: {","","    /**","    @attribute description","    @type {String}","    **/","    description: {","      getter: function () {","        var not = this.get('not') ? 'not ' : '',","            description;","        ","        description = {","          subject:  this.get('subject'),","          not:      not,","          matcher:  this.get('matcher')","        };","","        return Y.Lang.sub(","          'expect {subject} {not}{matcher}',","          description","        );","      }","    },","","    /**","    @attribute not","    @type {Boolean}","    **/","    not: {","      value: false","    },","","    /**","    @attribute subject","    @type {any}","    **/","    subject: {},","","    /**","    @attribute passed","    @type {Boolean}","    **/","    passed: {","      value: false","    }","  }","});","(function () {","  var LogReporter = function () {};","","  LogReporter.prototype = {","","    /**","    indent level","","    @property _level","    @type {Integer}","    @default 0","    @protected","    **/","    _level: 0,","","    /**","    observes a Suite, Spec or Expectation","","    @method observe","    @param {Object} o","    **/","    observe: function (o) {","      o.after('report:enter',   this._handleEnter,  this);","      o.after('report:exit',    this._handleExit,   this);","      o.after('report:result',  this._handleResult, this);","      o.after('report:error',   this._handleError,  this);","    },","","    _indentionSpaces: function () {","      var spaces = '';","","      for (i = 0; i < this._level; i++) {","        spaces += '  ';","      }","","      return spaces;","    },","","    /**","    handles the `enter` event","","    @method _handleEnter","    @param {EventFacade} ev","    @protected","    **/","    _handleEnter: function (ev) {","      this._report([","        this._indentionSpaces(),","        ev.description","      ]);","","      this._level++;","    },","","    /**","    handles the `exit` event","","    @method _handleExit","    @param {EventFacade} ev","    @protected","    **/","    _handleExit: function (/* ev */) {","      this._level--;","    },","","    /**","    handles the `result` event","","    @method _handleResult","    @param {EventFacade} ev","    @protected","    **/","    _handleResult: function (ev) {","      this._report([","        this._indentionSpaces(),","        ev.passed ? '✔' : '✖',","        ev.description","      ]);","    },","","    /**","    handles the `error` event","","    @method _handleError","    @param {EventFacade} ev","    @protected","    **/","    _handleError: function (ev) {","      var ex = ev.exception;","","      this._report([","        this._indentionSpaces(),","        ev.description,","        '=>',","        ex.name + ': ',","        ex.message","      ], 'warn');","    },","","    _report: function (detail, level) {","      level = level || 'info';","    }","","  };","","  Y.namespace('Primrose').LogReporter = LogReporter;","","}());","","","}, '@VERSION@', {\"requires\": [\"base\", \"base-core\", \"event-custom\", \"collection\"]});"];
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].lines = {"1":0,"3":0,"5":0,"14":0,"15":0,"17":0,"21":0,"22":0,"23":0,"26":0,"30":0,"33":0,"36":0,"37":0,"38":0,"41":0,"53":0,"54":0,"55":0,"58":0,"68":0,"69":0,"70":0,"77":0,"82":0,"91":0,"92":0,"93":0,"94":0,"103":0,"104":0,"106":0,"116":0,"118":0,"121":0,"122":0,"124":0,"125":0,"135":0,"138":0,"139":0,"143":0,"144":0,"159":0,"167":0,"170":0,"181":0,"192":0,"193":0,"207":0,"219":0,"221":0,"224":0,"227":0,"228":0,"239":0,"282":0,"295":0,"309":0,"312":0,"314":0,"324":0,"325":0,"328":0,"338":0,"340":0,"342":0,"345":0,"356":0,"357":0,"374":0,"404":0,"405":0,"414":0,"416":0,"423":0,"424":0,"433":0,"434":0,"443":0,"444":0,"452":0,"453":0,"461":0,"462":0,"470":0,"471":0,"480":0,"481":0,"482":0,"484":0,"485":0,"499":0,"500":0,"505":0,"507":0,"520":0,"530":0,"539":0,"548":0,"549":0,"561":0,"570":0,"575":0,"576":0,"579":0,"581":0,"594":0,"597":0,"603":0,"633":0,"634":0,"636":0,"655":0,"656":0,"657":0,"658":0,"662":0,"664":0,"665":0,"668":0,"679":0,"684":0,"695":0,"706":0,"721":0,"723":0,"733":0,"738":0};
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].functions = {"describe:14":0,"beforeEach:53":0,"it:68":0,"(anonymous 2):93":0,"addReporter:91":0,"run:103":0,"initializer:120":0,"report:134":0,"reportError:158":0,"(anonymous 3):106":0,"addBefores:191":0,"add:218":0,"run:237":0,"expect:294":0,"add:307":0,"_exec:323":0,"(anonymous 4):340":0,"run:337":0,"(anonymous 5):356":0,"_runBeforeList:355":0,"setter:373":0,"(anonymous 7):423":0,"toBe:422":0,"(anonymous 8):433":0,"toBeTypeof:432":0,"(anonymous 9):443":0,"toMatch:442":0,"(anonymous 10):452":0,"toBeDefined:451":0,"(anonymous 11):461":0,"toBeUndefined:460":0,"(anonymous 12):470":0,"toBeNaN:469":0,"(anonymous 13):480":0,"toInclude:479":0,"_match:498":0,"(anonymous 6):404":0,"run:538":0,"not:547":0,"validator:560":0,"validate:569":0,"getter:593":0,"observe:654":0,"_indentionSpaces:661":0,"_handleEnter:678":0,"_handleExit:694":0,"_handleResult:705":0,"_handleError:720":0,"_report:732":0,"(anonymous 14):633":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].coveredLines = 129;
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
Y.Array.invoke(topSuites, 'run');
};
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 106);
(function () {

  /**
  Reportable handles the results of a suite.

  @class Reportable
  @namespace Primrose
  @extends BaseCore
  @constructor
  **/
  _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 3)", 106);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 116);
var Reportable = function () {};

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 118);
Reportable.prototype = {

    initializer: function () {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "initializer", 120);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 121);
Y.Do.before( this.report, this, 'run', this, 'enter');
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 122);
Y.Do.after(  this.report, this, 'run', this, 'exit');

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 124);
Y.Do.before( this.report, this, '_runBeforeList', this, 'enter', 'beforeEach' );
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 125);
Y.Do.before( this.report, this, '_runBeforeList', this, 'exit',  'beforeEach' );
    },

    /**
    @method report
    @param {String} executionPoint
    @param {String} [blockType]
    @todo split this function into smaller pieces
    **/
    report: function (executionPoint, blockType) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "report", 134);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 135);
var description = blockType || this.get('description'),
          passed      = this.get('passed');

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 138);
if (Y.Lang.isUndefined( passed ) ) {
        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 139);
this.fire('report:' + executionPoint, {
          description: description
        });
      }
      else {_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 143);
if (executionPoint === 'exit') {
        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 144);
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
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "reportError", 158);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 159);
this.fire('report:error', {
        description: description || this.get('description'),
        exception: exception
      });
    }

  };

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 167);
Reportable.NAME = 'primrose:reportable';

  // export to the Primrose namespace
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 170);
Y.namespace('Primrose').Reportable = Reportable;

}());
/**
Mixin to provide before each ability

@class BeforeEach
@namespace Primrose
@extends BaseCore
@constructor
**/
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 181);
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
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "addBefores", 191);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 192);
var allBefores = this.get('beforeList').concat(befores);
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 193);
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
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 207);
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
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "add", 218);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 219);
var befores = this.get('beforeList');

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 221);
this.get('children').push(child);

    // enable bubbling
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 224);
child.addTarget(this);

    // add any beforeEach blocks to the child
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 227);
if (befores.length) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 228);
child.addBefores( befores );
    }
  },

  /**
  run the suite and children

  @method run
  **/
  run: function () {
    // run all children
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "run", 237);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 239);
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
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 282);
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
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "expect", 294);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 295);
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
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "add", 307);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 309);
this.get('expectations').push(expectation);

    // enable bubbling
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 312);
expectation.addTarget(this);

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 314);
return expectation;
  },

  /**
  safe internal runner to keep track of exceptions

  @method _exec
  @protected
  **/
  _exec: function (runner, description) {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_exec", 323);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 324);
try {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 325);
runner.call(this);
    }
    catch (ex) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 328);
this.reportError(ex, description);
    }
  },

  /**
  execute the specification

  @method run
  **/
  run: function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "run", 337);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 338);
this._exec(this._runBeforeList, 'beforeEach');

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 340);
this._exec(function () {
      // execute the `it` block - pass in the `expect` method
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 4)", 340);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 342);
this.get('block').call( this, Y.bind(this.expect, this) );

      // validate all expectations
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 345);
Y.Array.invoke(this.get('expectations'), 'run');
    }, this.get('description'));
  },

  /**
  execute any beforeEach blocks

  @method _runBeforeList
  @protected
  **/
  _runBeforeList: function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_runBeforeList", 355);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 356);
Y.Array.each(this.get('beforeList'), function (before) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 5)", 356);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 357);
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
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "setter", 373);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 374);
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
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 404);
(function () {
  _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 6)", 404);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 405);
var Lang    = Y.Lang,
      YArray  = Y.Array,
      Matchers;

  /**
  @class Matchers
  @namespace Primrose
  @constructor
  **/
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 414);
Matchers = function () {};

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 416);
Matchers.prototype = {

    /**
    @method toBe
    @param {any} expected
    **/
    toBe: function (expected) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toBe", 422);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 423);
this._match('to be ' + expected, function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 7)", 423);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 424);
return subject === expected;
      });
    },

    /**
    @method  toBetypeOf
    @param {String} expected
    **/
    toBeTypeof: function (expected) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toBeTypeof", 432);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 433);
this._match('to be typeof' + expected, function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 8)", 433);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 434);
return typeof subject === expected;
      });
    },
    
    /**
    @method toMatch
    @param {RegExp} expected
    **/
    toMatch: function (expected) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toMatch", 442);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 443);
this._match('to match ' + expected, function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 9)", 443);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 444);
return expected.test(subject);
      });
    },

    /**
    @method toBeDefined
    **/
    toBeDefined: function () {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toBeDefined", 451);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 452);
this._match('to be defined', function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 10)", 452);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 453);
return typeof subject !== 'undefined';
      });
    },

    /**
    @method toBeUndefined
    **/
    toBeUndefined: function () {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toBeUndefined", 460);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 461);
this._match('to be defined', function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 11)", 461);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 462);
return typeof subject === 'undefined';
      });
    },

    /**
    @method toBeNaN
    **/
    toBeNaN: function () {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toBeNaN", 469);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 470);
this._match('to be NaN', function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 12)", 470);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 471);
return isNaN(subject);
      });
    },

    /**
    @method toInclude
    @param {Array|String} expected
    **/
    toInclude: function (expected) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "toInclude", 479);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 480);
this._match('to contain ' + expected, function (subject) {
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 13)", 480);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 481);
if (typeof subject === 'string') {
          _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 482);
return subject.indexOf(expected) !== -1;
        }
        else {_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 484);
if (Lang.isArray(subject)) {
          _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 485);
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
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_match", 498);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 499);
this.set('matcher', description);
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 500);
this.validator = validator;
    }

  };

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 505);
Matchers.NAME = 'primrose:matchers';

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 507);
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
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 520);
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
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 530);
Y.namespace('Primrose').Expectation = Y.Base.create('primrose:expectation',
  Y.Base,
  [Y.Primrose.Matchers, Y.Primrose.Reportable],
{

  /**
  @method run
  **/
  run: function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "run", 538);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 539);
return this.validate();
  },

  /**
  reverse the validation

  @method not
  **/
  not: function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "not", 547);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 548);
this.set('not', true);
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 549);
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
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "validator", 560);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 561);
return false;
  },

  /**
  validate the matcher

  @method validate
  **/
  validate: function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "validate", 569);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 570);
var passed = this.validator.call(
      this,
      this.get('subject')
    );

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 575);
if (this.get('not')) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 576);
passed = !passed;
    }

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 579);
this.set('passed', passed);

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 581);
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
        _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "getter", 593);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 594);
var not = this.get('not') ? 'not ' : '',
            description;
        
        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 597);
description = {
          subject:  this.get('subject'),
          not:      not,
          matcher:  this.get('matcher')
        };

        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 603);
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
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 633);
(function () {
  _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 14)", 633);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 634);
var LogReporter = function () {};

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 636);
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
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "observe", 654);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 655);
o.after('report:enter',   this._handleEnter,  this);
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 656);
o.after('report:exit',    this._handleExit,   this);
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 657);
o.after('report:result',  this._handleResult, this);
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 658);
o.after('report:error',   this._handleError,  this);
    },

    _indentionSpaces: function () {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_indentionSpaces", 661);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 662);
var spaces = '';

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 664);
for (i = 0; i < this._level; i++) {
        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 665);
spaces += '  ';
      }

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 668);
return spaces;
    },

    /**
    handles the `enter` event

    @method _handleEnter
    @param {EventFacade} ev
    @protected
    **/
    _handleEnter: function (ev) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_handleEnter", 678);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 679);
this._report([
        this._indentionSpaces(),
        ev.description
      ]);

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 684);
this._level++;
    },

    /**
    handles the `exit` event

    @method _handleExit
    @param {EventFacade} ev
    @protected
    **/
    _handleExit: function (/* ev */) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_handleExit", 694);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 695);
this._level--;
    },

    /**
    handles the `result` event

    @method _handleResult
    @param {EventFacade} ev
    @protected
    **/
    _handleResult: function (ev) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_handleResult", 705);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 706);
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
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_handleError", 720);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 721);
var ex = ev.exception;

      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 723);
this._report([
        this._indentionSpaces(),
        ev.description,
        '=>',
        ex.name + ': ',
        ex.message
      ], 'warn');
    },

    _report: function (detail, level) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "_report", 732);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 733);
level = level || 'info';
    }

  };

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 738);
Y.namespace('Primrose').LogReporter = LogReporter;

}());


}, '@VERSION@', {"requires": ["base", "base-core", "event-custom", "collection"]});
