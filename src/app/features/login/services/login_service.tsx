import ApiService from "../../../api/service/api_service";
import { LoginRequestModel } from "../model/login_request_model";
import { LoginResponse, UserModel } from "../model/user_model";
import { ApiEndUrls,ApiEndpoints } from "../../../api/endUrls/api_urls";
class LoginService{
    private loginService: ApiService<LoginResponse, LoginRequestModel>;
    private userService: ApiService<UserModel, LoginResponse>;
    constructor() {
      this.loginService = new ApiService<LoginResponse, LoginRequestModel>();
      this.userService = new ApiService<UserModel, LoginResponse>();
    }
    async Login(request:LoginRequestModel): Promise<LoginResponse | null> {
        try {
        const response = await this.loginService.post(ApiEndpoints.LOGIN, ApiEndUrls.ANY, request, {'accept': 'text/plain', 'Content-Type': 'application/json'});
        return response.data; 
        } catch (error) {
        console.error('Error logging in:', error);
        throw error; 
        }
    }
    async GetUserInfo(request: LoginResponse) : Promise<UserModel | null>{
      try {
        const response = await this.userService.post(ApiEndpoints.USER, ApiEndUrls.GET, request, {'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization' : `Bearer ${request.token}`});
        return response.data; 
      } catch (error) {
        throw error; 
      }
    }
}

export default LoginService;