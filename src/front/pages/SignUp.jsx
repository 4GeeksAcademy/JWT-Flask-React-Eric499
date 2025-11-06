// Import necessary hooks and components from react-router-dom and other libraries.
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Signup.css';

export const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
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

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
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
                alert('Usuario creado exitosamente. Por favor inicia sesión.');
                navigate('/login');
            } else {
                setError(data.msg || 'Error al crear la cuenta');
            }
        } catch (err) {
            setError('Error de conexión. Intenta nuevamente.');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <div className="form-header">
                    <h2>Crear Cuenta</h2>
                    <p>
                        O{' '}
                        <Link to="/login" className="link">
                            inicia sesión en tu cuenta existente
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
                            autoComplete="new-password"
                            required
                            className="form-input"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="form-input"
                            placeholder="Confirmar Contraseña"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-submit">
                        <button type="submit" className="submit-button">
                            Crear cuenta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};