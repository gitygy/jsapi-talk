import * as Color from "esri/Color";
import * as watchUtils from "esri/core/watchUtils";
import * as FeatureLayer from "esri/layers/FeatureLayer";
import * as Map from "esri/Map";
import * as PopupTemplate from "esri/PopupTemplate";
import * as UniqueValueRenderer from "esri/renderers/UniqueValueRenderer";
import * as SimpleMarkerSymbol from "esri/symbols/SimpleMarkerSymbol";
import * as MapView from "esri/views/MapView";
import * as Popup from "esri/widgets/Popup";

const lifeSym = new SimpleMarkerSymbol({
  color: new Color("#4AB541"),
  outline: {
    color: new Color([255, 255, 255, 0.50]),
    width: 2
  },
  size: 14
});

const nolifeSym = new SimpleMarkerSymbol({
  color: new Color("#E17D1E"),
  outline: {
    color: new Color([255, 255, 255, 0.50]),
    width: 2
  },
  size: 14
});

const beachRenderer = new UniqueValueRenderer({
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

const popupTemplate = new PopupTemplate({
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

const beaches = new FeatureLayer({
  outFields: ["*"],
  popupTemplate,
  renderer: beachRenderer,
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/San_Diego_Beaches/FeatureServer/0",
});

const hoods = new FeatureLayer({
  opacity: 0.50,
  url: "http://services.arcgis.com/OUDgwkiMsqiL8Tvp/arcgis/rest/services/NewSDNeighborhoods/FeatureServer/0"
});

const map = new Map({
  basemap: "topo",
  layers: [beaches, hoods]
});

const view = new MapView({
  center: [-117.16866016384272, 32.776725339767964],
  container: "viewDiv",
  map,
  popup: new Popup({
    dockEnabled: true,
    dockOptions: {
      buttonEnabled: true,
      position: "bottom-right"
    } as __esri.PopupDockOptions
  }),
  zoom: 12
});
view.ui.add(document.getElementById("container"), "top-right");

let hoodsLayerView: __esri.FeatureLayerView;
const featuresMap = {};

view.whenLayerView(hoods).then((lyrView: __esri.FeatureLayerView) => {
  hoodsLayerView = lyrView;
  return watchUtils.whenFalseOnce(hoodsLayerView, "updating");
})
  .then(() => {
    return hoodsLayerView.queryFeatures();
  })
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
  const expr = select.value === "" ? "" : `OBJECTID_1 = '${featureId}'`;
  hoods.definitionExpression = expr;
  view.goTo(featuresMap[featureId]);
};
