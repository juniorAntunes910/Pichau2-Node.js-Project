import React, { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault(); // Impede a página de recarregar
    setLoading(true);

    console.log("Tentando logar com:", { email, password });

    try {
      // 1. Faz a chamada ao seu Backend
      const response = await api.post('/login', { email, password });
      
      console.log("Resposta do servidor:", response.data);

      const { user } = response.data;

      // 2. Salva o usuário no estado global (App.jsx)
      onLoginSuccess(user);

      // 3. Redirecionamento baseado na Role
      if (user.role === 'ADMIN') {
        console.log("Redirecionando para ADMIN");
        navigate('/admin');
      } else {
        console.log("Redirecionando para HOME");
        navigate('/');
      }

    } catch (err) {
      console.error("ERRO NO LOGIN:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Falha na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.loginBox}>
        <h1 style={styles.logo}>NEXUS<span style={{color: '#00b37e'}}>.</span></h1>
        <p style={styles.subtitle}>LOGIN DO SISTEMA</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input 
            type="email" 
            placeholder="E-MAIL"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input 
            type="password" 
            placeholder="SENHA"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'CARREGANDO...' : 'ENTRAR'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#09090a', fontFamily: 'sans-serif' },
  loginBox: { width: '350px', padding: '40px', backgroundColor: '#121214', borderRadius: '8px', border: '1px solid #29292e', textAlign: 'center' },
  logo: { color: '#fff', letterSpacing: '4px', margin: '0 0 8px 0' },
  subtitle: { color: '#8d8d99', fontSize: '10px', letterSpacing: '2px', marginBottom: '32px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '15px', backgroundColor: '#09090a', border: '1px solid #29292e', color: '#fff', borderRadius: '4px', outline: 'none' },
  button: { padding: '15px', backgroundColor: '#00b37e', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }
};