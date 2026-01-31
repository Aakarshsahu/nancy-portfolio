// Wait for GSAP to load (defer already used)
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const preloader = document.querySelector(".preloader");

  // Hide loader after small delay
  setTimeout(() => {
    preloader.classList.add("hidden");
    setTimeout(() => {
      preloader.remove();
    }, 650);
  }, 1200);

  // Mobile nav
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });

  // Smooth scroll for internal links (just in case)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // GSAP & ScrollTrigger animations
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance timeline
    const heroTl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
    });

    heroTl
      .from(".header", { y: -40, opacity: 0, duration: 0.6 })
      .from(
        ".hero-pill",
        { y: 20, opacity: 0 },
        "-=0.3"
      )
      .from(
        ".hero h1",
        { y: 24, opacity: 0 },
        "-=0.4"
      )
      .from(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        "-=0.4"
      )
      .from(
        ".hero-actions",
        { y: 20, opacity: 0 },
        "-=0.4"
      )
      .from(
        ".hero-stats .stat",
        { y: 24, opacity: 0, stagger: 0.12 },
        "-=0.3"
      )
      .from(
        ".hero-card",
        { y: 40, opacity: 0, rotateX: 10 },
        "-=0.5"
      )
      .from(
        ".floating-tag",
        { y: 16, opacity: 0, stagger: 0.12 },
        "-=0.4"
      );

    // Floating subtle animation for hero-card
    gsap.to(".orbit-card", {
      y: 12,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // About cards scroll animation
    gsap.set(
      [".section", ".about-card", ".timeline-item", ".project-card", ".contact-layout"],
      { opacity: 0, y: 30 }
    );

    // Section headings
    document.querySelectorAll(".section-heading").forEach((heading) => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
          },
        }
      );
    });

    // About cards
    gsap.utils.toArray(".about-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 28, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });

    // Timeline items with rainbow line parallax
    const line = document.querySelector(".timeline::before");
    // (CSS pseudo-element can't be directly animated, so we skip line movement in JS)

    gsap.utils.toArray(".timeline-item").forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
        }
      );
    });

    // Projects cards
    gsap.utils.toArray(".project-card").forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });

    // Contact section
    const contact = document.querySelector(".contact-layout");
    if (contact) {
      gsap.fromTo(
        contact,
        { opacity: 0, y: 32, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contact,
            start: "top 85%",
          },
        }
      );
    }

    // Parallax-like movement for hero gradient background
    gsap.to(".gradient-orbit", {
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }
});
