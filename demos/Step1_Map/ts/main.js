define(["require", "exports", "esri/Map", "esri/views/MapView"], function (require, exports, Map, MapView) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /******************************************************************
     *
     * Set the initial map and zoom/center example
     *
     ******************************************************************/
    // Create a basemap and set properties in map constructor. Try changing to various basemaps
    // streets, satellite, hybrid, topo, gray, dark-gray, oceans, national-geographic, terrain
    // osm, dark-gray-vector, gray-vector, streets-vector, topo-vector, streets-night-vector
    // streets-relief-vector, streets-navigation-vector
    var map = new Map({
        basemap: "dark-gray"
    });
    var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 12,
        center: [-117.16866016384272, 32.776725339767964]
    });
});
//# sourceMappingURL=main.js.map