import PostsApiAdapter, {ApiEndpoints, ApiEndUrls} from "../../../api/FetchDataUseCase";
import { Question } from "../model/question_model";
import { AnswerLog } from "../model/answer_log_model";

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
    async postLog(log: AnswerLog){
      try {
        await this.postsApi.postAllPosts(ApiEndpoints.QUESTION, ApiEndUrls.LOG,log)
      } catch (error) {
      }
    }
  }
  
  export default QuestionService;