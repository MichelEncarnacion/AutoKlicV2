import Sidebar from '../../components/Sidebar';

export default function VendedorDashboard() {
  return (
    <div className="flex">
      <Sidebar rol="vendedor" />
      <main className="ml-64 p-8 w-full">🚗 Panel del vendedor</main>
    </div>
  );
}
