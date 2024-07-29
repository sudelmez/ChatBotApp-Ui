import PostsApiAdapter, {ApiEndpoints, ApiEndUrls} from "../../../api/FetchDataUseCase";
import { GetQuestion, Question } from "../model/question_model";
import { AnswerLog } from "../model/answer_log_model";

class QuestionService {
    private questionsApi: PostsApiAdapter<Question>;
    private logsApi: PostsApiAdapter<AnswerLog>;
    constructor() {
      this.questionsApi = new PostsApiAdapter<Question>();
      this.logsApi = new PostsApiAdapter<AnswerLog>();
    }
    async getQuestion(nextQuestionId: string | "",token: string): Promise<Question> {
      try {
        const data : GetQuestion = {
          nextQuestionId: nextQuestionId ?? "",
          platformId:"1"
        }
        const question = await this.questionsApi.get(ApiEndpoints.QUESTION, data, token);
        return question; 
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error; 
      }
    }
    async postLog(log: AnswerLog, token:string){
      try {
        await this.logsApi.postLog(ApiEndpoints.QUESTION, ApiEndUrls.LOG,  log, token)
      } catch (error) {
        console.error('Error logging questions:', error);
      }
    }
  }
  
  export default QuestionService;