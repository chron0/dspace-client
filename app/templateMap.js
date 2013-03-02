define([
  'hbs!templates/mapContext',
  'hbs!templates/featureBoxItem',
  'hbs!templates/featureInfoModal',
  'hbs!templates/userOptionModal',
  'hbs!templates/widgetOptions',
  'hbs!templates/statusPanel',
  'hbs!templates/featureOptionModal',
  'hbs!templates/controlPanel',
  'hbs!templates/widgetBar',
  'hbs!templates/addFeature',
  'hbs!templates/featureDetails',
  'hbs!templates/featureBox',
  'hbs!templates/featureTab'
], function(mapContext, featureBoxItem, featureInfoModal, userOptionModal, widgetOptions, statusPanel, featureOptionModal, controlPanel, widgetBar, addFeature, featureDetails, featureBox, featureTab) {

  return {
    mapContext: mapContext,
    featureBoxItem: featureBoxItem,
    featureInfoModal: featureInfoModal,
    userOptionModal: userOptionModal,
    widgetOptions: widgetOptions,
    statusPanel: statusPanel,
    featureOptionModal: featureOptionModal,
    controlPanel: controlPanel,
    widgetBar: widgetBar,
    addFeature: addFeature,
    featureDetails: featureDetails,
    featureBox: featureBox,
    featureTab: featureTab
  };

});
