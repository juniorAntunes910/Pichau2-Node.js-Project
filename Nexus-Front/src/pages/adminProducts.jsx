import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  
  const navigate = useNavigate();

  async function loadProducts() {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      console.error("Erro ao carregar produtos", err);
    }
  }

  useEffect(() => { loadProducts(); }, []);

  async function handleCreateProduct(e) {
    e.preventDefault();
    try {
      await api.post('/products', { 
        name, 
        description, 
        category,
        price: Number(price),
        stock: Number(stock) 
      });
      
      // Limpa os campos após o sucesso
      setName(''); setPrice(''); setDescription(''); setCategory(''); setStock('');
      loadProducts();
      alert("Item adicionado ao estoque Nexus!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Erro ao criar produto. Verifique se você é ADMIN.");
    }
  }

  async function handleDelete(id) {
    if(window.confirm("Deseja remover este item permanentemente?")) {
      try {
        await api.delete(`/products/${id}`);
        loadProducts();
      } catch (err) {
        alert("Erro ao deletar.");
      }
    }
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>NEXUS<span style={{color: '#00b37e'}}>.</span> ADMIN</h1>
        <button onClick={() => navigate('/')} style={styles.backBtn}>VOLTAR À LOJA</button>
      </header>
      
      {/* FORMULÁRIO DE CRIAÇÃO */}
      <section style={styles.formSection}>
        <form onSubmit={handleCreateProduct} style={styles.form}>
          <input placeholder="NOME" value={name} onChange={e => setName(e.target.value)} style={styles.input} required />
          <input placeholder="PREÇO (R$)" type="number" value={price} onChange={e => setPrice(e.target.value)} style={styles.input} required />
          <input placeholder="ESTOQUE" type="number" value={stock} onChange={e => setStock(e.target.value)} style={styles.input} required />
          <input placeholder="CATEGORIA" value={category} onChange={e => setCategory(e.target.value)} style={styles.input} required />
          <textarea placeholder="DESCRIÇÃO TÉCNICA" value={description} onChange={e => setDescription(e.target.value)} style={styles.textarea} required />
          <button type="submit" style={styles.addBtn}>CADASTRAR</button>
        </form>
      </section>

      {/* LISTAGEM COM TUDO APARECENDO */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>PRODUTO</th>
              <th style={styles.th}>CATEGORIA</th>
              <th style={styles.th}>PREÇO</th>
              <th style={styles.th}>STOCK</th>
              <th style={styles.th}>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={styles.tr}>
                <td style={styles.td}>
                  <strong>{p.name}</strong>
                  <br />
                  <small style={{color: '#8d8d99'}}>{p.description?.substring(0, 30)}...</small>
                </td>
                <td style={styles.td}>{p.category}</td>
                <td style={styles.td}>R$ {p.price}</td>
                <td style={styles.td}>
                   <span style={p.stock > 0 ? styles.inStock : styles.noStock}>
                    {p.stock} un.
                   </span>
                </td>
                <td style={styles.td}>
                  <button onClick={() => handleDelete(p.id)} style={styles.delBtn}>EXCLUIR</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '40px', backgroundColor: '#09090a', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  logo: { letterSpacing: '2px' },
  backBtn: { backgroundColor: 'transparent', border: '1px solid #00b37e', color: '#00b37e', padding: '8px 15px', cursor: 'pointer', borderRadius: '4px' },
  formSection: { backgroundColor: '#121214', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #29292e' },
  form: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  input: { padding: '10px', backgroundColor: '#09090a', border: '1px solid #29292e', color: '#fff', borderRadius: '4px', flex: '1 1 200px' },
  textarea: { padding: '10px', backgroundColor: '#09090a', border: '1px solid #29292e', color: '#fff', borderRadius: '4px', width: '100%', minHeight: '60px' },
  addBtn: { backgroundColor: '#00b37e', color: '#fff', border: 'none', padding: '10px 30px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#121214', borderRadius: '8px', overflow: 'hidden' },
  thRow: { backgroundColor: '#1f1f23' },
  th: { textAlign: 'left', padding: '15px', color: '#8d8d99', fontSize: '13px' },
  tr: { borderBottom: '1px solid #29292e' },
  td: { padding: '15px' },
  delBtn: { backgroundColor: '#f75a68', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' },
  inStock: { color: '#00b37e', fontWeight: 'bold' },
  noStock: { color: '#f75a68', fontWeight: 'bold' }
};