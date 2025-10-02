import '../../scss/map.scss';

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
function initMenuButtons(menuSelector = '.menu-list button') {
  const menuButtons = document.querySelectorAll(menuSelector);
  const main = document.querySelector('body');
  
  menuButtons.forEach(button => {
    button.addEventListener('click', function() {
      const parentLi = this.closest('li');
      const isCurrent = parentLi.classList.contains('current');
      const panelId = this.getAttribute('data-panel');
      
      // 모든 형제 li에서 current 제거
      const allMenuItems = document.querySelectorAll('.menu-list > li');
      allMenuItems.forEach(li => li.classList.remove('current'));
      
      // 모든 패널 닫기
      const allPanels = document.querySelectorAll('[data-panel-menu]');
      allPanels.forEach(panel => {
        panel.classList.remove('show');
      });
      
      // main에서 open-depth-1 제거
      main.classList.remove('open-depth-1');

      if(isCurrent){
        // current 상태에서 다시 누르면 패널 닫기
        main.classList.remove('open-depth-1');
      } else {
        // current가 아닌 상태에서 누르면 새 패널 열기
        parentLi.classList.add('current');
        main.classList.add('open-depth-1');
        
        // 패널 제목 변경
        const layerPanelTitle = document.querySelector('.layer-panel-title');
        if (layerPanelTitle) {
          layerPanelTitle.textContent = button.textContent.trim();
        }

        // 해당 패널 열기
        if (panelId) {
          const targetPanel = document.querySelector(`[data-panel-menu="${panelId}"]`);
          if (targetPanel) {
            targetPanel.classList.add('show');
          }
        }
      }
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

// @@ 지도 정보 팝업 표시
function showMapInfoPopup(x, y) {
  const popup = document.getElementById('mapInfoPopup');
  const content = document.getElementById('mapInfoContent');
  
  if (!popup || !content) return;
  
  // 위치 설정
  popup.style.left = x + 'px';
  popup.style.top = y + 'px';
  // 팝업 표시
  popup.classList.add('active');
}

// @@ 지도 정보 팝업 숨기기
function hideMapInfoPopup() {
  const popup = document.getElementById('mapInfoPopup');
  if (popup) {
    popup.classList.remove('active');
  }
}

// @@ 상세정보 더보기 토글 기능
function initViewMoreToggle(selector = '.view-more-btn', callback) {
  const viewMoreBtn = document.querySelector(selector);
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', function() {
      const detailSection = document.querySelector('[data-section="detail"]');
      const isActive = this.classList.contains('active');
      
      if (isActive) {
        // 닫기
        if (detailSection) {
          detailSection.classList.add('detail-content-hidden');
        }
        this.classList.remove('active');
      } else {
        // 열기
        if (detailSection) {
          detailSection.classList.remove('detail-content-hidden');
        }
        this.classList.add('active');
      }
      
      if (callback) callback(this, isActive);
    });
  }
}

// @@ 레이어 패널 토글 기능
function initLayerToggle() {
  // data-layer-toggle 속성이 있는 버튼들에 이벤트 리스너 추가
  const toggleButtons = document.querySelectorAll('[data-layer-toggle]');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation(); // 이벤트 버블링 방지
      
      const targetLevel = this.getAttribute('data-layer-toggle');
      const layerItem = this.closest('.layer-item');
      const layerItemTree = this.closest('.layer-item-tree');
      
      if (targetLevel === 'level-2') {
        // 1단계 버튼: level-2 토글
        const level2Tree = layerItem.querySelector('.layer-item-tree.level-2');
        if (level2Tree) {
          const isActive = layerItem.classList.contains('active');
          
          if (isActive) {
            // 닫기: 모든 하위 레벨도 닫기
            closeAllSubLevels(layerItem);
            layerItem.classList.remove('active');
          } else {
            // 열기: level-2와 모든 level-3 열기
            layerItem.classList.add('active');
            level2Tree.classList.add('active');
            // level-2 안의 모든 level-3도 열기
            const level3Trees = level2Tree.querySelectorAll('.layer-item-tree.level-3');
            level3Trees.forEach(level3 => {
              level3.classList.add('active');
            });
          }
        }
      } else {
        // 2-4단계 버튼: 하위 레벨 토글
        if (layerItemTree) {
          const nextLevel = layerItemTree.querySelector(`.layer-item-tree.${targetLevel}`);
          
          if (nextLevel) {
            const isActive = layerItemTree.classList.contains('active');
            
            if (isActive) {
              // 닫기: 모든 하위 레벨도 닫기
              closeAllSubLevels(layerItemTree);
              layerItemTree.classList.remove('active');
            } else {
              // 열기: 다음 레벨만 열기
              layerItemTree.classList.add('active');
            }
          }
        }
      }
    });
  });
}

// @@ 하위 레벨 모두 닫기 함수
function closeAllSubLevels(parentElement) {
  const subLevels = parentElement.querySelectorAll('.layer-item-tree');
  subLevels.forEach(level => {
    level.classList.remove('active');
  });
}

// @@ 레이어 패널 토글 기능 (기존 함수 유지)
function initCollapseToggle(selector = '.collapse-toggle', callback) {
  const toggleButtons = document.querySelectorAll(selector);
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const controlsId = this.getAttribute('aria-controls');
      const panel = document.getElementById(controlsId);
      
      if (isExpanded) {
        this.setAttribute('aria-expanded', 'false');
        this.classList.remove('active');
        if (panel) panel.classList.remove('active');
      } else {
        this.setAttribute('aria-expanded', 'true');
        this.classList.add('active');
        if (panel) panel.classList.add('active');
      }
      
      if (callback) callback(this, isExpanded);
    });
  });
}

// @@ 모달 팝업 열기 함수
function openModal(title, content, modalId, triggerElement = null) {
  // 필수 매개변수 검증
  if (!title || !content || !modalId) {
    console.error('openModal: title, content, modalId는 필수 매개변수입니다.');
    return;
  }
  
  const modal = document.getElementById(modalId);
  const modalTitle = modal.querySelector('.modal-title');
  const modalContent = modal.querySelector('.map-modal-content');
  const modalClose = modal.querySelector('.modal-close');
  
  if (!modal || !modalTitle || !modalContent) {
    console.error(`모달 요소를 찾을 수 없습니다. modalId: ${modalId}`);
    return;
  }
  
  // 제목과 내용 설정
  modalTitle.textContent = title;
  modalContent.innerHTML = content;
  
  // 모달 표시
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  
  // 포커스 관리 - 닫기 버튼에 포커스
  modalClose.focus();
  
  // 트리거 요소 저장 (닫을 때 포커스 복원용)
  modal._triggerElement = triggerElement;
  
  // body 스크롤 방지
  document.body.style.overflow = 'hidden';
  
  // ESC 키로 닫기 이벤트
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal(modalId);
    }
  };
  
  // 모달 배경 클릭으로 닫기 이벤트
  const handleBackdropClick = (e) => {
    if (e.target === modal) {
      closeModal(modalId);
    }
  };
  
  // 닫기 버튼 클릭 이벤트
  const handleCloseClick = () => {
    closeModal(modalId);
  };
  
  // 이벤트 리스너 추가
  document.addEventListener('keydown', handleEscape);
  modal.addEventListener('click', handleBackdropClick);
  modalClose.addEventListener('click', handleCloseClick);
  
  // 이벤트 리스너를 나중에 제거하기 위해 저장
  modal._escapeHandler = handleEscape;
  modal._backdropHandler = handleBackdropClick;
  modal._closeHandler = handleCloseClick;
}

// @@ 모달 팝업 닫기 함수
function closeModal(modalId) {
  if (!modalId) {
    console.error('closeModal: modalId는 필수 매개변수입니다.');
    return;
  }
  
  const modal = document.getElementById(modalId);
  
  if (!modal) {
    console.error(`모달 요소를 찾을 수 없습니다. modalId: ${modalId}`);
    return;
  }
  
  // 모달 숨기기
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  
  // body 스크롤 복원
  document.body.style.overflow = '';
  
  // 포커스를 원래 트리거 요소로 복원
  if (modal._triggerElement && typeof modal._triggerElement.focus === 'function') {
    modal._triggerElement.focus();
  }
  
  // 이벤트 리스너 제거
  if (modal._escapeHandler) {
    document.removeEventListener('keydown', modal._escapeHandler);
  }
  if (modal._backdropHandler) {
    modal.removeEventListener('click', modal._backdropHandler);
  }
  if (modal._closeHandler) {
    const modalClose = modal.querySelector('.modal-close');
    if (modalClose) {
      modalClose.removeEventListener('click', modal._closeHandler);
    }
  }
  
  // 저장된 핸들러 정리
  delete modal._escapeHandler;
  delete modal._backdropHandler;
  delete modal._closeHandler;
  delete modal._triggerElement;
}

// @@ 모달 초기화 함수
function initModal(modalId) {
  if (!modalId) {
    console.error('initModal: modalId는 필수 매개변수입니다.');
    return;
  }
  
  const modal = document.getElementById(modalId);
  
  if (!modal) {
    console.error(`모달 요소를 찾을 수 없습니다. modalId: ${modalId}`);
    return;
  }
  
  // 초기 상태 설정
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  
  // 모달 컨테이너에 aria-labelledby 설정
  const modalTitle = modal.querySelector('.modal-title');
  const modalContainer = modal.querySelector('.modal-container');
  
  if (modalTitle && modalContainer) {
    const titleId = modalId + '-title';
    modalTitle.id = titleId;
    modalContainer.setAttribute('aria-labelledby', titleId);
  }
}

// @@ 여러 모달 초기화 함수
function initModals(modalIds) {
  if (!Array.isArray(modalIds)) {
    console.error('initModals: modalIds는 배열이어야 합니다.');
    return;
  }
  
  modalIds.forEach(modalId => {
    initModal(modalId);
  });
}

// @@ 모든 모달 닫기 함수
function closeAllModals() {
  const allModals = document.querySelectorAll('.map-modal');
  allModals.forEach(modal => {
    if (modal.style.display !== 'none') {
      closeModal(modal.id);
    }
  });
}

// @@ data-modal 속성으로 모달 열기 초기화
function initModalTriggers() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      
      if (!modal) {
        console.error(`모달을 찾을 수 없습니다: ${modalId}`);
        return;
      }
      
      // HTML에 이미 작성된 제목과 내용을 그대로 사용
      const modalTitle = modal.querySelector('.modal-title');
      const modalContent = modal.querySelector('.map-modal-content');
      
      if (!modalTitle || !modalContent) {
        console.error(`모달 구조가 올바르지 않습니다: ${modalId}`);
        return;
      }
      
      // 모달 표시
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      
      // 포커스 관리
      const modalClose = modal.querySelector('.modal-close');
      if (modalClose) {
        modalClose.focus();
      }
      
      // 트리거 요소 저장 (닫을 때 포커스 복원용)
      modal._triggerElement = this;
      
      // body 스크롤 방지
      document.body.style.overflow = 'hidden';
      
      // ESC 키로 닫기 이벤트
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closeModal(modalId);
        }
      };
      
      // 모달 배경 클릭으로 닫기 이벤트
      const handleBackdropClick = (e) => {
        if (e.target === modal) {
          closeModal(modalId);
        }
      };
      
      // 닫기 버튼 클릭 이벤트
      const handleCloseClick = () => {
        closeModal(modalId);
      };
      
      // 이벤트 리스너 추가
      document.addEventListener('keydown', handleEscape);
      modal.addEventListener('click', handleBackdropClick);
      if (modalClose) {
        modalClose.addEventListener('click', handleCloseClick);
      }
      
      // 이벤트 리스너를 나중에 제거하기 위해 저장
      modal._escapeHandler = handleEscape;
      modal._backdropHandler = handleBackdropClick;
      modal._closeHandler = handleCloseClick;
    });
  });
}

// @@ 모바일에서 각 패널에서 버튼 눌렀을 시 목록이 축소 확대 되는 기능
function initMobilePanelToggle() {
  const mobileControls = document.querySelectorAll('.layer-mobile-control');
  
  mobileControls.forEach(control => {
    control.addEventListener('click', function() {
      const body = document.body;
      const isCollapsed = body.classList.contains('layer-panel-collapsed');
      
      if (isCollapsed) {
        // 열기
        body.classList.remove('layer-panel-collapsed');
        body.classList.add('layer-panel-expanded');
      } else {
        // 닫기
        body.classList.remove('layer-panel-expanded');
        body.classList.add('layer-panel-collapsed');
      }
    });
  });
}

// @@ 외부에서 호출할 수 있는 패널 토글 함수들
function toggleLayerPanel() {
  const body = document.body;
  const isCollapsed = body.classList.contains('layer-panel-collapsed');
  
  if (isCollapsed) {
    expandLayerPanel();
  } else {
    collapseLayerPanel();
  }
}

function collapseLayerPanel() {
  const body = document.body;
  body.classList.remove('layer-panel-expanded');
  body.classList.add('layer-panel-collapsed');
}

function expandLayerPanel() {
  const body = document.body;
  body.classList.remove('layer-panel-collapsed');
  body.classList.add('layer-panel-expanded');
}


function initLayerUtilsBtnMeta() {
  const layerUtilsBtnMeta = document.querySelectorAll('.layer-utils-btn-meta');
  layerUtilsBtnMeta.forEach(btn => {
    btn.addEventListener('click', function() {
      //const layerName = this.closest('.layer-btn-ui').querySelector('.layer-name').textContent;
      //openModal(layerName, layerName, 'layer-meta-modal');
      document.body.classList.add('open-depth-2');
    });
  });
}
// 모든 기능 초기화
initLayerToggle()
initMenuButtons();
initGroupButtons();
initFavButtons();
initCategoryTabsToggle();
initCategoryTabs();
initHeaderToggle();
initHeaderClose();
initToolButtons();
initOptionPanelClose();
initMeasureTools();
initLegendPanelToggle();
initOptionPanelZoom();
initViewMoreToggle();
initCollapseToggle();
initMap();
initMobilePanelToggle(); // 모바일 패널 토글 초기화
initModalTriggers(); // 모달 트리거 초기화
initLayerUtilsBtnMeta();
// 지도 클릭 이벤트 예시
if (mapInstance) {
mapInstance.on('click', function(event) {
  const coordinate = event.coordinate;
  const pixel = event.pixel;
  
  showMapInfoPopup(pixel[0], pixel[1]);
});
}