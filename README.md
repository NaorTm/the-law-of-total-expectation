# The Law of Total Expectation

An educational React website that teaches the Law of Total Expectation (Tower Property) from intuition to practical problem-solving.

## What this project includes

- Multi-page tutorial site:
  - Home
  - Tutorial (Modules A-F)
  - Example Library
  - Practice
  - Glossary
  - References
- Math rendering with KaTeX
- Interactive components:
  - Conditional Expectation Visualizer
  - Tree Diagram Builder
  - Monte Carlo Simulator (seeded, reproducible)
  - Step-by-step solution reveal
- Example Library with filters and full worked solutions
- Practice problem sets across 4 levels

## Content coverage

- Tutorial modules A-F implemented
- 24 worked examples total (includes required 18 + 6 additional)
- 42 practice problems total:
  - Level 1: 10
  - Level 2: 12
  - Level 3: 12
  - Level 4: 8

## Tech stack

- React + Vite
- React Router
- KaTeX via `react-katex`
- Plotly charts via `react-plotly.js`

## Project structure

```text
src/
  components/
  data/
  lib/
  pages/
  App.jsx
  main.jsx
  styles.css
```

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build production bundle:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## GitHub Actions

This project includes automated workflows:

### Build and Deploy (build-and-deploy.yml)
- **Trigger**: Pushes to `main` branch or manual workflow dispatch
- **Actions**:
  - Builds the Vite site
  - Uploads build artifacts (30 day retention)
  - Deploys to GitHub Pages
- **URL**: The site will be available at `https://<username>.github.io/the-law-of-total-expectation/`

### CI (ci.yml)
- **Trigger**: Pull requests to `main` or pushes to other branches
- **Actions**:
  - Builds the site to verify no build errors
  - Uploads build artifacts (7 day retention)

To enable GitHub Pages deployment:
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The site will deploy automatically on the next push to `main`

## Notes

- Simulations use deterministic seeded randomness for reproducibility.
- Content and structure are implemented according to the local `AGENTS.md` specification.
