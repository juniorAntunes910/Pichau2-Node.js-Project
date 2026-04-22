import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Home({ user, setUser }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. FUNÇÃO QUE GERA A URL ALEATÓRIA E DINÂMICA
  function generateRandomHardwareImageUrl(id) {
    const timestamp = Date.now(); // Gera um número único com o tempo atual
    // Usamos o 'source.unsplash.com' para imagens aleatórias por pesquisa.
    // 'id' garante que no mesmo F5 as imagens sejam diferentes entre os cards.
    // 'timestamp' garante que a cada F5 a imagem mude.
    return `https://source.unsplash.com/featured/400x300?computer,hardware,cpu&id=${id}&t=${timestamp}`;
  }

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get('/products');
        
        const formattedProducts = response.data.map(product => {
          return {
            ...product,
            // 2. Aplica a imagem gerada agora para cada produto
            display_image: product.image_url || generateRandomHardwareImageUrl(product.id)
          };
        });

        setProducts(formattedProducts);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  async function handleLogout() {
    try { await api.post('/logout'); } catch (err) {} finally { setUser(null); }
  }

  if (loading) return <div style={styles.loading}>Sincronizando Nexus...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logoArea}>
          <h1 style={styles.logo}>NEXUS</h1><span style={styles.dot}>.</span>
        </div>
        <div style={styles.userArea}>
          <div style={styles.userInfo}>
            <span style={styles.userName}>{user?.name || 'ADMIN'}</span>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>LOGOUT</button>
        </div>
      </header>

      <main style={styles.content}>
        <div style={styles.titleWrapper}>
          <h2 style={styles.sectionTitle}>ESTOQUE DISPONÍVEL</h2>
          <div style={styles.line}></div>
        </div>
        
        <div style={styles.grid}>
          {products.map(product => (
            <article key={product.id} style={styles.card}>
              <div style={styles.imageContainer}>
                <img 
                  src={product.display_image} 
                  alt={product.name} 
                  style={styles.image}
                  loading="lazy"
                  // 3. Fallback estável se o Unsplash falhar
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = `https://picsum.photos/seed/${product.id}/400/300`; 
                  }}
                />
              </div>
              <div style={styles.info}>
                <h3 style={styles.name}>{product.name}</h3>
                <div style={styles.priceContainer}>
                  <span style={styles.currency}>R$</span>
                  <span style={styles.price}>
                    {product.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <button style={styles.buyBtn}>ADICIONAR AO SETUP</button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#09090a', color: '#e1e1e6', fontFamily: "'Inter', sans-serif" },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', height: '80px', backgroundColor: '#121214', borderBottom: '1px solid #29292e', position: 'sticky', top: 0, zIndex: 10 },
  logoArea: { display: 'flex', alignItems: 'center' }, logo: { color: '#fff', letterSpacing: '4px', fontSize: '24px', fontWeight: '800', margin: 0 },
  dot: { color: '#00b37e', fontSize: '24px', fontWeight: '800' },
  userArea: { display: 'flex', alignItems: 'center', gap: '20px' }, userInfo: { display: 'flex', flexDirection: 'column', textAlign: 'right' },
  userName: { fontSize: '14px', fontWeight: 'bold', color: '#00b37e' },
  logoutBtn: { background: 'none', border: '1px solid #f75a68', color: '#f75a68', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' },
  content: { padding: '40px' }, titleWrapper: { marginBottom: '30px' }, sectionTitle: { fontSize: '12px', letterSpacing: '2px', color: '#fff', marginBottom: '8px' },
  line: { width: '40px', height: '3px', backgroundColor: '#00b37e' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' },
  card: { backgroundColor: '#121214', borderRadius: '12px', border: '1px solid #29292e', overflow: 'hidden' },
  imageContainer: { width: '100%', height: '180px', backgroundColor: '#18181b' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  info: { padding: '24px' }, name: { fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#fff' },
  priceContainer: { display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '20px' },
  currency: { color: '#00b37e', fontSize: '14px' }, price: { color: '#00b37e', fontSize: '26px', fontWeight: 'bold' },
  buyBtn: { width: '100%', padding: '14px', backgroundColor: '#00b37e', border: 'none', borderRadius: '6px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' },
  loading: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#09090a', color: '#00b37e' }
};