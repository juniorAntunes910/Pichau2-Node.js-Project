import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/login"; // Verifique se o arquivo é login.jsx ou Login.jsx
import Home from "./pages/home";
import AdminProducts from "./pages/adminProducts";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={setUser} />} />
        
        <Route 
          path="/" 
          element={user ? <Home user={user} /> : <Navigate to="/login" />} 
        />

        <Route 
          path="/admin" 
          element={
            user?.role === 'ADMIN' ? <AdminProducts /> : <Navigate to="/" />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}