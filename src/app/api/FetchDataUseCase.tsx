import axios, { AxiosResponse } from 'axios';
import { LoginRequestModel } from '../features/login/model/login_request_model';
import { GetQuestion } from '../features/chatbot/model/question_model';

export enum ApiEndpoints {
  BASE_URL = "https://localhost:7047/api",
  QUESTION = "Question",
  LOGIN = "Login",
  USER = "User"
}
export enum ApiEndUrls{
  LOG = "log",
  GET = "get",
  SAVEANSWER = "saveAnswer"
}
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
class PostsApiAdapter<T> {
  private baseUrl = ApiEndpoints.BASE_URL;
  async get(endpoint:string, data:GetQuestion, token:string): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await axios.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, data,{headers: {"Authorization" : `Bearer ${token}`}});
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching posts from ${endpoint}:`, error);
      throw error; 
    }
  }
  async postLog(endpoint:string, endUrl: string, log: T, token: string): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>>= await axios.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}/${endUrl}`,log,{ headers: {"Authorization" : `Bearer ${token}`} });
      return response.data.data;
    } catch (error) {
      console.error('Error sending log:', error);
      throw error; 
    }
  }
  async postAnswer(endpoint:string, endUrl: string, data: T, token: string){
    try {
      const response: AxiosResponse<ApiResponse<T>>= await axios.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}/${endUrl}`,data ,{ headers: {"Authorization" : `Bearer ${token}`} });
      return response.data;
    } catch (error) {
      console.error('Error sending log:', error);
      throw error; 
    }
  }
  async postLogin(endpoint: string, data: LoginRequestModel): Promise<T>{
    try {
      const response: AxiosResponse<ApiResponse<T>>= await axios.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, data);
      return response.data.data;
    } catch (error) {
      console.error('Error sending data:', error);
      throw error; 
    }
  }
  async getUserInfo(endpoint: string, endUrl: string, data: string, token: string): Promise<T>{
    try {
      const response: AxiosResponse<ApiResponse<T>>= await axios.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}/${endUrl}`, {userId:data}, { headers: {"Authorization" : `Bearer ${token}`} });
      return response.data.data;
    } catch (error) {
      console.error('Error sending data:', error);
      throw error; 
    }
  }
}

export default PostsApiAdapter;
