// Critical above-the-fold CSS — inlined to eliminate render-blocking
// These styles cover the initial viewport (header + hero area).
// The full CSS files (bootstrap, style.css, style.scss) load asynchronously.
const criticalCSS = `
/* ── CSS Variables ─────────────────────────────── */
:root {
  --clr-primary-green: #49a078;
  --clr-dark-green: #216869;
  --clr-black: #1f2421;
  --clr-light-green: #9cc5a1;
  --clr-platinum: #dce1de;
  --clr-off-white: #f6f5f3;
  --ff-text: var(--font-raleway), "Raleway", sans-serif;
}

/* ── Reset / Reboot ────────────────────────────── */
* { margin: 0; padding: 0; box-sizing: border-box; }

body, html {
  color: #c8c8cd;
  scroll-behavior: smooth;
  font-family: var(--ff-text);
  background-color: var(--clr-black);
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  color: #fefefe;
  font-weight: 600;
  line-height: 1.4;
  font-family: "Unbounded", sans-serif;
}

p { font-size: 16px; line-height: 1.67; }
@media (min-width: 1200px) { p { font-size: 18px; } }

a, a:hover, a:focus {
  transition-duration: 500ms;
  text-decoration: none;
  outline: 0 solid transparent;
  color: #fefefe;
  font-family: "Unbounded", sans-serif;
}

ul, ol { margin-bottom: 0; }
button, .btn { font-family: "Unbounded", sans-serif; }
img { max-width: 100%; height: auto; }

input:required, textarea:required,
input:invalid, textarea:invalid {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}

/* ── Container ─────────────────────────────────── */
.container, .container-lg, .container-md,
.container-sm, .container-xl, .container-xxl {
  max-width: 320px;
}
@media (min-width: 400px) { .container { max-width: 360px; } }
@media (min-width: 480px) { .container { max-width: 420px; } }
@media (min-width: 576px) { .container { max-width: 520px; } }
@media (min-width: 768px) { .container { max-width: 700px; } }
@media (min-width: 992px) { .container { max-width: 940px; } }
@media (min-width: 1200px) { .container { max-width: 1120px; } }
@media (min-width: 1400px) { .container { max-width: 1280px; } }

/* ── Buttons ───────────────────────────────────── */
.btn {
  border: 0 !important;
  font-size: 13px;
  padding: 14px 32px;
  border-radius: 2rem;
  font-weight: 600;
  letter-spacing: -0.14px;
  overflow: hidden;
  position: relative;
  height: 48px;
  min-width: 180px;
  text-transform: uppercase;
}
@media (min-width: 1200px) {
  .btn { font-size: 14px; padding: 18px 40px; height: 57px; min-width: 210px; }
}
.btn span {
  position: absolute;
  left: 50%;
  top: 50%;
  transition: transform 0.5s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
}
.btn span:first-child { transform: translateX(-50%) translateY(-50%); }
.btn span:last-child { transform: translateX(-50%) translateY(80px); }
.btn:hover span:first-child,
.btn:focus span:first-child,
.btn:active span:first-child { transform: translateX(-50%) translateY(-80px); }
.btn:hover span:last-child,
.btn:focus span:last-child,
.btn:active span:last-child { transform: translateX(-50%) translateY(-50%); }

.btn-primary {
  background-color: var(--clr-primary-green);
  color: var(--clr-black);
}
.btn-primary:hover, .btn-primary:focus, .btn-primary:active {
  background-color: var(--clr-dark-green);
  color: var(--clr-black);
}

.btn-dark {
  background-color: #141212;
  color: #ffffff !important;
}
.btn-dark:hover, .btn-dark:focus, .btn-dark:active {
  background-color: #252424;
  color: #ffffff !important;
}

.btn-link {
  position: relative;
  z-index: 1;
  color: var(--clr-primary-green);
  text-transform: uppercase;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 !important;
  min-width: 0;
  height: auto;
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 12px;
  height: 37px;
  min-width: 100px;
}

/* ── Utilities ─────────────────────────────────── */
.bg-img { background-size: cover; background-position: center center; background-repeat: no-repeat; }
.bg-fixed { background-attachment: fixed; }
.bg-overlay { position: relative; z-index: 1; }
.bg-overlay::after {
  position: absolute; content: ""; background-color: var(--clr-black);
  opacity: 0.5; top: 0; left: 0; height: 100%; width: 100%; z-index: -1;
}
.bg-secondary { background-color: #1a1a1a !important; }
.text-primary { color: var(--clr-primary-green) !important; }
.fz-14 { font-size: 14px !important; }
.fz-12 { font-size: 12px !important; }

/* ── Divider ───────────────────────────────────── */
.divider {
  width: 100%; display: block; height: 80px;
}
@media (min-width: 768px) { .divider { height: 120px; } }
@media (min-width: 1200px) { .divider { height: 140px; } }
.divider-sm { width: 100%; display: block; height: 60px; }

/* ── Section Heading ───────────────────────────── */
.section-heading h2 {
  font-size: clamp(32px, 4vw, 60px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -1.8px;
}

/* ── Material Symbols ──────────────────────────── */
.material-symbols-outlined {
  font-family: "Material Symbols Outlined";
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  display: inline-block;
  line-height: 1;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.material-symbols-rounded {
  font-family: "Material Symbols Rounded";
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  direction: ltr;
}
.material-symbols-sharp {
  font-family: "Material Symbols Sharp";
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  direction: ltr;
}

/* ── Header Area ───────────────────────────────── */
.header-area {
  background-color: transparent;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: var(--clr-black);
  transition: all 400ms;
}
.header-area::after {
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: rgba(254, 254, 254, 0.2);
  content: "";
  bottom: 0;
  left: 0;
  z-index: -10;
}
@media (min-width: 992px) { .header-area { box-shadow: none; } }
.header-area .navbar {
  padding-top: 1rem;
  padding-bottom: 1rem;
  transition: all 400ms;
}
@media (min-width: 992px) {
  .header-area .navbar { height: 110px; padding-top: 0; padding-bottom: 0; }
}
.header-area .navbar .navbar-brand {
  margin-right: 2rem;
  line-height: 1 !important;
  max-width: 50%;
}
@media (width < 400px) { .header-area .navbar .navbar-brand { max-width: 45%; } }
.navbar-brand > img { max-width: 70%; }
@media (width < 992px) { .navbar-brand > img { max-width: 90%; } }
.header-area .navbar-nav { margin-top: 1rem; margin-bottom: 1rem; }
@media (min-width: 992px) { .header-area .navbar-nav { gap: 36px; } }
@media (min-width: 1200px) { .header-area .navbar-nav { gap: 44px; } }
.header-area .navbar-nav li > a {
  display: inline-block;
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.header-area .navbar-nav li > a:hover { color: #49a078; }
.header-area.sticky-on {
  background-color: var(--clr-black);
  box-shadow: 0 1rem 3rem rgba(194, 199, 240, 0.175);
}
@media (min-width: 992px) { .header-area.sticky-on .navbar { height: 90px; } }
.light-logo { display: none; }
.header-area .navbar-toggler {
  padding: 0;
  width: 1.75rem;
  height: 1.75rem;
  font-size: 1.5rem;
  color: #ffffff;
  border: 0;
}

/* ── Theme / Language Toggle ───────────────────── */
.theme-btn {
  margin-right: 36px;
  border: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}
.theme-btn span { color: #c8c8cd; font-size: 24px; }
.theme-btn .moon { display: none; }
.theme-btn.light-mode-active .sun { display: none; }
.theme-btn.light-mode-active .moon { display: block; }

/* ── Side Menu Button ──────────────────────────── */
.sideMenuButton {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  min-width: 50px;
  padding: 0;
}

/* ── Hero Section ──────────────────────────────── */
.hero-wrapper { margin-top: 68px; }
@media (min-width: 992px) { .hero-wrapper { margin-top: 110px; } }
.hero-content h2 {
  font-weight: 700;
  letter-spacing: -3.6px;
  font-size: 56px;
}
@media (min-width: 768px) { .hero-content h2 { font-size: 72px; } }
@media (min-width: 992px) { .hero-content h2 { font-size: 90px; } }
@media (min-width: 1200px) { .hero-content h2 { font-size: 110px; } }
@media (min-width: 1400px) { .hero-content h2 { font-size: 120px; } }
.hero-content .hero-subtitle {
  color: #c8c8cd;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  margin-left: 0;
  line-height: 1.75;
  display: block;
}
.hero-content.home2 h2 {
  color: #ffffff;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -2px;
}
@media (min-width: 768px) { .hero-content.home2 h2 { font-size: 56px; } }
@media (min-width: 992px) { .hero-content.home2 h2 { font-size: 66px; } }
@media (min-width: 1200px) { .hero-content.home2 h2 { font-size: 80px; } }
@media (min-width: 1400px) { .hero-content.home2 h2 { font-size: 100px; } }
.hero-content.home2 .imgs-group {
  display: flex;
  align-items: center;
}
.hero-content.home2 .imgs-group img {
  flex: 0 0 50px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #fefefe;
}
.hero-content.home2 .imgs-group img:nth-child(2) {
  transform: translateX(-24px);
}
.hero-content.home2 .imgs-group div {
  flex: 0 0 50px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #fefefe;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--clr-primary-green);
  color: var(--clr-black);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.14px;
  text-transform: uppercase;
  text-align: center;
  transform: translateX(-48px);
}
.hero-content.home2 h6 {
  color: #fefefe;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.14px;
  text-transform: uppercase;
}

/* ── Offcanvas ─────────────────────────────────── */
.right-side-devAgency-offcanvas {
  width: 95% !important;
  background-color: var(--clr-black);
}
.offcanvas-header > a > img { max-width: 50%; }
@media (width > 500px) { .offcanvas-header > a > img { max-width: 30%; } }

/* ── Section heading overrides ─────────────────── */
.section-heading .counter {
  margin-bottom: 1rem;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: var(--clr-primary-green);
  display: block;
  line-height: 150px;
  color: var(--clr-black);
  margin-left: auto;
  margin-right: auto;
}

/* ── Heading override from style.scss ──────────── */
.hero-content h2, .hero-content.home2 h2 {
  font-family: var(--font-unbounded), "Unbounded", sans-serif;
}
`;

export default criticalCSS;
