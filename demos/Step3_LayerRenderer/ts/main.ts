import * as Color from "esri/Color";
import * as FeatureLayer from "esri/layers/FeatureLayer";
import * as Map from "esri/Map";
import * as UniqueValueRenderer from "esri/renderers/UniqueValueRenderer";
import * as SimpleMarkerSymbol from "esri/symbols/SimpleMarkerSymbol";
import * as MapView from "esri/views/MapView";

const lifeSym = new SimpleMarkerSymbol({
    color: new Color("#4AB541"),
    outline: {
        color: new Color([255, 255, 255, 0.50]),
        width: 2
    },
    size: 14
});

const nolifeSym = new SimpleMarkerSymbol({
    color: new Color("#E17D1E"),
    outline: {
        color: new Color([255, 255, 255, 0.50]),
        width: 2
    },
    size: 14
});

const beachRenderer = new UniqueValueRenderer({
    defaultLabel: "Beaches with lifeguards",
    defaultSymbol: lifeSym,
    field: "Lifeguards",
    uniqueValueInfos: [{
        label: "Beaches with lifeguards",
        symbol: lifeSym,
        value: "Y"
    }, {
        label: "Beaches without lifeguards",
        symbol: nolifeSym,
        value: "N"
    }]
});

const beaches = new FeatureLayer({
    renderer: beachRenderer,
    url: "http://services.arcgis.com/oxInpRhVIBxlo4pO/arcgis/rest/services/Beaches/FeatureServer/0",
});

const hoods = new FeatureLayer({
    opacity: 0.50,
    url: "http://services.arcgis.com/OUDgwkiMsqiL8Tvp/arcgis/rest/services/NewSDNeighborhoods/FeatureServer/0"
});

const map = new Map({
    basemap: "topo",
    layers: [hoods, beaches]
});

const view = new MapView({
    center: [-117.16866016384272, 32.776725339767964],
    container: "viewDiv",
    map,
    zoom: 12
});
