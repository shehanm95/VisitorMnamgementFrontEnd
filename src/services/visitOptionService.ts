import api from '../api/axios';// Adjust the import path based on your project structure
import { VisitOption } from '../types/visitOption';
import { AxiosResponse } from 'axios';

export const VisitOptionService = {
    createVisitOption: async (visitOption: VisitOption, image?: File): Promise<VisitOption> => {
        const formData = new FormData();
        formData.append('visitOption', JSON.stringify(visitOption));
        if (image) {
            formData.append('image', image);
        }

        const response: AxiosResponse<VisitOption> = await api.post('/api/visit-options/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },


    // Get a visit option by ID
    getVisitOptionById: async (id: number): Promise<VisitOption> => {
        const response: AxiosResponse<VisitOption> = await api.get(`/api/visit-options/get/${id}`);
        return response.data;
    },

    // Get all visit options
    getAllVisitOptions: async (): Promise<VisitOption[]> => {
        const response: AxiosResponse<VisitOption[]> = await api.get('/api/visit-options/all');
        return response.data;
    },

    // Get visit options by visit type ID
    getVisitOptionsByVisitType: async (visitTypeId: number): Promise<VisitOption[]> => {
        const response: AxiosResponse<VisitOption[]> = await api.get(`/api/visit-options/by-visit-type/${visitTypeId}`);
        return response.data;
    },

    // Update a visit option
    updateVisitOption: async (visitOption: VisitOption, image?: File): Promise<VisitOption> => {
        const formData = new FormData();
        formData.append('visitOption', JSON.stringify(visitOption));
        if (image) {
            formData.append('image', image);
        }

        const response: AxiosResponse<VisitOption> = await api.put('/api/visit-options/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Delete a visit option
    deleteVisitOption: async (id: number): Promise<void> => {
        await api.delete(`/api/visit-options/delete/${id}`);
    },

    // Get image by filename
    getImage: async (filename: string): Promise<Blob> => {
        const response: AxiosResponse<Blob> = await api.get(`/api/visit-options/cover/${filename}`, {
            responseType: 'blob',
        });
        return response.data;
    },

    // Delete image by filename
    deleteImage: async (filename: string): Promise<VisitOption> => {
        const response: AxiosResponse<VisitOption> = await api.delete(`/api/visit-options/delete/cover/${filename}`);
        return response.data;
    },
};