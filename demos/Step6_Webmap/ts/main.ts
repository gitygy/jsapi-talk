import * as WebMap from "esri/WebMap";
import * as MapView from "esri/views/MapView";
import * as Query from "esri/tasks/support/Query";
import * as watchUtils from "esri/core/watchUtils";

/******************************************************************
 *
 * Webmap example
 *
 ******************************************************************/

// Step 1: Pass a webmap instance to the map and specify the id for the webmap item
var map = new WebMap({
    portalItem: { // autocast (no need to specifically require it above)
        id: "12843e71a82446d89a1df878312d6749"
    }
});

var view = new MapView({
    container: "viewDiv",
    // Step 2: Set the view's map to that of the specified webmap above
    map: map,
    zoom: 12,
    center: [-117.16866016384272, 32.776725339767964]
});
view.ui.add(document.getElementById("container"), "top-right");


var hoodsLayerView: __esri.FeatureLayerView;
var featuresMap = {};

view.then(() => {
    var hoods = map.layers.getItemAt(0);

    view.whenLayerView(hoods).then(function(lyrView) {

        hoodsLayerView = lyrView;
        // Step 2: Make sure that the layer is not updating and currently fetching data
        return watchUtils.whenFalseOnce(hoodsLayerView, "updating");
    })
        .then(function() {
        // Step 3: Query all features in the layerview and return the results
        return hoodsLayerView.queryFeatures();
        })
        .then(function(features) {
        // Step 4: Build a dropdown for each unique value in Neighborhood field
        features.forEach(function(feature: __esri.Graphic) {
            var featureId = feature.attributes.OBJECTID_1;
            var uniqueVal = feature.attributes.NAME;
            const option = document.createElement("option");
            option.value = featureId;
            option.innerHTML = uniqueVal;
            document.getElementById("selectNeighborhood").appendChild(option);

            featuresMap[featureId] = feature;
        });
        });

    // Step 4: Listen for the change event on the dropdown
    // and set the layer's definition expression to the chosen value
    var select = document.getElementById("selectNeighborhood") as HTMLInputElement;
    select.onchange = (e) => {        
        var featureId = select.value;
        var expr = select.value === "" ? "" : "OBJECTID_1 = '" + featureId + "'";
        hoods.definitionExpression = expr;

        // Navigate to the selected feature;
        view.goTo(featuresMap[featureId]);
    };
});
