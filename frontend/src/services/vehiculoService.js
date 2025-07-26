const API = import.meta.env.VITE_API_URL;

export async function getVehiculos() {
  const res = await fetch(`${API}/vehiculos`);
  if (!res.ok) throw new Error("No se pudieron obtener los vehículos");
  return res.json();
}
