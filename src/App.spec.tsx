import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import App from './App';

/**
 * Mini-DSL Given / When / Then pour Vitest
 */
const Given = (fn: () => void) => fn();
const When = async (fn: () => Promise<void>) => await fn();
const Then = (fn: () => void) => fn();

describe('<App> Comprehensive Tests', () => {
    // mock des assets importés par chemin racine
    vi.mock('/vite.svg', () => ({ default: '/vite.svg' }))
    // mock des assets importés depuis ./assets
    vi.mock('./assets/react.svg', () => ({ default: './assets/react.svg' }))

    it('should have the correct DOM structure', () => {
        const {container} = render(<App />);
        expect(container.firstChild).toMatchInlineSnapshot(`
          <div
            class="app"
          >
            <div>
              <a
                href="https://vite.dev"
                target="_blank"
              >
                <img
                  alt="Vite logo"
                  class="logo"
                  src="/vite.svg"
                />
              </a>
              <a
                href="https://react.dev"
                target="_blank"
              >
                <img
                  alt="React logo"
                  class="logo react"
                  src="./assets/react.svg"
                />
              </a>
            </div>
            <h1
              style="color: red; font-weight: bold;"
            >
              Vite + React
            </h1>
            <div
              class="card"
            >
              <button>
                count is 
                0
              </button>
              <button>
                decrement
              </button>
              <button>
                reset
              </button>
              <p
                style="border: 1px dashed lime;"
              >
                Edit 
                <code>
                  src/App.tsx
                </code>
                 and save to test HMR
              </p>
            </div>
            <p
              class="read-the-docs"
            >
              Click on the Vite and React logos to learn more
            </p>
          </div>
        `);
    });

    it('should render as a unique div with class "app"', () => {
        const { container } = render(<App />);

        const appElements = container.querySelectorAll('.app');

        expect(appElements).toHaveLength(1);
        expect(appElements[0].tagName).toBe('DIV');
    });

    // ---------------------------
    // 1️⃣ Test classique (sans DSL)
    // ---------------------------
    it('Classic: should increment counter on click', () => {
        render(<App />);
        const buttons = screen.getAllByRole('button');

        // état initial
        expect(buttons[0]).toHaveTextContent('count is 0');

        // action
        fireEvent.click(buttons[0]);

        // résultat
        expect(buttons[0]).toHaveTextContent('count is 1');
    });

    // ---------------------------
    // 2️⃣ BDD-style mental (Given / When / Then en commentaires)
    // ---------------------------
    it('BDD-style: should increment counter when user clicks the button', async () => {
        // Given: compteur initialisé à 0
        render(<App />);
        const buttons = screen.getAllByRole('button');
        expect(buttons[0]).toHaveTextContent('count is 0');

        // When: l’utilisateur clique sur le bouton
        fireEvent.click(buttons[0]);

        // Then: le compteur s’incrémente de 1
        expect(buttons[0]).toHaveTextContent('count is 1');
    });

    // ---------------------------
    // 3️⃣ DSL mini Given/When/Then
    // ---------------------------
    it('DSL: should increment counter using mini-DSL', async () => {
        let buttons: HTMLButtonElement[];

        Given(() => {
            render(<App />);
            buttons = screen.getAllByRole('button');
        });

        Then(() => {
            expect(buttons[0]).toHaveTextContent('count is 0');
        });

        await When(async () => {
            fireEvent.click(buttons[0]);
        });

        Then(() => {
            expect(buttons[0]).toHaveTextContent('count is 1');
        });
    });

    // ---------------------------
    // 4️⃣ Property-based style (incrémentation consistante)
    // ---------------------------
    it('Property-based: should increment counter by 1 on each click', async () => {
        render(<App />);
        const buttons = screen.getAllByRole('button');

        const getCount = () =>
            Number(buttons[0].textContent?.match(/\d+/)?.[0]);

        const clicks = 5;
        for (let i = 0; i < clicks; i++) {
            const before = getCount();
            fireEvent.click(buttons[0]);
            const after = getCount();
            expect(after).toBe(before + 1);
        }
    });

    // On ne test normalement pas le scss mais plutôt le comportement utilisateur. Certaine chose peuve être faite simplement pour le style mais le scss est souvent stubé et complexe à integrer dans les tests
    it('applies style dynamically', () => {
        render(<App />);
        const heading = screen.getByText(/Vite \+ React/i);

        // RGB exact du à la convention React/DOM qui transforme color: 'red' en valeur RGB (rgb(255, 0, 0)) lorsqu’elle est appliquée au style d’un élément.
        expect(heading).toHaveStyle({
            color: 'rgb(255, 0, 0)',
            fontWeight: 'bold',
        });
    });

    // Marquer un test comme à écrire
    it.todo('should decrement counter on click');

    // Ignorer temporairement un test
    it.skip('should reset counter when reset button clicked', () => { });
});
