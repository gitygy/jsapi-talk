import * as MapView from "esri/views/MapView";
import * as WebMap from "esri/WebMap";

const map = new WebMap({
    portalItem: {
        id: "12843e71a82446d89a1df878312d6749"
    }
});

const view = new MapView({
    center: [-117.16866016384272, 32.776725339767964],
    container: "viewDiv",
    map,
    zoom: 12
});
