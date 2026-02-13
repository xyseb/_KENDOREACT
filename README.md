# [[ 📦 _KENDOREACT ]]
>Test de Kendo react

## Sommaire
- [[[ 📦 _KENDOREACT ]]](#-%F0%9F%93%A6-_kendoreact-)
  * [Sommaire](#sommaire)
  * [GET STARTED](#get-started)
- [[[ PROJECT SETUP INFOS ]]](#-project-setup-infos-)
  * [🧰 Dépendances](#%F0%9F%A7%B0-dependances)
    + [1. **vitest**](#1-vitest)
    + [2. **@vitest/ui**](#2-vitestui)
    + [3. **@testing-library/react**](#3-testing-libraryreact)
    + [4. **@testing-library/jest-dom**](#4-testing-libraryjest-dom)
    + [5. **jsdom**](#5-jsdom)
- [[[ PROJECT CREATION INFOS ]]](#-project-creation-infos-)
- [React + TypeScript + Vite](#react--typescript--vite)
  * [React Compiler](#react-compiler)
  * [Expanding the ESLint configuration](#expanding-the-eslint-configuration)


## GET STARTED
> `npm install` puis `npm run dev` pour le lancer. Ensuite acceder à l'url indiqué dans votre terminal

<br>
<hr>
<hr>
<hr>
<br>

# [[ PROJECT SETUP INFOS ]]

## 🧰 Dépendances

### 1. **vitest**
- Moteur de test principal  
- API compatible Jest (`describe`, `it`, `expect`)  
- Watch mode ultra rapide  
- Mocking intégré (`vi.mock`)  
- Support TypeScript natif  

---

### 2. **@vitest/ui**
- Interface graphique pour visualiser les tests  
- Affiche : tests passés/échoués, logs, snapshots  
- Idéal pour le TDD visuel  

---

### 3. **@testing-library/react**
- Outils pour tester les composants React  
- `render()` pour monter un composant  
- Sélecteurs centrés sur l’utilisateur (`getByText`, `getByRole`, etc.)  
- Encourage les tests basés sur le comportement réel  

---

### 4. **@testing-library/jest-dom**
- Ajoute des matchers utiles à `expect()`  
- Exemples :  
  - `toBeInTheDocument()`  
  - `toBeVisible()`  
  - `toHaveTextContent()`  
- Rend les assertions plus expressives et lisibles  

---

### 5. **jsdom**
- Simule un navigateur dans Node.js  
- Fournit `window`, `document`, `HTMLElement`, etc.  
- Indispensable pour tester des composants React  

<br>
<hr>
<hr>
<hr>
<br>

# [[ PROJECT CREATION INFOS ]]
> Le projet est basé sur Vite (créer depuis la version `create-vite@8.2.0` avec les choix "React" + "TypeScript" + "Rollup") via la commande `npm create vite@latest`.
Si dessous le README.md généré par vite

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
