var assert = require('assert');
var ripple = require('ripple');
var computed = require('computed');

describe('computed', function(){
  var View, state;

  beforeEach(function () {
    View = ripple('<div></div>').use(computed());
  });

  it('should be able to do computed properties', function(){
    View.computed('three', ['one', 'two'], function(){
      return this.get('one') + this.get('two')
    });
    view = new View({
      one: 1,
      two: 2
    });
    assert(view.get('three') === 3);
  })

  it('should pass the values through to the callback', function(){
    View.computed('three', ['one', 'two'], function(one, two){
      return one + two;
    });
    view = new View({
      one: 1,
      two: 2
    });
    view.set('two', 3);
    assert(view.get('three') === 4);
  })

  it('should emit change events for computed properties', function(done){
    View.computed('three', ['one', 'two'], function(one, two){
      return one + two;
    });
    view = new View({
      one: 1,
      two: 2
    });
    view.watch('three', function(change){
      assert(change === 4);
      done();
    });
    view.set('one', 2);
  })

  it.skip('should be able to do computed properties without explicit deps', function(done){
    View.computed('three', function(){
      return this.get('one') + this.get('two')
    });
    view = new View({
      data: {
        one: 1,
        two: 2
      }
    });
    view.watch('three', function(change){
      assert(change === 4);
      done();
    });
    view.set('one', 2);
  })

  it.skip('should get properties as normal', function(){
    view = new View({
      foo: 'bar'
    });
    assert( view.get('foo') === 'bar' );
  })

});