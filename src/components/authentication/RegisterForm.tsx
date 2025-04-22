import React, { useState } from 'react';
import { NavBar } from '../common/NavBar';
import './authenticationForm.css';
import { BlueLogo } from '../common/BlueLogo';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';
import { RegisterCredentials, TokenPair } from '../../types/auth';



export const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<RegisterCredentials>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const validateForm = (): boolean => {
        if (credentials.firstName.length < 2) {
            toast.error('First name must be at least 2 characters');
            return false;
        }
        if (credentials.lastName.length < 2) {
            toast.error('Last name must be at least 2 characters');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
            toast.error('Invalid email format');
            return false;
        }
        if (credentials.password.length < 8) {
            toast.error('Password must be at least 8 characters');
            return false;
        }
        if (credentials.password !== credentials.confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) {
            return;
        }

        try {
            const response = await api.post<TokenPair>('/auth/register', credentials);
            const { accessToken, refreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            toast.success('Registration successful! Redirecting to home...');
            setTimeout(() => navigate('/home'), 1000); // Delay for toast visibility
        } catch (err: any) {
            const errorMessage =
                typeof err.response?.data === 'string'
                    ? err.response?.data
                    : err.response?.data?.message || 'Registration failed';
            toast.error(errorMessage);
            setError(errorMessage);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.target.checked);
        // TODO: add remember me logic
    };

    return (
        <div>
            <NavBar />
            <div className="maincontainer flex center">
                <div className="authenticationForm">
                    <div className="logoArea flex center">
                        <BlueLogo />
                    </div>
                    <h3 className="mt-4">Register</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="w-100 bigInputFields mt-3">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={credentials.firstName}
                                onChange={handleChange}
                                required
                            />
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="w-100 bigInputFields mt-3">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={credentials.lastName}
                                onChange={handleChange}
                                required
                            />
                            <i className="fa-solid fa-user"></i>
                        </div>
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
                        <div className="w-100 bigInputFields mt-3">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={credentials.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <i className="fa-solid fa-lock"></i>
                        </div>
                        {error && <p className="text-danger mt-2">{error}</p>}
                        <div className="p-1 rememberArea flex centerV mt-3 between">
                            <div>
                                <input
                                    type="checkbox"
                                    name="rememberme"
                                    id="rememberme"
                                    checked={rememberMe}
                                    onChange={handleCheckboxChange}
                                />
                                <label className='ms-2' htmlFor="rememberme">Remember me</label>
                            </div>
                        </div>
                        <button type="submit" className="bigButton w-100">Register</button>
                    </form>
                    <div className="formbottom flex center">
                        <span>Already have an account?</span>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};