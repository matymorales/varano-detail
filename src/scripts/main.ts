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

/* ---------- Global search ---------- */
const searchToggle = document.querySelector<HTMLButtonElement>("[data-search-toggle]");
const searchOverlay = document.querySelector<HTMLElement>("[data-search-overlay]");
const searchInput = document.querySelector<HTMLInputElement>("[data-search-input]");
const searchClose = document.querySelector<HTMLButtonElement>("[data-search-close]");
const searchResults = document.querySelector<HTMLElement>("[data-search-results]");
const searchEmpty = document.querySelector<HTMLElement>("[data-search-empty]");

interface SearchResult {
  title: string;
  desc: string;
  section: string;
  href: string;
}

const searchData: SearchResult[] = [
  { title: "Lavados premium", desc: "Lavado completo, técnica profesional", section: "Servicios", href: "#servicios" },
  { title: "Abrillantados y tratamientos", desc: "Pulido, sellado y revestimientos", section: "Servicios", href: "#servicios" },
  { title: "Interior full", desc: "Limpieza profunda de tapizados", section: "Servicios", href: "#servicios" },
  { title: "Tapizados", desc: "Restauración y limpieza de tapizados", section: "Servicios", href: "#servicios" },
  { title: "Limpieza de motor", desc: "Desengrase y protección del motor", section: "Servicios", href: "#servicios" },
  { title: "Restauración de ópticas", desc: "Recuperación total de faros", section: "Servicios", href: "#servicios" },
  { title: "2x1 en Lavados Premium", desc: "Segundo lavado gratis. Válido hasta 30/09", section: "Promos", href: "#promos" },
  { title: "Zona sur · GBA", desc: "Lun a Sáb · 9:00 a 19:00 hs", section: "Contacto", href: "#contacto" },
  { title: "Instagram @varanodetail", desc: "Seguinos para ver trabajos", section: "Contacto", href: "#contacto" },
];

const openSearch = () => {
  if (!searchOverlay) return;
  searchOverlay.classList.remove("hidden");
  document.documentElement.style.overflow = "hidden";
  setTimeout(() => searchInput?.focus(), 100);
};

const closeSearch = () => {
  if (!searchOverlay) return;
  searchOverlay.classList.add("hidden");
  document.documentElement.style.overflow = "";
  if (searchInput) searchInput.value = "";
  if (searchResults) searchResults.innerHTML = "";
  if (searchEmpty) searchEmpty.classList.add("hidden");
};

const renderResults = (query: string) => {
  if (!searchResults || !searchEmpty) return;
  const q = query.toLowerCase().trim();
  if (!q) {
    searchResults.innerHTML = "";
    searchEmpty.classList.add("hidden");
    return;
  }

  const matches = searchData.filter(
    (d) => d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q) || d.section.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    searchResults.innerHTML = "";
    searchEmpty.classList.remove("hidden");
    return;
  }

  searchEmpty.classList.add("hidden");
  searchResults.innerHTML = matches
    .map(
      (m) => `
      <a href="${m.href}" class="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3 transition-colors hover:border-racing-orange/40 hover:bg-white/[0.06]" data-search-result>
        <div>
          <p class="text-sm font-semibold text-white">${m.title}</p>
          <p class="text-xs text-white/50">${m.desc}</p>
        </div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-racing-orange/70">${m.section}</span>
      </a>`
    )
    .join("");
};

searchToggle?.addEventListener("click", openSearch);
searchClose?.addEventListener("click", closeSearch);
searchInput?.addEventListener("input", () => renderResults(searchInput.value));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSearch();
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    e.preventDefault();
    openSearch();
  }
});

searchResults?.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).closest("[data-search-result]")) closeSearch();
});

/* ---------- Benefits modal ---------- */
const modal = document.createElement("div");
modal.className = "fixed inset-0 z-[80] hidden items-center justify-center bg-carbon-950/90 backdrop-blur-sm p-5";
modal.setAttribute("role", "dialog");
modal.setAttribute("aria-modal", "true");
modal.innerHTML = `
  <div class="relative w-full max-w-md rounded-2xl border border-white/10 bg-carbon-800 p-6 sm:p-8">
    <button data-modal-close aria-label="Cerrar" class="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/45 hover:text-white">
      <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <h3 data-modal-title class="font-display text-xl font-extrabold uppercase tracking-tight text-white pr-12 sm:text-2xl"></h3>
    <p class="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-racing-orange">Beneficios del servicio</p>
    <ul data-modal-benefits class="mt-5 flex flex-col gap-3"></ul>
  </div>
`;
document.body.appendChild(modal);

const modalTitle = modal.querySelector<HTMLElement>("[data-modal-title]");
const modalBenefits = modal.querySelector<HTMLElement>("[data-modal-benefits]");
const modalClose = modal.querySelector<HTMLButtonElement>("[data-modal-close]");

const openModal = (name: string, benefits: string[]) => {
  if (!modalTitle || !modalBenefits) return;
  modalTitle.textContent = name;
  modalBenefits.innerHTML = benefits
    .map((b) => `<li class="flex items-start gap-3 text-sm text-white/70"><svg viewBox="0 0 24 24" class="mt-0.5 h-4 w-4 shrink-0 text-racing-orange" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>${b}</li>`)
    .join("");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.documentElement.style.overflow = "hidden";
};

const closeModal = () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.documentElement.style.overflow = "";
};

document.querySelectorAll<HTMLButtonElement>("[data-gallery-info]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const name = btn.dataset.serviceName ?? "";
    const benefits = JSON.parse(btn.dataset.benefits ?? "[]");
    openModal(name, benefits);
  });
});

modalClose?.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});