define(["require", "exports", "esri/Color", "esri/layers/FeatureLayer", "esri/Map", "esri/PopupTemplate", "esri/renderers/UniqueValueRenderer", "esri/symbols/SimpleMarkerSymbol", "esri/views/MapView", "esri/widgets/Popup"], function (require, exports, Color, FeatureLayer, Map, PopupTemplate, UniqueValueRenderer, SimpleMarkerSymbol, MapView, Popup) {
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
                type: "fields"
            }, {
                mediaInfos: [{
                        type: "image",
                        value: {
                            sourceURL: "{Image}"
                        }
                    }],
                type: "media"
            }],
        title: "<b>Beach: {NAME}</b>",
    });
    var beaches = new FeatureLayer({
        outFields: ["*"],
        popupTemplate: popupTemplate,
        renderer: beachRenderer,
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/San_Diego_Beaches/FeatureServer/0"
    });
    var hoods = new FeatureLayer({
        opacity: 0.50,
        popupEnabled: false,
        url: "https://services.arcgis.com/OUDgwkiMsqiL8Tvp/arcgis/rest/services/NewSDNeighborhoods/FeatureServer/0"
    });
    var map = new Map({
        basemap: "topo",
        layers: [hoods, beaches]
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
});
//# sourceMappingURL=main.js.map