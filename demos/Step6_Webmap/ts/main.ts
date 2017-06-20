import * as watchUtils from "esri/core/watchUtils";
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
view.ui.add(document.getElementById("container"), "top-right");

let hoodsLayerView: __esri.FeatureLayerView;
const featuresMap = {};

view.then(() => {
    const hoods = map.layers.getItemAt(0);

    view.whenLayerView(hoods)
        .then((lyrView) => {
            hoodsLayerView = lyrView;
            return watchUtils.whenFalseOnce(hoodsLayerView, "updating");
        })
        .then(() => hoodsLayerView.queryFeatures())
        .then((features) => {
            features.forEach((feature: __esri.Graphic) => {
                const featureId = feature.attributes.OBJECTID_1;
                const uniqueVal = feature.attributes.NAME;
                const option = document.createElement("option");
                option.value = featureId;
                option.innerHTML = uniqueVal;
                document.getElementById("selectNeighborhood").appendChild(option);
                featuresMap[featureId] = feature;
            });
        });

    const select = document.getElementById("selectNeighborhood") as HTMLInputElement;
    select.onchange = (e) => {
        const featureId = select.value;
        const expr = select.value === "" ? "" : "OBJECTID_1 = '" + featureId + "'";
        hoods.definitionExpression = expr;
        view.goTo(featuresMap[featureId]);
    };
});
