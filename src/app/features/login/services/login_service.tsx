import PostsApiAdapter, {ApiEndpoints} from "../../../api/FetchDataUseCase";
import { LoginRequestModel } from "../model/login_request_model";
import { UserModel } from "../model/user_model";

class LoginService{
    private postsApi: PostsApiAdapter<UserModel>;
  
    constructor() {
      this.postsApi = new PostsApiAdapter<UserModel>();
    }
    async Login(request:LoginRequestModel): Promise<UserModel> {
        try {
        const response = await this.postsApi.postData(ApiEndpoints.LOGIN, request);
        return response; 
        } catch (error) {
        console.error('Error logging in:', error);
        throw error; 
        }
    }
}

export default LoginService;