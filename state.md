# Website State - Dev Institute

## Overview

Dev Institute is a web development agency website built with Next.js, React, TypeScript, and Vite. The site serves as a portfolio and lead generation platform for a Moroccan-based development company specializing in web development, e-commerce solutions, and digital marketing.

## Current Status: **Partially Complete with Recent Enhancements**

### ✅ Active Features

- **Home Page**: Fully functional with all sections enabled
- **Contact Page**: Basic contact information with placeholder data
- **Error Page**: 404 handling with custom styling
- **Internationalization**: English/French support (French translations partially complete)
- **Theme System**: Advanced dark/light mode with system preference detection and manual override
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Analytics**: Google Analytics 4 integration
- **Performance**: Image optimization and lazy loading

### ❌ Inactive Features (Commented Out)

- About Us page
- Services page
- Service Details page
- Register/Login pages
- Pricing Plan page
- FAQ page (separate from home FAQ)
- Team page
- Team Details page
- Portfolio page (separate from home projects)
- Portfolio Details page
- Blog page
- Blog Details page

## Technical Stack

- **Framework**: Next.js 16.0.10 with App Router
- **Frontend**: React 18.3.1, TypeScript 5.x
- **Build Tool**: Vite 6.3.2 with Turbopack
- **Styling**: Bootstrap 5.3.3, SCSS, Animate.css, Wow.js
- **Routing**: Next.js App Router (React Router DOM v7)
- **Internationalization**: i18next 25.0.1, react-i18next 15.5.1
- **Analytics**: Google Analytics 4 (react-ga4 2.1.0)
- **Deployment**: Vercel
- **Build Tools**: ESLint 9.9.0, TypeScript strict mode, Knip for unused dependencies
- **Image Processing**: Sharp for optimization
- **Additional Libraries**: React Fast Marquee, React Modal Video, React Slick, Jarallax

## Content & Branding

- **Company**: Dev Institute (devinstitute.ma)
- **Tagline**: "We're a Development Agency"
- **Mission**: "Digital Solutions Made Simple" - Helping small businesses grow online
- **Experience**: 7+ years
- **Clients**: 30+ trusted customers
- **Services**: Web Design, Web Development, UI/UX Design, E-commerce Solutions, SEO & Performance, Website Maintenance

## Portfolio Projects (7 total)

1. **Rim Bakhat** - WordPress (rimbakhat.com)
2. **Rif Walks** - WordPress (rifwalks.com)
3. **Blausee Switzerland** - Shopify (blauseeswitzerland.com)
4. **SunnySide Agency** - HTML/CSS (GitHub Pages)
5. **Blue Guide** - React.js (theblueguide.com)
6. **Tip Splitter App** - React.js (GitHub Pages)
7. **Gavilia** - WordPress (gavilia.ma)

## Contact Information

- **Phone**: +212 776 932898 (placeholder)
- **Email**: contact@devagency.ma (placeholder)
- **WhatsApp**: +212 776 932 898 (Moroccan number - legitimate)
- **Social Media**: Facebook, Instagram links available

## Home Page Sections

1. **Hero**: Main headline, client count, free consultation CTA
2. **Video**: "Why Choose DEV Agency?" section
3. **Mission**: Accordion with mission/vision statements
4. **Projects**: Portfolio carousel with 7 projects
5. **Categories**: Animated marquee with services
6. **Process**: 3-step development process
7. **FAQ**: Frequently asked questions accordion
8. **Footer**: Standard footer with links

## Recent Enhancements (December 2025)

- **Advanced Theme System**: Automatic dark/light mode based on system preferences with manual override capability
- **Improved Theme Toggle**: Visual indicators for system-following vs manual override, right-click to reset to system preference
- **Build Optimization**: Enhanced image optimization script with Sharp integration
- **Performance Improvements**: Better code splitting and lazy loading

## Issues & Gaps

- **Incomplete Translations**: French content partially translated (hero, basic sections done, video/mission sections still in English)
- **Placeholder Data**: Contact information uses dummy data
- **Missing Pages**: Most secondary pages are disabled but components exist
- **No Blog System**: Blog functionality exists but not active
- **No Authentication**: Login/register pages disabled
- **Limited Services Detail**: Services mentioned but no dedicated page

## Analytics & Performance

- Google Analytics 4 integrated with custom tracking
- Image optimization script included in build process (Sharp-based)
- Responsive design with Bootstrap 5
- Animation library (Wow.js) for enhanced UX
- Theme persistence with localStorage
- System preference detection for theme switching

## Project Structure

### Root Directory

```
devinstitute.ma/
├── .next/                          # Next.js build output
├── app/                            # Next.js app directory
│   ├── contact/                    # Contact page
│   ├── src/                        # Source code
│   │   ├── common/                 # Shared components
│   │   │   ├── BackToTop.tsx
│   │   │   ├── Breacrumb.tsx
│   │   │   ├── ClientInitializer.tsx
│   │   │   ├── LanguageToggle.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── OffCanvas.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   ├── SearchArea.tsx
│   │   │   ├── ThemeToggle.tsx      # Enhanced theme toggle
│   │   │   └── count.tsx
│   │   ├── components/              # Feature components
│   │   │   ├── about-us/
│   │   │   ├── blog/
│   │   │   ├── blog-details/
│   │   │   ├── contact/
│   │   │   ├── error/
│   │   │   ├── faq/
│   │   │   ├── home/                # Home page sections
│   │   │   │   ├── BlogArea.tsx
│   │   │   │   ├── CategoryArea.tsx
│   │   │   │   ├── Cta2Area.tsx
│   │   │   │   ├── CtaArea.tsx
│   │   │   │   ├── FaqArea.tsx
│   │   │   │   ├── HeroArea.tsx
│   │   │   │   ├── MissionArea.tsx
│   │   │   │   ├── PriceArea.tsx
│   │   │   │   ├── ProcessArea.tsx
│   │   │   │   ├── ProjectArea.tsx
│   │   │   │   ├── ServiceArea.tsx
│   │   │   │   ├── TeamArea.tsx
│   │   │   │   ├── TestimonialArea.tsx
│   │   │   │   ├── VideoArea.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── login/
│   │   │   ├── portfolio/
│   │   │   ├── portfolio-details/
│   │   │   ├── pricing-plan/
│   │   │   ├── register/
│   │   │   ├── reusable/
│   │   │   │   ├── FAQQuestion.tsx
│   │   │   │   ├── ProjectCard.tsx
│   │   │   └── SubscribeForm.tsx
│   │   │   ├── service/
│   │   │   ├── service-details/
│   │   │   ├── team/
│   │   │   └── team-details/
│   │   ├── data/                    # Configuration data
│   │   │   ├── constants.ts         # App constants and data
│   │   │   └── menu-data.ts
│   │   ├── ga/                      # Analytics
│   │   │   ├── LayoutWithAnalytics.tsx
│   │   │   └── index.ts
│   │   ├── hooks/                   # Custom hooks
│   │   │   ├── scroll-to-top.tsx
│   │   │   └── use-sticky.tsx
│   │   ├── layouts/                 # Layout components
│   │   │   ├── footers/
│   │   │   │   └── FooterOne.tsx
│   │   │   ├── headers/
│   │   │   │   └── HeaderOne.tsx    # Enhanced with theme system
│   │   │   └── Wrapper.tsx
│   │   ├── styles/                  # Styling
│   │   │   └── index.css
│   │   ├── translation/             # i18n files
│   │   │   ├── en.json
│   │   │   ├── fr.json
│   │   │   └── i18n.ts
│   │   ├── custom.d.ts
│   │   ├── index.css
│   │   └── style.scss               # Enhanced with theme styles
│   ├── ClientLayout.tsx
│   ├── ClientProviders.tsx
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx                     # Home page
├── public/                          # Static assets
│   ├── assets/
│   │   ├── css/
│   │   │   ├── animate.css
│   │   │   ├── bootstrap.min.css
│   │   │   ├── style.css
│   │   │   └── swiper-bundle.min.css
│   │   ├── large-img/               # Source images
│   │   └── img/                     # Optimized images
│   └── _redirects                   # Vercel redirects
├── scripts/
│   └── optimize-images.js           # Image optimization script
├── .gitignore
├── AGENTS.md                        # Development guidelines
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── state.md                         # This file
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

## Development Notes

- **TypeScript**: Strict mode enabled with comprehensive type checking
- **ESLint**: Modern configuration with React hooks and TypeScript rules
- **Code Quality**: Knip for unused dependency detection
- **Component Architecture**: Feature-based folder structure with reusable components
- **Custom Hooks**: Business logic separated into reusable hooks
- **Constants**: Centralized configuration data in constants.ts
- **Theme System**: Advanced implementation with system preference detection
- **Build Process**: Automated image optimization with Sharp
- **Performance**: Code splitting, lazy loading, and optimized assets</content>
  <parameter name="filePath">/home/oubaid/Documents/Web Dev/Projects/devinstitute.ma/state.md
