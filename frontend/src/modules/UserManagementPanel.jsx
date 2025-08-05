// src/modules/UserManagementPanel.jsx

import React, { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSquareIcon,
  KeyIcon // Icono de llave en lugar de cesto
} from '@heroicons/react/20/solid';
import { Switch } from '@headlessui/react';
import {
  getUsers,
  changeUserRole,
  resetPassword,
  deactivateUser,
  activateUser,
  registerEmployeeUser
} from '../services/userService';

// Modal responsive mejorado con diseño visual
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-2xl bg-gray-800 text-white rounded-2xl p-6 shadow-2xl overflow-auto">
        {children}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function UserManagementPanel() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    nombre: '', cargo: '', telefono: '', email: '',
    username: '', password: '', rol: 'vendedor'
  });

  // Carga inicial
  const fetchAll = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
      setFiltered(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchAll(); }, []);

  // Filtrado reactivo
  useEffect(() => {
    setFiltered(
      users.filter(u =>
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        (u.nombre_empleado && u.nombre_empleado.toLowerCase().includes(search.toLowerCase()))
      )
    );
  }, [search, users]);

  // Handlers de acciones
  const onRoleChange = async (id, rol) => { await changeUserRole(id, rol); fetchAll(); };
  const onResetPwd   = async (id)  => { const pwd = prompt('Nueva contraseña'); if (pwd) { await resetPassword(id, pwd); alert('✔ Contraseña actualizada'); }};
  const onToggleActive = async (id, active) => {
    try {
      if (active) await deactivateUser(id);
      else await activateUser(id);
      fetchAll();
    } catch (err) {
      alert(err.message);
    }
  };
  const onRegister = async e => {
    e.preventDefault();
    try {
      await registerEmployeeUser(formData);
      setIsOpen(false);
      setFormData({ nombre:'', cargo:'', telefono:'', email:'', username:'', password:'', rol:'vendedor' });
      fetchAll();
      alert('🎉 Registrado con éxito');
    } catch (err) {
      alert(err.message);
    }
  };

  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  return (
<div className="w-full min-h-screen p-6 space-y-8 bg-gray-900">      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl text-white font-extrabold flex-shrink-0">Gestión de Usuarios</h1>
        <div className="flex flex-1 flex-wrap items-center gap-4">
          <div className="relative flex-grow min-w-[220px]">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex-shrink-0 inline-flex items-center px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <PlusIcon className="w-5 h-5 mr-2" /> Agregar Usuario
          </button>
        </div>
      </header>

      {/* Modal Registro */}
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-2xl font-bold mb-6">Nuevo Empleado & Usuario</h2>
        <form onSubmit={onRegister} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {['nombre','cargo','telefono','email','username','password'].map((f,i) => (
            <input
              key={i}
              type={f === 'email' ? 'email' : f === 'password' ? 'password' : 'text'}
              placeholder={capitalize(f)}
              value={formData[f]}
              onChange={e => setFormData({ ...formData, [f]: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          ))}
          <select
            value={formData.rol}
            onChange={e => setFormData({ ...formData, rol: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="admin">Admin</option>
            <option value="vendedor">Vendedor</option>
          </select>
          <div className="flex justify-end gap-4 sm:col-span-2 mt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-5 py-3 bg-gray-600 hover:bg-gray-700 text-gray-200 rounded-xl shadow transition-all"
            >Cancelar</button>
            <button
              type="submit"
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >Crear</button>
          </div>
        </form>
      </Modal>

      {/* Lista de Usuarios */}
      {loading ? (
        <div className="text-gray-400 text-center py-8">Cargando usuarios...</div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-400 text-center py-8">No hay usuarios.</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(u => (
            <div
              key={u.id}
              className="flex flex-col justify-between bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-indigo-500 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gray-700 rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-lg text-white font-semibold truncate">{u.nombre_empleado || u.username}</p>
                  <p className="text-gray-400 text-sm truncate">{u.email}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${u.rol === 'admin' ? 'bg-blue-600' : 'bg-purple-600'} text-white whitespace-nowrap`}>
                  {capitalize(u.rol)}
                </span>
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <button
                    onClick={() => onRoleChange(u.id, u.rol === 'admin' ? 'vendedor' : 'admin')}
                    className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition"
                  >
                    <PencilSquareIcon className="w-5 h-5 text-indigo-400" />
                  </button>
                  <Switch
                    checked={u.activo === 1}
                    onChange={() => onToggleActive(u.id, u.activo === 1)}
                    className={`${u.activo === 1 ? 'bg-green-500' : 'bg-red-500'} relative inline-flex items-center h-6 w-12 rounded-full transition-colors`}
                  >
                    <span className={`${u.activo === 1 ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 bg-white rounded-full transition-transform`} />
                  </Switch>
                  <button
                    onClick={() => onResetPwd(u.id)}
                    className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition"
                  >
                    <KeyIcon className="w-5 h-5 text-yellow-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
