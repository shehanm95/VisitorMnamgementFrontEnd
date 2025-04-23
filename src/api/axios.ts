import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Response interceptor for token refresh
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}
export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
};

interface JwtPayload {
    sub: string;
    exp: number;
    iat: number;
    role?: string;
}

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig | undefined;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            localStorage.getItem('refreshToken')
        ) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken')!;
                const response = await api.post<{ accessToken: string; refreshToken: string }>(
                    '/auth/refresh',
                    { refreshToken }
                );

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                saveRole(accessToken);
                if (originalRequest.headers) {
                    originalRequest.headers.set('Authorization', `Bearer ${accessToken}`);
                }

                return api(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                toast.error('Session expired. Please log in again.');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const saveRole = (accessToken: string) => {
    console.log("role saved");
    const decoded = jwtDecode<JwtPayload>(accessToken);
    const userRole = decoded.role;


    console.log('User role:', userRole);
    if (userRole) {
        localStorage.setItem('userRole', userRole);
    } else {
        localStorage.setItem('userRole', 'No Role');
    }
}

export const getRole = () => {
    let role = localStorage.getItem('userRole');
    console.log("method role : " + role);
    return role;
}


export default api;