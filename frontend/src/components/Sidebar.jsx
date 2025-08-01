import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

export default function Sidebar({ rol }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    navigate('/login');
  };

  // Cierra al hacer click fuera del sidebar (solo en móvil)
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        {!open ? (
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        ) : (
          <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        )}
      </button>

      <aside
        id="separator-sidebar"
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800 overflow-y-auto transition-transform transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4">
          <h2 className="text-2xl font-semibold mb-6 dark:text-white capitalize">
            {rol} Panel
          </h2>
          <ul className="space-y-2 font-medium">
            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="ms-3">Users</span>
              </a>
            </li>
            {/* Más enlaces... */}
          </ul>

          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <span className="ms-3">Help</span>
              </a>
            </li>
          </ul>

          <button
            onClick={cerrarSesion}
            className="w-full mt-6 flex items-center justify-center p-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
