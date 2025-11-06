import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Private.css';

export const Private = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrivateData = async () => {
            const token = sessionStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else if (response.status === 401) {
                    sessionStorage.removeItem('token');
                    navigate('/login');
                } else {
                    setError('Error al cargar los datos del usuario');
                }
            } catch (err) {
                setError('Error de conexión');
            }
        };

        fetchPrivateData();
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="private-container">
            <div className="private-content">
                <div className="private-header">
                    <h1>Área Privada</h1>
                    <button onClick={handleLogout} className="logout-button">
                        Cerrar Sesión
                    </button>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {userData && (
                    <div className="user-info">
                        <h2>Nada importante para ver</h2>
                        <p><strong>Solo tu Email:</strong> {userData.email}</p>
                    </div>
                )}

                <div className="welcome-message">
                    <p>¡Bienvenido! Ruta protegida con JWT.</p>
                </div>
            </div>
        </div>
    );
};