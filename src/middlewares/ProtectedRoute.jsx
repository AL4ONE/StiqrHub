import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const getDashboardByRole = (role) => {
  switch (role) {
    case 'EO': return '/eo/dashboard';
    case 'TENANT': return '/tenant/dashboard';
    case 'ADMIN': return '/admin/dashboard';
    case 'INSURER': return '/insurer/dashboard';
    default: return '/tenant/dashboard';
  }
};

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }
  
  // Optional: if user tries to access wrong role dashboard, redirect
  const role = localStorage.getItem('role');
  const currentPath = window.location.pathname;
  
  if (currentPath.startsWith('/eo/') && role !== 'EO') {
    return <Navigate to={getDashboardByRole(role)} replace />;
  }
  if (currentPath.startsWith('/tenant/') && role !== 'TENANT') {
    return <Navigate to={getDashboardByRole(role)} replace />;
  }
  if (currentPath.startsWith('/admin/') && role !== 'ADMIN') {
    return <Navigate to={getDashboardByRole(role)} replace />;
  }
  if (currentPath.startsWith('/insurer/') && role !== 'INSURER') {
    return <Navigate to={getDashboardByRole(role)} replace />;
  }
  
  return children;
}