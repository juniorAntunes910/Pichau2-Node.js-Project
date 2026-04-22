import React, { useState } from 'react'; // Importação explícita ajuda o Vite
import { api } from '../services/api';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    try {
      // Verifique se o seu back usa /login ou /sessions
      const response = await api.post('/login', { email, password });
      
      if (onLoginSuccess) {
        onLoginSuccess(response.data.user);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao logar! Verifique o console.");
    }
  }

  return (
    <div style={{ padding: '20px', color: 'white', background: '#121214', height: '100vh' }}>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <h2>Login Nexus</h2>
        <input 
          type="email" 
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input 
          type="password" 
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Entrar</button>
      </form>
    </div>
  );
}