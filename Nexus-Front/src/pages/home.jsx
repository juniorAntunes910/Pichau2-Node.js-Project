import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

// Recebemos o user e setUser para poder mostrar o nome e fazer Logout
export default function Home({ user, setUser }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Ao carregar a página, busca os produtos no Back
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get('/products'); // Sua rota de produtos
        setProducts(response.data);
      } catch (err) {
        console.error("Erro ao carregar produtos", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // 2. Função de Logout (Limpa o estado e o Back limpa o cookie)
  async function handleLogout() {
    try {
      // Opcional: Criar uma rota /logout no back que faz res.clearCookie('token')
      await api.post('/logout'); 
    } catch (err) {
      console.log("Logout apenas local");
    } finally {
      setUser(null); // Volta para a tela de Login no App.jsx
    }
  }

  if (loading) {
    return <div style={styles.loading}>Carregando hardware de elite...</div>;
  }

  return (
    <div style={styles.container}>
      {/* Header da Loja */}
      <header style={styles.header}>
        <h1 style={styles.logo}>Nexus Store</h1>
        <div style={styles.userArea}>
          <span>Bem-vindo, <strong>{user?.name || 'Player'}</strong></span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Sair</button>
        </div>
      </header>

      {/* Grid de Produtos */}
      <main style={styles.grid}>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} style={styles.card}>
              <img 
                src={product.image_url || 'https://via.placeholder.com/150'} 
                alt={product.name} 
                style={styles.image}
              />
              <h3 style={styles.prodName}>{product.name}</h3>
              <p style={styles.price}>R$ {product.price.toFixed(2)}</p>
              <button style={styles.buyBtn}>Comprar</button>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado no estoque.</p>
        )}
      </main>
    </div>
  );
}

// Estilização Básica (Dark Mode)
const styles = {
  container: { minHeight: '100vh', backgroundColor: '#121214', color: '#e1e1e6', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', backgroundColor: '#202024', borderBottom: '1px solid #00b37e' },
  logo: { color: '#00b37e', margin: 0 },
  userArea: { display: 'flex', alignItems: 'center', gap: '20px' },
  logoutBtn: { backgroundColor: 'transparent', color: '#f75a68', border: '1px solid #f75a68', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', padding: '40px' },
  card: { backgroundColor: '#202024', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #323238' },
  image: { width: '100%', borderRadius: '4px', marginBottom: '10px' },
  prodName: { fontSize: '18px', marginBottom: '10px' },
  price: { color: '#00b37e', fontWeight: 'bold', fontSize: '20px', marginBottom: '15px' },
  buyBtn: { width: '100%', padding: '10px', backgroundColor: '#00b37e', border: 'none', borderRadius: '4px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' },
  loading: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#121214', color: '#00b37e' }
};