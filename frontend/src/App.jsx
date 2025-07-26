import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Hero from './components/Hero';
import FeaturedCars from './components/FeaturedCars';
import Process from './components/Process';
import ContactForm from './components/ContactForm';

import AutoDetalle from './pages/AutoDetalle';


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

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <Router>
      {/* Siempre visibles */}
      <Navbar />

      <main className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/autos/:modelo" element={<AutoDetalle />} />
        </Routes>
      </main>

      {/* Siempre visible */}
      <Footer />
    </Router>
  );
}
