import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Login.css';

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Email y contraseña son requeridos');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem('token', data.token);
                navigate('/private');
            } else {
                setError(data.msg || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError('Error de conexión. Intenta nuevamente.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="form-header">
                    <h2>Iniciar Sesión</h2>
                    <p>
                        O{' '}
                        <Link to="/signup" className="link">
                            crea una cuenta nueva
                        </Link>
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="form-input"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="form-input"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-submit">
                        <button type="submit" className="submit-button">
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};