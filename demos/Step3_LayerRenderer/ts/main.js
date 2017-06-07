define(["require", "exports", "esri/Color", "esri/layers/FeatureLayer", "esri/Map", "esri/renderers/UniqueValueRenderer", "esri/symbols/SimpleMarkerSymbol", "esri/views/MapView"], function (require, exports, Color, FeatureLayer, Map, UniqueValueRenderer, SimpleMarkerSymbol, MapView) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var lifeSym = new SimpleMarkerSymbol({
        color: new Color("#4AB541"),
        outline: {
            color: new Color([255, 255, 255, 0.50]),
            width: 2
        },
        size: 14
    });
    var nolifeSym = new SimpleMarkerSymbol({
        color: new Color("#E17D1E"),
        outline: {
            color: new Color([255, 255, 255, 0.50]),
            width: 2
        },
        size: 14
    });
    var beachRenderer = new UniqueValueRenderer({
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
    var beaches = new FeatureLayer({
        renderer: beachRenderer,
        url: "http://services.arcgis.com/oxInpRhVIBxlo4pO/arcgis/rest/services/Beaches/FeatureServer/0",
    });
    var hoods = new FeatureLayer({
        opacity: 0.50,
        url: "http://services.arcgis.com/OUDgwkiMsqiL8Tvp/arcgis/rest/services/NewSDNeighborhoods/FeatureServer/0"
    });
    var map = new Map({
        basemap: "topo",
        layers: [hoods, beaches]
    });
    var view = new MapView({
        center: [-117.16866016384272, 32.776725339767964],
        container: "viewDiv",
        map: map,
        zoom: 12
    });
});
//# sourceMappingURL=main.js.map