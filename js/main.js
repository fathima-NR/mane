const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "About" },
  { href: "services.html", label: "Services" },
  { href: "gallery.html", label: "Gallery" },
  { href: "pricing.html", label: "Pricing" },
  { href: "team.html", label: "Team" },
  { href: "contact.html", label: "Contact" },
];

const LOGO = `
  <a href="index.html" class="logo" aria-label="Mane Barber Studio home">
    <span class="mark">M</span>
    <span class="name">MANE</span>
    <span class="tag">BARBER STUDIO</span>
  </a>`;

function renderHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;
  const current = location.pathname.split("/").pop() || "index.html";
  const links = NAV_LINKS.map(
    (l) => `<li><a href="${l.href}" class="${l.href === current ? "active" : ""}">${l.label}</a></li>`
  ).join("");

  el.innerHTML = `
    <div class="topbar">
      <div class="container">
        <span>Mon – Sat: 9:00 AM – 9:00 PM &nbsp;|&nbsp; Sun: 10:00 AM – 6:00 PM</span>
        <span class="hide-sm"><a href="tel:+97140000000">+971 4 000 0000</a> &nbsp;|&nbsp; <a href="mailto:hello@manestudio.com">hello@manestudio.com</a></span>
      </div>
    </div>
    <header class="header">
      <div class="container">
        ${LOGO}
        <nav class="nav" id="nav"><ul>${links}</ul></nav>
        <a href="contact.html#book" class="btn btn-dark header-cta">Book Now</a>
        <button class="menu-toggle" id="menu-toggle" aria-label="Open menu"><span></span><span></span><span></span></button>
      </div>
    </header>`;

  document.getElementById("menu-toggle").addEventListener("click", () => {
    document.getElementById("nav").classList.toggle("open");
  });
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  const links = NAV_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("");

  el.innerHTML = `
    <footer class="footer">
      <div class="container footer-grid">
        <div>
          ${LOGO}
          <p>Precision cuts, classic shaves and modern grooming for the gentleman who values the details.</p>
          <div class="footer-socials">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="TikTok">TT</a>
            <a href="#" aria-label="YouTube">YT</a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>${links}</ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="services.html">Signature Haircut</a></li>
            <li><a href="services.html">Skin Fade</a></li>
            <li><a href="services.html">Beard Sculpting</a></li>
            <li><a href="services.html">Hot Towel Shave</a></li>
            <li><a href="services.html">Facial &amp; Grooming</a></li>
          </ul>
        </div>
        <div>
          <h4>Visit Us</h4>
          <p>12 Al Wasl Road, Jumeirah<br />Dubai, UAE</p>
          <p style="margin-top:1rem"><a href="tel:+97140000000">+971 4 000 0000</a><br /><a href="mailto:hello@manestudio.com">hello@manestudio.com</a></p>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">© ${new Date().getFullYear()} Mane Barber Studio. All rights reserved.</div>
      </div>
    </footer>`;
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((i) => io.observe(i));
}

function initGallery() {
  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".gallery-item");
  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      items.forEach((it) => it.classList.toggle("hide", f !== "all" && it.dataset.cat !== f));
    })
  );

  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  const img = lightbox.querySelector("img");
  items.forEach((it) =>
    it.addEventListener("click", () => {
      img.src = it.querySelector("img").src.replace(/w=\d+/, "w=1600");
      lightbox.classList.add("open");
    })
  );
  const close = () => lightbox.classList.remove("open");
  lightbox.querySelector(".lightbox-close").addEventListener("click", close);
  lightbox.addEventListener("click", (e) => e.target === lightbox && close());
  document.addEventListener("keydown", (e) => e.key === "Escape" && close());
}

function initForms() {
  document.querySelectorAll("form[data-demo]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = form.querySelector(".form-msg");
      if (msg) msg.classList.add("show");
      form.reset();
    });
  });

  const date = document.querySelector('input[type="date"]');
  if (date) date.min = new Date().toISOString().split("T")[0];
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  initReveal();
  initGallery();
  initForms();
});
