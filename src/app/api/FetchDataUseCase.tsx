import axios, { AxiosResponse } from 'axios';

export enum ApiEndpoints {
  BASE_URL = "https://localhost:7047/api",
  QUESTION = "Question",
}
interface ApiResponse<T> {
  data: T[];
}
class PostsApiAdapter<T> {
  private baseUrl = ApiEndpoints.BASE_URL;
  async getAllPosts(endpoint: string): Promise<T[]> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await axios.get<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`);
      console.log("res data");
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching posts from ${endpoint}:`, error);
      throw error; 
    }
  }
}

export default PostsApiAdapter;
