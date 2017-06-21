require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/tasks/support/Query",
  "esri/core/watchUtils",
  "dojo/dom-construct",
  "dojo/on",
  "dojo/dom",
  "dojo/domReady!"
], function (WebMap, MapView, Query, watchUtils, domConstruct, on, dom) {

  /******************************************************************
   *
   * Webmap example
   *
   ******************************************************************/

  // Step 1: Pass a webmap instance to the map and specify the id for the webmap item
  var map = new WebMap({
    portalItem: { // autocast (no need to specifically require it above)
      id: "12843e71a82446d89a1df878312d6749"
    }
  });

  var view = new MapView({
    container: "viewDiv",
    // Step 2: Set the view's map to that of the specified webmap above
    map: map,
    zoom: 12
  });

});