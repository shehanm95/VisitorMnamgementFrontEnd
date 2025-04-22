// src/services/authService.ts
import { AxiosError } from 'axios';
import api from '../api/axios';
import { AuthResponse, LoginCredentials } from '../types/auth';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        const { accessToken, refreshToken } = response.data;

        // Store tokens in localStorage (consider cookies for production)
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Login failed:', axiosError.response?.data || axiosError.message);
        throw error;
    }
};

export const logout = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
};