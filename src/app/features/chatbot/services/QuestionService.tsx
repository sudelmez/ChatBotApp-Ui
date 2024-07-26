import PostsApiAdapter, {ApiEndpoints, ApiEndUrls} from "../../../api/FetchDataUseCase";
import { GetQuestion, Question } from "../model/question_model";
import { AnswerLog } from "../model/answer_log_model";

class QuestionService {
    private postsApi: PostsApiAdapter<Question>;
  
    constructor() {
      this.postsApi = new PostsApiAdapter<Question>();
    }
  
    async getQuestion(nextQuestionId: string | "",token: string): Promise<Question> {
      try {
        const data : GetQuestion={
          nextQuestionId: nextQuestionId ?? "",
          platformId:"1"
        }
        const question = await this.postsApi.get(ApiEndpoints.QUESTION,data,token);
        console.log("question");
        console.log(question);
        return question; 
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error; 
      }
    }
    async postLog(log: AnswerLog, token:string){
      try {
        await this.postsApi.postAllPosts(ApiEndpoints.QUESTION, ApiEndUrls.LOG, log,token)
      } catch (error) {
      }
    }
  }
  
  export default QuestionService;