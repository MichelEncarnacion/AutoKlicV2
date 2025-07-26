const API = import.meta.env.VITE_API_URL;

export async function getVehiculosDestacados() {
  const res = await fetch(`${API}/landing/destacados`);
  if (!res.ok) throw new Error("No se pudieron obtener los vehículos destacados");
  return res.json();
}
