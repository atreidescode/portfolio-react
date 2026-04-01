# Portfolio React

Version React + Vite du portfolio de **Ilias Cherrat**.

## Stack

- **React 18** — composants fonctionnels + hooks
- **Vite 5** — bundler ultra rapide
- **CSS natif** — styles migrés depuis le portfolio vanilla

## Architecture

```
src/
├── components/
│   ├── canvas/         ← RainCanvas (animation bits)
│   ├── sections/       ← Hero, Stack, Projects, Interests, Contact
│   └── widgets/        ← Terminal, EyeButton, ScrollArrow
├── hooks/              ← useRain, useTerminal, useSlider, useSectionObserver
├── data/               ← projects.js, stack.js, terminalSequences.js
└── styles/             ← tous les CSS
```

## Lancer le projet en local

```bash
# 1. Cloner le repo
git clone https://github.com/atreidescode/portfolio-react.git
cd portfolio-react

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev

# 4. Build de production
npm run build
```

## Déploiement GitHub Pages

```bash
npm run build
# Puis push le dossier dist/ sur la branche gh-pages
```

> Pense à copier le dossier `assets/` du repo `portofolio` vers `public/assets/` (images + icônes oeil).
