Primrose
========

BDD speccing framework for YUI

# Writing a spec
```JavaScript
YUI.add('user-spec', function (Y) {

  Y.Primrose.describe('User', function () {

    var subject;

    this.before(function () {
      subject = new Y.User({ 
        firstname: 'Simon', 
        lastname: 'Højberg' 
      });
    });

    this.describe('name', function () {
      this.it('combines first and last names', function () {
        this.expect( subject.get('name') ).toBe( 'Simon Højberg' );
      });
    });

  });

}, '0.0.1', { requires: ['user' /* module to test */, 'primrose'] });
```

# Running all specs
```JavaScript
YUI().use('user-spec', 'primrose', function (Y) {

  // Set a reporter
  Y.Primrose.reportToHTML('body');
  // Run the specs
  Y.Primrose.run();

});
```
