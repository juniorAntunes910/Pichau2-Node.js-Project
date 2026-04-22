import React, { useState } from 'react';
import { api } from '../services/api';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/login', { email, password });
      onLoginSuccess(response.data.user);
    } catch (err) {
      alert("Acesso negado! Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.loginBox}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>NEXUS</h1>
          <span style={styles.logoDot}>.</span>
          <p style={styles.subtitle}>HARDWARE DE ELITE</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>E-MAIL</label>
            <input 
              type="email" 
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>SENHA</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'AUTENTICANDO...' : 'ENTRAR NO SISTEMA'}
          </button>
        </form>
        
        <p style={styles.footer}>© 2026 Nexus Store. Restricted Access.</p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#09090a',
    backgroundImage: 'radial-gradient(circle at 50% 50%, #121214 0%, #09090a 100%)',
    fontFamily: "'Inter', sans-serif",
  },
  loginBox: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    borderRadius: '12px',
    backgroundColor: '#121214',
    border: '1px solid #29292e',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    textAlign: 'center',
  },
  logoContainer: {
    marginBottom: '32px',
  },
  logo: {
    display: 'inline',
    fontSize: '32px',
    fontWeight: '800',
    color: '#fff',
    letterSpacing: '4px',
    margin: 0,
  },
  logoDot: {
    fontSize: '32px',
    color: '#00b37e',
    fontWeight: '800',
  },
  subtitle: {
    color: '#8d8d99',
    fontSize: '12px',
    marginTop: '8px',
    letterSpacing: '2px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    textAlign: 'left',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#e1e1e6',
    letterSpacing: '1px',
  },
  input: {
    padding: '14px',
    borderRadius: '6px',
    border: '1px solid #29292e',
    backgroundColor: '#09090a',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    marginTop: '10px',
    padding: '16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#00b37e',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'filter 0.2s',
    letterSpacing: '1px',
  },
  footer: {
    marginTop: '32px',
    fontSize: '10px',
    color: '#7c7c8a',
    textTransform: 'uppercase',
  }
};