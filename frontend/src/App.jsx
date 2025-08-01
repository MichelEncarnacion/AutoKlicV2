// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Hero from './components/Hero';
import FeaturedCars from './components/FeaturedCars';
import Process from './components/Process';
import ContactForm from './components/ContactForm';

import AutoDetalle from './pages/AutoDetalle';
import Login from './pages/Login';
import ProtectedRoute from './utils/ProtectedRoute';

import AdminDashboard from './pages/admin/AdminDashboard';
import VendedorDashboard from './pages/vendedor/VendedorDashboard';

function Home() {
  return (
    <>
      <Hero />
      <FeaturedCars />
      <Process />
      <ContactForm />
    </>
  );
}

// Decide ruta según rol y sesión
function getDefaultRoute() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('rol');
  if (token && role === 'admin') return '/admin';
  if (token && role === 'vendedor') return '/vendedor';
  return '/';
}

function AppContent() {
  const location = useLocation();

  // Detectar rutas privadas
  const isPrivateRoute = ['/admin', '/vendedor'].some(path =>
    location.pathname.startsWith(path)
  );
  // Ruta de login
  const isLogin = location.pathname === '/login';

  // Prevenir back en private
  useEffect(() => {
    if (localStorage.getItem('token') && isPrivateRoute) {
      window.history.pushState(null, '', window.location.pathname);
    }
  }, [location.pathname, isPrivateRoute]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar solo en rutas públicas */}
      {!isPrivateRoute && <Navbar />}

      {/* Contenedor principal */}
      <main
        className={[
          'flex-grow',
          !isPrivateRoute && !isLogin && 'pt-24',
          isLogin && 'flex items-center justify-center bg-gray-50'
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Routes>
          {/* Home: redirige si hay sesión */}
          <Route
            path="/"
            element={
              localStorage.getItem('token') ? (
                <Navigate to={getDefaultRoute()} replace />
              ) : (
                <Home />
              )
            }
          />

          {/* AutoDetalle: redirige si hay sesión */}
          <Route
            path="/autos/:modelo"
            element={
              localStorage.getItem('token') ? (
                <Navigate to={getDefaultRoute()} replace />
              ) : (
                <AutoDetalle />
              )
            }
          />

          {/* Login: solo si no hay sesión */}
          <Route
            path="/login"
            element={
              localStorage.getItem('token') ? (
                <Navigate to={getDefaultRoute()} replace />
              ) : (
                <Login />
              )
            }
          />

          {/* Rutas protegidas */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendedor/*"
            element={
              <ProtectedRoute allowedRoles={["vendedor"]}>
                <VendedorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Cualquier otra ruta: si hay sesión lleva a dashboard, si no a home */}
          <Route
            path="*"
            element={
              localStorage.getItem('token') ? (
                <Navigate to={getDefaultRoute()} replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </main>

      {/* Footer solo en rutas públicas */}
      {!isPrivateRoute && <Footer />}
    </div>
  );
}

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // Refuerzo global de back
    const handlePopState = () => {
      if (localStorage.getItem('token')) {
        window.history.pushState(null, null, window.location.pathname);
      }
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}
