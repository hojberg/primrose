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
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].code=["YUI.add('gallery-primrose', function (Y, NAME) {","","YUI.add('primrose', function (Y) {","","  Y.namespace('Primrose');","","  var topSuites = [],","      parent,","      _reporters = [];","","  /**","  create a new Primrose.Suite and sub suites/specs","","  @method describe","  **/","  Y.Primrose.describe = function (description, specs) {","    var oldParent, suite;","    ","    suite = new Y.Primrose.Suite({","      description: description","    });","","    if (parent) {","      oldParent = parent;","      parent.add(suite);","    }","    else {","      topSuites.push(suite);","    }","","    // specs will be added to the parent","    parent = suite;","","    // add specs to suite","    specs.call(suite);","","    // move out a step again","    if (!oldParent) {","      if (Y.Array.indexOf(topSuites, parent) !== -1) {","        parent = null;","      }","      else {","        parent = oldParent;","      }","    }","","  };","","  /**","  add a block to run before each spec in the current describe subtree","","  @method beforeEach","  @param {Function} before","  **/","  Y.Primrose.beforeEach = function (before) {","    if (!parent) {","      throw new Error('\"beforeEach\" was defined out side of a `describe`');","    }","","    parent.addBefores([before]);","  };","","  /**","  create a new Primrose.Spec for the current suite","","  @method it","  @param {String} description","  @param {Function} specification","  **/","  Y.Primrose.it = function (description, block) {","    if (!parent) {","      throw new Error([","        '\"it',","        description + '\"',","        'was defined out side of a `describe`'","      ].join(' '));","    }","","    var spec = new Y.Primrose.Spec({","      description:  description,","      block:        block","    });","","    parent.add(spec);","  };","","  /**","  add a reporter to listen for results","","  @method addReporter","  @param {Reporter} reporter","  **/","  Y.Primrose.addReporter = function (reporter) {","    _reporters.push(reporter);","    Y.Array.each(topSuites, function (suite) {","      reporter.observe(suite);","    });","  };","","  /**","  run all the suites","","  @method run","  **/","  Y.Primrose.run = function () {","    Y.Array.invoke(topSuites, 'run');","  };","","},","'0.0.1',","{","  requires: [","    'primrose-spec',","    'primrose-suite',","    'primrose-expectation'","  ]","});","","","}, '@VERSION@', {\"requires\": [\"yui-base\"]});"];
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].lines = {"1":0,"3":0,"5":0,"7":0,"16":0,"17":0,"19":0,"23":0,"24":0,"25":0,"28":0,"32":0,"35":0,"38":0,"39":0,"40":0,"43":0,"55":0,"56":0,"57":0,"60":0,"70":0,"71":0,"72":0,"79":0,"84":0,"93":0,"94":0,"95":0,"96":0,"105":0,"106":0};
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].functions = {"describe:16":0,"beforeEach:55":0,"it:70":0,"(anonymous 3):95":0,"addReporter:93":0,"run:105":0,"(anonymous 2):3":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].coveredLines = 32;
_yuitest_coverage["build/gallery-primrose/gallery-primrose.js"].coveredFunctions = 8;
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 1);
YUI.add('gallery-primrose', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 3);
YUI.add('primrose', function (Y) {

  _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 2)", 3);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 5);
Y.namespace('Primrose');

  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 7);
var topSuites = [],
      parent,
      _reporters = [];

  /**
  create a new Primrose.Suite and sub suites/specs

  @method describe
  **/
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 16);
Y.Primrose.describe = function (description, specs) {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "describe", 16);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 17);
var oldParent, suite;
    
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 19);
suite = new Y.Primrose.Suite({
      description: description
    });

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 23);
if (parent) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 24);
oldParent = parent;
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 25);
parent.add(suite);
    }
    else {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 28);
topSuites.push(suite);
    }

    // specs will be added to the parent
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 32);
parent = suite;

    // add specs to suite
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 35);
specs.call(suite);

    // move out a step again
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 38);
if (!oldParent) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 39);
if (Y.Array.indexOf(topSuites, parent) !== -1) {
        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 40);
parent = null;
      }
      else {
        _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 43);
parent = oldParent;
      }
    }

  };

  /**
  add a block to run before each spec in the current describe subtree

  @method beforeEach
  @param {Function} before
  **/
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 55);
Y.Primrose.beforeEach = function (before) {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "beforeEach", 55);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 56);
if (!parent) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 57);
throw new Error('"beforeEach" was defined out side of a `describe`');
    }

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 60);
parent.addBefores([before]);
  };

  /**
  create a new Primrose.Spec for the current suite

  @method it
  @param {String} description
  @param {Function} specification
  **/
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 70);
Y.Primrose.it = function (description, block) {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "it", 70);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 71);
if (!parent) {
      _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 72);
throw new Error([
        '"it',
        description + '"',
        'was defined out side of a `describe`'
      ].join(' '));
    }

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 79);
var spec = new Y.Primrose.Spec({
      description:  description,
      block:        block
    });

    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 84);
parent.add(spec);
  };

  /**
  add a reporter to listen for results

  @method addReporter
  @param {Reporter} reporter
  **/
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 93);
Y.Primrose.addReporter = function (reporter) {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "addReporter", 93);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 94);
_reporters.push(reporter);
    _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 95);
Y.Array.each(topSuites, function (suite) {
      _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "(anonymous 3)", 95);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 96);
reporter.observe(suite);
    });
  };

  /**
  run all the suites

  @method run
  **/
  _yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 105);
Y.Primrose.run = function () {
    _yuitest_coverfunc("build/gallery-primrose/gallery-primrose.js", "run", 105);
_yuitest_coverline("build/gallery-primrose/gallery-primrose.js", 106);
Y.Array.invoke(topSuites, 'run');
  };

},
'0.0.1',
{
  requires: [
    'primrose-spec',
    'primrose-suite',
    'primrose-expectation'
  ]
});


}, '@VERSION@', {"requires": ["yui-base"]});
