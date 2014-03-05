var assert = require('assert');
var model = require('model');
var computed = require('computed');

describe('computed', function(){
  var Model;

  beforeEach(function () {
    Model = model().use(computed);
  });

  it('should be able to do computed properties', function(){
    Model.computed('three', ['one', 'two'], function(){
      return this.get('one') + this.get('two')
    });
    model = new Model({
      one: 1,
      two: 2
    });
    assert(model.get('three') === 3);
  })

  it('should pass the values through to the callback', function(){
    Model.computed('three', ['one', 'two'], function(one, two){
      return one + two;
    });
    model = new Model({
      one: 1,
      two: 2
    });
    model.set('two', 3);
    assert(model.get('three') === 4);
  })

  it('should emit change events for computed properties', function(done){
    Model.computed('three', ['one', 'two'], function(){
      return this.get('one') + this.get('two')
    });
    model = new Model({
      one: 1,
      two: 2
    });
    model.change('three', function(change){
      assert(change === 4);
      done();
    });
    model.set('one', 2);
  })

  it('should be able to do computed properties without explicit deps', function(done){
    Model.computed('three', function(){
      return this.get('one') + this.get('two')
    });
    model = new Model({
      one: 1,
      two: 2
    });
    model.change('three', function(change){
      assert(change === 4);
      done();
    });
    model.set('one', 2);
  })

  it('should get properties as normal', function(){
    model = new Model({ 'foo' : 'bar' });
    assert( model.get('foo') === 'bar' );
  })

});