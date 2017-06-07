define(["require", "exports", "esri/Map", "esri/layers/FeatureLayer", "esri/views/MapView", "esri/renderers/UniqueValueRenderer", "esri/symbols/SimpleMarkerSymbol", "esri/Color", "esri/PopupTemplate", "esri/widgets/Popup"], function (require, exports, Map, FeatureLayer, MapView, UniqueValueRenderer, SimpleMarkerSymbol, Color, PopupTemplate, Popup) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Symbol for beaches with Lifeguards
    var lifeSym = new SimpleMarkerSymbol({
        size: 14,
        color: new Color("#4AB541"),
        outline: {
            color: new Color([255, 255, 255, 0.50]),
            width: 2
        }
    });
    // Symbol for beaches without Lifeguards
    var nolifeSym = new SimpleMarkerSymbol({
        size: 14,
        color: new Color("#E17D1E"),
        outline: {
            color: new Color([255, 255, 255, 0.50]),
            width: 2
        }
    });
    /******************************************************************
     *
     * Set each unique value directly in the renderer's constructor.
     * At least one field must be used (in this case the "Lifeguards" field).
     * Good sample to check out,
     * https://developers.arcgis.com/javascript/latest/sample-code/visualization-location-types/index.html
    
    *
    ******************************************************************/
    var beachRenderer = new UniqueValueRenderer({
        defaultSymbol: lifeSym,
        defaultLabel: "Beaches with lifeguards",
        field: "Lifeguards",
        uniqueValueInfos: [{
                value: "Y",
                symbol: lifeSym,
                label: "Beaches with lifeguards"
            }, {
                value: "N",
                symbol: nolifeSym,
                label: "Beaches without lifeguards on duty"
            }]
    });
    /******************************************************************
     *
     * Popup example
     *
     ******************************************************************/
    // Step 1: Create the template
    var popupTemplate = new PopupTemplate({
        title: "<b>Beach: {NAME}</b>",
        // Step 2: Specify the content, first set the display fields
        content: [{
                type: "fields",
                fieldInfos: [{
                        fieldName: "ADDRESS",
                        visible: true,
                        label: "Address: "
                    }, {
                        fieldName: "Lifeguards",
                        visible: true,
                        label: "Lifeguards on duty: "
                    }, {
                        fieldName: "Swimming",
                        visible: true,
                        label: "Swimming allowed: "
                    }, {
                        fieldName: "Surfing",
                        visible: true,
                        label: "Surfing allowed: "
                    }, {
                        fieldName: "URL",
                        visible: true,
                        label: "Beach website with additional info: "
                    }]
            }, {
                // Step 3: Specify the second type of popup element to display, in this case, images
                // there is an "image" field in the feature service that points to an online image
                type: "media",
                mediaInfos: [{
                        type: "image",
                        value: {
                            sourceURL: "{Image}"
                        }
                    }]
            }
        ]
    });
    // Create beaches featurelayer and set the renderer on the layer
    var beaches = new FeatureLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/San_Diego_Beaches/FeatureServer/0",
        // Step 4: Specify the outfields for the featurelayer in addition to passing in the template created above
        outFields: ["*"],
        popupTemplate: popupTemplate,
        // set renderer
        renderer: beachRenderer
    });
    // Create Neighborhoods featurelayer and set opacity on layer
    var hoods = new FeatureLayer({
        url: "https://services.arcgis.com/OUDgwkiMsqiL8Tvp/arcgis/rest/services/NewSDNeighborhoods/FeatureServer/0",
        // set opacity
        opacity: 0.50,
        popupEnabled: false
    });
    var map = new Map({
        basemap: "topo",
        layers: [hoods, beaches]
    });
    var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 12,
        center: [-117.16866016384272, 32.776725339767964],
        //Step 5: Set the popup property in the MapView so that docking is enabled
        // and dockoptions are set. In this case, the popup can be docked to the
        //bottom right of the application.
        popup: new Popup({
            dockEnabled: true,
            dockOptions: {
                buttonEnabled: true,
                position: "bottom-right"
            }
        })
    });
});
//# sourceMappingURL=main.js.map