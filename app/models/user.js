define([
  'underscore',
  'backbone',
  'backbone-localstorage'
], function(_, Backbone, backboneLocalStorage) {
  /**
   * Add basic user model
   */
  // Class: User
  var User = Backbone.Model.extend({

    // Method: initialize
    initialize: function() {

      backboneLocalStorage.setup(this, 'users');

      /*
       * Start the geolocation
       * we bind user to update funtion to have it in callback as this
       * FIXME fallback when geolocations not allowed...
       */
      this.watch = navigator.geolocation.watchPosition (
        this._updateGeoLocation.bind(this), // FIXME: Why doesn't this work without underscores?
        this._reportGeoError.bind(this), {
          enableHighAccuracy : true
        });

      // Set a timeout in case the geolocation accuracy never meets the threshold.
      this.timeout = setTimeout(this._timeoutHandler.bind(this), 60000);

    },

    setDefaults: function(defaults) {
      for(var key in defaults) {
        if(! this.get(key)) {
          this.set(key, defaults[key]);
        }
      }
    },

    /*  Method: _updateGeoLocation
     *  Update user's current geoLocation
     */
    _updateGeoLocation: function(geolocation) {
      this.set( 'geoLocation',  geolocation);
      // this.save();
      if (geolocation.coords.accuracy < 50) {
        // FIXME: do something if this offset gets to crazy
      }
    },

    _reportGeoError: function(geolocation) {
      // FIXME: console.log(geolocation);
    },

    _timeoutHandler: function(geolocation) {
      // FIXME: console.log(geolocation);
    }

  });

  /**
   * Function: User.first
   *
   * Fetches attributes for the first <User> instance from
   * localStorage and creates a new <User>, if it finds any.
   *
   * Returns:
   *   A <User> instance or undefined.
   */
  User.first = function() {
    var attrs = backboneLocalStorage.get('users').findAll()[0];
    if(attrs) {
      return new User(attrs);
    }
  };
  
  return User;
});
