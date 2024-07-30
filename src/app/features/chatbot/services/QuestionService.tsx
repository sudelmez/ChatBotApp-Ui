import PostsApiAdapter, {ApiEndpoints, ApiEndUrls} from "../../../api/service/FetchDataUseCase";
import { GetQuestion, Question } from "../model/question_model";
import { AnswerLog } from "../model/answer_log_model";
import { SaveAnswerModel } from "../model/save_answer_model";

class QuestionService {
    private questionsApi: PostsApiAdapter<Question>;
    private logsApi: PostsApiAdapter<AnswerLog>;
    private answerApi: PostsApiAdapter<SaveAnswerModel>;
    constructor() {
      this.questionsApi = new PostsApiAdapter<Question>();
      this.logsApi = new PostsApiAdapter<AnswerLog>();
      this.answerApi = new PostsApiAdapter<SaveAnswerModel>();
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
        const res= await this.logsApi.postLog(ApiEndpoints.QUESTION, ApiEndUrls.LOG,  log, token);
        return res;
      } catch (error) {
        console.error('Error logging questions:', error);
      }
    }
    async saveAnswer(data: SaveAnswerModel, token:string){
      try {
        const res= await this.answerApi.postAnswer(ApiEndpoints.QUESTION, ApiEndUrls.SAVEANSWER, data, token);
        return res;
      } catch (error) {
        console.error('Error logging questions:', error);
      }
    }
  }
  
  export default QuestionService;