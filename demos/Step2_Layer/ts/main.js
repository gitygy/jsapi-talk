define(["require", "exports", "esri/layers/FeatureLayer", "esri/Map", "esri/views/MapView"], function (require, exports, FeatureLayer, Map, MapView) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var poi = new FeatureLayer({
        url: "http://services.arcgis.com/p7sQWBzf16BKvPsq/arcgis/rest/services/San_Diego_Places_to_Go/FeatureServer/0"
    });
    var hoods = new FeatureLayer({
        url: "http://services.arcgis.com/OUDgwkiMsqiL8Tvp/arcgis/rest/services/NewSDNeighborhoods/FeatureServer/0"
    });
    var beaches = new FeatureLayer({
        url: "http://services.arcgis.com/oxInpRhVIBxlo4pO/arcgis/rest/services/Beaches/FeatureServer/0"
    });
    var map = new Map({
        basemap: "topo",
        layers: [hoods, poi, beaches]
    });
    poi.watch("loadStatus", function (status) {
        console.log("'" + poi.title + "'" + " " + status);
        if (status === "failed") {
            console.log(poi.loadError);
        }
    });
    var view = new MapView({
        center: [-117.16866016384272, 32.776725339767964],
        container: "viewDiv",
        map: map,
        zoom: 12,
    });
});
//# sourceMappingURL=main.js.map