Y.namespace('Primrose');

var topSuites = [],
    parent,
    _reporters = [];

/**
create a new Primrose.Suite and sub suites/specs

@method describe
**/
Y.Primrose.describe = function (description, specs) {
  var oldParent, suite;
  
  suite = new Y.Primrose.Suite({
    description: description
  });

  if (parent) {
    oldParent = parent;
    parent.add(suite);
  }
  else {
    topSuites.push(suite);
  }

  // specs will be added to the parent
  parent = suite;

  // add specs to suite
  specs.call(suite);

  // move out a step again
  if (!oldParent) {
    if (Y.Array.indexOf(topSuites, parent) !== -1) {
      parent = null;
    }
    else {
      parent = oldParent;
    }
  }

};

/**
add a block to run before each spec in the current describe subtree

@method beforeEach
@param {Function} before
**/
Y.Primrose.beforeEach = function (before) {
  if (!parent) {
    throw new Error('"beforeEach" was defined out side of a `describe`');
  }

  parent.addBefores([before]);
};

/**
create a new Primrose.Spec for the current suite

@method it
@param {String} description
@param {Function} specification
**/
Y.Primrose.it = function (description, block) {
  if (!parent) {
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

  parent.add(spec);
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
