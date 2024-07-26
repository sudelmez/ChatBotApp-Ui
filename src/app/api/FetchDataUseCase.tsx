import axios, { AxiosResponse } from 'axios';
import { AnswerLog } from '../features/chatbot/model/answer_log_model';
import { LoginRequestModel } from '../features/login/model/login_request_model';
import { GetQuestion } from '../features/chatbot/model/question_model';

export enum ApiEndpoints {
  BASE_URL = "https://localhost:7047/api",
  QUESTION = "Question",
  LOGIN = "Login"
}
export enum ApiEndUrls{
  LOG = "log"
}
interface ApiResponse<T> {
  data: T;
}
interface ApiLogResponse<T> {
  data: T[];
}
class PostsApiAdapter<T> {
  private baseUrl = ApiEndpoints.BASE_URL;
  async get(endpoint:string, data:GetQuestion, token:string): Promise<T> {
    try {
      console.log(data);
      const response: AxiosResponse<ApiResponse<T>> = await axios.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, data,{headers: {"Authorization" : `Bearer ${token}`}});
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching posts from ${endpoint}:`, error);
      throw error; 
    }
  }
  async postAllPosts(endpoint:string, endUrl: string, log:AnswerLog, token:string): Promise<T[]> {
    try {
      console.log("post isteği:");
      console.log(log);
      const response: AxiosResponse<ApiLogResponse<T>>= await axios.post<ApiLogResponse<T>>(`${this.baseUrl}/${endpoint}/${endUrl}`,log,{ headers: {"Authorization" : `Bearer ${token}`} });
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
      const response: AxiosResponse<ApiResponse<T>>= await axios.post<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, data);
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
