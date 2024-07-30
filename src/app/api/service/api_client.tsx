import axios, { AxiosError } from 'axios';
import { ApiResponse } from '../response/api_response';

export default class ApiClient {
    public async request(data: {
        url: string;
        method: 'post' | 'get' | 'patch' | 'put' | 'delete';
        body?: any;
        headers?: any;
      }): Promise<ApiResponse<any>> {
        try {
          const response = await axios.request<ApiResponse<any>>({
            url: data.url,
            method: data.method,
            data: data.body,
            headers: data.headers,
          });
          return {
            message: response.data.message,
            success: response.data.success,
            data: response.data.data,
            validationErrors: response.data.validationErrors
          };
        } catch (err) {
          const error: AxiosError<ApiResponse<any>> = err as any;
          return {
            message: error.response?.data.message as any,
            validationErrors: error.response?.data.validationErrors as any,
            success: error.response?.data.success as any,
            data: error.response?.data.data
          };
        }
    }
}