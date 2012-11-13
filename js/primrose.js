YUI.add('primrose', function (Y) { 

  Y.namespace('Primrose');

  var topSuites = [],
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
      topSuites.push(suite);
    }

    parentSuite = suite;

    specs.call(suite);

    // set the suite back to the parent
    if (oldParentSuite) {
      if (Y.Array.indexOf(topSuites, oldParentSuite)) {
        parentSuite = suite;
      }
      else {
        parentSuite = oldParentSuite;
      }
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
    Y.Array.each(topSuites, function (suite) {
      reporter.observe(suite);
    });
  };

  /**
  run all the suites

  @method run
  **/
  Y.Primrose.run = function () {
    Y.log('RUNNING PRIMROSE SPECS');
    Y.log('--------------------------');
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
