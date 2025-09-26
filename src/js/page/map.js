// 전역 변수로 map 인스턴스 저장
let mapInstance = null;

// @@ 그룹 버튼 토글 기능
function initGroupButtons(selector = '.group-btn', callback) {
  const groupButtons = document.querySelectorAll(selector);
  groupButtons.forEach(group => {
    const buttons = group.querySelectorAll('.tool-btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        buttons.forEach(btn => btn.classList.remove('active'));
        if (!isActive) {
          this.classList.add('active');
        }
        if (callback) callback(this, isActive);
      });
    });
  });
}

// @@ 메뉴 버튼 토글 기능
function initMenuButtons(menuSelector = '.menu-list button', mainSelector = '.main', callback) {
  const menuButtons = document.querySelectorAll(menuSelector);
  const main = document.querySelector(mainSelector);
  
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
      if (callback) callback(this, isCurrent);
    });
  });
}

// @@ 즐겨찾기 버튼 토글 기능
function initFavButtons(selector = '.fav-layers button', callback) {
  const favButtons = document.querySelectorAll(selector);
  favButtons.forEach(button => {
    button.addEventListener('click', function() {
      const isActive = this.classList.contains('selected');
      this.classList.toggle('selected');
      if (callback) callback(this, isActive);
    });
  });
}

// @@ 카테고리 탭 토글 기능
function initCategoryTabsToggle(toggleSelector = '.category-tabs-toggle', callback) {
  const categoryTabsToggle = document.querySelector(toggleSelector);
  if (categoryTabsToggle) {
    categoryTabsToggle.addEventListener('click', function() {
      const categoryTabs = this.closest('.category-tabs');
      const isExtended = categoryTabs.classList.contains('extend');
      categoryTabs.classList.toggle('extend');
      if (callback) callback(this, isExtended);
    });
  }
}

// @@ 카테고리 탭 클릭 기능
function initCategoryTabs(tabSelector = '.category-tabs .tab', callback) {
  const categoryTabs = document.querySelectorAll(tabSelector);
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const isActive = this.classList.contains('active');
      this.classList.toggle('active');
      if (callback) callback(this, isActive);
    });
  });
}

// @@ 도구 버튼 옵션 패널 토글 기능
function initToolButtons(selector = '[data-option]', callback) {
  const toolButtons = document.querySelectorAll(selector);
  toolButtons.forEach(button => {
    button.addEventListener('click', function() {
      const option = this.dataset.option;
      const optionPanel = document.querySelector(`#${option}`);
      const isActive = optionPanel.classList.contains('active');
      optionPanel.classList.toggle('active');
      button.classList.toggle('active');
      if (callback) callback(this, option, isActive);
    });
  });
}

// @@ 옵션 패널 닫기 기능
function initOptionPanelClose(selector = '.option-panel-close', callback) {
  const optionPanelClose = document.querySelector(selector);
  if (optionPanelClose) {
    optionPanelClose.addEventListener('click', function() {
      const optionPanel = this.closest('.option-panel');
      const button = optionPanel.querySelector('[data-option]');
      optionPanel.classList.remove('active');
      button.classList.remove('active');
      if (callback) callback(this, optionPanel);
    });
  }
}

// @@ 헤더 토글 기능
function initHeaderToggle(toggleSelector = '#btnMenuOpen', headerSelector = '#map-nav', callback) {
  const headerToggle = document.querySelector(toggleSelector);
  const mapHeader = document.querySelector(headerSelector);
  
  if (headerToggle && mapHeader) {
    headerToggle.addEventListener('click', function() {
      const isActive = mapHeader.classList.contains('active');
      mapHeader.classList.toggle('active');
      if (callback) callback(this, isActive);
    });
  }
}

// @@ 헤더 닫기 기능
function initHeaderClose(selector = '.map-nav-header-btn', headerSelector = '#map-nav', callback) {
  const headerClose = document.querySelector(selector);
  const mapHeader = document.querySelector(headerSelector);
  
  if (headerClose && mapHeader) {
    headerClose.addEventListener('click', function() {
      if(window.innerWidth < 1000){
        if(mapHeader.classList.contains('active')){
          mapHeader.classList.remove('active');
        } else {
          mapHeader.classList.add('active');
        }
      } else {
        mapHeader.classList.remove('active');
      }
      if (callback) callback(this, mapHeader.classList.contains('active'));
    });
  }
}

// @@ 지도 초기화 함수
function initMap() {
  mapInstance = new ol.Map({
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
  return mapInstance;
}

// @@ 지도 인스턴스 가져오기
function getMapInstance() {
  return mapInstance;
}

// DOM이 로드되면 자동으로 초기화
document.addEventListener('DOMContentLoaded', function() {
  initMap();
});
