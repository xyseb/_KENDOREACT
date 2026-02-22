# DOCUMENTATION
> Documentation technique autour du projet (Git ; Tests ; ...)

## Sommaire
- [DOCUMENTATION](#documentation)
  * [Sommaire](#sommaire)
- [[[ 🌳 RAPPEL SUR LES GIT WORKFLOW ]]](#-%F0%9F%8C%B3-rappel-sur-les-git-workflow-)
  * [🏷️ Gitflow Workflow](#%F0%9F%8F%B7%EF%B8%8F-gitflow-workflow)
  * [🏷️ Feature Branch Workflow (celui que tu utilises)](#%F0%9F%8F%B7%EF%B8%8F-feature-branch-work flow-celui-que-tu-utilises)
  * [🏷️ Trunk-Based Development](#%F0%9F%8F%B7%EF%B8%8F-trunk-based-development)
  * [🏷️ Forking Workflow](#%F0%9F%8F%B7%EF%B8%8F-forking-workflow)
  * [🌳 Workflow Git du Projet](#%F0%9F%8C%B3-workflow-git-du-projet)
    + [🚀 Présentation](#%F0%9F%9A%80-presentation)
    + [🌿 Structure des branches](#%F0%9F%8C%BF-structure-des-branches)
      - [✋ __main__ :](#%E2%9C%8B-__main__-)
      - [👉__feature/*__ :](#%F0%9F%91%89__feature__-)
      - [🧪 __develop/*__ :](#%F0%9F%A7%AA-__develop__-)
  * [🔄 Workflow de développement](#%F0%9F%94%84-workflow-de-developpement)
    + [Branches principales](#branches-principales)
    + [🧩 Créer une nouvelle feature](#%F0%9F%A7%A9-creer-une-nouvelle-feature)
  * [🐞Les bugs](#%F0%9F%90%9Eles-bugs)
    + [🚑 Créer un hotfix (correction urgente)](#%F0%9F%9A%91-creer-un-hotfix-correction-urgente)
    + [🧠 Bonnes pratiques](#%F0%9F%A7%A0-bonnes-pratiques)
- [🧪 Tests](#%F0%9F%A7%AA-tests)
    + [Comparaison des types de tests et méthodologies:](#comparaison-des-types-de-tests-et-methodologies)
  * [Comparaison Jest vs Vitest pour les tests JavaScript/TypeScript](#comparaison-jest-vs-vitest-pour-les-tests-javascripttypescript)
    + [1️⃣ Similitudes](#1%EF%B8%8F%E2%83%A3-similitudes)
    + [2️⃣ Différences principales](#2%EF%B8%8F%E2%83%A3-differences-principales)
    + [3️⃣ Exemple de test React identique](#3%EF%B8%8F%E2%83%A3-exemple-de-test-react-identique)
      - [Jest](#jest)
      - [Vitest](#vitest)
    + [4️⃣ Points clés pratiques](#4%EF%B8%8F%E2%83%A3-points-cles-pratiques)
  * [Comparatif des styles de tests pour le composant App](#comparatif-des-styles-de-tests-pour-le-composant-app)
    + [1️⃣ Test classique (sans DSL)](#1%EF%B8%8F%E2%83%A3-test-classique-sans-dsl)
    + [2️⃣ BDD-style Test (mentale, sans DSL)](#2%EF%B8%8F%E2%83%A3-bdd-style-test-mentale-sans-dsl)
    + [3️⃣ Test avec DSL “Given/When/Then” (mini-DSL maison ou jest-gwt)](#3%EF%B8%8F%E2%83%A3-test-avec-dsl-givenwhenthen-mini-dsl-maison-ou-jest-gwt)
    + [4️⃣ Comparaison synthétique](#4%EF%B8%8F%E2%83%A3-comparaison-synthetique)
  * [Standardisation et réutilisation avec DSL](#standardisation-et-reutilisation-avec-dsl)
    + [1️⃣ Standardisation](#1%EF%B8%8F%E2%83%A3-standardisation)
    + [2️⃣ Réutilisation](#2%EF%B8%8F%E2%83%A3-reutilisation)
    + [3️⃣ Importance quand les tests deviennent nombreux](#3%EF%B8%8F%E2%83%A3-importance-quand-les-tests-deviennent-nombreux)
  * [Exemple:](#exemple)
  * [Test Coverage](#test-coverage)

<br>
<hr>
<hr>
<hr>
<br>

# [[ 🌳 RAPPEL SUR LES GIT WORKFLOW ]]
| Workflow                   | Branches principales                                      | Avantages                                                                 | Inconvénients                                                             | Idéal pour                                      |
|---------------------------|-----------------------------------------------------------|---------------------------------------------------------------------------|---------------------------------------------------------------------------|--------------------------------------------------|
| **Gitflow**               | main, develop, feature/*, release/*, hotfix/*            | Très structuré, gestion claire des releases, adapté aux grandes équipes  | Complexe, lourd pour petits projets, beaucoup de branches                 | Projets avec cycles de release formels           |
| **Feature Branch**        | main, feature/*                                           | Simple, flexible, historique propre, parfait pour projets front modernes | Pas de gestion native des releases, moins adapté aux très grandes équipes | Projets React/Vite, petites équipes, solo dev    |
| **Trunk-Based Development** | main (+ petites branches très courtes)                  | Très rapide, idéal CI/CD, historique linéaire                             | Discipline élevée, risque de casser main, demande tests automatisés       | Grandes équipes expérimentées, DevOps            |
| **Forking Workflow**      | repo principal + forks individuels                        | Sécurisé, parfait pour contributions externes                             | Lourd pour projets internes, plus de manipulations Git                    | Projets open source                              |

## 🏷️ Gitflow Workflow
```
                 +-------------------+
                 |     production    |
                 |       main        |
                 +---------+---------+
                           |
                           | merge hotfix
                           |
                 +---------v---------+
                 |     develop       |
                 +----+--------+-----+
                      |        |
                      |        |
               +------v--+  +--v------+
               | feature |  | feature |
               +---------+  +---------+

Release branches:
       +---------------------+
       |     release/*       |
       +----------+----------+
                  |
                  v
      merge into main & develop

Hotfix branches:
       +---------------------+
       |      hotfix/*       |
       +----------+----------+
                  |
                  v
      merge into main & develop
```

## 🏷️ Feature Branch Workflow (celui que tu utilises)
```main
  |
  +-----------------------------+
  |                             |
  v                             v
feature/button           feature/navbar
  |                             |
  +-------------+---------------+
                |
                v
              merge into main

Branches spécialisées :
main
  |
  +-----> vitest
  |
  +-----> jest
```

## 🏷️ Trunk-Based Development
```
main (trunk)
  |
  +---- small-branch-1 ---- merge fast ----+
  |
  +---- small-branch-2 ---- merge fast ----+
  |
  +---- small-branch-3 ---- merge fast ----+

Branches vivent quelques heures seulement.
```

## 🏷️ Forking Workflow
```
                 +----------------------+
                 |   Repo principal     |
                 +----------+-----------+
                            |
                            |
        +-------------------+-------------------+
        |                                       |
+-------v-------+                       +-------v-------+
|   Fork dev A  |                       |   Fork dev B  |
+-------+-------+                       +-------+-------+
        |                                       |
        | pull request                          | pull request
        |                                       |
        +-------------------+-------------------+
                            |
                            v
                 +----------------------+
                 |   Repo principal     |
                 +----------------------+
```

## 🌳 Workflow Git du Projet
> voir rappel sur les workflows git en fin de [README.md](#📘-RAPPEL-SUR-LES-GIT-WORKFLOW)
Pour l'access rapide au commande git vous pouvez utilise [ce lien raccourci](#🔄-Workflow-de-développement)

### 🚀 Présentation
Ce projet utilise Vite + React + TypeScript + TDD + StoryBook.

Ce README décrit le workflow Git utilisé pour organiser le développement, les branches de features et les branches de tests.

### 🌿 Structure des branches
Le projet repose sur trois types de branches :

```
main
├── feature/<nom-de-la-feature>
├── develop/<nom-de-poc>
```

#### ✋ __main__ :
Contient le code source propre de l'app, avec tests unitaires. Sert de base à toutes les branches de foncitionnalité et développement.

#### 👉__feature/*__ :
Une branche par fonctionnalité. Permet de développer isolément sans polluer main.

#### 🧪 __develop/*__ :
Branche dédiée aux tests d'une techno comme par exemple vitest ou jest. Contient le code de main + les modifications de dépendances. C'est une branche qui se détache de main à guise d'exemple (POC) de chose nouvelle à tester en vu d'une implémentation sur main ulterieur.

## 🔄 Workflow de développement

### Branches principales

- **main**  
  Contient le code en production. Toujours stable.

- **develop**  
  Branche d’intégration où toutes les features sont fusionnées avant une release.

---

### 🧩 Créer une nouvelle feature

1️⃣ Toujours à partir de `develop` :

```bash
git checkout develop
git pull
git checkout -b feature/<nom-de-la-feature>
```

Développer la fonctionnalité (code + tests unitaires + storybook), puis :

```bash
git add .
git commit -m "feat: description de la feature"
git push --set-upstream origin feature/<nom-de-la-feature>
```

2️⃣ 🔀 Fusionner la feature dans develop
Une fois la feature terminée et validée :
```bash
git checkout develop
git pull
git merge feature/<nom-de-la-feature>
git push
```
Puis supprimer la branche :
```bash
git branch -d feature/<nom-de-la-feature>
git push origin --delete feature/<nom-de-la-feature>
```
3️⃣ 📦 Préparer une release
Quand plusieurs features sont prêtes :
```bash
git checkout develop
git pull
git checkout -b release/<version>
```
Stabiliser la release (tests, corrections), puis :

4️⃣ 🔛 Fusion dans main (production)
```bash
git checkout main
git merge release/<version>
git push
```

5️⃣ 🔖 Tag de la version
```bash
git tag -a v<version> -m "Release <version>"
git push origin v<version>
```

6️⃣ 🔛 Fusion dans develop (pour garder l’historique aligné)
```bash
git checkout develop
git merge release/<version>
git push
```

7️⃣ 🗑️ Supprimer la branche release :
```bash
git branch -d release/<version>
git push origin --delete release/<version>
```

## 🐞Les bugs
>- Bug trouvé en production → HOTFIX
>
>   - Un bug est détecté dans la version en production (branche main).
>     - 👉 On utilise une branche hotfix/*
>
>- Bug trouvé pendant le développement → FEATURE FIX
>
>   - Le bug n’est pas en production, mais dans :
>     - develop
>     - une branche feature/*
>     - une branche release/*
>       - 👉 On NE crée PAS de hotfix.  
>       - 👉 On corrige dans la branche concernée.

| Type de bug | Branche utilisée | Tag | Fusion nécessaire |
|-------------|------------------|-----|-------------------|
| 🟥 Bug en production | `hotfix/*` | ✔️ Oui | `main` → `develop` |
| 🟧 Bug dans une release | `release/*` | ✔️ Oui (lors du merge final) | `main` + `develop` |
| 🟨 Bug dans develop | `feature/fix-*` | ❌ Non | `develop` |
| 🟩 Bug dans une feature | `feature/*` | ❌ Non | `develop` |

### 🚑 Créer un hotfix (correction urgente)
1️⃣ Toujours depuis main
```bash
git checkout main
git pull
git checkout -b hotfix/<nom-du-fix>
```
2️⃣ Corriger, tester, puis :
```bash
git checkout main
git merge hotfix/<nom-du-fix>
git push

git checkout develop
git merge hotfix/<nom-du-fix>
git push
```
3️⃣ Supprimer la branche hotfix :
```bash
git branch -d hotfix/<nom-du-fix>
git push origin --delete hotfix/<nom-du-fix>
```


```bash
```

### 🧠 Bonnes pratiques
- Ne jamais coder directement dans main ou develop.
- Toujours créer une branche feature/* pour chaque nouvelle fonctionnalité.
- Une feature = un sujet = une PR.
- Garder des commits propres et explicites.
- Tester systématiquement avant de fusionner.
- Supprimer les branches une fois fusionnées pour garder un repo propre.

<br>
<hr>
<hr>
<hr>
<br>

# 🧪 Tests

### Comparaison des types de tests et méthodologies:

| Méthode / Type | Objectif principal | Approche | Focus | Exemple |
|----------------|-----------------|---------|-------|---------|
| **TDD** (Test Driven Development) | Écrire le code guidé par les tests | Rédiger un test **avant** le code | Implémentation, logique interne | Écrire un test pour `add(a, b)` avant de créer la fonction |
| **BDD** (Behavior Driven Development) | Vérifier le comportement attendu du logiciel | Rédiger tests en **Given / When / Then** | Comportement observable, user-centric | Tester qu’un bouton incrémente un compteur visible |
| **Unit Test** | Tester une unité isolée (fonction, composant) | Test direct de la fonction/composant | Correctitude interne | Tester que `sum(2,3) === 5` |
| **Integration Test** | Tester l’interaction entre plusieurs unités | Tester modules combinés | Interaction entre composants ou services | Tester qu’un formulaire envoie correctement les données à l’API |
| **Functional / End-to-End (E2E)** | Tester le flux complet comme un utilisateur | Automatisation des actions utilisateur sur l’application | Fonctionnement global et expérience utilisateur | Vérifier qu’un utilisateur peut se connecter et créer un compte |
| **Property-based Test** | Vérifier des propriétés invariantes du code | Générer des entrées aléatoires et vérifier les règles | Robustesse et invariants | Vérifier que `reverse(reverse(array)) === array` pour tout tableau |


## Comparaison Jest vs Vitest pour les tests JavaScript/TypeScript

Comparons Jest et Vitest en se concentrant sur **similitudes, différences et cas d’usage**.

---

### 1️⃣ Similitudes

| Critère                 | Jest                           | Vitest                                   |
|--------------------------|--------------------------------|-----------------------------------------|
| Syntaxe de base          | `describe`, `it`, `test`, `expect` | `describe`, `it`, `test`, `expect`     |
| Assertions               | Oui (`expect(value).toBe(...)`) | Oui (compatible `expect` Jest-style)   |
| Mocking                  | `jest.fn()`, `jest.mock()`      | `vi.fn()`, `vi.mock()` (API très proche) |
| Support TypeScript       | ✅ via `ts-jest`                | ✅ natif, aucun précompilateur nécessaire |
| Integration Testing      | Oui, avec React Testing Library | Oui, avec React Testing Library        |
| Snapshot Testing         | ✅                               | ✅ (API compatible Jest)                |

➡️ **Résultat** : pour des tests unitaires et d’intégration simples, les tests Jest et Vitest sont presque identiques. On peut souvent copier-coller le code entre les deux.

---

### 2️⃣ Différences principales

| Critère                  | Jest                                                 | Vitest                                                      |
|---------------------------|------------------------------------------------------|-------------------------------------------------------------|
| Performance               | Plus lent sur projets TypeScript larges, car compilation séparée | Très rapide grâce à Vite et ESM natif, hot reload intégré |
| Exécution                 | Node uniquement                                     | Node + navigateur + Vite dev server (HMR)                  |
| Configuration TS          | `ts-jest` obligatoire                               | Natif, pas de config supplémentaire                        |
| Mocking des imports ESM   | Peut être compliqué avec `jest.mock()` et chemins absolus | `vi.mock()` supporte ESM natif et chemins alias Vite facilement |
| Snapshots                 | `.toMatchSnapshot()`                                | Compatible `.toMatchSnapshot()`                             |
| Community / Plugins       | Très large, mature                                  | Moins mature, mais croissante et compatible Vite plugins   |
| Syntaxe BDD / DSL         | Même syntaxe possible, mais intégrations externes   | Même syntaxe, peut utiliser mini-DSL maison ou packages type `jest-gwt` facilement |

---

### 3️⃣ Exemple de test React identique

#### Jest
```ts
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders initial counter', () => {
    render(<App />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('count is 0');
});
```

#### Vitest
```ts
import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import App from './App';

it('renders initial counter', () => {
    render(<App />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('count is 0');
});
```

✅ Comme tu vois, presque **aucune différence** côté code de test, juste l’import de `it` et `expect` depuis Vitest au lieu de Jest.

---

### 4️⃣ Points clés pratiques

- **Vitest** est idéal pour les projets Vite + React / Vue / Svelte, rapide et avec HMR.
- **Jest** reste meilleur pour Node pur, legacy ou Next.js sans Vite, ou si tu veux un écosystème mature.
- Pour React + TypeScript moderne avec Vite : **Vitest est généralement plus rapide et plus simple**.
- Pour BDD-style / mini-DSL :
  - Jest → plus de libs comme `jest-gwt`
  - Vitest → helpers maison ou `vitest-cucumber`

## Comparatif des styles de tests pour le composant App

### 1️⃣ Test classique (sans DSL)
```ts
it('should increment counter on click', async () => {
    render(<App />);
    const user = userEvent.setup();
    const button = screen.getByRole('button');

    // Vérifie l’état initial
    expect(button).toHaveTextContent('count is 0');

    // Action utilisateur
    await user.click(button);

    // Vérifie le résultat
    expect(button).toHaveTextContent('count is 1');
});
```
**Caractéristiques**
- ✅ Lisible pour un développeur
- ✅ Test fonctionnel clair
- ❌ Les rôles de chaque étape (Given / When / Then) ne sont pas explicitement marqués
- ❌ Moins intuitif pour un PO/QA ou un lecteur non-dev

### 2️⃣ BDD-style Test (mentale, sans DSL)
```ts
it('should increment counter when user clicks the button (BDD style)', async () => {
    // Given: compteur initialisé à 0
    render(<App />);
    const user = userEvent.setup();
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('count is 0');

    // When: l’utilisateur clique sur le bouton
    await user.click(button);

    // Then: le compteur s’incrémente de 1
    expect(button).toHaveTextContent('count is 1');
});
```
**Caractéristiques**
- ✅ Lisibilité améliorée grâce aux commentaires Given/When/Then
- ✅ Idéal pour documentation vivante ou revue par PO/QA
- ✅ Structure mentale BDD claire
- ❌ Pas de DSL réel, juste une convention de nommage et des commentaires

### 3️⃣ Test avec DSL “Given/When/Then” (mini-DSL maison ou jest-gwt)
```ts
Given(() => render(<App />));
const user = userEvent.setup();
const button = screen.getByRole('button');

Then(() => expect(button).toHaveTextContent('count is 0'));
When(async () => await user.click(button));
Then(() => expect(button).toHaveTextContent('count is 1'));
```
**Caractéristiques**
- ✅ Sépare explicitement contexte / action / résultat
- ✅ Lisibilité très claire même pour des non-devs
- ✅ Réutilisable et standardisable dans toute la suite de tests
- ✅ Similaire à un DSL officiel (jest-gwt)
- ❌ Légèrement plus verbeux et nécessite un wrapper/helper
- ❌ Ne change pas la robustesse ni le comportement du test

### 4️⃣ Comparaison synthétique
| Critère                   | Test classique           | BDD-style mental         | DSL (Given/When/Then)         |
|----------------------------|------------------------|-------------------------|-------------------------------|
| Lisibilité pour dev        | ✅ suffisante           | ✅ meilleure            | ✅ très bonne                  |
| Lisibilité pour PO/QA      | ⚠ moyenne              | ✅ bonne                | ✅ très bonne                  |
| Structure standardisée     | ❌ non                 | ⚠ semi-standard        | ✅ oui                         |
| Réutilisabilité            | ❌ faible               | ⚠ moyenne               | ✅ élevée (helpers)            |
| Robustesse / fiabilité     | ✅ identique            | ✅ identique             | ✅ identique                   |
| Surcharge / verbosité      | ✅ faible               | ⚠ légèrement plus verbeux | ✅ plus verbeux, mais clair   |
| Formalisme BDD             | ❌ absent              | ✅ implicite            | ✅ explicite (DSL)             |

**💡 Conclusion**

**Valeur ajoutée du style BDD / DSL** :
- meilleure lisibilité, surtout pour les non-devs
- formalisation du test avec étapes Given/When/Then
- standardisation et réutilisation possible avec plusieurs tests

**Valeur ajoutée technique** :
- quasi-nulle pour la robustesse du test
- ce qui change c’est la communication et la lisibilité

**Quand l’utiliser** :
- tests complexes ou suites larges
- équipes qui pratiquent BDD
- documentation vivante accessible à PO/QA

## Standardisation et réutilisation avec DSL

### 1️⃣ Standardisation
- Même structure pour tous les tests : pattern Given → When → Then
- Noms explicites pour chaque étape → compréhension immédiate
- Consistance : nouveaux tests reprennent la même syntaxe

Exemple :
```ts
Given(() => render(<App />));   // contexte clair
When(async () => user.click(button)); // action utilisateur
Then(() => expect(button).toHaveTextContent('count is 1')); // résultat attendu
```

### 2️⃣ Réutilisation
- Helpers Given / When / Then réutilisables sur plusieurs tests

Exemple :
```ts
export const renderApp = () => render(<App />);
export const clickButton = async (button: HTMLElement) => {
    const user = userEvent.setup();
    await user.click(button);
};
export const expectCounter = (button: HTMLElement, value: number) => {
    expect(button).toHaveTextContent(`count is ${value}`);
};

Given(() => renderApp());
When(async () => clickButton(screen.getByRole('button')));
Then(() => expectCounter(screen.getByRole('button'), 1));
```
**✅ Avantages**
- Gain énorme sur la lisibilité
- Moins de répétition de code
- Changement d’implémentation facile (nouveau sélecteur) sans toucher les tests
- Les tests restent BDD sans dupliquer la logique

### 3️⃣ Importance quand les tests deviennent nombreux
- La structure uniforme évite la confusion
- Revues de code plus rapides grâce à la logique “Given / When / Then” standardisée

**En résumé** :
- Standardisation = tous les tests ont la même structure → lisibilité et cohérence
- Réutilisation = helpers DSL → moins de répétition et maintenance plus facile

## Exemple:
```ts
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

/**
 * Mini-DSL Given / When / Then pour Vitest
 */
const Given = (fn: () => void) => fn();
const When = async (fn: () => Promise<void>) => await fn();
const Then = (fn: () => void) => fn();

describe('<App> Comprehensive Tests', () => {

    // ---------------------------
    // 1️⃣ Test classique (sans DSL)
    // ---------------------------
    it('Classic: should increment counter on click', async () => {
        render(<App />);
        const user = userEvent.setup();
        const button = screen.getByRole('button');

        // état initial
        expect(button).toHaveTextContent('count is 0');

        // action
        await user.click(button);

        // résultat
        expect(button).toHaveTextContent('count is 1');
    });

    // ---------------------------
    // 2️⃣ BDD-style mental (Given / When / Then en commentaires)
    // ---------------------------
    it('BDD-style: should increment counter when user clicks the button', async () => {
        // Given: compteur initialisé à 0
        render(<App />);
        const user = userEvent.setup();
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('count is 0');

        // When: l’utilisateur clique sur le bouton
        await user.click(button);

        // Then: le compteur s’incrémente de 1
        expect(button).toHaveTextContent('count is 1');
    });

    // ---------------------------
    // 3️⃣ DSL mini Given/When/Then
    // ---------------------------
    it('DSL: should increment counter using mini-DSL', async () => {
        let button: HTMLElement;
        const user = userEvent.setup();

        Given(() => {
            render(<App />);
            button = screen.getByRole('button');
        });

        Then(() => {
            expect(button).toHaveTextContent('count is 0');
        });

        await When(async () => {
            await user.click(button);
        });

        Then(() => {
            expect(button).toHaveTextContent('count is 1');
        });
    });

    // ---------------------------
    // 4️⃣ Property-based style (incrémentation consistante)
    // ---------------------------
    it('Property-based: should increment counter by 1 on each click', async () => {
        render(<App />);
        const user = userEvent.setup();
        const button = screen.getByRole('button');

        const getCount = () =>
            Number(button.textContent?.match(/\d+/)?.[0]);

        const clicks = 5;
        for (let i = 0; i < clicks; i++) {
            const before = getCount();
            await user.click(button);
            const after = getCount();
            expect(after).toBe(before + 1);
        }
    });
});
```

## Test Coverage
>Vitest à une commande coverage et montre un rapport de couverture du code.
>
>Pour ce que montre le tableau, App.scss restera à 0 sauf si l'on faire du css-in-js ou si la props style est utilisé.

### Test Coverage et CSS
Coverage CSS réel (optionnel)
Pour savoir quelles règles SCSS sont réellement utilisées :

Chrome DevTools → Coverage tab → run l’app → lignes CSS inutilisées surlignées.

Puppeteer ou Playwright peuvent générer un rapport CSS coverage automatiquement.

# ⚛️ REACT

## Type react
React ne definit pas de type typescript mais uniquement javascript

## Type @types/react
[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts)

Voici tous les usages possibles de ces types utilitaires

### 🧩 1. PropsWithChildren<P>
✔️ Usage : ajouter children à un type de props
```ts
type BoxProps = PropsWithChildren<{ color: string }>;
```
Quand l’utiliser ?
Composants simples

Composants qui acceptent des enfants

Composants qui ne forwardent pas de ref

### 🧩 2. PropsWithoutRef<P>
✔️ Usage : retirer ref d’un type
```ts
type Props = PropsWithoutRef<ComponentProps<"button">>;
```
Quand l’utiliser ?
Tu wraps un composant qui accepte une ref

Mais ton wrapper ne forwarde pas la ref

### 🧩 3. PropsWithRef<P>
✔️ Usage : ajouter une ref typée
```ts
type Props = PropsWithRef<{ onClick: () => void }>;
```
Quand l’utiliser ?
Tu veux que ton composant accepte une ref

Mais tu ne veux pas utiliser forwardRef

### 🧩 4. ComponentProps<T>
✔️ Usage : récupérer les props d’un composant ou élément JSX
```ts
type ButtonProps = ComponentProps<"button">;
```
Quand l’utiliser ?
Tu veux cloner un composant

Tu veux wrapper un composant

Tu veux créer un composant polymorphique

Tu veux extraire les props d’un composant externe

### 🧩 5. ComponentPropsWithoutRef<T>
✔️ Usage : récupérer les props d’un composant sans la ref
```ts
type DivProps = ComponentPropsWithoutRef<"div">;
```
Quand l’utiliser ?
Tu wraps un composant HTML

Tu ne forwardes pas la ref

### 🧩 6. ComponentPropsWithRef<T>
✔️ Usage : récupérer les props d’un composant avec la ref
```ts
type InputProps = ComponentPropsWithRef<"input">;
```
Quand l’utiliser ?
Tu fais un wrapper avec forwardRef

Tu veux que la ref soit correctement typée

### 🧩 7. JSXElementConstructor<P>
✔️ Usage : typer un composant polymorphique
```ts
type AsProp = JSXElementConstructor<any> | keyof JSX.IntrinsicElements;
```
Quand l’utiliser ?
Composants polymorphiques (as="button")

Composants qui acceptent un composant en prop

### 🧩 8. ClassAttributes<T>
✔️ Usage : typage interne pour les refs de classes
Tu ne l’utilises presque jamais directement.

🎯 Résumé final

| Type                     | Sert à                  | Quand l’utiliser        |
|--------------------------|-------------------------|-------------------------|
| PropsWithChildren        | Ajouter children        | Composants simples      |
| PropsWithoutRef          | Retirer ref             | Wrapper sans ref        |
| PropsWithRef             | Ajouter ref             | Wrapper avec ref        |
| ComponentProps           | Extraire props brutes   | Polymorphisme, wrappers |
| ComponentPropsWithoutRef | Extraire props sans ref | Wrapper sans ref        |
| ComponentPropsWithRef    | Extraire props avec ref | Wrapper avec ref        |
| JSXElementConstructor    | Typage polymorphique    | as="button"             |
| ClassAttributes          | Typage interne react    | Rarement utilisé        |

## Type HTML

### génériques

| Type              | Description                                                    |
|-------------------|----------------------------------------------------------------|
| HTMLAttributes    | Attributs HTML génériques (id, className, style, data-*, etc.) |
| AllHTMLAttributes | HTMLAttributes + attributs communs                             |
| DOMAttributes     | Tous les handlers d’événements (onClick, onChange, etc.)       |
| AriaAttributes    | Attributs ARIA                                                 |

### spécifiques
| Type                      | Élément HTML           |
|---------------------------|------------------------|
| AnchorHTMLAttributes      | `<a>`                  |
| AudioHTMLAttributes       | `<audio>`              |
| AreaHTMLAttributes        | `<area>`               |
| BaseHTMLAttributes        | `<base>`               |
| ButtonHTMLAttributes      | `<button>`             |
| CanvasHTMLAttributes      | `<canvas>`             |
| ColHTMLAttributes         | `<col>`                |
| ColgroupHTMLAttributes    | `<colgroup>`           |
| DataHTMLAttributes        | `<data>`               |
| DetailsHTMLAttributes     | `<details>`            |
| DialogHTMLAttributes      | `<dialog>`             |
| EmbedHTMLAttributes       | `<embed>`              |
| FieldsetHTMLAttributes    | `<fieldset>`           |
| FormHTMLAttributes        | `<form>`               |
| HtmlHTMLAttributes        | `<html>`               |
| IframeHTMLAttributes      | `<iframe>`             |
| ImgHTMLAttributes         | `<img>`                |
| InputHTMLAttributes       | `<input>`              |
| InsHTMLAttributes         | `<ins>`                |
| LabelHTMLAttributes       | `<label>`              |
| LiHTMLAttributes          | `<li>`                 |
| LinkHTMLAttributes        | `<link>`               |
| MapHTMLAttributes         | `<map>`                |
| MediaHTMLAttributes       | `<audio>` / `<video>`  |
| MetaHTMLAttributes        | `<meta>`               |
| MeterHTMLAttributes       | `<meter>`              |
| ObjectHTMLAttributes      | `<object>`             |
| OlHTMLAttributes          | `<ol>`                 |
| OptgroupHTMLAttributes    | `<optgroup>`           |
| OptionHTMLAttributes      | `<option>`             |
| OutputHTMLAttributes      | `<output>`             |
| ParamHTMLAttributes       | `<param>`              |
| ProgressHTMLAttributes    | `<progress>`           |
| QuoteHTMLAttributes       | `<blockquote>` / `<q>` |
| ScriptHTMLAttributes      | `<script>`             |
| SelectHTMLAttributes      | `<select>`             |
| SlotHTMLAttributes        | `<slot>`               |
| SourceHTMLAttributes      | `<source>`             |
| StyleHTMLAttributes       | `<style>`              |
| TableHTMLAttributes       | `<table>`              |
| TextareaHTMLAttributes    | `<textarea>`           |
| TdHTMLAttributes          | `<td>`                 |
| ThHTMLAttributes          | `<th>`                 |
| TimeHTMLAttributes        | `<time>`               |
| TrackHTMLAttributes       | `<track>`              |
| VideoHTMLAttributes       | `<video>`              |
| WebViewHTMLAttributes     | `<webview>` (Electron) |

### Types internes utilisés pour construire les props HTML

| Type | Description                                           |
|------------------------|-------------------------------------|
| DetailedHTMLPropsE, T> | Combine props HTML + gestion de ref |
| SVGProps               | Props SVG                           |
| SVGAttributes          | Attributs SVG                       |
