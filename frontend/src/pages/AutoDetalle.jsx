import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getVehiculos } from '../services/vehiculoService';

export default function AutoDetalle() {
  const { modelo } = useParams();
  const [auto, setAuto] = useState(null);

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

          <hr className="mb-5 border-gray-300" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-800 mb-10">
            <p><strong>Año:</strong> {auto.año}</p>
            <p><strong>Motor:</strong> {auto.motor || 'No especificado'}</p>
            <p><strong>Transmisión:</strong> {auto.transmision}</p>
            <p><strong>Combustible:</strong> {auto.tipo_combustible}</p>
            <p><strong>Color:</strong> {auto.color}</p>
            <p><strong>Puertas:</strong> {auto.puertas || 'N/A'}</p>
            <p><strong>Kilometraje:</strong> {auto.kilometraje} km</p>
          </div>

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
    </div>
  );
}
