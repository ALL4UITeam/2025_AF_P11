import "./modulepreload-polyfill.js";
let mapInstance = null;
function initGroupButtons(selector = ".group-btn", callback) {
  const groupButtons = document.querySelectorAll(selector);
  groupButtons.forEach((group) => {
    const buttons = group.querySelectorAll(".tool-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", function() {
        const isActive = this.classList.contains("active");
        buttons.forEach((btn) => btn.classList.remove("active"));
        if (!isActive) {
          this.classList.add("active");
        }
      });
    });
  });
}
function initMenuButtons(menuSelector = ".menu-list button") {
  const menuButtons = document.querySelectorAll(menuSelector);
  const main = document.querySelector("body");
  menuButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const parentLi = this.closest("li");
      const isCurrent = parentLi.classList.contains("current");
      const panelId = this.getAttribute("data-panel");
      const allMenuItems = document.querySelectorAll(".menu-list > li");
      allMenuItems.forEach((li) => li.classList.remove("current"));
      const allPanels = document.querySelectorAll("[data-panel-menu]");
      allPanels.forEach((panel) => {
        panel.classList.remove("show");
      });
      main.classList.remove("open-depth-1");
      if (isCurrent) {
        main.classList.remove("open-depth-1");
      } else {
        parentLi.classList.add("current");
        main.classList.add("open-depth-1");
        const layerPanelTitle = document.querySelector(".layer-panel-title");
        if (layerPanelTitle) {
          layerPanelTitle.textContent = button.textContent.trim();
        }
        if (panelId) {
          const targetPanel = document.querySelector(`[data-panel-menu="${panelId}"]`);
          if (targetPanel) {
            targetPanel.classList.add("show");
          }
        }
      }
    });
  });
}
function initFavButtons(selector = ".fav-layers button", callback) {
  const favButtons = document.querySelectorAll(selector);
  favButtons.forEach((button) => {
    button.addEventListener("click", function() {
      this.classList.contains("selected");
      this.classList.toggle("selected");
    });
  });
}
function initCategoryTabsToggle(toggleSelector = ".category-tabs-toggle", callback) {
  const categoryTabsToggle = document.querySelector(toggleSelector);
  if (categoryTabsToggle) {
    categoryTabsToggle.addEventListener("click", function() {
      const categoryTabs = this.closest(".category-tabs");
      categoryTabs.classList.contains("extend");
      categoryTabs.classList.toggle("extend");
    });
  }
}
function initCategoryTabs(tabSelector = ".category-tabs .tab", callback) {
  const categoryTabs = document.querySelectorAll(tabSelector);
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", function() {
      this.classList.contains("active");
      this.classList.toggle("active");
    });
  });
}
function initToolButtons(selector = "[data-option]", callback) {
  const toolButtons = document.querySelectorAll(selector);
  toolButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const option = this.dataset.option;
      const isActive = document.querySelector(`#${option}`).classList.contains("active");
      if (isActive) {
        closeOptionPanel(option);
      } else {
        openOptionPanel(option);
      }
    });
  });
}
function closeOptionPanel(panelId) {
  const panel = document.querySelector(`#${panelId}`);
  const button = document.querySelector(`[data-option="${panelId}"]`);
  if (panel) {
    panel.classList.remove("active");
  }
  if (button) {
    button.classList.remove("active");
  }
}
function openOptionPanel(panelId) {
  const panel = document.querySelector(`#${panelId}`);
  const button = document.querySelector(`[data-option="${panelId}"]`);
  if (panel) {
    panel.classList.add("active");
  }
  if (button) {
    button.classList.add("active");
  }
}
function initOptionPanelClose(selector = ".option-panel-close", callback) {
  const optionPanelClose = document.querySelectorAll(selector);
  optionPanelClose.forEach((closeBtn) => {
    closeBtn.addEventListener("click", function() {
      const optionPanel = this.closest(".option-panel");
      const panelId = optionPanel.id;
      closeOptionPanel(panelId);
    });
  });
}
function initHeaderToggle(toggleSelector = "#btnMenuOpen", headerSelector = "#map-nav", callback) {
  const headerToggle = document.querySelector(toggleSelector);
  if (headerToggle) {
    headerToggle.addEventListener("click", function() {
      const isActive = document.querySelector(headerSelector).classList.contains("active");
      if (isActive) {
        closeHeader();
      } else {
        openHeader();
      }
    });
  }
}
function closeHeader() {
  const mapHeader = document.querySelector("#map-nav");
  if (mapHeader) {
    mapHeader.classList.remove("active");
  }
}
function openHeader() {
  const mapHeader = document.querySelector("#map-nav");
  if (mapHeader) {
    mapHeader.classList.add("active");
  }
}
function initHeaderClose(selector = ".map-nav-header-btn", headerSelector = "#map-nav", callback) {
  const headerClose = document.querySelector(selector);
  if (headerClose) {
    headerClose.addEventListener("click", function() {
      if (window.innerWidth < 1e3) {
        const isActive = document.querySelector(headerSelector).classList.contains("active");
        if (isActive) {
          closeHeader();
        } else {
          openHeader();
        }
      } else {
        closeHeader();
      }
    });
  }
}
function initMap() {
  mapInstance = new ol.Map({
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
  return mapInstance;
}
function initMeasureTools(toggleSelector = "#measureToggleBtn", toolsSelector = "#measureTools", callback) {
  const measureToggleBtn = document.querySelector(toggleSelector);
  const measureTools = document.querySelector(toolsSelector);
  if (measureToggleBtn && measureTools) {
    measureTools.style.display = "none";
    measureToggleBtn.classList.remove("active");
    measureToggleBtn.addEventListener("click", function() {
      const isCurrentlyVisible = measureTools.style.display !== "none";
      if (isCurrentlyVisible) {
        measureTools.style.display = "none";
        this.classList.remove("active");
      } else {
        measureTools.style.display = "flex";
        this.classList.add("active");
      }
    });
    const measureToolBtns = measureTools.querySelectorAll(".measure-tool-btn");
    measureToolBtns.forEach((btn) => {
      btn.addEventListener("click", function() {
        this.dataset.tool;
        measureToolBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }
}
function initOptionPanelZoom(zoomSelector = ".option-panel-zoom", callback) {
  const zoomBtn = document.querySelector(zoomSelector);
  if (zoomBtn) {
    zoomBtn.addEventListener("click", function() {
      const isZoomedIn = this.classList.contains("in");
      if (isZoomedIn) {
        zoomOutOptionPanel(zoomSelector);
      } else {
        zoomInOptionPanel(zoomSelector);
      }
    });
  }
}
function zoomInOptionPanel(selector = ".option-panel-zoom") {
  const zoomBtn = document.querySelector(selector);
  const panel = zoomBtn ? zoomBtn.closest(".option-panel") : null;
  if (zoomBtn) {
    zoomBtn.classList.add("in");
    zoomBtn.classList.remove("out");
  }
  if (panel) {
    panel.classList.remove("zoomed-in");
  }
}
function zoomOutOptionPanel(selector = ".option-panel-zoom") {
  const zoomBtn = document.querySelector(selector);
  const panel = zoomBtn ? zoomBtn.closest(".option-panel") : null;
  if (zoomBtn) {
    zoomBtn.classList.add("out");
    zoomBtn.classList.remove("in");
  }
  if (panel) {
    panel.classList.add("zoomed-in");
  }
}
function initLegendPanelToggle(buttonSelector = ".legend-btn", panelSelector = "#legendPanel", callback) {
  const legendBtn = document.querySelector(buttonSelector);
  if (legendBtn) {
    legendBtn.addEventListener("click", function() {
      const isActive = document.querySelector(panelSelector).classList.contains("active");
      if (isActive) {
        closeLegendPanel();
      } else {
        openLegendPanel();
      }
    });
  }
}
function closeLegendPanel() {
  const legendPanel = document.querySelector("#legendPanel");
  const legendBtn = document.querySelector(".legend-btn");
  if (legendPanel) {
    legendPanel.classList.remove("active");
  }
  if (legendBtn) {
    legendBtn.classList.remove("active");
  }
}
function openLegendPanel() {
  const legendPanel = document.querySelector("#legendPanel");
  const legendBtn = document.querySelector(".legend-btn");
  if (legendPanel) {
    legendPanel.classList.add("active");
  }
  if (legendBtn) {
    legendBtn.classList.add("active");
  }
}
function showMapInfoPopup(x, y) {
  const popup = document.getElementById("mapInfoPopup");
  const content = document.getElementById("mapInfoContent");
  if (!popup || !content) return;
  popup.style.left = x + "px";
  popup.style.top = y + "px";
  popup.classList.add("active");
}
function initViewMoreToggle(selector = ".view-more-btn", callback) {
  const viewMoreBtn = document.querySelector(selector);
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener("click", function() {
      const detailSection = document.querySelector('[data-section="detail"]');
      const isActive = this.classList.contains("active");
      if (isActive) {
        if (detailSection) {
          detailSection.classList.add("detail-content-hidden");
        }
        this.classList.remove("active");
      } else {
        if (detailSection) {
          detailSection.classList.remove("detail-content-hidden");
        }
        this.classList.add("active");
      }
    });
  }
}
function initLayerToggle() {
  const toggleButtons = document.querySelectorAll("[data-layer-toggle]");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function(e) {
      e.stopPropagation();
      const targetLevel = this.getAttribute("data-layer-toggle");
      const layerItem = this.closest(".layer-item");
      const layerItemTree = this.closest(".layer-item-tree");
      if (targetLevel === "level-2") {
        const level2Tree = layerItem.querySelector(".layer-item-tree.level-2");
        if (level2Tree) {
          const isActive = layerItem.classList.contains("active");
          if (isActive) {
            closeAllSubLevels(layerItem);
            layerItem.classList.remove("active");
          } else {
            layerItem.classList.add("active");
            level2Tree.classList.add("active");
            const level3Trees = level2Tree.querySelectorAll(".layer-item-tree.level-3");
            level3Trees.forEach((level3) => {
              level3.classList.add("active");
            });
          }
        }
      } else {
        if (layerItemTree) {
          const nextLevel = layerItemTree.querySelector(`.layer-item-tree.${targetLevel}`);
          if (nextLevel) {
            const isActive = layerItemTree.classList.contains("active");
            if (isActive) {
              closeAllSubLevels(layerItemTree);
              layerItemTree.classList.remove("active");
            } else {
              layerItemTree.classList.add("active");
            }
          }
        }
      }
    });
  });
}
function closeAllSubLevels(parentElement) {
  const subLevels = parentElement.querySelectorAll(".layer-item-tree");
  subLevels.forEach((level) => {
    level.classList.remove("active");
  });
}
function initCollapseToggle(selector = ".collapse-toggle", callback) {
  const toggleButtons = document.querySelectorAll(selector);
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      const controlsId = this.getAttribute("aria-controls");
      const panel = document.getElementById(controlsId);
      if (isExpanded) {
        this.setAttribute("aria-expanded", "false");
        this.classList.remove("active");
        if (panel) panel.classList.remove("active");
      } else {
        this.setAttribute("aria-expanded", "true");
        this.classList.add("active");
        if (panel) panel.classList.add("active");
      }
    });
  });
}
function closeModal(modalId) {
  if (!modalId) {
    console.error("closeModal: modalId는 필수 매개변수입니다.");
    return;
  }
  const modal = document.getElementById(modalId);
  if (!modal) {
    console.error(`모달 요소를 찾을 수 없습니다. modalId: ${modalId}`);
    return;
  }
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (modal._triggerElement && typeof modal._triggerElement.focus === "function") {
    modal._triggerElement.focus();
  }
  if (modal._escapeHandler) {
    document.removeEventListener("keydown", modal._escapeHandler);
  }
  if (modal._backdropHandler) {
    modal.removeEventListener("click", modal._backdropHandler);
  }
  if (modal._closeHandler) {
    const modalClose = modal.querySelector(".modal-close");
    if (modalClose) {
      modalClose.removeEventListener("click", modal._closeHandler);
    }
  }
  delete modal._escapeHandler;
  delete modal._backdropHandler;
  delete modal._closeHandler;
  delete modal._triggerElement;
}
function initModalTriggers() {
  const modalTriggers = document.querySelectorAll("[data-modal]");
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function(e) {
      e.preventDefault();
      const modalId = this.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (!modal) {
        console.error(`모달을 찾을 수 없습니다: ${modalId}`);
        return;
      }
      const modalTitle = modal.querySelector(".modal-title");
      const modalContent = modal.querySelector(".map-modal-content");
      if (!modalTitle || !modalContent) {
        console.error(`모달 구조가 올바르지 않습니다: ${modalId}`);
        return;
      }
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
      const modalClose = modal.querySelector(".modal-close");
      if (modalClose) {
        modalClose.focus();
      }
      modal._triggerElement = this;
      document.body.style.overflow = "hidden";
      const handleEscape = (e2) => {
        if (e2.key === "Escape") {
          closeModal(modalId);
        }
      };
      const handleBackdropClick = (e2) => {
        if (e2.target === modal) {
          closeModal(modalId);
        }
      };
      const handleCloseClick = () => {
        closeModal(modalId);
      };
      document.addEventListener("keydown", handleEscape);
      modal.addEventListener("click", handleBackdropClick);
      if (modalClose) {
        modalClose.addEventListener("click", handleCloseClick);
      }
      modal._escapeHandler = handleEscape;
      modal._backdropHandler = handleBackdropClick;
      modal._closeHandler = handleCloseClick;
    });
  });
}
function initMobilePanelToggle() {
  const mobileControls = document.querySelectorAll(".layer-mobile-control");
  mobileControls.forEach((control) => {
    control.addEventListener("click", function() {
      const body = document.body;
      const isCollapsed = body.classList.contains("layer-panel-collapsed");
      if (isCollapsed) {
        body.classList.remove("layer-panel-collapsed");
        body.classList.add("layer-panel-expanded");
      } else {
        body.classList.remove("layer-panel-expanded");
        body.classList.add("layer-panel-collapsed");
      }
    });
  });
}
function initLayerUtilsBtnMeta() {
  const layerUtilsBtnMeta = document.querySelectorAll(".layer-utils-btn-meta");
  layerUtilsBtnMeta.forEach((btn) => {
    btn.addEventListener("click", function() {
      document.body.classList.add("open-depth-2");
    });
  });
}
initLayerToggle();
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
initMobilePanelToggle();
initModalTriggers();
initLayerUtilsBtnMeta();
if (mapInstance) {
  mapInstance.on("click", function(event) {
    event.coordinate;
    const pixel = event.pixel;
    showMapInfoPopup(pixel[0], pixel[1]);
  });
}
