import * as MapView from "esri/views/MapView";
import * as WebMap from "esri/WebMap";
import * as Legend from "esri/widgets/Legend";

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

view.then(() => {
    const beaches = map.layers.getItemAt(1);
    const legend = new Legend({
        view,
        layerInfos: [{
            layer: beaches,
            title: "San Diego beaches"
        }]
    });
    view.ui.add(legend, "bottom-right");
});
