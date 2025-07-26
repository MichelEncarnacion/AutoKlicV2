import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCars from './components/FeaturedCars';
import Process from './components/Process';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Vehiculos from './pages/Vehiculos';

import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
    <div className="bg-red-500 text-white p-4 text-xl font-bold">
  Tailwind está funcionando
</div>

      <Navbar />
      <main className="pt-24">
        <Hero />
        <FeaturedCars />
        <Process />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/autos" element={<Vehiculos />} />
        {/* Puedes agregar aquí una ruta como <Route path="/autos/:modelo" element={<AutoDetalle />} /> */}
      </Routes>
    </Router>
  );
}
