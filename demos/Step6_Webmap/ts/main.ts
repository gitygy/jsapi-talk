import * as watchUtils from "esri/core/watchUtils";
import * as MapView from "esri/views/MapView";
import * as WebMap from "esri/WebMap";

/******************************************************************
 *
 * Webmap example
 *
 ******************************************************************/

// Step 1: Pass a webmap instance to the map and specify the id for the webmap item
const map = new WebMap({
    portalItem: { // autocast (no need to specifically require it above)
        id: "12843e71a82446d89a1df878312d6749"
    }
});

const view = new MapView({
    center: [-117.16866016384272, 32.776725339767964],
    container: "viewDiv",
    // Step 2: Set the view's map to that of the specified webmap above
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
            // Step 2: Make sure that the layer is not updating and currently fetching data
            return watchUtils.whenFalseOnce(hoodsLayerView, "updating");
        })
        .then(() => hoodsLayerView.queryFeatures())
        .then((features) => {
            // Step 4: Build a dropdown for each unique value in Neighborhood field
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

    // Step 4: Listen for the change event on the dropdown
    // and set the layer's definition expression to the chosen value
    const select = document.getElementById("selectNeighborhood") as HTMLInputElement;
    select.onchange = (e) => {
        const featureId = select.value;
        const expr = select.value === "" ? "" : "OBJECTID_1 = '" + featureId + "'";
        hoods.definitionExpression = expr;

        // Navigate to the selected feature;
        view.goTo(featuresMap[featureId]);
    };
});
