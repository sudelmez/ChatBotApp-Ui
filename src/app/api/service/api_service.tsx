import ApiClient from './api_client';
import { ApiEndUrls, ApiEndpoints } from '../endUrls/api_urls';
import { ApiResponse } from '../response/api_response';
export default class ApiService<T, F>{
    private apiClient : ApiClient;
    constructor() {
        this.apiClient = new ApiClient();
      }
    async get(endpoint: ApiEndpoints, endurl: ApiEndUrls, body:F, headers: any): Promise<ApiResponse<T>> {
        const url = ApiEndpoints.BASE_URL + endpoint + "/" + endurl;
        const response = this.apiClient.request({
            url: url,
            method: 'get',
            body: body,
            headers: headers
        });
        return response;
    }
    async post(endpoint: ApiEndpoints, endurl: ApiEndUrls, body:F, headers: any): Promise<ApiResponse<T>> {
        const url = ApiEndpoints.BASE_URL + endpoint + "/" + endurl;
        const response = this.apiClient.request({
            url: url,
            method: 'post',
            body: body,
            headers: headers
        });
        return response;
    }
    async delete(endpoint: ApiEndpoints, endurl: ApiEndUrls, body:F, headers: any): Promise<ApiResponse<T>> {
        const url = ApiEndpoints.BASE_URL + endpoint + "/" + endurl;
        const response = this.apiClient.request({
            url: url,
            method: 'delete',
            body: body,
            headers: headers
        });
        return response;
    }
    async put(endpoint: ApiEndpoints, endurl: ApiEndUrls, body:F, headers: any): Promise<ApiResponse<T>> {
        const url = ApiEndpoints.BASE_URL + endpoint + "/" + endurl;
        const response = this.apiClient.request({
            url: url,
            method: 'put',
            body: body,
            headers: headers
        });
        return response;
    }
    async patch(endpoint: ApiEndpoints, endurl: ApiEndUrls, body:F, headers: any): Promise<ApiResponse<T>> {
        const url = ApiEndpoints.BASE_URL + endpoint + "/" + endurl;
        const response = this.apiClient.request({
            url: url,
            method: 'patch',
            body: body,
            headers: headers
        });
        return response;
    }
}