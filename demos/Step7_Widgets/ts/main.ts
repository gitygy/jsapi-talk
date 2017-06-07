import * as watchUtils from "esri/core/watchUtils";
import * as MapView from "esri/views/MapView";
import * as WebMap from "esri/WebMap";
import * as Legend from "esri/widgets/Legend";

const map = new WebMap({
    portalItem: { // autocast
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
/******************************************************************
 *
 * Widget example - Add legend widget
 *
 ******************************************************************/

view.then(() => {
    const beaches = map.layers.getItemAt(1);
    // Step 1: Create the widget
    const legend = new Legend({
        // Step 2: Specify any additional properties for the legend. In this case,
        // we are just setting the view to where the legend should apply
        view,
        layerInfos: [{
            layer: beaches,
            title: "San Diego beaches"
        }]
    });
    // Step 3: Add the widget to the view's UI, specify the docking position as well
    view.ui.add(legend, "bottom-right");
});
let hoodsLayerView: __esri.FeatureLayerView;
const featuresMap = {};

view.then(() => {
    const hoods = map.layers.getItemAt(0);

    view.whenLayerView(hoods)
        .then((lyrView) => {
            hoodsLayerView = lyrView;
            // Make sure that the layer is not updating and currently fetching data
            return watchUtils.whenFalseOnce(hoodsLayerView, "updating");
        }).then(() => hoodsLayerView.queryFeatures())
        .then((features) => {
            //  Build a dropdown for each unique value in Neighborhood field
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

    // Listen for the change event on the dropdown
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
