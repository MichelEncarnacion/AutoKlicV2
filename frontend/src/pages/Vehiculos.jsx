import { useEffect, useState } from "react";
import { getVehiculos } from "../services/vehiculoService";

export default function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVehiculos()
      .then(setVehiculos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Catálogo de vehículos</h2>

        {loading ? (
          <p className="text-center text-gray-500">Cargando vehículos...</p>
        ) : vehiculos.length === 0 ? (
          <p className="text-center text-gray-500">No hay vehículos disponibles.</p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {vehiculos.map((auto) => (
              <div
                key={auto.id}
                className="bg-white rounded-xl shadow-lg ring-1 ring-gray-200 hover:ring-red-300 transition duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <img
                  src={
                    auto.imagen
                      ? `${import.meta.env.VITE_API_URL}/${auto.imagen}`
                      : "/autos/default.jpg"
                  }
                  alt={auto.modelo}
                  className="h-56 w-full object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 tracking-wide">
                    {auto.marca} {auto.modelo}
                  </h3>
                  <p className="text-gray-500 mb-2">{auto.transmision} • {auto.tipo_combustible}</p>
                  <p className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full font-bold text-sm shadow-sm">
                    ${Number(auto.precio).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
