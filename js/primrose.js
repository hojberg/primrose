YUI.add('primrose', function (Y) { 

  Y.namespace('Primrose');

  var currentSuite,
      currentSpec;

  /**
  create a new Primrose.Suite and sub suites/specs

  @method describe
  **/
  Y.Primrose.describe = function (description, specs) {
    var suite = new Y.Primrose.Suite({
      description: description
    });

    specs.call(suite);
  };

  /**
  create a new Primrose.Spec for the current suite

  @method it
  **/
  Y.Primrose.it = function (name, specification) {
    var spec = new Y.Primrose.Spec({ 
      name: name
    });

    currentSpec = spec;

    specification.call(spec);
  };

  /**
  create a new Primrose.Expectation for the current spec

  @method expect
  **/
  Y.Primrose.expect = function (subject) {
    return currentSpec.expect( subject );
  };

  /**
  run all the suites

  @method run
  **/
  Y.Primrose.run = function () {
    // currently just run the currentSpec
    return currentSpec.run();
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
