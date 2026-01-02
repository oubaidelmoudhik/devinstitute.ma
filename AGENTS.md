# AGENTS.md - Development Guidelines

## Commands
- **Build**: `npm run build` (includes image optimization, TypeScript check, Vite build)
- **Lint**: `npm run lint` (ESLint with TypeScript rules)
- **Dev**: `npm run dev` (Vite dev server)
- **Check unused**: `npm run check-unused` (Knip for unused dependencies/files)
- **Single test**: No test runner configured - add tests to `src/__tests__/` and use Vitest

## Code Style
- **Language**: TypeScript with strict mode, React functional components
- **Imports**: Relative paths (`../../`), group external then internal imports
- **Naming**: PascalCase (components), camelCase (variables/functions), SCREAMING_SNAKE_CASE (constants)
- **Types**: Explicit interfaces, return types on functions, `void` for event handlers
- **Formatting**: No semicolons, single quotes, trailing commas in objects
- **Components**: Functional with hooks, Bootstrap classes, Wow.js animations
- **Error handling**: Try-catch blocks, proper TypeScript error types
- **Structure**: Flat component exports, data constants in separate files

## Architecture
- **Components**: Feature-based folders (`src/components/feature/`)
- **Hooks**: Custom hooks in `src/hooks/`
- **Data**: Constants and config in `src/data/`
- **Styles**: SCSS in `src/styles/`, CSS modules not used
- **Assets**: Static files in `public/assets/`

## Quality Gates
- ESLint must pass before commits
- TypeScript strict mode enabled (noUnusedLocals, noUnusedParameters)
- No unused dependencies (Knip check)
- Build must succeed with image optimization</content>
<parameter name="filePath">/home/oubaid/Documents/Web Dev/Projects/devagency.ma/AGENTS.md