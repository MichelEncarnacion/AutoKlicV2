// src/pages/AdminDashboard.jsx
import React from 'react';
import Sidebar from '../../components/Sidebar';
import UserManagementPanel from '../../modules/UserManagementPanel';

export default function AdminDashboard() {
  return (
    <div className="flex w-full h-full bg-gray-900">
      {/* Sidebar siempre fijo a la izquierda */}
      <Sidebar rol="admin" />

      {/* Main se estira y su hijo también */}
      <main className="flex flex-1 p-0 sm:p-8 ml-0 sm:ml-64 bg-gray-900">
        <div className="flex flex-1 flex-col w-full bg-gray-800 p-6 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-white">
            📊 Panel del Administrador
          </h1>
          <UserManagementPanel />
        </div>
      </main>
    </div>
  );
}
