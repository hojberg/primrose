(function () {
  Y.namespace('Primrose');

  var topSuites   = [],
      _reporters  = [],
      ancestor;

  // create top level ancestor
  // TODO: remove top level
  ancestor = new Y.Primrose.Suite({
    description: 'Primrose specs'
  });

  topSuites.push(ancestor);

  /**
  create a new Primrose.Suite and sub suites/specs

  @method describe
  @param {String} description
  @param {Function} block the describe block
  **/
  Y.Primrose.describe = function (description, block) {
    var suite = new Y.Primrose.Suite({
      description: description
    });

    ancestor.add(suite);

    ancestor = (function () {
      var old = ancestor;

      ancestor = suite;

      block.call(suite);

      return old;
    }());

    return suite;

  };

  /**
  add a block to run before each spec in the current describe subtree

  @method beforeEach
  @param {Function} before
  **/
  Y.Primrose.beforeEach = function (before) {
    if (!ancestor) {
      throw new Error('"beforeEach" was defined out side of a `describe`');
    }

    ancestor.addBefores([before]);
  };

  /**
  create a new Primrose.Spec for the current suite

  @method it
  @param {String} description
  @param {Function} specification
  **/
  Y.Primrose.it = function (description, block) {
    if (!ancestor) {
      throw new Error([
        '"it',
        description + '"',
        'was defined out side of a `describe`'
      ].join(' '));
    }

    var spec = new Y.Primrose.Spec({
      description:  description,
      block:        block
    });

    ancestor.add(spec);
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
    var startTime = new Date(),
        duration;

    Y.message('Running Primrose specs');
    Y.message('--------------------------');

    Y.Array.invoke(topSuites, 'run');
    
    duration = new Date() - startTime;

    Y.message('--------------------------');
    Y.message('Completed Primrose specs in: ' + duration + 'ms');
  };
}());
