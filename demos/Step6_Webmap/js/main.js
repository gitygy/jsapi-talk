require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/tasks/support/Query",
  "esri/core/watchUtils",
  "dojo/dom-construct",
  "dojo/on",
  "dojo/dom",
  "dojo/domReady!"
], function(WebMap, MapView, Query, watchUtils, domConstruct, on, dom) {

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
    zoom: 12,
    center: [-117.16866016384272, 32.776725339767964]
  });
  view.ui.add(dom.byId("container"), "top-right");


  var hoodsLayerView;
  var featuresMap = {};

  view.then(function() {
    var hoods = map.layers.getItemAt(0);

    view.whenLayerView(hoods).then(function(lyrView) {

      hoodsLayerView = lyrView;
      // Step 2: Make sure that the layer is not updating and currently fetching data
      return watchUtils.whenFalseOnce(hoodsLayerView, "updating");
    })
      .then(function() {
        // Step 3: Query all features in the layerview and return the results
        return hoodsLayerView.queryFeatures();
      })
      .then(function(features) {
        // Step 4: Build a dropdown for each unique value in Neighborhood field
        features.forEach(function(feature) {
          var featureId = feature.attributes.OBJECTID_1;
          var uniqueVal = feature.attributes.NAME;
          domConstruct.create("option", {
            value: featureId,
            innerHTML: uniqueVal
          }, "selectNeighborhood");

          featuresMap[featureId] = feature;
        });
      });

    // Step 4: Listen for the change event on the dropdown
    // and set the layer's definition expression to the chosen value
    var select = dom.byId("selectNeighborhood");
    on(select, "change", function(e) {
      var featureId = select.value;
      var expr = select.value === "" ? "" : "OBJECTID_1 = '" + featureId + "'";
      hoods.definitionExpression = expr;

      // Navigate to the selected feature;
      view.goTo(featuresMap[featureId]);
    });

  });
});
