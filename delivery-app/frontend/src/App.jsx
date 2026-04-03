import React from 'react';
import LoginPage from './pages/LoginPage'; // Importamos el componente cool que hicimos

function App() {
  return (
    // Renderizamos directamente el LoginPage para que sea lo primero que vean
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;