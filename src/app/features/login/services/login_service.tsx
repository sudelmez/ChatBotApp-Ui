import PostsApiAdapter, {ApiEndpoints, ApiEndUrls} from "../../../api/FetchDataUseCase";
import { LoginRequestModel } from "../model/login_request_model";
import { LoginResponse, UserModel } from "../model/user_model";
class LoginService{
    private loginApi: PostsApiAdapter<LoginResponse>;
    private userApi: PostsApiAdapter<UserModel>;
    constructor() {
      this.loginApi = new PostsApiAdapter<LoginResponse>();
      this.userApi = new PostsApiAdapter<UserModel>();
    }
    async Login(request:LoginRequestModel): Promise<LoginResponse> {
        try {
        const response = await this.loginApi.postLogin(ApiEndpoints.LOGIN, request);
        return response; 
        } catch (error) {
        console.error('Error logging in:', error);
        throw error; 
        }
    }
    async GetUserInfo(request: string, token: string) : Promise<UserModel>{
      try {
        const response = await this.userApi.getUserInfo(ApiEndpoints.USER, ApiEndUrls.GET, request, token);
        return response; 
      } catch (error) {
        throw error; 
      }
    }
}

export default LoginService;