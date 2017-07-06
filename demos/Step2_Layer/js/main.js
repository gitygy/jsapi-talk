require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "dojo/domReady!"
], function (Map, MapView, FeatureLayer) {

  /******************************************************************
   *
   * Add featurelayers to the map example
   *
   ******************************************************************/

  var poi = new FeatureLayer({
    // POI, notice how the rendering is carried over from the service
    url: "http://services.arcgis.com/p7sQWBzf16BKvPsq/arcgis/rest/services/San_Diego_Places_to_Go/FeatureServer/0"
  });

  var hoods = new FeatureLayer({
    // Neighborhoods
    url: "http://services.arcgis.com/OUDgwkiMsqiL8Tvp/arcgis/rest/services/NewSDNeighborhoods/FeatureServer/0"
  });

  var beaches = new FeatureLayer({
    // Beaches
    url: "http://services.arcgis.com/oxInpRhVIBxlo4pO/arcgis/rest/services/Beaches/FeatureServer/0"
  });


  // Option 1: Add layer(s) to map using constructor option
  var map = new Map({
    basemap: "topo",
    layers: [hoods, poi, beaches]
  });

  //Option 2: use map.add method for single layer or addMany for multiple
  //  map.addMany([hoods, poi]);
  poi.watch("loadStatus", function (status) {
    // status types not-loaded, loading, loaded, failed
    console.log("'" + poi.title + "'" + " " + status);
    if (status === "failed") {
      console.log(poi.loadError);
    }
  });

  view = new MapView({
    center: [-117.16866016384272, 32.776725339767964],
    container: "viewDiv",
    map: map,
    zoom: 12
  });
});
