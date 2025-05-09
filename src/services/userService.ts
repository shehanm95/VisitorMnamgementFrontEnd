import { AxiosResponse } from 'axios';
import { UserDto } from '../types/user';
import api from '../api/axios'
import { toast } from 'react-toastify';


const API_BASE_URL = '/user';

export class UserService {
    // Fetch all users
    async getAllUsers(): Promise<UserDto[]> {
        try {
            const response: AxiosResponse<UserDto[]> = await api.get(`${API_BASE_URL}/all`);
            return response.data ?? [];
        } catch (error) {
            toast.error('Failed to fetch users')
            throw new Error('Failed to fetch users');
        }
    }

    // Update user role
    async changeRole(user: UserDto): Promise<UserDto> {
        try {
            const response: AxiosResponse<UserDto> = await api.put(`${API_BASE_URL}/edit`, user);
            return response.data;
        } catch (error) {
            toast.error("Error updating user role...")
            console.error('Error updating user role:', error);
            throw new Error('Failed to update user role');
        }
    }
}

export default new UserService();