module.exports = function() {
  return function(View) {

    /**
     * Set an attribute to be computed and automatically
     * update when other keys are updated
     *
     * @param {String} key
     * @param {Array} attrs
     * @param {Function} fn
     *
     * @return {View}
     */

    View.computed = function(name, attrs, fn) {
      View.on('created', function(view){
        function update() {
          var values = attrs.map(view.get.bind(view));
          view.set(name, fn.apply(view, values));
        }
        view.watch(attrs, update);
        update();
      });
      return this;
    };

  };
}