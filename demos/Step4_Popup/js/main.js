require([
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/views/MapView",
  "esri/renderers/UniqueValueRenderer",
  "esri/PopupTemplate",
  "esri/symbols/SimpleMarkerSymbol",
  "dojo/domReady!"
], function (Map, FeatureLayer, MapView, UniqueValueRenderer, PopupTemplate, SimpleMarkerSymbol) {

  // Symbol for beaches with Lifeguards
  var lifeguardSymbol = new SimpleMarkerSymbol({
    color: "#4AB541",
    outline: { // Autocasts as new SimpleLineSymbol()
      color: [255, 255, 255, 0.50], // Autocasts as new Color()
      width: 2
    },
    size: 14
  });

  // Symbol for beaches without Lifeguards
  var noLifeguardSymbol = new SimpleMarkerSymbol({
    color: "#E17D1E",
    outline: { // Autocasts as new SimpleLineSymbol()
      color: [255, 255, 255, 0.50], // Autocasts as new Color()
      width: 2
    },
    size: 14
  });

  /******************************************************************
   *
   * Set each unique value directly in the renderer's constructor.
   * At least one field must be used (in this case the "Lifeguards" field).
   * Good sample to check out,
   * https://developers.arcgis.com/javascript/latest/sample-code/visualization-location-types/index.html
  
  *
  ******************************************************************/

  var beachRenderer = new UniqueValueRenderer({
    defaultLabel: "Beaches with lifeguards",
    defaultSymbol: lifeguardSymbol,
    field: "Lifeguards",
    uniqueValueInfos: [{
      label: "Beaches with lifeguards",
      symbol: lifeguardSymbol,
      value: "Y"
    }, {
      label: "Beaches without lifeguards on duty",
      symbol: noLifeguardSymbol,
      value: "N"
    }]
  });

  /******************************************************************
   *
   * Popup example
   *
   ******************************************************************/

  // Step 1: Create the template
  var popupTemplate = new PopupTemplate({
    // Step 2: Specify the content, first set the display fields
    content: [{
      fieldInfos: [{
        fieldName: "ADDRESS",
        visible: true,
        label: "Address: "
      }, {
        fieldName: "Lifeguards",
        visible: true,
        label: "Lifeguards on duty: "
      }, {
        fieldName: "Swimming",
        visible: true,
        label: "Swimming allowed: "
      }, {
        fieldName: "Surfing",
        visible: true,
        label: "Surfing allowed: "
      }, {
        fieldName: "URL",
        visible: true,
        label: "Beach website with additional info: "
      }],
      type: "fields"
    }, {
      // Step 3: Specify the second type of popup element to display, in this case, images
      // there is an "image" field in the feature service that points to an online image
      type: "media",
      mediaInfos: [{
        type: "image",
        value: {
          sourceURL: "{Image}"
        }
      }]
    }],
    title: "<b>Beach: {NAME}</b>"
  });

  // Create beaches featurelayer and set the renderer on the layer
  var beaches = new FeatureLayer({
    // Step 4: Specify the outfields for the featurelayer in addition to passing in the template created above
    outFields: ["*"],
    popupTemplate: popupTemplate,

    // set renderer
    renderer: beachRenderer,
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/San_Diego_Beaches/FeatureServer/0"
  });

  // Create Neighborhoods featurelayer and set opacity on layer
  var hoods = new FeatureLayer({
    // set opacity
    opacity: 0.50,
    popupEnabled: false,
    url: "https://services.arcgis.com/OUDgwkiMsqiL8Tvp/arcgis/rest/services/NewSDNeighborhoods/FeatureServer/0"
  });

  var map = new Map({
    basemap: "topo",
    layers: [hoods, beaches]
  });

  var view = new MapView({
    center: [-117.16866016384272, 32.776725339767964],
    container: "viewDiv",
    map: map,
    //Step 5: Set the popup property in the MapView so that docking is enabled
    // and dockoptions are set. In this case, the popup can be docked to the
    //bottom right of the application.
    popup: {
      dockEnabled: true,
      dockOptions: {
        buttonEnabled: true,
        position: "bottom-right"
      }
    },
    zoom: 12
  });
});
