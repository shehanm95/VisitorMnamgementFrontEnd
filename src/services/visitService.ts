import { AxiosError, AxiosResponse } from 'axios';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { ApiErrorResponse } from '../types/ApiErrorResonse';
import { Visit } from '../types/visit';
import { ObjectService } from '../frontServices/ObjectService';
import { VisitRowReq } from '../types/VisitRowReq';
import { VisitRow } from '../types/VisitRow';

const API_BASE_URL = '/visits';

export const VisitService = {

    async markAsPrinted(id: number): Promise<{ A: number }> {
        return await api.put(API_BASE_URL + "/markAsPrinted/" + id)
    },

    async getVisitRowsForDate(visitRawReq: VisitRowReq): Promise<VisitRow[]> {
        let o = ObjectService.removeBulk(visitRawReq, [])
        console.log(o)
        const response = await api.post(API_BASE_URL + "/getVisitRowsForDate", o);
        return response.data;
    },

    async createPreRegVisit(visit: Visit): Promise<Visit> {
        // let o = ObjectService.removeBulk(visitRawReq, [])
        // console.log(o)
        const response = await api.post(API_BASE_URL + "/createPreRegVisit", visit);
        return response.data;
    },


    async createVisit(visitData: Visit): Promise<Visit | null> {
        // let cleanedObject = ObjectService.removeBulk(visitData,
        //     [{
        //         doNotRemove: 'dynamicAnswers',
        //         butRemoveBulkOf: ['dynamicQuestuion']
        //     }]);
        try {
            const response: AxiosResponse<Visit> = await api.post(API_BASE_URL, visitData);
            toast.success('Visit created successfully');
            return response.data;
        } catch (error) {
            this.handleError(error, 'Error creating visit');
            return null;
        }
    },

    async getVisitById(id: number): Promise<Visit | null> {
        try {
            const response: AxiosResponse<Visit> = await api.get(`${API_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            this.handleError(error, 'Error fetching visit');
            return null;
        }
    },

    async updateVisit(id: number, visitData: Visit): Promise<Visit | null> {
        try {
            const response: AxiosResponse<Visit> = await api.put(`${API_BASE_URL}/${id}`, visitData);
            toast.success('Visit updated successfully');
            return response.data;
        } catch (error) {
            this.handleError(error, 'Error updating visit');
            return null;
        }
    },

    async deleteVisit(id: number): Promise<boolean> {
        try {
            await api.delete(`${API_BASE_URL}/${id}`);
            toast.success('Visit deleted successfully');
            return true;
        } catch (error) {
            this.handleError(error, 'Error deleting visit');
            return false;
        }
    },

    async getVisitsByVisitOptionId(visitOptionId: number): Promise<Visit[]> {
        try {
            const response: AxiosResponse<Visit[]> = await api.get(`${API_BASE_URL}/by-visit-option/${visitOptionId}`);
            return response.data;
        } catch (error) {
            this.handleError(error, 'Error fetching visits by option');
            return [];
        }
    },

    async getVisitsByVisitorUserId(visitorUserId: number): Promise<Visit[]> {
        try {
            const response: AxiosResponse<Visit[]> = await api.get(`${API_BASE_URL}/by-visitor/${visitorUserId}`);
            return response.data;
        } catch (error) {
            this.handleError(error, 'Error fetching visits by visitor');
            return [];
        }
    },

    handleError(error: unknown, defaultMessage: string): void {
        const err = error as AxiosError<ApiErrorResponse>;
        const errorMessage = err.response?.data?.message || defaultMessage;
        toast.error(errorMessage);
        console.error('API Error:', errorMessage, err.response?.data);
    }
}