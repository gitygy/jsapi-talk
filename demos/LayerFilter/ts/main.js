define(["require", "exports", "esri/Color", "esri/core/watchUtils", "esri/layers/FeatureLayer", "esri/Map", "esri/PopupTemplate", "esri/renderers/UniqueValueRenderer", "esri/symbols/SimpleMarkerSymbol", "esri/views/MapView", "esri/widgets/Popup"], function (require, exports, Color, watchUtils, FeatureLayer, Map, PopupTemplate, UniqueValueRenderer, SimpleMarkerSymbol, MapView, Popup) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var lifeSym = new SimpleMarkerSymbol({
        color: new Color("#4AB541"),
        outline: {
            color: new Color([255, 255, 255, 0.50]),
            width: 2
        },
        size: 14
    });
    var nolifeSym = new SimpleMarkerSymbol({
        color: new Color("#E17D1E"),
        outline: {
            color: new Color([255, 255, 255, 0.50]),
            width: 2
        },
        size: 14
    });
    var beachRenderer = new UniqueValueRenderer({
        defaultLabel: "Beaches with lifeguards",
        defaultSymbol: lifeSym,
        field: "Lifeguards",
        uniqueValueInfos: [{
                label: "Beaches with lifeguards",
                symbol: lifeSym,
                value: "Y"
            }, {
                label: "Beaches without lifeguards on duty",
                symbol: nolifeSym,
                value: "N"
            }]
    });
    var popupTemplate = new PopupTemplate({
        content: [{
                fieldInfos: [{
                        fieldName: "ADDRESS",
                        label: "Address: ",
                        visible: true
                    }, {
                        fieldName: "Lifeguards",
                        label: "Lifeguards on duty: ",
                        visible: true
                    }, {
                        fieldName: "Swimming",
                        label: "Swimming allowed: ",
                        visible: true
                    }, {
                        fieldName: "Surfing",
                        label: "Surfing allowed: ",
                        visible: true
                    }, {
                        fieldName: "URL",
                        label: "Beach website with additional info: ",
                        visible: true
                    }],
                title: "<b>Beach: {NAME}</b>",
                type: "fields"
            }, {
                mediaInfos: [{
                        type: "image",
                        value: {
                            sourceURL: "{Image}"
                        }
                    }],
                type: "media",
            }]
    });
    var beaches = new FeatureLayer({
        outFields: ["*"],
        popupTemplate: popupTemplate,
        renderer: beachRenderer,
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/San_Diego_Beaches/FeatureServer/0",
    });
    var hoods = new FeatureLayer({
        opacity: 0.50,
        url: "http://services.arcgis.com/OUDgwkiMsqiL8Tvp/arcgis/rest/services/NewSDNeighborhoods/FeatureServer/0"
    });
    var map = new Map({
        basemap: "topo",
        layers: [beaches, hoods]
    });
    var view = new MapView({
        center: [-117.16866016384272, 32.776725339767964],
        container: "viewDiv",
        map: map,
        popup: new Popup({
            dockEnabled: true,
            dockOptions: {
                buttonEnabled: true,
                position: "bottom-right"
            }
        }),
        zoom: 12
    });
    view.ui.add(document.getElementById("container"), "top-right");
    var hoodsLayerView;
    var featuresMap = {};
    view.whenLayerView(hoods).then(function (lyrView) {
        hoodsLayerView = lyrView;
        return watchUtils.whenFalseOnce(hoodsLayerView, "updating");
    })
        .then(function () {
        return hoodsLayerView.queryFeatures();
    })
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
//# sourceMappingURL=main.js.map