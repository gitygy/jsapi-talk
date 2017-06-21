require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Legend",
  "dojo/domReady!"
], function (WebMap, MapView, Legend) {

  var map = new WebMap({
    portalItem: { // autocast
      id: "12843e71a82446d89a1df878312d6749"
    }
  });

  var view = new MapView({
    center: [-117.16866016384272, 32.776725339767964],
    container: "viewDiv",
    map: map,
    zoom: 12
  });


  /******************************************************************
   *
   * Widget example - Add legend widget
   *
   ******************************************************************/

  view.then(function () {
    var beaches = map.layers.getItemAt(1);
    // Step 1: Create the widget
    var legend = new Legend({
      // Step 2: Specify any additional properties for the legend. In this case,
      // we are just setting the view to where the legend should apply
      view: view,
      layerInfos: [{
        layer: beaches,
        title: "San Diego beaches"
      }]
    });
    // Step 3: Add the widget to the view's UI, specify the docking position as well
    view.ui.add(legend, "bottom-right");
  });

});