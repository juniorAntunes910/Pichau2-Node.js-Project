import { useState, useEffect } from "react";
import { api } from './services/api'
import Login from './pages/login'
import Home from './pages/home'

function App(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{//Pegando o cookie do navegador
    api.get("/me")
    .then(response  => {
      setUser(response.data.user);
    })
    .catch(() =>{
      setUser(null);
    })
    .finally(()=>{
      setLoading(false);
    })
  }, [])

  if(loading) return <div>Carregando...</div>

  return (
    <div className="App">
      {
        user ? (
          <Home user={user} setUser ={setUser}/>
        ) : (
          // No App.jsx
          <Login onLoginSuccess={(userData) => setUser(userData)} />
        )}
    </div>
  );
}

export default App;