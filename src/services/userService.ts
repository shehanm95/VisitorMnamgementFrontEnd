import { AxiosError, AxiosResponse } from 'axios';
import { UserDto } from '../types/user';
import api from '../api/axios'
import { toast } from 'react-toastify';
import { ErrorResponse } from 'react-router-dom';
import { ApiErrorResponse } from '../types/ApiErrorResonse';


const API_BASE_URL = '/user';

export class UserService {
    async findUser(input: string): Promise<UserDto[]> {
        try {
            const response: AxiosResponse<UserDto[]> = await api.get(`${API_BASE_URL}/findUser/${input}`);
            return response.data;
        } catch (error) {
            const err = error as AxiosError<ApiErrorResponse>;
            const errorMessage = err.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
            console.error('Error:', errorMessage);
            throw new Error(errorMessage);
        }
    }

    async getImage(iamgeName: string): Promise<Blob> {
        const res: AxiosResponse<Blob> = await api.get(`${API_BASE_URL}/get/image/${iamgeName}`, { responseType: 'blob' });
        return res.data;
    }


    async getUserByEmail(email: string): Promise<UserDto | null> {
        try {
            const response: AxiosResponse<UserDto> = await api.get(`${API_BASE_URL}/get/${email}`);
            return response.data ?? null;
        } catch (error) {
            const err = error as AxiosError<ApiErrorResponse>;
            const errorMessage = err.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
            console.error('Error:', errorMessage);
            throw new Error(errorMessage);
        }
    }
    // Fetch all users
    async getAllUsers(): Promise<UserDto[]> {
        try {
            const response: AxiosResponse<UserDto[]> = await api.get(`${API_BASE_URL}/all`);
            return response.data ?? [];
        } catch (error) {
            const err = error as AxiosError<ApiErrorResponse>;
            const errorMessage = err.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
            console.error('Error:', errorMessage);
            throw new Error(errorMessage);
        }
    }

    // Update user role || moderator method
    async changeRole(user: UserDto): Promise<UserDto> {
        try {
            const response: AxiosResponse<UserDto> = await api.put(`${API_BASE_URL}/edit`, user);
            return response.data;
        } catch (error) {
            const err = error as AxiosError<ApiErrorResponse>;
            const errorMessage = err.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
            console.error('Error:', errorMessage);
            throw new Error(errorMessage);
        }
    }

    // adding registoring visitor from the front office || front Officer method
    async addVisitor(user: any): Promise<UserDto> {
        try {
            const response: AxiosResponse<UserDto> = await api.post(`${API_BASE_URL}/addVisitor`, user);
            toast.info("Registration Success");
            return response.data;
        } catch (error) {
            const err = error as AxiosError<ApiErrorResponse>;
            const errorMessage = err.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
            console.error('Error:', errorMessage);
            throw new Error(errorMessage);
        }
    }
    async loginVisitor(loginFormData: any): Promise<UserDto> {
        try {
            const response: AxiosResponse<UserDto> = await api.post(`${API_BASE_URL}/visitorLogin`, loginFormData);
            toast.info("Login Success");
            return response.data;
        } catch (error) {
            const err = error as AxiosError<ApiErrorResponse>;
            const errorMessage = err.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
            console.error('Error:', errorMessage);
            throw new Error(errorMessage);
        }
    }
}

export default new UserService();