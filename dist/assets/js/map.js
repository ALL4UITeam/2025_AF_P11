import "./modulepreload-polyfill.js";
document.addEventListener("DOMContentLoaded", function() {
  new ol.Map({
    target: "map",
    controls: ol.control.defaults.defaults({
      zoom: false
    }),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([127.7669, 35.9078]),
      // 대한민국 중심 좌표
      zoom: 7
    })
  });
});
