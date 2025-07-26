export default function AutoCard({ auto }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">
      <img
        src={
          auto.imagen
            ? `${import.meta.env.VITE_API_URL}/${auto.imagen}`
            : "https://via.placeholder.com/400x250.png?text=Sin+Imagen"
        }
        alt={`Imagen de ${auto.marca} ${auto.modelo}`}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          {auto.marca} {auto.modelo} ({auto.año})
        </h2>

        <p className="text-sm text-gray-600 mb-1">
          {auto.tipo} • {auto.transmision} • {auto.tipo_combustible}
        </p>

        <p className="text-sm text-gray-600 mb-1">
          Color: <span className="font-medium">{auto.color}</span> •{" "}
          {auto.kilometraje?.toLocaleString() ?? 0} km
        </p>

        <p className="text-sm text-gray-600 mb-2">
          Estado:{" "}
          <span className="font-semibold text-indigo-600">{auto.estado}</span>
        </p>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">
            ${auto.precio?.toLocaleString()}
          </span>
          <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
}
