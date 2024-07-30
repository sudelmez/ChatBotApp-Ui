import PostsApiAdapter from "../../../api/service/FetchDataUseCase";
import { GetQuestion, Question } from "../model/question_model";
import { ApiEndUrls,ApiEndpoints } from "../../../api/endUrls/api_urls";
import { AnswerLog } from "../model/answer_log_model";
import { SaveAnswerModel } from "../model/save_answer_model";
import ApiService from "../../../api/service/api_service";
import { ApiResponse } from "../../../api/response/api_response";

class QuestionService {
    private questionsApi: ApiService<Question, GetQuestion>;
    private logsApi: ApiService<ApiResponse<AnswerLog>, AnswerLog>;
    private answerApi: ApiService<ApiResponse<SaveAnswerModel>, SaveAnswerModel>;
    constructor() {
      this.questionsApi = new  ApiService<Question, GetQuestion>;
      this.logsApi = new ApiService<ApiResponse<AnswerLog>, AnswerLog>();
      this.answerApi = new ApiService<ApiResponse<SaveAnswerModel>, SaveAnswerModel>();
    }
    async getQuestion(nextQuestionId: string | "",token: string): Promise<Question> {
      try {
        const data : GetQuestion = {
          nextQuestionId: nextQuestionId ?? "",
          platformId:"1"
        }
        const question = await this.questionsApi.post(ApiEndpoints.QUESTION, ApiEndUrls.ANY, data, {'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}`});
        return question.data!; 
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error; 
      }
    }
    async postLog(log: AnswerLog, token:string){
      try {
        const res= await this.logsApi.post(ApiEndpoints.QUESTION, ApiEndUrls.LOG,  log, {'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}`});
        return res;
      } catch (error) {
        console.error('Error logging questions:', error);
      }
    }
    async saveAnswer(data: SaveAnswerModel, token:string){
      try {
        const res= await this.answerApi.post(ApiEndpoints.QUESTION, ApiEndUrls.SAVEANSWER, data, {'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}`});
        return res;
      } catch (error) {
        console.error('Error logging questions:', error);
      }
    }
  }
  
  export default QuestionService;