define([
  'views/modal/base',
  'templateMap',

], function(BaseModal, templates) {

  /**
   * Class: Modal.FeatureDetails
   */
  var widgetOptions = BaseModal.extend({

    template: templates.widgetOptions,

    events: {
      'click *[data-command=close]': 'close'
    },

    initialize: function(options) {

    },

    close: function() {
      this.trigger('close');
    }

  });

  return widgetOptions;

});
