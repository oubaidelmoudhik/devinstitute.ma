# Style Guide for devagency.ma

This comprehensive style guide documents all style-related elements used in the devagency.ma website, including colors, typography, spacing, borders, components, responsive design, and assets.

## 1. Colors

The website uses a carefully curated color palette based on CSS custom properties (variables) for consistency and maintainability.

### Primary Color Variables

```css
:root {
  /* Primary greens */
  --clr-primary-green: #49a078;
  --clr-dark-green: #216869;
  --clr-light-green: #9cc5a1;

  /* Neutrals */
  --clr-black: #1f2421;
  --clr-platinum: #dce1de;
  --clr-off-white: #f6f5f3;
}
```

### Usage Patterns

**Primary Green (#49a078)**: Used for buttons, accents, and call-to-action elements

```tsx
<button className="btn btn-primary">Contact Us</button>
```

**Dark Green (#216869)**: Used for button hover states and secondary accents

```tsx
.btn-primary:hover {
  background-color: var(--clr-dark-green);
}
```

**Black (#1f2421)**: Primary background color for the site

```css
body {
  background-color: var(--clr-black);
}
```

**Text Colors**:

- Headings: #fefefe (near-white)
- Body text: #c8c8cd (light gray)
- Dark text on light backgrounds: #1a1a1a

**Additional Colors Used**:

- #ffffff (pure white)
- #1a1a1a (dark gray for cards)
- rgba(254, 254, 254, 0.2) (transparent white for borders)

## 2. Typography

The website employs a clean, modern typography system with Google Fonts integration.

### Font Families

```css
/* Imported fonts */
@import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&family=Unbounded:wght@200..900&display=swap");

/* CSS variables */
:root {
  --ff-text: "Raleway", sans-serif;
}

/* Global typography */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Unbounded", sans-serif;
  color: #fefefe;
  font-weight: 600;
  line-height: 1.4;
}

body,
p {
  font-family: var(--ff-text);
  font-size: 16px;
  line-height: 1.67;
}

@media only screen and (min-width: 1200px) {
  p {
    font-size: 18px;
  }
}
```

### Font Sizes and Hierarchy

**Headings**:

- Section headings: `clamp(32px, 4vw, 60px)` with 600 weight, 1.2 line-height, -1.8px letter-spacing
- Hero titles: Responsive from 56px to 120px
- Card titles: 24px with -0.48px letter-spacing

**Body Text**:

- Standard paragraphs: 16px/18px (desktop)
- Form labels: 14px
- Small text: 12px

### Usage Examples

```tsx
{
  /* Section heading */
}
<h2 className="section-heading">Our Services</h2>;

{
  /* Hero title */
}
<h2 className="hero-content h2">Welcome to Dev Institute</h2>;

{
  /* Body text */
}
<p className="mb-0">We provide comprehensive web development solutions.</p>;
```

## 3. Spacing

The website uses a systematic spacing approach with responsive scaling.

### Container System

Custom responsive containers instead of standard Bootstrap:

```css
.container {
  max-width: 320px; /* mobile */
}

@media (min-width: 400px) {
  max-width: 360px;
}
@media (min-width: 480px) {
  max-width: 420px;
}
@media (min-width: 576px) {
  max-width: 520px;
}
@media (min-width: 768px) {
  max-width: 700px;
}
@media (min-width: 992px) {
  max-width: 940px;
}
@media (min-width: 1200px) {
  max-width: 1120px;
}
@media (min-width: 1400px) {
  max-width: 1280px;
}
```

### Spacing Utilities

**Dividers**:

```css
.divider {
  height: 80px; /* mobile */
}

@media only screen and (min-width: 768px) {
  height: 120px;
}
@media only screen and (min-width: 1200px) {
  height: 140px;
}

.divider-sm {
  height: 60px;
}
```

**Button Spacing**:

```css
.btn {
  padding: 14px 32px;
  height: 48px;
  min-width: 180px;
}

@media only screen and (min-width: 1200px) {
  .btn {
    padding: 18px 40px;
    height: 57px;
    min-width: 210px;
  }
}
```

**Component Spacing**:

- Card padding: 50px 36px (services), 40px 36px (pricing)
- Form gaps: 30px between fields
- Navigation gaps: 36px between items

## 4. Borders, Shadows, and Radii

### Border Radius

**Standard Radii**:

- Buttons: 2rem (32px)
- Cards: 20px
- Circular elements: 50%
- Forms: 8px
- Small elements: 0.25rem (4px)

### Shadows

```css
.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(47, 91, 234, 0.075);
}

.shadow {
  box-shadow: 0 0.5rem 1rem rgba(47, 91, 234, 0.15);
}

.shadow-lg {
  box-shadow: 0 1rem 3rem rgba(47, 91, 234, 0.175);
}
```

### Usage in Components

```css
.service-slide-card {
  border-radius: 20px;
  border: 1px solid rgba(254, 254, 254, 0.2);
  background: #1a1a1a;
}

.price-card {
  border-radius: 20px;
  border: 1px solid rgba(254, 254, 254, 0.2);
}
```

## 5. Components

### Buttons

**Primary Button**:

```css
.btn-primary {
  background-color: var(--clr-primary-green);
  color: var(--clr-black);
}

.btn-primary:hover {
  background-color: var(--clr-dark-green);
}
```

**Dark Button**:

```css
.btn-dark {
  background-color: #141212;
  color: #ffffff;
}

.btn-dark:hover {
  background-color: #252424;
}
```

**Link Button**:

```css
.btn-link {
  color: var(--clr-primary-green);
  text-transform: uppercase;
  text-decoration: none;
}
```

**Usage**:

```tsx
<button className="btn btn-primary">
  <span>Get Started</span>
  <span>Get Started</span>
</button>
```

### Cards

**Service Cards**:

- Background: #1a1a1a
- Border: 1px solid rgba(254, 254, 254, 0.2)
- Border-radius: 20px
- Hover: background-color: var(--clr-primary-green)

**Portfolio Cards**:

- Border-radius: 20px
- Overlay content with white background
- Hover transforms and filters

### Navigation

**Header Navigation**:

- Fixed positioning
- Background overlay on scroll
- Dropdown menus with dark backgrounds
- Mobile hamburger menu

### Forms

**Form Controls**:

```css
.form-control {
  height: 64px;
  border-radius: 8px;
  border: 1px solid rgba(254, 254, 254, 0.2);
  background-color: transparent;
  color: #c8c8cd;
  padding: 17px 24px;
}

.form-control:focus {
  border: 1px solid var(--clr-primary-green);
  box-shadow: none;
}
```

### Backgrounds

**Background Utilities**:

```css
.bg-img {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.bg-overlay::after {
  background-color: var(--clr-black);
  opacity: 0.5;
}

.bg-fixed {
  background-attachment: fixed;
}
```

**Usage**:

```tsx
<div
  className="bg-img bg-overlay jarallax"
  style={{ backgroundImage: `url(${imageUrl})` }}
  data-jarallax
  data-speed="0.6"
>
  Content
</div>
```

## 6. Responsive Design

### Breakpoints

- Mobile: < 576px
- Tablet: 576px - 991px
- Desktop: 992px - 1199px
- Large Desktop: 1200px+

### Responsive Patterns

**Typography Scaling**:

```css
.hero-content h2 {
  font-size: 56px;
}

@media only screen and (min-width: 768px) {
  .hero-content h2 {
    font-size: 72px;
  }
}

@media only screen and (min-width: 992px) {
  .hero-content h2 {
    font-size: 90px;
  }
}

@media only screen and (min-width: 1200px) {
  .hero-content h2 {
    font-size: 110px;
  }
}

@media only screen and (min-width: 1400px) {
  .hero-content h2 {
    font-size: 120px;
  }
}
```

**Component Responsiveness**:

- Containers scale from 320px to 1280px
- Buttons increase padding and height on desktop
- Navigation switches from mobile menu to horizontal layout at 992px
- Cards adjust padding and text sizes

## 7. Assets

### Image Organization

**Directory Structure**:

```
public/assets/img/
├── bg-img/          # Background images
├── core-img/        # Core branding images
├── demo-img/        # Demo/example images
├── partner-img/     # Partner logos
└── portfolio/       # Portfolio work samples
```

### Background Images

Common background patterns:

```tsx
{/* Hero background */}
<div style={{backgroundImage: "url(/assets/img/bg-img/1.webp)"}}>

{/* Section background */}
<div style={{backgroundImage: "url(/assets/img/bg-img/32.webp)"}}>
```

### Icons

**Material Symbols**:

```css
.material-symbols-outlined {
  font-family: "Material Symbols Outlined";
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}
```

**Usage**:

```tsx
<span className="material-symbols-outlined">arrow_forward</span>
```

## 8. Animations

### Wow.js Integration

**Animation Classes**:

```tsx
<h2 className="wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="700ms">
  Animated Content
</h2>
```

**Common Animations**:

- fadeInUp: Most common, with 1000ms duration
- Delays: 700ms, 900ms, 1100ms, 1200ms for sequential reveals

### CSS Animations

**Video Button Sonar Effect**:

```css
.video-sonar {
  animation: video-sonar 2s linear infinite;
}

@keyframes video-sonar {
  0% {
    opacity: 1;
    transform: scale(0.5);
  }
  100% {
    opacity: 0;
    transform: scale(1.3);
  }
}
```

**Hover Transitions**:

- Duration: 400-500ms for smooth interactions
- Properties: transform, opacity, background-color, box-shadow

### Animate.css Library

Full Animate.css library included for additional effects:

- bounce, flash, pulse, etc.
- Applied via className: `className="animated fadeIn"`

## 9. Bootstrap Integration

### Bootstrap Classes Used

**Layout**:

- Container system (custom overrides)
- Row/column grid: `row`, `col-12`, `col-md-6`, etc.
- Flex utilities: `d-flex`, `justify-content-center`, `align-items-center`

**Components**:

- Navbar: `navbar`, `navbar-expand-lg`
- Buttons: `btn`, `btn-primary` (heavily customized)
- Forms: `form-control`, `form-check`
- Modals: `modal`, `modal-dialog`
- Accordions: `accordion`, `accordion-item`

**Utilities**:

- Spacing: `p-4`, `m-0`, `gap-3`
- Colors: `text-primary`, `bg-secondary`
- Borders: `border`, `rounded`
- Display: `d-none`, `d-block`

### Bootstrap Overrides

Extensive customization in style.scss to match design system:

- Button styles completely overridden
- Container max-widths customized
- Form controls styled for dark theme
- Default colors replaced with custom palette

## 10. Best Practices

### Code Style

- Relative imports: `../../components/...`
- PascalCase for components
- camelCase for variables/functions
- Functional React components with hooks
- SCSS with CSS variables for theming

### Performance

- Image optimization via build process
- CSS minification
- Font preloading for Google Fonts
- Lazy loading for images where appropriate

### Accessibility

- Proper color contrast ratios
- Focus states for interactive elements
- Semantic HTML structure
- ARIA labels where needed

### Maintenance

- Centralized color variables
- Consistent naming conventions
- Modular component structure
- Responsive-first approach

This style guide should be updated whenever new design elements are introduced to maintain consistency across the website.
