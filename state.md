# Dev Institute Website - Current State

## 📋 Project Overview

**Dev Institute** is a modern web development agency website built with Next.js 16, TypeScript, and Bootstrap 5. The site showcases web development services in Morocco with a focus on clean design, performance, and internationalization support.

**Live URL:** https://devinstitute.ma
**Tech Stack:** Next.js 16, TypeScript, Bootstrap 5, SCSS, React 18
**Languages:** English (default), French

---

## 🏗️ Project Structure

### Root Directory Structure
```
devinstitute.ma/
├── .tmp/                          # Temporary files
├── app/                           # Next.js App Router
│   ├── contact/                   # Contact page
│   ├── ga/                        # Google Analytics integration
│   ├── service/                   # Services page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── ClientLayout.tsx           # Client-side layout wrapper
│   ├── ClientProviders.tsx        # Context providers
│   ├── not-found.tsx              # 404 page
│   └── sitemap.ts                 # Sitemap generation
├── components/                    # React components
│   ├── blog-details/              # Blog detail components
│   ├── blog/                      # Blog listing components
│   ├── common/                    # Shared components
│   ├── contact/                   # Contact page components
│   ├── error/                     # Error components
│   ├── faq/                       # FAQ components
│   ├── home/                      # Home page sections
│   ├── login/                     # Login components
│   ├── team/                      # Team components
│   ├── team-details/              # Team detail components
│   ├── portfolio-details/         # Portfolio detail components
│   ├── portfolio/                 # Portfolio components
│   ├── reusable/                  # Reusable components
│   └── service/                   # Service page components
├── i18n/                          # Internationalization
│   ├── en/                        # English translations
│   ├── fr/                        # French translations
│   ├── config.ts                  # i18n configuration
│   ├── index.ts                   # i18n setup
│   └── provider.tsx               # i18n provider
├── layouts/                       # Layout components
│   ├── footers/                   # Footer layouts
│   ├── headers/                   # Header layouts
│   └── Wrapper.tsx                # Page wrapper
├── public/                        # Static assets
│   ├── assets/
│   │   ├── css/                   # Compiled CSS
│   │   ├── img/                   # Images
│   │   │   ├── bg-img/           # Background images
│   │   │   ├── core-img/         # Core images
│   │   │   ├── demo-img/         # Demo images
│   │   │   ├── partner-img/      # Partner logos
│   │   │   └── portfolio/        # Portfolio images
│   │   └── large-img/            # Large image variants
│   └── favicon.ico               # Favicon
├── styles/                        # SCSS styles
└── Configuration files (package.json, tsconfig.json, etc.)
```

---

## 🌐 Pages & Routes

### ✅ Active Pages

| Route | Status | Description |
|-------|--------|-------------|
| `/` | ✅ Active | Home page with hero, mission, projects, categories, process, and FAQ sections |
| `/contact` | ✅ Active | Contact page with contact form and information |
| `/service` | ✅ Active | Services page with service cards and about section |

### 🚧 Planned/Inactive Pages

| Route | Status | Notes |
|-------|--------|-------|
| `/blog` | 🚧 Planned | Blog listing (components exist but not routed) |
| `/blog-details` | 🚧 Planned | Individual blog posts |
| `/portfolio` | 🚧 Planned | Portfolio showcase |
| `/portfolio-details` | 🚧 Planned | Portfolio project details |
| `/team` | 🚧 Planned | Team member profiles |
| `/team-details` | 🚧 Planned | Individual team member pages |
| `/pricing` | 🚧 Planned | Pricing plans |
| `/login` | 🚧 Planned | User authentication |

---

## 🎨 Design System

### Color Palette
```css
:root {
  --clr-primary-green: #49a078;    /* Primary brand color */
  --clr-dark-green: #216869;       /* Dark green for hovers */
  --clr-light-green: #9cc5a1;      /* Light green accents */
  --clr-black: #1f2421;            /* Primary background */
  --clr-platinum: #dce1de;         /* Light neutral */
  --clr-off-white: #f6f5f3;        /* Off-white */
}
```

### Typography
- **Headings:** "Unbounded" font family (Google Fonts)
- **Body:** "Raleway" font family (Google Fonts)
- **Responsive scaling:** Hero titles scale from 56px to 120px
- **Breadcrumb H1:** Responsive with `clamp(2.5rem, 8vw, 4.5rem)` (40px to 72px)

### Components
- **Buttons:** Primary green (#49a078) with rounded corners (2rem)
- **Cards:** Dark background (#1a1a1a) with subtle borders
- **Forms:** Dark theme with green focus states
- **Navigation:** Fixed header with mobile hamburger menu

---

## 🔧 Technical Features

### ✅ Implemented Features

#### Internationalization (i18n)
- **Languages:** English (default), French
- **Coverage:** Home, contact, services, navigation, footer, common elements
- **Implementation:** React i18next with JSON translation files
- **Routing:** Language-specific URLs (`/fr/contact`)

#### Responsive Design
- **Breakpoints:** Mobile-first approach (320px → 1280px containers)
- **Typography:** Fluid scaling with clamp() functions
- **Components:** Bootstrap grid with custom responsive utilities

#### Performance Optimizations
- **Image optimization:** Next.js built-in optimization
- **CSS:** SCSS compilation with variables
- **Fonts:** Google Fonts preloading
- **Build:** Turbopack for faster development

#### UI/UX Enhancements
- **Animations:** Wow.js for scroll-triggered animations
- **Parallax:** Jarallax library for background effects
- **Hover effects:** Service cards with smooth transitions
- **Accessibility:** Proper contrast ratios and semantic HTML

### 🎯 Component Architecture

#### Page Components
- **Home Page:** Hero, Video, Mission, Projects, Categories, Process, FAQ
- **Contact Page:** Breadcrumb, ContactArea, CTA section
- **Services Page:** Breadcrumb, ServiceArea, ServiceAbout, PriceArea, CTA

#### Shared Components
- **Breadcrumb:** Configurable background images and responsive typography
- **HeaderOne:** Fixed navigation with language toggle
- **FooterOne:** Multi-section footer with links
- **LanguageToggle:** Language switching functionality

#### Feature Components
- **ServiceArea:** Interactive service cards with hover effects
- **ContactArea:** Contact form with validation
- **HeroArea:** Full-screen hero with animated content
- **ProjectArea:** Portfolio showcase with filtering

---

## 📦 Dependencies & Libraries

### Core Dependencies
```json
{
  "next": "^16.0.10",              // React framework
  "react": "^18.3.1",              // React library
  "bootstrap": "^5.3.3",           // CSS framework
  "i18next": "^25.0.1",            // Internationalization
  "sass": "^1.77.8",               // CSS preprocessor
  "animate.css": "^4.1.1",         // CSS animations
  "jarallax": "^2.2.1",            // Parallax effects
  "wow.js": "^1.2.2"               // Scroll animations
}
```

### Development Tools
```json
{
  "typescript": "^5.x",            // Type safety
  "eslint": "^9.x",                // Code linting
  "knip": "^5.x",                  // Unused dependency checker
  "@types/*": "various"            // TypeScript definitions
}
```

---

## 🚀 Build & Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run check-unused # Check for unused dependencies
```

### Build Configuration
- **Framework:** Next.js 16 with App Router
- **Styling:** SCSS with CSS modules
- **Images:** Unoptimized (configured for static hosting)
- **TypeScript:** Strict mode enabled

---

## 🌍 Internationalization Status

### ✅ Translated Sections
- **Home page:** Hero, mission, services, process, FAQ, counters
- **Contact page:** Form labels, contact info, CTA
- **Services page:** Service cards, about section, CTA
- **Navigation:** Menu items, breadcrumbs
- **Footer:** Links and content
- **Common:** Buttons, form elements

### 📊 Translation Coverage
- **English:** 100% complete
- **French:** 100% complete
- **Files:** 7 translation files per language
- **Keys:** ~50+ translation keys

---

## 🎯 Current Development Status

### ✅ Completed Features
- [x] Responsive homepage with all major sections
- [x] Contact page with functional form
- [x] Services page with interactive cards
- [x] Complete internationalization (EN/FR)
- [x] Modern UI with animations and effects
- [x] SEO optimization with meta tags
- [x] Performance optimizations
- [x] Accessibility considerations

### 🚧 In Progress / Planned
- [ ] Blog functionality
- [ ] Portfolio showcase
- [ ] Team member profiles
- [ ] Pricing plans
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Contact form backend integration
- [ ] Analytics dashboard

### 🔧 Recent Updates (Latest Commit)
- 🌐 **feat:** Enhanced services page with translations and UI improvements
- Added comprehensive internationalization for services page
- Made breadcrumb background configurable via props
- Improved service card hover spacing
- Added responsive typography to breadcrumb headings
- Fixed breadcrumb background image path issues

---

## 📊 Project Metrics

### Codebase Statistics
- **Components:** 40+ React components
- **Pages:** 3 active pages
- **Translation Keys:** 50+ per language
- **CSS/SCSS:** 600+ lines of styling
- **TypeScript:** Strict type checking enabled

### Performance
- **Build Time:** ~7 seconds (development)
- **Bundle Size:** Optimized with Next.js
- **Lighthouse Score:** Target 90+ (to be measured)
- **SEO:** Meta tags, structured data, sitemap

### Browser Support
- **Modern Browsers:** Chrome, Firefox, Safari, Edge
- **Mobile:** iOS Safari, Chrome Mobile
- **Responsive:** Mobile-first design (320px+)

---

## 🔗 External Integrations

### Analytics
- **Google Analytics 4:** Integrated via `react-ga4`
- **Tracking:** Page views, user interactions
- **Configuration:** Environment-based setup

### Fonts
- **Google Fonts:** Unbounded (headings), Raleway (body)
- **Material Symbols:** Icon font for UI elements
- **Preloading:** Optimized font loading

### Hosting
- **Platform:** Vercel (recommended)
- **Domain:** devinstitute.ma
- **SSL:** Automatic HTTPS
- **CDN:** Global edge network

---

## 📝 Development Guidelines

### Code Style
- **Language:** TypeScript with strict mode
- **Components:** Functional React with hooks
- **Imports:** Relative paths (`../../`)
- **Naming:** PascalCase (components), camelCase (variables)
- **Formatting:** No semicolons, single quotes, trailing commas

### Quality Gates
- **Linting:** ESLint must pass
- **Types:** TypeScript strict mode
- **Dependencies:** No unused packages (Knip)
- **Build:** Must succeed before commits

### Component Patterns
- **Props:** Explicit interfaces for all props
- **Styling:** Bootstrap classes + custom SCSS
- **Animations:** Wow.js for scroll effects
- **Accessibility:** Semantic HTML, proper contrast

---

## 🎯 Next Steps & Roadmap

### Short Term (Next Sprint)
1. **Blog Implementation:** Add blog listing and detail pages
2. **Portfolio Enhancement:** Complete portfolio showcase
3. **Contact Form Backend:** Integrate form submission
4. **Performance Audit:** Optimize Core Web Vitals

### Medium Term (1-2 Months)
1. **Team Section:** Add team member profiles
2. **Pricing Pages:** Implement pricing plans
3. **Case Studies:** Detailed project showcases
4. **SEO Enhancement:** Advanced SEO optimizations

### Long Term (3-6 Months)
1. **Admin Dashboard:** Content management system
2. **User Authentication:** Client portal
3. **Analytics Dashboard:** Advanced tracking
4. **Multi-language Expansion:** Additional languages

---

## 📞 Contact & Support

**Project:** Dev Institute Website
**Maintainer:** Development Team
**Repository:** [GitHub Repository]
**Issues:** GitHub Issues
**Documentation:** This state.md file

---

*Last Updated: December 2025*
*Next Review: January 2026*</content>
<parameter name="filePath">state.md