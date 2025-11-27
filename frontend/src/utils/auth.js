export const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // atau 'access_token' sesuai penyimpanan lu
  return {
    Authorization: `Bearer ${token}`,
  };
};
 