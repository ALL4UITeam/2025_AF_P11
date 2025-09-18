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

  // @@ 메뉴 버튼 토글 기능
  const menuButtons = document.querySelectorAll('.menu-list button');
  const main = document.querySelector('.main');
  
  menuButtons.forEach(button => {
    button.addEventListener('click', function() {
      const parentLi = this.closest('li');
      const isCurrent = parentLi.classList.contains('current');
      
      // 모든 형제 li에서 current 제거
      const allMenuItems = document.querySelectorAll('.menu-list > li');
      allMenuItems.forEach(li => li.classList.remove('current'));
      
      // main에서 open-depth-1 제거
      main.classList.remove('open-depth-1');
      
      // 클릭한 버튼이 current가 아니었다면 토글
      if (!isCurrent) {
        parentLi.classList.add('current');
        main.classList.add('open-depth-1');
      }
    });
  });

  const favButtons = document.querySelectorAll('.fav-layers button');
  favButtons.forEach(button => {
    button.addEventListener('click', function() {
      const isActive = this.classList.contains('selected');
      
      this.classList.toggle('selected');
    });
  });

  const categoryTabsToggle = document.querySelector('.category-tabs-toggle');

  categoryTabsToggle.addEventListener('click', function() {
    const categoryTabs = this.closest('.category-tabs');
    categoryTabs.classList.toggle('extend');
  })

  const categoryTabs = document.querySelectorAll('.category-tabs .tab');
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      //const isActive = this.classList.contains('active');
      //categoryTabs.forEach(tab => tab.classList.remove('active'));
      this.classList.toggle('active');
    });
  });
  
  const toolButtons = document.querySelectorAll('[data-option]');
  toolButtons.forEach(button => {
    button.addEventListener('click', function() {
      const option = this.dataset.option;
      const optionPanel = document.querySelector(`#${option}`);
      optionPanel.classList.toggle('active');
      button.classList.toggle('active');
    });
  });

  const optionPanelClose = document.querySelector('.option-panel-close');
  optionPanelClose.addEventListener('click', function() {
    const optionPanel = this.closest('.option-panel');
    optionPanel.classList.remove('active');
    const button = optionPanel.querySelector('[data-option]');
    button.classList.remove('active');
  });

  const headerToggle = document.querySelector('.btn-header-toggle');
  const mapHeader = document.querySelector('.map-header');
  headerToggle.addEventListener('click', function() {
    //headerToggle.classList.toggle('active');
    mapHeader.classList.toggle('active');
  });


});


