import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';
import { BlueLogo } from '../common/BlueLogo';

interface LoginCredentials {
    email: string;
    password: string;
}

interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post<TokenPair>('/auth/login', credentials);
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            toast.success('Login successful!');
            navigate('/home');
        } catch (err: any) {
            const errorMessage =
                typeof err.response?.data === 'string'
                    ? err.response?.data
                    : err.response?.data?.message || 'Login failed';
            toast.error(errorMessage);
            setError(errorMessage);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="maincontainer flex center">
            <div className="authenticationForm">
                <div className="logoArea flex center">
                    <BlueLogo />
                </div>
                <h3 className='mt-3'>Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="w-100 bigInputFields mt-3">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                        <i className="fa-solid fa-at"></i>
                    </div>
                    <div className="w-100 bigInputFields mt-3">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    {error && <p className="text-danger mt-2">{error}</p>}
                    <button type="submit" className="bigButton w-100">Login</button>
                </form>
                <div className="formbottom flex center">
                    <span>Don't have an account?</span>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
};