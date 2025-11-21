import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const getDashboardByRole = (role) => {
  switch (role) {
    case 'EO': return '/app/eo/dashboard';
    case 'TENANT': return '/app/tenant/dashboard';
    case 'ADMIN': return '/app/admin/dashboard';
    case 'INSURER': return '/app/insurer/dashboard';
    default: return '/app/tenant/dashboard';
  }
};

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }
  
  // Optional: if user tries to access wrong role dashboard, redirect
  const role = localStorage.getItem('role');
  const currentPath = window.location.pathname;
  
  if (currentPath.startsWith('/app/eo/') && role !== 'EO') {
    return <Navigate to={getDashboardByRole(role)} replace />;
  }
  if (currentPath.startsWith('/app/tenant/') && role !== 'TENANT') {
    return <Navigate to={getDashboardByRole(role)} replace />;
  }
  if (currentPath.startsWith('/app/admin/') && role !== 'ADMIN') {
    return <Navigate to={getDashboardByRole(role)} replace />;
  }
  if (currentPath.startsWith('/app/insurer/') && role !== 'INSURER') {
    return <Navigate to={getDashboardByRole(role)} replace />;
  }
  
  return children;
}