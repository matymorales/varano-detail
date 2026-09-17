const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Navbar scroll state ---------- */
const header = document.querySelector<HTMLElement>("[data-navbar]");
const updateNav = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};
updateNav();
if (header) window.addEventListener("scroll", updateNav, { passive: true });

/* ---------- Mobile menu ---------- */
const menuToggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const menu = document.querySelector<HTMLElement>("[data-menu]");
const menuClose = document.querySelector<HTMLButtonElement>("[data-menu-close]");
let menuOpen = false;

const setMenu = (open: boolean) => {
  if (!menu) return;
  menuOpen = open;
  document.documentElement.style.overflow = open ? "hidden" : "";
  menu.setAttribute("aria-hidden", String(!open));
  menu.classList.toggle("is-open", open);
  if (menuToggle) menuToggle.setAttribute("aria-expanded", String(open));
  if (open) menu.querySelectorAll<HTMLAnchorElement>("a").forEach((a, i) => {
    a.style.transitionDelay = `${120 + i * 60}ms`;
    a.classList.toggle("is-in", true);
  });
};
menuToggle?.addEventListener("click", () => setMenu(!menuOpen));
menuClose?.addEventListener("click", () => setMenu(false));
menu?.querySelectorAll("a[href^='#']").forEach((a) =>
  a.addEventListener("click", () => setMenu(false))
);

/* ---------- Reveal on scroll ---------- */
const revealables = document.querySelectorAll<HTMLElement>("[data-reveal]");
if (reduced || !("IntersectionObserver" in window)) {
  revealables.forEach((el) => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  revealables.forEach((el) => io.observe(el));
}

/* ---------- Before/After slider ---------- */
const ba = document.querySelector<HTMLElement>("[data-ba]");
if (ba) {
  const clips = ba.querySelectorAll<HTMLElement>("[data-ba-clip]");
  const input = ba.querySelector<HTMLInputElement>("[data-ba-input]");
  const labels = ba.querySelectorAll<HTMLElement>("[data-ba-label]");
  const set = (p: number) => {
    const v = Math.max(0, Math.min(100, p));
    clips.forEach((c) => (c.style.clipPath = `inset(0 ${100 - v}% 0 0)`));
    if (input) input.value = String(v);
    ba.style.setProperty("--pos", `${v}%`);
    labels.forEach((l) => {
      if (l.dataset.baLayer === "before") l.style.right = `calc(100% - ${v}%)`;
    });
  };

  let dragging = false;
  const pt = (x: number) => {
    const r = ba.getBoundingClientRect();
    set(((x - r.left) / r.width) * 100);
  };

  input?.addEventListener("input", () => set(Number(input.value)));

  ba.addEventListener("pointerdown", (e) => {
    dragging = true;
    ba.setPointerCapture(e.pointerId);
    ba.classList.add("is-dragging");
    pt(e.clientX);
  });
  ba.addEventListener("pointermove", (e) => {
    if (dragging) pt(e.clientX);
  });
  const stop = () => {
    dragging = false;
    ba.classList.remove("is-dragging");
  };
  ba.addEventListener("pointerup", stop);
  ba.addEventListener("pointercancel", stop);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const cur = input ? Number(input.value) : 50;
    set(Math.max(0, Math.min(100, cur + (e.key === "ArrowRight" ? 5 : -5))));
  });
  ba.tabIndex = 0;
}

/* ---------- Gallery rail ---------- */
const rail = document.querySelector<HTMLElement>("[data-gallery]");
if (rail) {
  const filters = document.querySelectorAll<HTMLButtonElement>("[data-gallery-filter]");
  const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-category]"));
  const progress = document.querySelector<HTMLElement>("[data-gallery-progress]");

  const setProgress = () => {
    if (!progress) return;
    const max = rail.scrollWidth - rail.clientWidth;
    const p = max > 0 ? Math.min(1, Math.max(0, rail.scrollLeft / max)) : 0;
    progress.style.transform = `scaleX(${p})`;
  };
  setProgress();
  rail.addEventListener("scroll", setProgress, { passive: true });
  window.addEventListener("resize", setProgress);

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.galleryFilter ?? "all";
      filters.forEach((b) => b.classList.toggle("is-active", b === btn));
      cards.forEach((card) => {
        card.classList.toggle(
          "hidden",
          cat !== "all" && card.dataset.category !== cat
        );
      });
      rail.scrollTo({ left: 0, behavior: "smooth" });
      requestAnimationFrame(setProgress);
    });
  });

  const step = () => {
    const first = rail.querySelector<HTMLElement>("[data-category]:not(.hidden)");
    return (first ? first.getBoundingClientRect().width : 400) + 20;
  };
  document
    .querySelector("[data-gallery-next]")
    ?.addEventListener("click", () => rail.scrollBy({ left: step(), behavior: "smooth" }));
  document
    .querySelector("[data-gallery-prev]")
    ?.addEventListener("click", () => rail.scrollBy({ left: -step(), behavior: "smooth" }));

  let drag = false;
  let startX = 0;
  let startLeft = 0;
  rail.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    drag = true;
    startX = e.clientX;
    startLeft = rail.scrollLeft;
    rail.style.scrollSnapType = "none";
  });
  window.addEventListener("pointermove", (e) => {
    if (!drag) return;
    rail.scrollLeft = startLeft - (e.clientX - startX);
  });
  const endDrag = () => {
    if (!drag) return;
    drag = false;
    rail.style.scrollSnapType = "";
    setProgress();
  };
  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);
}