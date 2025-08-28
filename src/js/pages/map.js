/**
 * @file map.js
 * @description 지도 페이지의 클라이언트 사이드 스크립트입니다.

 */
(() => {
  "use strict";

  /**
   * DOM이 준비되면 모든 페이지 기능을 초기화합니다.
   */
  function init() {
    // OpenLayers 지도 세팅 (CDN)
    // 테스트용
    if (document.getElementById("map")) {
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
    }

    


    setupHeaderExtend();
    setupPcContentExtend();
    setupMobileMenu();
    setupLegend();
    setupMinimap();
    setupZoomControls();
    setupPanelTabs();
    setupToggleButtons();
    setupViewMode();
    setupLayerAccordion();
    setupOptionPanels();
    setupBufferControls();
    setupMarkerOpacityRange()
    
  }


  function setupMarkerOpacityRange() {
    const range = document.getElementById("markerOpacityRange");
    const rangeValue = document.getElementById("markerOpacityValue");

    function updateRangeBackground(value) {
      range.style.background = `linear-gradient(to right, #555 ${value}%, #ccc ${value}%)`;
      rangeValue.textContent = `${value}%`;
    }

    // 초기 적용
    updateRangeBackground(range.value);

    // 변경 시 업데이트
    range.addEventListener("input", (e) => {
      updateRangeBackground(e.target.value);
    });
}

  function setupHeaderExtend() {
    const btnHeaderExtend = document.querySelector(".btn-header-extend");
    btnHeaderExtend?.addEventListener("click", () => {
      document.body.classList.toggle("header-hide");
      btnHeaderExtend.classList.toggle("active");
    });
  }

  function setupPcContentExtend() {
    const btnPcContentExtend = document.querySelector(".pc-content-extend");
    btnPcContentExtend?.addEventListener("click", () => {
      document.body.classList.toggle("aside-fold");
      btnPcContentExtend.classList.toggle("active");
    });
  }

  /**
   * 모바일 메뉴 토글 기능을 초기화합니다.
   */

  function setupMobileMenu() {
    const nav = document.querySelector("#nav");
    const toggleBtn = document.querySelector(".mobile-btn-menu");
    const depth1Buttons = document.querySelectorAll(".gnb-lv1 > a");

    const isMobile = () => window.innerWidth <= 1024;

    const toggleMenu = () => {
      if (isMobile()) {
        const isActive = nav.classList.contains("mobile-active");

        if (isActive) {
          // 메뉴 닫기
          nav.classList.remove("mobile-active");
          toggleBtn.setAttribute("aria-expanded", "false");
          toggleBtn.setAttribute("aria-label", "메뉴 열기");
          toggleBtn.setAttribute("title", "메뉴 열기");
          toggleBtn.classList.remove("active");
          // 서브메뉴도 모두 닫기
          document.querySelectorAll(".gnb-submenu").forEach((submenu) => {
            submenu.classList.remove("show");
          });
        } else {
          // 메뉴 열기
          nav.classList.add("mobile-active");
          toggleBtn.setAttribute("aria-expanded", "true");
          toggleBtn.setAttribute("aria-label", "메뉴 닫기");
          toggleBtn.setAttribute("title", "메뉴 닫기");
          toggleBtn.classList.add("active");
        }
      }
    };

    // 모바일 서브메뉴 토글
    depth1Buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (isMobile()) {
          e.preventDefault();
          const submenu = btn.nextElementSibling;
          if (submenu && submenu.classList.contains("gnb-submenu")) {
            submenu.classList.toggle("show");
            btn.setAttribute(
              "aria-expanded",
              submenu.classList.contains("show")
            );
          }
        }
      });
    });

    toggleBtn?.addEventListener("click", toggleMenu);

    // ESC 키로 메뉴 닫기
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("mobile-active")) {
        toggleMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (!isMobile()) {
        nav.classList.remove("mobile-active");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.setAttribute("aria-label", "메뉴 열기");
        toggleBtn.setAttribute("title", "메뉴 열기");
        toggleBtn.classList.remove("active");
        // 서브메뉴도 모두 닫기
        document.querySelectorAll(".gnb-submenu").forEach((submenu) => {
          submenu.classList.remove("show");
        });
      }
    });
  }

  /**
   * 범례 토글 기능을 초기화합니다.
   */
  function setupLegend() {
    const legendWrap = document.querySelector(".legend-wrap");
    const toggleBtn = legendWrap?.querySelector(".btn-legend");
    const legendFloat = legendWrap?.querySelector(".legend-float");
    const tabBtns = legendWrap?.querySelectorAll(".btn-legend-tab");
    const tabContents = legendWrap?.querySelectorAll(".legend-tab-content");
    const closeBtn = legendWrap?.querySelector(".btn-legend-tab-close");

    // 범례 토글 기능
    toggleBtn?.addEventListener("click", () => {
      const isPressed = toggleBtn.getAttribute("aria-pressed") === "true";
      toggleBtn.setAttribute("aria-pressed", !isPressed);
      toggleBtn.setAttribute("title", isPressed ? "열림" : "닫기");

      if (isPressed) {
        legendFloat?.classList.remove("show");
      } else {
        legendFloat?.classList.add("show");
      }
    });

    // 1차 탭 전환 기능
    tabBtns?.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabIndex = btn.getAttribute("data-tab");

        // 모든 탭 버튼 비활성화
        tabBtns.forEach((b) => b.classList.remove("active"));
        // 모든 탭 콘텐츠 숨기기
        tabContents.forEach((content) => content.classList.remove("active"));

        // 클릭된 탭 활성화
        btn.classList.add("active");
        // 해당 탭 콘텐츠 보이기
        if (tabContents[tabIndex]) {
          tabContents[tabIndex].classList.add("active");
        }
      });
    });

    // 2차 탭 전환 기능 (주변정보 탭 내부)
    const tab2Btns = legendWrap?.querySelectorAll(".btn-legend-tab2");
    const tab2Contents = legendWrap?.querySelectorAll(".legend-tab2-content");

    tab2Btns?.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabIndex = btn.getAttribute("data-tab");

        // 모든 2차 탭 버튼 비활성화
        tab2Btns.forEach((b) => b.classList.remove("active"));
        // 모든 2차 탭 콘텐츠 숨기기
        tab2Contents.forEach((content) => content.classList.remove("active"));

        // 클릭된 탭 활성화
        btn.classList.add("active");
        // 해당 탭 콘텐츠 보이기
        if (tab2Contents[tabIndex]) {
          tab2Contents[tabIndex].classList.add("active");
        }
      });
    });

    // 닫기 버튼 기능
    closeBtn?.addEventListener("click", () => {
      legendFloat?.classList.remove("show");
      toggleBtn?.setAttribute("aria-pressed", "false");
      toggleBtn?.setAttribute("title", "열림");
    });

    // 외부 클릭 시 닫기 (이벤트 버블링 방지)
    document.addEventListener("click", (e) => {
      // 클릭된 요소가 범례 내부가 아니고, 범례 버튼도 아닌 경우에만 닫기
      if (!legendWrap?.contains(e.target) && !e.target.closest(".btn-legend")) {
        legendFloat?.classList.remove("show");
        toggleBtn?.setAttribute("aria-pressed", "false");
        toggleBtn?.setAttribute("title", "열림");
      }
    });

    // 모바일에서 추가 범례 버튼 처리
    const isMobile = () => window.innerWidth <= 1024;
    if (isMobile()) {
      const btnLegend = document.querySelector(".btn-control-legend");
      btnLegend?.addEventListener("click", (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        btnLegend.setAttribute("aria-pressed", legendFloat?.classList.contains("show") ? "false" : "true");
        legendFloat.classList.toggle("show");
      });

      // Mobile 목록 확장
      const mobileContentExtend = document.querySelector(".mobile-content-extend");
      mobileContentExtend?.addEventListener("click", () => {
        //mobileContentExtend.classList.toggle("active");
        document.querySelector(".aside-content").classList.toggle("max");
      });

    }
  }

  /**
   * 미니맵 토글 기능을 초기화합니다.
   */
  function setupMinimap() {
    const btnMinimap = document.querySelector(".btn-minimap");
    const miniMapMain = document.querySelector(".mini-map-main");

    if (btnMinimap && miniMapMain) {
      btnMinimap.addEventListener("click", () => {
        miniMapMain.classList.toggle("active");
        btnMinimap.classList.toggle("active");
        btnMinimap.setAttribute(
          "title",
          miniMapMain.classList.contains("active")
            ? "미니맵 확대"
            : "미니맵 축소"
        );
      });
    }
  }

  /**
   * 줌 컨트롤 슬라이더 기능을 초기화합니다.
   */
  function setupZoomControls() {
    const range = document.getElementById("zoom-range");
    const zoomIn = document.getElementById("zoom-in");
    const zoomOut = document.getElementById("zoom-out");

    if (!range || !zoomIn || !zoomOut) {
      return;
    }

    function updateSliderGradient() {
      const min = parseInt(range.min, 10);
      const max = parseInt(range.max, 10);
      const val = parseInt(range.value, 10);
      const percent = ((val - min) / (max - min)) * 100;
      console.log(range.value);
    }

    zoomIn.addEventListener("click", () => {
      const val = parseInt(range.value, 10);
      if (val < parseInt(range.max, 10)) {
        range.value = val + 1;
        updateSliderGradient();
      }
    });

    zoomOut.addEventListener("click", () => {
      const val = parseInt(range.value, 10);
      if (val > parseInt(range.min, 10)) {
        range.value = val - 1;
        updateSliderGradient();
      }
    });

    range.addEventListener("input", updateSliderGradient);
    updateSliderGradient();
  }

  /**
   * 패널 탭 기능을 초기화합니다.
   */
  function setupPanelTabs() {
    const panelTabs = document.querySelectorAll(".panel-tab");
    const panelTabContents = document.querySelectorAll(".panel-tab-content");

    panelTabs.forEach(function (btn, idx) {
      btn.addEventListener("click", function () {
        panelTabs.forEach(function (b, i) {
          b.setAttribute("aria-selected", i === idx ? "true" : "false");
          b.tabIndex = i === idx ? 0 : -1;
        });
        panelTabContents.forEach(function (content, i) {
          content.classList.toggle("active", i === idx);
        });
      });
    });
  }

  /**
   * 토글 버튼 기능을 초기화합니다.
   */
  function setupToggleButtons() {
    const toggleBtns = document.querySelectorAll(".toggle-btn");

    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.setAttribute(
          "aria-pressed",
          btn.getAttribute("aria-pressed") === "true" ? "false" : "true"
        );
      });
    });
  }

  /**
   * 뷰 모드 토글 기능을 초기화합니다.
   */
  function setupViewMode() {
    const viewModeToggle = document.querySelector(".panel-close");

    if (viewModeToggle) {
      viewModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("view-mode");
      });
    }
  }

  /**
   * 레이어 아코디언 기능을 초기화합니다.
   */
  function setupLayerAccordion() {
    // 1뎁스 아코디언
    document
      .querySelectorAll(".layer-accordion__title")
      .forEach(function (btn) {
        btn.addEventListener("click", function () {
          const panel = document.getElementById(
            btn.getAttribute("aria-controls")
          );
          const expanded = btn.getAttribute("aria-expanded") === "true";
          btn.setAttribute("aria-expanded", !expanded);
          if (panel) {
            if (expanded) {
              panel.classList.remove("show");
            } else {
              panel.classList.add("show");
            }
          }
        });

        btn.addEventListener("keydown", function (e) {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            btn.click();
          }
        });
      });

    // 2뎁스 아코디언
    document
      .querySelectorAll(".layer-accordion__title2")
      .forEach(function (btn) {
        btn.addEventListener("click", function () {
          const panel = document.getElementById(
            btn.getAttribute("aria-controls")
          );
          const expanded = btn.getAttribute("aria-expanded") === "true";
          btn.setAttribute("aria-expanded", !expanded);
          if (panel) {
            if (expanded) {
              panel.classList.remove("show");
            } else {
              panel.classList.add("show");
            }
          }
        });

        btn.addEventListener("keydown", function (e) {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            btn.click();
          }
        });
      });
  }

  /**
   * 옵션 패널 토글 기능을 초기화합니다.
   */
  function setupOptionPanels() {
    const controlButtons = document.querySelectorAll(".btn-control-popup");
    const optionPanels = document.querySelectorAll(".option-panel");
    const closeButtons = document.querySelectorAll(".option-close");
    const btnControlDistance = document.querySelector(".btn-control-distance");
    const distancePanel = document.querySelector(".distance-panel");

    // 거리 패널 토글
    if (btnControlDistance && distancePanel) {
      btnControlDistance.addEventListener("click", () => {
        const isShow = distancePanel.classList.toggle("show");

        // 다른 모든 패널과 버튼 닫기
        optionPanels.forEach((panel) => {
          if (panel !== distancePanel) {
            panel.classList.remove("show");
          }
        });
        controlButtons.forEach((btn) => {
          if (btn !== btnControlDistance) {
            btn.classList.remove("active");
            btn.classList.remove("show");
            btn.setAttribute("aria-pressed", "false");
          }
        });

        // 거리 패널 버튼 상태 업데이트
        btnControlDistance.classList.toggle("active", isShow);
        btnControlDistance.setAttribute(
          "aria-pressed",
          isShow ? "true" : "false"
        );
      });
    }

    // 거리 패널 내부 버튼 클릭 시 상단 버튼 아이콘 변경
    const distancePanelBtns = document.querySelectorAll(".distance-panel-btn");
    distancePanelBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const icon = this.querySelector(".svg-icon");
        const text = this.querySelector("span").textContent;

        if (btnControlDistance) {
          // 상단 버튼의 아이콘 변경
          const topIcon = btnControlDistance.querySelector(".svg-icon");
          if (topIcon) {
            // 기존 클래스 제거
            topIcon.className = "svg-icon";

            // 새로운 아이콘 클래스 추가
            if (icon.classList.contains("ico-distance2")) {
              topIcon.classList.add("ico-distance");
            } else if (icon.classList.contains("ico-area")) {
              topIcon.classList.add("ico-area");
            } else if (icon.classList.contains("ico-radius")) {
              topIcon.classList.add("ico-radius");
            }
          }

          // 툴팁 텍스트 변경
          const tooltip = btnControlDistance.querySelector(".btn-tooltip");
          if (tooltip) {
            tooltip.textContent = text;
          }
        }
      });
    });

    // 컨트롤 버튼 클릭 시 패널 토글
    controlButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const targetId = this.getAttribute("data-option-target");
        const targetPanel = document.querySelector(
          `.option-panel[data-option-panel="${targetId}"]`
        );

        // 다른 패널/버튼 닫기 (거리 패널 포함)
        optionPanels.forEach((panel) => {
          if (panel !== targetPanel) {
            panel.classList.remove("show");
          }
        });
        controlButtons.forEach((btn) => {
          if (btn !== this) {
            btn.classList.remove("active");
            btn.classList.remove("show");
            btn.setAttribute("aria-pressed", "false");
          }
        });

        // 거리 패널도 닫기
        if (distancePanel) {
          distancePanel.classList.remove("show");
        }
        if (btnControlDistance) {
          btnControlDistance.classList.remove("active");
          btnControlDistance.setAttribute("aria-pressed", "false");
        }

        // 대상 패널/버튼 토글
        if (targetPanel) {
          const isShow = targetPanel.classList.toggle("show");
          if (isShow) {
            this.classList.add("active");
            this.setAttribute("aria-pressed", "true");
          } else {
            this.classList.remove("active");
            this.setAttribute("aria-pressed", "false");
          }
        }
      });
    });

    // 닫기 버튼 클릭 시 패널 닫기
    closeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const panel = this.closest(".option-panel");
        if (panel) {
          panel.classList.remove("show");
          const targetId = panel.getAttribute("data-option-target");
          const controlBtn = document.querySelector(
            `.btn-control-popup[data-option-target="${targetId}"]`
          );
          if (controlBtn) {
            controlBtn.classList.remove("active");
            controlBtn.classList.remove("show");
            controlBtn.setAttribute("aria-pressed", "false");
          }
        }
      });
    });

    // 외부 클릭 시 패널 닫기 (거리 패널 포함)
    document.addEventListener("click", function (e) {
      if (
        !e.target.closest(".option-panel") &&
        !e.target.closest(".btn-control-popup") &&
        !e.target.closest(".distance-panel") &&
        !e.target.closest(".btn-control-distance")
      ) {
        optionPanels.forEach((panel) => {
          panel.classList.remove("show");
        });
        controlButtons.forEach((btn) => {
          btn.classList.remove("active");
          btn.classList.remove("show");
          btn.setAttribute("aria-pressed", "false");
        });

        // 거리 패널도 닫기
        if (distancePanel) {
          distancePanel.classList.remove("show");
        }
        if (btnControlDistance) {
          btnControlDistance.classList.remove("active");
          btnControlDistance.setAttribute("aria-pressed", "false");
        }
      }
    });
  }

  /**
   * 마커 컨트롤 기능을 초기화합니다.
   */

  /**
   * 버퍼 컨트롤 기능을 초기화합니다.
   */
  function setupBufferControls() {
    const bufferInput = document.getElementById("bufferInput");
    const bufferCells = document.querySelectorAll(
      ".area-controls__buffer-cell"
    );
    const btnReset = document.getElementById("btnAreaReset");
    const btnAreaSelect = document.getElementById("btnAreaSelect");

    // Buffer cell 클릭 시
    bufferCells.forEach((cell) => {
      cell.addEventListener("click", function () {
        bufferCells.forEach((c) =>
          c.classList.remove("area-controls__buffer-cell--selected")
        );
        cell.classList.add("area-controls__buffer-cell--selected");
        if (bufferInput) bufferInput.value = cell.dataset.value;
        if (window.onBufferChange) window.onBufferChange(cell.dataset.value);
      });
    });

    // Buffer input 직접 입력 시
    if (bufferInput) {
      bufferInput.addEventListener("input", function () {
        bufferCells.forEach((c) =>
          c.classList.remove("area-controls__buffer-cell--selected")
        );
        if (window.onBufferChange) window.onBufferChange(bufferInput.value);
      });
    }

    // 조건 삭제(초기화)
    if (btnReset) {
      btnReset.addEventListener("click", function () {
        if (bufferInput) bufferInput.value = "";
        bufferCells.forEach((c) =>
          c.classList.remove("area-controls__buffer-cell--selected")
        );
        if (window.onBufferReset) window.onBufferReset();
      });
    }

    // 영역 선택 버튼
    if (btnAreaSelect) {
      btnAreaSelect.addEventListener("click", function () {
        if (window.onAreaSelect) window.onAreaSelect();
      });
    }
  }

  // DOM이 완전히 로드된 후 스크립트를 실행합니다.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
