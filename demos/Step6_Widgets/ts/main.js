define(["require", "exports", "esri/views/MapView", "esri/WebMap", "esri/widgets/Legend"], function (require, exports, MapView, WebMap, Legend) {
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
});
//# sourceMappingURL=main.js.map