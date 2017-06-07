import * as Map from "esri/Map";
import * as MapView from "esri/views/MapView";

/******************************************************************
 *
 * Set the initial map and zoom/center example
 *
 ******************************************************************/

// Create a basemap and set properties in map constructor. Try changing to various basemaps
// streets, satellite, hybrid, topo, gray, dark-gray, oceans, national-geographic, terrain
// osm, dark-gray-vector, gray-vector, streets-vector, topo-vector, streets-night-vector
// streets-relief-vector, streets-navigation-vector

const map = new Map({
    basemap: "dark-gray"
});

const view = new MapView({
    center: [-117.16866016384272, 32.776725339767964],
    container: "viewDiv",
    map,
    zoom: 12,
});
