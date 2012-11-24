Primrose
========

BDD speccing framework for YUI

# Writing a spec
```JavaScript
YUI.add('user-spec', function (Y) {
  var P           = Y.Primrose,
      describe    = P.describe,
      it          = P.it,
      beforeEach  = P.beforeEach;

  describe('User', function () {

    var subject;

    beforeEach(function () {
      subject = new Y.User({ 
        firstname: 'Simon', 
        lastname: 'Højberg' 
      });
    });

    describe('name', function () {
      it('combines first and last names', function (expect) {
        expect( subject.get('name') ).toBe( 'Simon Højberg' );
      });
    });

  });

}, '0.0.1', { requires: ['user' /* module to test */, 'primrose'] });
```

# Running all specs
```JavaScript
YUI().use('user-spec', 'primrose', 'primrose-log-reporter', function (Y) {

  // Set a reporter
  Y.Primrose.addReporter(new Y.Primrose.LogReporter());

  // Run the specs
  Y.Primrose.run();

});
```
