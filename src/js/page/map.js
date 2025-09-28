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
      const isActive = document.querySelector(`#${option}`).classList.contains('active');
      
      if (isActive) {
        closeOptionPanel(option);
      } else {
        openOptionPanel(option);
      }
      
      if (callback) callback(this, option, isActive);
    });
  });
}

// @@ 옵션 패널 닫기 (외부 호출용)
function closeOptionPanel(panelId) {
  const panel = document.querySelector(`#${panelId}`);
  const button = document.querySelector(`[data-option="${panelId}"]`);
  
  if (panel) {
    panel.classList.remove('active');
  }
  if (button) {
    button.classList.remove('active');
  }
}

// @@ 옵션 패널 열기 (외부 호출용)
function openOptionPanel(panelId) {
  const panel = document.querySelector(`#${panelId}`);
  const button = document.querySelector(`[data-option="${panelId}"]`);
  
  if (panel) {
    panel.classList.add('active');
  }
  if (button) {
    button.classList.add('active');
  }
}

// @@ 옵션 패널 닫기 기능
function initOptionPanelClose(selector = '.option-panel-close', callback) {
  const optionPanelClose = document.querySelectorAll(selector);
  optionPanelClose.forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      const optionPanel = this.closest('.option-panel');
      const panelId = optionPanel.id;
      closeOptionPanel(panelId);
      if (callback) callback(this, optionPanel);
    });
  });
}

// @@ 헤더 토글 기능
function initHeaderToggle(toggleSelector = '#btnMenuOpen', headerSelector = '#map-nav', callback) {
  const headerToggle = document.querySelector(toggleSelector);
  
  if (headerToggle) {
    headerToggle.addEventListener('click', function() {
      const isActive = document.querySelector(headerSelector).classList.contains('active');
      
      if (isActive) {
        closeHeader();
      } else {
        openHeader();
      }
      
      if (callback) callback(this, isActive);
    });
  }
}

// @@ 헤더 닫기 (외부 호출용)
function closeHeader() {
  const mapHeader = document.querySelector('#map-nav');
  if (mapHeader) {
    mapHeader.classList.remove('active');
  }
}

// @@ 헤더 열기 (외부 호출용)
function openHeader() {
  const mapHeader = document.querySelector('#map-nav');
  if (mapHeader) {
    mapHeader.classList.add('active');
  }
}

// @@ 헤더 닫기 기능
function initHeaderClose(selector = '.map-nav-header-btn', headerSelector = '#map-nav', callback) {
  const headerClose = document.querySelector(selector);
  
  if (headerClose) {
    headerClose.addEventListener('click', function() {
      if(window.innerWidth < 1000){
        const isActive = document.querySelector(headerSelector).classList.contains('active');
        if(isActive){
          closeHeader();
        } else {
          openHeader();
        }
      } else {
        closeHeader();
      }
      if (callback) callback(this, document.querySelector(headerSelector).classList.contains('active'));
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

// @@ 측정 도구 토글 기능
function initMeasureTools(toggleSelector = '#measureToggleBtn', toolsSelector = '#measureTools', callback) {
  const measureToggleBtn = document.querySelector(toggleSelector);
  const measureTools = document.querySelector(toolsSelector);
  
  if (measureToggleBtn && measureTools) {
    // 초기 상태 설정 (숨김)
    measureTools.style.display = 'none';
    measureToggleBtn.classList.remove('active');
    
    measureToggleBtn.addEventListener('click', function() {
      const isCurrentlyVisible = measureTools.style.display !== 'none';
      
      if (isCurrentlyVisible) {
        // 현재 보이는 상태라면 숨기기
        measureTools.style.display = 'none';
        this.classList.remove('active');
      } else {
        // 현재 숨겨진 상태라면 보이기
        measureTools.style.display = 'flex';
        this.classList.add('active');
      }
      
      if (callback) callback(this, isCurrentlyVisible);
    });
    
    // 측정 도구 버튼들에 이벤트 리스너 추가
    const measureToolBtns = measureTools.querySelectorAll('.measure-tool-btn');
    measureToolBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const tool = this.dataset.tool;
        
        // 모든 측정 도구 버튼에서 active 클래스 제거
        measureToolBtns.forEach(b => b.classList.remove('active'));
        
        // 클릭한 버튼에 active 클래스 추가
        this.classList.add('active');
        
        if (callback) callback(this, tool);
      });
    });
  }
}

// @@ 옵션 패널 확대/축소 토글 기능
function initOptionPanelZoom(zoomSelector = '.option-panel-zoom', callback) {
  const zoomBtn = document.querySelector(zoomSelector);
  if (zoomBtn) {
    zoomBtn.addEventListener('click', function() {
      const isZoomedIn = this.classList.contains('in');
      if (isZoomedIn) {
        zoomOutOptionPanel(zoomSelector);
      } else {
        zoomInOptionPanel(zoomSelector);
      }
    });
  }
}

// @@ 옵션 패널 확대 (외부 호출용)
function zoomInOptionPanel(selector = '.option-panel-zoom') {
  const zoomBtn = document.querySelector(selector);
  const panel = zoomBtn ? zoomBtn.closest('.option-panel') : null;
  
  if (zoomBtn) {
    zoomBtn.classList.add('in');
    zoomBtn.classList.remove('out');
  }
  if (panel) {
    panel.classList.remove('zoomed-in');
  }
}

// @@ 옵션 패널 축소 (외부 호출용)
function zoomOutOptionPanel(selector = '.option-panel-zoom') {
  const zoomBtn = document.querySelector(selector);
  const panel = zoomBtn ? zoomBtn.closest('.option-panel') : null;
  
  if (zoomBtn) {
    zoomBtn.classList.add('out');
    zoomBtn.classList.remove('in');
  }
  if (panel) {
    panel.classList.add('zoomed-in');
  }
}


// @@ 지도 범례 토글 기능
function initLegendPanelToggle(buttonSelector = '.legend-btn', panelSelector = '#legendPanel', callback) {
  const legendBtn = document.querySelector(buttonSelector);
  if (legendBtn) {
    legendBtn.addEventListener('click', function() {
      const isActive = document.querySelector(panelSelector).classList.contains('active');
      if (isActive) {
        closeLegendPanel();
      } else {
        openLegendPanel();
      }
      
      if (callback) callback(this, isActive);
    });
  }
}

// @@ 지도 범례 패널 닫기 (외부 호출용)
function closeLegendPanel() {
  const legendPanel = document.querySelector('#legendPanel');
  const legendBtn = document.querySelector('.legend-btn');
  
  if (legendPanel) {
    legendPanel.classList.remove('active');
  }
  if (legendBtn) {
    legendBtn.classList.remove('active');
  }
}

// @@ 지도 범례 패널 열기 (외부 호출용)
function openLegendPanel() {
  const legendPanel = document.querySelector('#legendPanel');
  const legendBtn = document.querySelector('.legend-btn');
  
  if (legendPanel) {
    legendPanel.classList.add('active');
  }
  if (legendBtn) {
    legendBtn.classList.add('active');
  }
}
  
// @@ 지도 인스턴스 가져오기
function getMapInstance() {
  return mapInstance;
}

// DOM이 로드되면 자동으로 초기화
document.addEventListener('DOMContentLoaded', function() {
  initMap();
});
