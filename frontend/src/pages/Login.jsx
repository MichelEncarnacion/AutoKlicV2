// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode as jwt_decode } from 'jwt-decode';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al iniciar sesión');
      const decoded = jwt_decode(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('rol', decoded.data.rol);
      // Navegación con replace para evitar back
      if (decoded.data.rol === 'admin') {
        navigate('/admin', { replace: true });
      } else if (decoded.data.rol === 'vendedor') {
        navigate('/vendedor', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 md:p-12 rounded-2xl shadow-lg space-y-6"
        aria-busy={loading}
        noValidate
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
          Iniciar Sesión
        </h2>

        {error && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded"
          >
            {error}
          </div>
        )}

        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="mb-1 font-medium text-gray-700"
          >
            Usuario
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            required
            placeholder="Tu usuario"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-1 font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            placeholder="Tu contraseña"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            aria-invalid={error ? true : false}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white text-lg transition
            ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          aria-label={loading ? 'Ingresando...' : 'Iniciar sesión'}
        >
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
}
