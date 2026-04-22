import { useState, useEffect } from "react";
import { api } from './services/api'
import Login from './pages/login'
import Home from './pages/home'

function App(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/me")
    .then(response  => {
      setUser(response.data.user);
    })
    .catch(() => {
      setUser(null);
    })
    .finally(() => {
      setLoading(false);
    })
  }, [])

  if(loading) return (
    <div style={{ background: '#09090a', color: '#00b37e', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      Carregando sistema...
    </div>
  )

  return (
    /* Removi a classe "App" e usei um estilo para garantir que não haja bordas */
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      {
        user ? (
          <Home user={user} setUser={setUser}/>
        ) : (
          <Login onLoginSuccess={(userData) => setUser(userData)} />
        )
      }
    </div>
  );
}

export default App;