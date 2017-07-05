import * as Map from "esri/Map";
import * as MapView from "esri/views/MapView";

const map = new Map({
    basemap: "dark-gray"
});

const view = new MapView({
    center: [-117.16866016384272, 32.776725339767964],
    container: "viewDiv",
    map,
    zoom: 12,
});
