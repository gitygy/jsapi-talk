define(["require", "exports", "esri/core/watchUtils", "esri/views/MapView", "esri/WebMap", "esri/widgets/Legend"], function (require, exports, watchUtils, MapView, WebMap, Legend) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var map = new WebMap({
        portalItem: {
            id: "12843e71a82446d89a1df878312d6749"
        }
    });
    var view = new MapView({
        center: [-117.16866016384272, 32.776725339767964],
        container: "viewDiv",
        map: map,
        zoom: 12
    });
    view.ui.add(document.getElementById("container"), "top-right");
    view.then(function () {
        var beaches = map.layers.getItemAt(1);
        var legend = new Legend({
            view: view,
            layerInfos: [{
                    layer: beaches,
                    title: "San Diego beaches"
                }]
        });
        view.ui.add(legend, "bottom-right");
    });
    var hoodsLayerView;
    var featuresMap = {};
    view.then(function () {
        var hoods = map.layers.getItemAt(0);
        view.whenLayerView(hoods)
            .then(function (lyrView) {
            hoodsLayerView = lyrView;
            return watchUtils.whenFalseOnce(hoodsLayerView, "updating");
        }).then(function () { return hoodsLayerView.queryFeatures(); })
            .then(function (features) {
            features.forEach(function (feature) {
                var featureId = feature.attributes.OBJECTID_1;
                var uniqueVal = feature.attributes.NAME;
                var option = document.createElement("option");
                option.value = featureId;
                option.innerHTML = uniqueVal;
                document.getElementById("selectNeighborhood").appendChild(option);
                featuresMap[featureId] = feature;
            });
        });
        var select = document.getElementById("selectNeighborhood");
        select.onchange = function (e) {
            var featureId = select.value;
            var expr = select.value === "" ? "" : "OBJECTID_1 = '" + featureId + "'";
            hoods.definitionExpression = expr;
            view.goTo(featuresMap[featureId]);
        };
    });
});
//# sourceMappingURL=main.js.map