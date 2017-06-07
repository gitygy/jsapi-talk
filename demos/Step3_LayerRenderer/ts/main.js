define(["require", "exports", "esri/Map", "esri/layers/FeatureLayer", "esri/views/MapView", "esri/renderers/UniqueValueRenderer", "esri/symbols/SimpleMarkerSymbol", "esri/Color"], function (require, exports, Map, FeatureLayer, MapView, UniqueValueRenderer, SimpleMarkerSymbol, Color) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /******************************************************************
     *
     * LayerRenderer example
     *
     ******************************************************************/
    // Step 1: Create individual symbols to represent each unique value
    // Symbol for beaches with Lifeguards
    var lifeSym = new SimpleMarkerSymbol({
        size: 14,
        color: new Color("#4AB541"),
        outline: {
            color: new Color([255, 255, 255, 0.50]),
            width: 2
        }
    });
    // Symbol for beaches without Lifeguards
    var nolifeSym = new SimpleMarkerSymbol({
        size: 14,
        color: new Color("#E17D1E"),
        outline: {
            color: new Color([255, 255, 255, 0.50]),
            width: 2
        }
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
        defaultSymbol: lifeSym,
        defaultLabel: "Beaches with lifeguards",
        field: "Lifeguards",
        uniqueValueInfos: [{
                value: "Y",
                symbol: lifeSym,
                label: "Beaches with lifeguards"
            }, {
                value: "N",
                symbol: nolifeSym,
                label: "Beaches without lifeguards"
            }]
    });
    // Step 2: Create the feature layer(s) and set the renderer in the layer constructor(s)
    // Create beaches featurelayer and set the renderer on the layer
    var beaches = new FeatureLayer({
        url: "http://services.arcgis.com/oxInpRhVIBxlo4pO/arcgis/rest/services/Beaches/FeatureServer/0",
        // set renderer
        renderer: beachRenderer
    });
    // Create Neighborhoods featurelayer and set opacity on layer
    var hoods = new FeatureLayer({
        url: "http://services.arcgis.com/OUDgwkiMsqiL8Tvp/arcgis/rest/services/NewSDNeighborhoods/FeatureServer/0",
        // set opacity
        opacity: 0.50
    });
    // Step 3: Pass in an array of layers to the map's constructor
    var map = new Map({
        basemap: "topo",
        layers: [hoods, beaches]
    });
    // Step 4: Create the View and assign a container 'div' and pass in the map from above. Optionally, specify zoom/center
    var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 12,
        center: [-117.16866016384272, 32.776725339767964]
    });
});
//# sourceMappingURL=main.js.map