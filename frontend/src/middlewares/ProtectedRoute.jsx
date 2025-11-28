import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from 'src/config/constants';

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

// Check if EO profile is complete
const isEOProfileComplete = (user) => {
  if (!user || user.role !== 'EO') return true; // Not EO, skip check
  
  // Only check if user is inactive - inactive EO must complete profile
  // For active EO, allow access even if profile is not fully filled
  // Profile completion is optional for active users
  if (!user.is_active) {
    // For inactive EO, require at least name
    return !!user.name;
  }
  
  // Active EO can access all pages regardless of profile completeness
  return true;
};

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      setRedirectPath('/auth/login');
      setShouldRedirect(true);
      setChecking(false);
      return;
    }

    const role = localStorage.getItem('role');
    const currentPath = window.location.pathname;

    // Check role-based access
    if (currentPath.startsWith('/app/eo/') && role !== 'EO') {
      setRedirectPath(getDashboardByRole(role));
      setShouldRedirect(true);
      setChecking(false);
      return;
    }
    if (currentPath.startsWith('/app/tenant/') && role !== 'TENANT') {
      setRedirectPath(getDashboardByRole(role));
      setShouldRedirect(true);
      setChecking(false);
      return;
    }
    if (currentPath.startsWith('/app/admin/') && role !== 'ADMIN') {
      setRedirectPath(getDashboardByRole(role));
      setShouldRedirect(true);
      setChecking(false);
      return;
    }
    if (currentPath.startsWith('/app/insurer/') && role !== 'INSURER') {
      setRedirectPath(getDashboardByRole(role));
      setShouldRedirect(true);
      setChecking(false);
      return;
    }

    // Check EO profile completeness (skip if already on profile page)
    if (role === 'EO' && !currentPath.includes('/profile')) {
      const token = localStorage.getItem('token');
      const cachedUser = JSON.parse(localStorage.getItem('user') || 'null');
      
      // Quick check with cached data first
      if (cachedUser && !isEOProfileComplete(cachedUser)) {
        setRedirectPath('/app/eo/profile');
        setShouldRedirect(true);
        setChecking(false);
        return;
      }

      // Fetch fresh user data from profile endpoint to verify (has all EO fields)
      axios
        .get(BACKEND_URL + '/api/eo/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const user = res?.data?.data || res?.data || cachedUser;
          // Update localStorage with fresh data
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
          }
          if (user && !isEOProfileComplete(user)) {
            setRedirectPath('/app/eo/profile');
            setShouldRedirect(true);
          }
        })
        .catch(() => {
          // On error, use cached data
          if (cachedUser && !isEOProfileComplete(cachedUser)) {
            setRedirectPath('/app/eo/profile');
            setShouldRedirect(true);
          }
        })
        .finally(() => {
          setChecking(false);
        });
    } else {
      setChecking(false);
    }
  }, []);

  if (checking) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (shouldRedirect && redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
}