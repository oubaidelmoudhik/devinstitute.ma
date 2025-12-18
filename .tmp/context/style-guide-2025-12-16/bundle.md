# Task Context: Style Guide Creation

Session ID: style-guide-2025-12-16
Created: 2025-12-16
Status: in_progress

## Current Request
Analyze the entire codebase and create a style_guide.md following everything that has to do with style in this website, colors, typography, spacings, borders, EVERYTHING!

## Requirements
- Extract all style-related elements from the codebase
- Cover colors, typography, spacings, borders, animations, responsive design
- Analyze SCSS files, CSS files, component classes, Bootstrap usage
- Create comprehensive style_guide.md with organized sections

## Decisions Made
- Delegate to explore agent for thorough codebase analysis
- Follow docs standards for documentation structure and quality
- Include code examples and usage guidelines

## Files to Modify/Create
- style_guide.md - Main output file with complete style guide

## Static Context Available
- /home/oubaid/.config/opencode/context/core/standards/docs.md (documentation standards)
- /home/oubaid/.config/opencode/context/core/workflows/delegation.md (delegation process)

## Constraints/Notes
- Website uses Next.js, TypeScript, Bootstrap, SCSS
- Components use functional React with hooks
- Animations via Wow.js
- Follow project code style from AGENTS.md

## Progress
- [x] Load required context files
- [x] Create delegation context bundle
- [ ] Analyze codebase styles
- [ ] Create style_guide.md

---
**Instructions for Subagent:**
Load and follow the documentation standards from /home/oubaid/.config/opencode/context/core/standards/docs.md

Analyze the entire codebase for all style-related elements:
1. Colors: variables, hex codes, usage patterns
2. Typography: fonts, sizes, weights, line heights
3. Spacing: margins, paddings, grid, breakpoints
4. Borders: styles, radii, shadows
5. Components: UI patterns, Bootstrap classes, animations
6. Responsive: media queries, mobile-first
7. Assets: images, backgrounds, icons

Search through:
- src/style.scss (main stylesheet)
- public/assets/css/*.css files
- Component files for class usage and inline styles
- Bootstrap integration and overrides

Return a comprehensive analysis organized by category with code examples and usage patterns. Focus on extracting actual values and patterns used in the codebase.