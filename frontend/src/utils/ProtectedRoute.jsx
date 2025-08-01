import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const rol = decoded.data?.rol; // ✅ accede a decoded.data.rol

    if (!allowedRoles.includes(rol)) {
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
}
