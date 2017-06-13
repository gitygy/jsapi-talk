import * as FeatureLayer from "esri/layers/FeatureLayer";
import * as Map from "esri/Map";
import * as MapView from "esri/views/MapView";

const poi = new FeatureLayer({
    url: "http://services.arcgis.com/p7sQWBzf16BKvPsq/arcgis/rest/services/San_Diego_Places_to_Go/FeatureServer/0"
});

const hoods = new FeatureLayer({
    url: "http://services.arcgis.com/OUDgwkiMsqiL8Tvp/arcgis/rest/services/NewSDNeighborhoods/FeatureServer/0"
});

const beaches = new FeatureLayer({
    url: "http://services.arcgis.com/oxInpRhVIBxlo4pO/arcgis/rest/services/Beaches/FeatureServer/0"
});

const map = new Map({
    basemap: "topo",
    layers: [hoods, poi, beaches]
});

poi.watch("loadStatus", (status) => {
    console.log(`'${poi.title}' ${status}`);
    if (status === "failed") {
        console.log(poi.loadError);
    }
});

const view = new MapView({
    center: [-117.16866016384272, 32.776725339767964],
    container: "viewDiv",
    map,
    zoom: 12,
});
