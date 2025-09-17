 document.addEventListener('DOMContentLoaded', function() {
const map = new ol.Map({
  target: "map",
  controls: ol.control.defaults.defaults({
    zoom: false,
  }),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([127.7669, 35.9078]), // 대한민국 중심 좌표
    zoom: 7,
  }),
});

  // @@ 그룹 버튼 토글 기능
  const groupButtons = document.querySelectorAll('.group-btn');
  groupButtons.forEach(group => {
    const buttons = group.querySelectorAll('.tool-btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        buttons.forEach(btn => btn.classList.remove('active'));
        if (!isActive) {
          this.classList.add('active');
        }
      });
    });
  });


});


