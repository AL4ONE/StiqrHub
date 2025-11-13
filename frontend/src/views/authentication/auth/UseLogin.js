import { useState } from 'react';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';

export default function useLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e, onSuccess) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(BACKEND_URL + '/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username.toLowerCase(), password })
      });
      const data = await res.json();
      if (data.token) {
        // Clear mock leftovers
        localStorage.removeItem('username');
        localStorage.removeItem('user');
        // Persist session from backend
        localStorage.setItem('token', data.token);
        if (data.user) {
          localStorage.setItem('role', data.user.role);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setError(data.message || 'Login gagal');
      }
    } catch {
      setError('Login gagal');
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleLogin,
  };
}