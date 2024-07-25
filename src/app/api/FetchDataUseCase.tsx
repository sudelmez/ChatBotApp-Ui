import axios, { AxiosResponse } from 'axios';
import { AnswerLog } from '../features/chatbot/model/answer_log_model';
import { LoginRequestModel } from '../features/login/model/login_request_model';

export enum ApiEndpoints {
  BASE_URL = "https://localhost:7047/api",
  QUESTION = "Question",
  LOGIN = "Login"
}
export enum ApiEndUrls{
  LOG = "log"
}
interface ApiResponse<T> {
  data: T[];
}
interface ApiUserResponse<T> {
  data: T;
}
class PostsApiAdapter<T> {
  private baseUrl = ApiEndpoints.BASE_URL;
  async getAllPosts(endpoint: string): Promise<T[]> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await axios.get<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`);
      console.log("res data!!");
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching posts from ${endpoint}:`, error);
      throw error; 
    }
  }
  async postAllPosts(endpoint:string, endUrl: string, log:AnswerLog): Promise<T[]> {
    try {
      console.log("post isteği:");
      console.log(log);
      const response: AxiosResponse<ApiResponse<T>>= await axios.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}/${endUrl}`,log);
      console.log("res log data!!");
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error sending log:', error);
      throw error; 
    }
  }
  async postData(endpoint: string, data: LoginRequestModel): Promise<T>{
    try {
      const response: AxiosResponse<ApiUserResponse<T>>= await axios.post<ApiUserResponse<T>>(`${this.baseUrl}/${endpoint}`, data);
      console.log("res log data!!");
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error sending data:', error);
      throw error; 
    }
  }
}

export default PostsApiAdapter;
