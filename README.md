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

## Notes

- Simulations use deterministic seeded randomness for reproducibility.
- Content and structure are implemented according to the local `AGENTS.md` specification.
