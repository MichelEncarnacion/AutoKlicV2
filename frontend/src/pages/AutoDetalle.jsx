import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { ShieldCheckIcon, Cog6ToothIcon, EyeIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getVehiculos } from '../services/vehiculoService';

export default function AutoDetalle() {
  const { modelo } = useParams();
  const [auto, setAuto] = useState(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    getVehiculos()
      .then((todos) => {
        const encontrado = todos.find(
          a => a.modelo.toLowerCase().replace(/\s+/g, '-') === modelo
        );
        setAuto(encontrado || null);
      })
      .catch(console.error);
  }, [modelo]);

  if (!auto) return <div className="p-8 text-center">Auto no encontrado o cargando...</div>;

  const imagenes = auto.imagen
    ? [`${import.meta.env.VITE_API_URL}/${auto.imagen}`]
    : ['/autos/default.jpg'];

  const toggle = (key) => {
    setExpanded(prev => (prev === key ? null : key));
  };

  return (
    <div className="w-screen min-h-screen bg-white px-6 py-10 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-[1920px] mx-auto">

        {/* CARRUSEL */}
        <div className="w-full lg:w-3/5">
          <Carousel
            showArrows
            showThumbs
            infiniteLoop
            autoPlay
            interval={5000}
            showStatus={false}
            swipeable
            emulateTouch
            className="rounded shadow-md"
          >
            {imagenes.map((img, i) => (
              <div key={i}>
                <img src={img} alt={`${auto.modelo} ${i + 1}`} className="object-cover" />
              </div>
            ))}
          </Carousel>
        </div>

        {/* INFORMACIÓN */}
        <div className="flex-1 lg:w-2/5">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{auto.modelo}</h1>
          <p className="text-green-600 text-xl font-semibold mb-2">
            ${Number(auto.precio).toLocaleString()}
          </p>
          <p className="text-gray-700 mb-5">{auto.descripcion || 'Sin descripción'}</p>

          {/* Equipamiento destacado */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-3">Equipamiento destacado</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
              {auto.transmision?.toLowerCase().includes('auto') && (
                <div className="flex items-center gap-2">
                  <Cog6ToothIcon className="h-5 w-5 text-blue-500" />
                  Transmisión automática
                </div>
              )}
              {auto.sensor_estacionamiento === 1 && (
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="h-5 w-5 text-blue-500" />
                  Sensor de estacionamiento
                </div>
              )}
              {auto.pantalla_tactil === 1 && (
                <div className="flex items-center gap-2">
                  <SpeakerWaveIcon className="h-5 w-5 text-blue-500" />
                  Pantalla táctil
                </div>
              )}
              {auto.camara_reversa === 1 && (
                <div className="flex items-center gap-2">
                  <EyeIcon className="h-5 w-5 text-blue-500" />
                  Cámara de reversa
                </div>
              )}
            </div>
          </div>

          <hr className="mb-5 border-gray-300" />

          {/* Secciones expandibles */}
          <div className="space-y-4 text-sm text-gray-800 mb-10">
            {/* General */}
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggle('general')}>
                <h4 className="font-semibold">General</h4>
                {expanded === 'general' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
              </div>
              {expanded === 'general' && (
                <div className="mt-3 space-y-1">
                  <p><strong>Año:</strong> {auto.año}</p>
                  <p><strong>Color:</strong> {auto.color}</p>
                  <p><strong>Kilometraje:</strong> {auto.kilometraje} km</p>
                </div>
              )}
            </div>

            {/* Seguridad */}
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggle('seguridad')}>
                <h4 className="font-semibold">Seguridad</h4>
                {expanded === 'seguridad' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
              </div>
              {expanded === 'seguridad' && (
                <div className="mt-3 space-y-1">
                  <p><strong>Sensor estacionamiento:</strong> {auto.sensor_estacionamiento ? 'Sí' : 'No'}</p>
                  <p><strong>Cámara reversa:</strong> {auto.camara_reversa ? 'Sí' : 'No'}</p>
                </div>
              )}
            </div>

            {/* Confort */}
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggle('confort')}>
                <h4 className="font-semibold">Confort</h4>
                {expanded === 'confort' ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
              </div>
              {expanded === 'confort' && (
                <div className="mt-3 space-y-1">
                  <p><strong>Aire acondicionado:</strong> {auto.aire_acondicionado ? 'Sí' : 'No'}</p>
                  <p><strong>Pantalla táctil:</strong> {auto.pantalla_tactil ? 'Sí' : 'No'}</p>
                </div>
              )}
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/#autos"
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:scale-105 transition"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Volver a autos
            </Link>

            <a
              href="/#contacto"
              className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:scale-105 transition"
            >
              ❤️ Me interesa
            </a>
          </div>
        </div>
      </div>

      {/* PUBLICIDAD - Simula compra a meses */}
      <div className="mt-20 w-full bg-blue-50 rounded-2xl px-8 py-12 flex flex-col lg:flex-row-reverse items-center justify-between gap-10 shadow-inner">
        {/* Texto + beneficios */}
        <div className="flex-1">
          <h3 className="text-3xl font-bold text-gray-800 leading-snug mb-6">
            Paga tu auto en hasta <span className="text-blue-700">72 meses</span>
          </h3>

          <ul className="space-y-5 mb-10">
            <li className="flex items-start gap-4">
              <div className="bg-white rounded-full p-3 shadow-md">
                <span className="text-lg">💲</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-base">Simula planes en tiempo real</p>
                <p className="text-gray-600 text-sm">Cotiza según tus preferencias y elige los plazos que más te convengan.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-white rounded-full p-3 shadow-md">
                <span className="text-lg">✅</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-base">Carga tus datos 100% online</p>
                <p className="text-gray-600 text-sm">Completa tu información y valídala sin salir de tu casa.</p>
              </div>
            </li>
          </ul>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium text-base shadow-lg hover:scale-105 transition transform duration-300">
            Simular compra a meses
          </button>
        </div>

        {/* Imagen al lado izquierdo */}
        <div className="flex-shrink-0 text-center">
          <img
            src="/autos/person.png"
            alt="Simulador AutosKlic"
            className="w-64 md:w-72 mx-auto rounded-xl"
          />
          <p className="text-sm text-gray-400 mt-3">
            Powered by <strong>AutosKlic</strong>
          </p>
        </div>
      </div>


    </div>
  );
}
