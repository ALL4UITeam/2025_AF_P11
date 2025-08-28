  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

  ScrollSmoother.create({
    wrapper: "#smoother-wrapper",
    content: "#smoother-content",
    smooth: 2,
    speed: 1,
    normalizeScroll: true,
    ignoreMobileResize: true,
    smoothTouch: 0.1,
    effects: true,
    preventDefault: true,
    normalizeScroll: { allowNestedScroll: true }
  });
  

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
  
  


  const sublayout__breadcrumb = document.querySelector(".sublayout__breadcrumb");
  const sublayout__page = document.querySelector(".sublayout__page");
  const sublayout__desc = document.querySelector(".sublayout__desc");
  const sublayout__title = document.querySelector(".sublayout__title");
  const sublayoutTitle = document.querySelector(".sublayout__title");
  const sublayoutPoint = sublayoutTitle?.querySelector(".point b");
  const sublayoutImage = document.querySelector(".image-background img");

  // gsap set으로 기본 상태 지정
  gsap.set(sublayout__breadcrumb, { opacity: 0, x: -20 });
  gsap.set(sublayoutImage, {  scale: 1.15 });
  gsap.set(sublayout__page, { opacity: 0, filter: "blur(20px)" });
  gsap.set(sublayout__desc, { opacity: 0, filter: "blur(20px)" });
  gsap.set(sublayoutPoint, { opacity: 0, y: 30});

  // sublayout
  const sublayoutTimeline = gsap.timeline();
  
  // 초기 텍스트 등장
  sublayoutTimeline.to(".sublayout__breadcrumb", {
      opacity: 1,
      x: 1,
      duration: 0.8,
  })
  .to(sublayoutImage, {
    scale: 1,
    duration: 3,
  }, "-=0.6")
  .to(sublayout__page, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 1.2,
  }, "<")
  .to(sublayout__desc, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 1.2,
  }, "<")
  .to(sublayoutPoint, {
    opacity: 1,
    y: 0,
    delay: 0.6,
    blur: 0,
    duration: 1,
  },">");



  window.addEventListener("resize", () => {
    //ScrollSmoother.update();
    //ScrollSmoother.refresh();
    //ScrollTrigger.refresh();
  });