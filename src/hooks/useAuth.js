import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';

const API_URL = `${BACKEND_URL}${API_PREFIX}`;

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const syncUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return null;
        }

        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/me`, {
                headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
            });

            const userData = response.data;

            // Sync ke localStorage
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('role', userData.role);

            setUser(userData);
            setError(null);
            return userData;
        } catch (err) {
            console.error('Error syncing user data:', err);
            setError(err.message);
            // Jika token invalid, clear localStorage
            if (err.response?.status === 401) {
                localStorage.clear();
                window.location.href = '/';
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        window.location.href = '/';
    };

    useEffect(() => {
        syncUserData();
    }, []);

    return { user, loading, error, syncUserData, logout };
};