module.exports = function(View) {

  /**
   * Stores dependencies being tracked
   */
  var tracking;


  /**
   * Store the previous get method. We'll
   * override it so we can track the dependencies
   *
   * @type {Function}
   */
  var get = View.prototype.get;


  /**
   * Start tracking calls to .get
   *
   * @return {Array}
   */
  function track(){
    tracking = [];
    return tracking;
  }


  /**
   * Stop tracking calls to .get
   *
   * @return {void}
   */
  function stopTracking(){
    tracking = null;
  }


  /**
   * Set an attribute to be computed and automatically
   * update when other keys are updated
   *
   * @param {String} key
   * @param {Array} dependencies
   * @param {Function} fn
   *
   * @return {View}
   */
  View.computed = function(name, dependencies, fn) {
    var args = arguments;
    View.created(function(){
      var self = this;
      if(args.length === 2) {
        fn = args[1];
        dependencies = track();
        fn.call(self);
        stopTracking();
        var update = function() {
          self.set(name, fn.call(self));
        };
      }
      else {
        var update = function() {
          var values = dependencies.map(self.get.bind(self));
          self.set(name, fn.apply(self, values));
        };
      }
      self.watch(dependencies, update);
      update();
    });
    return this;
  };


  /**
   * Override the get method to track dependecies
   * so we can guess what the computed property needs.
   *
   * @param {String} prop
   */
  View.prototype.get = function(prop){
    if(tracking) tracking.push(prop);
    return get.apply(this, arguments);
  };

}