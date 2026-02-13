import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';

function App() {
  const [count, setCount] = useState(0);

  // fonction incrémentée testée
  const increment = () => setCount((c) => c + 1);

  // fonction décrémentée non testée (TODO)
  const decrement = () => {
      if (count > 0) {           // <- branche non testée si on ne clique jamais
          setCount(c => c - 1);
      }
  };

  // fonction reset ignorée (SKIP)
  const reset = () => {
      if (count !== 0) {         // <- branche non testée si on ne clique jamais
          setCount(0);
      }
  };

      // style calculé via fonction → coverage détecte cette ligne
    const getStyle = () => ({
        color: count > 0 ? 'green' : 'red', // ← V8 voit que cette ligne JS est exécutée
        fontWeight: 'bold',
    });

  return (
    <div className="app">
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 style={getStyle()}>Vite + React</h1>
      <div className="card">
        <button onClick={increment}>
          count is {count}
        </button>
        <button onClick={decrement}>decrement</button>
        <button onClick={reset}>reset</button>
        <p style={{border: '1px dashed lime'}}>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
