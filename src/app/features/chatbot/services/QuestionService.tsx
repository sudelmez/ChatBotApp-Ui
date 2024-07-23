import PostsApiAdapter, {ApiEndpoints} from "../../../api/FetchDataUseCase";
import { Question } from "../model/question_model";
class QuestionService {
    private postsApi: PostsApiAdapter<Question>;
  
    constructor() {
      this.postsApi = new PostsApiAdapter<Question>();
    }
  
    async getQuestions(): Promise<Question[]> {
      try {
        const questions = await this.postsApi.getAllPosts(ApiEndpoints.QUESTION);
        console.log("questions");
        console.log(questions);
        return questions; 
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error; 
      }
    }
  }
  
  export default QuestionService;