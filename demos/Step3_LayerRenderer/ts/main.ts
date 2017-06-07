import * as Color from "esri/Color";
import * as FeatureLayer from "esri/layers/FeatureLayer";
import * as Map from "esri/Map";
import * as UniqueValueRenderer from "esri/renderers/UniqueValueRenderer";
import * as SimpleMarkerSymbol from "esri/symbols/SimpleMarkerSymbol";
import * as MapView from "esri/views/MapView";


/******************************************************************
 *
 * LayerRenderer example
 *
 ******************************************************************/

// Step 1: Create individual symbols to represent each unique value

// Symbol for beaches with Lifeguards
const lifeSym = new SimpleMarkerSymbol({
    color: new Color("#4AB541"),
    outline: { // Autocasts as new SimpleLineSymbol()
        color: new Color([255, 255, 255, 0.50]), // Autocasts as new Color()
        width: 2
    },
    size: 14
});

// Symbol for beaches without Lifeguards
const nolifeSym = new SimpleMarkerSymbol({
    color: new Color("#E17D1E"),
    outline: { // Autocasts as new SimpleLineSymbol()
        color: new Color([255, 255, 255, 0.50]), // Autocasts as new Color()
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

const beachRenderer = new UniqueValueRenderer({
    defaultLabel: "Beaches with lifeguards",
    defaultSymbol: lifeSym,
    field: "Lifeguards",
    uniqueValueInfos: [{
        label: "Beaches with lifeguards",
        symbol: lifeSym,
        value: "Y" // attribute value for features with lifeguards
    }, {
        label: "Beaches without lifeguards",
        symbol: nolifeSym,
        value: "N" // attribute value for features without lifeguards
    }]
});

// Step 2: Create the feature layer(s) and set the renderer in the layer constructor(s)

// Create beaches featurelayer and set the renderer on the layer
const beaches = new FeatureLayer({
    // set renderer
    renderer: beachRenderer,
    url: "http://services.arcgis.com/oxInpRhVIBxlo4pO/arcgis/rest/services/Beaches/FeatureServer/0",
});

// Create Neighborhoods featurelayer and set opacity on layer
const hoods = new FeatureLayer({
    // set opacity
    opacity: 0.50,
    url: "http://services.arcgis.com/OUDgwkiMsqiL8Tvp/arcgis/rest/services/NewSDNeighborhoods/FeatureServer/0"
});

// Step 3: Pass in an array of layers to the map's constructor
const map = new Map({
    basemap: "topo",
    layers: [hoods, beaches]
});

// Step 4: Create the View and assign a container 'div' and pass in the map from above. Optionally, specify zoom/center
const view = new MapView({
    center: [-117.16866016384272, 32.776725339767964],
    container: "viewDiv",
    map,
    zoom: 12
});
