YUI.add('primrose', function (Y) { 

  Y.namespace('Primrose');

  var topSuite,
      parentSuite,
      currentSpec;

  var _reporters = [];

  /**
  create a new Primrose.Suite and sub suites/specs

  @method describe
  @todo OMG this code is badly name
  **/
  Y.Primrose.describe = function (description, specs) {
    var oldParentSuite, suite;
    
    suite = new Y.Primrose.Suite({
      description: description
    });

    if (parentSuite) {
      oldParentSuite = parentSuite;
      parentSuite.add(suite);
    }
    else {
      topSuite = suite;
    }

    parentSuite = suite;

    specs.call(suite);

    // set the suite back to the parent
    if (oldParentSuite) {
      parentSuite = oldParentSuite;
    }

  };

  /**
  add a block to run before each spec in the current describe subtree

  @method beforeEach
  @param {Function} before
  **/
  Y.Primrose.beforeEach = function (before) {
    parentSuite.addBefores([before]);
  };

  /**
  create a new Primrose.Spec for the current suite

  @method it
  @param {String} description
  @param {Function} specification
  **/
  Y.Primrose.it = function (description, block) {
    var spec = new Y.Primrose.Spec({ 
      description:  description,
      block:        block
    });

    parentSuite.add(spec);
  };

  /**
  add a reporter to listen for results

  @method addReporter
  @param {Reporter} reporter
  **/
  Y.Primrose.addReporter = function (reporter) {
    _reporters.push(reporter);
    reporter.observe(topSuite);
  };

  /**
  run all the suites

  @method run
  **/
  Y.Primrose.run = function () {
    Y.log('RUNNING PRIMROSE SPECS');
    Y.log('--------------------------');
    topSuite.run();
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
