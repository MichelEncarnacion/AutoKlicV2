import Sidebar from '../../components/Sidebar';

export default function AdminDashboard() {
  return (
    <div className="flex">
      <Sidebar rol="admin" />
      <main className="ml-64 p-8 w-full">📊 Panel del administrador</main>
    </div>
  );
}
