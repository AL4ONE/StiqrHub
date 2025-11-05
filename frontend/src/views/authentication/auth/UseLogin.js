import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e, onSuccess) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email: username,
        password: password,
      });

      // 🔥 Simpan HANYA token
      localStorage.setItem('token', response.data.token);

      // 🔥 Panggil callback untuk sync & redirect
      if (onSuccess) {
        await onSuccess();
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 'Login gagal. Cek email dan password Anda.'
      );
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
};

export default useLogin;