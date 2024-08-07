import { GetQuestion, Question } from "../model/question_model";
import { ApiEndUrls,ApiEndpoints } from "../../../api/endUrls/api_urls";
import { AnswerLog } from "../model/answer_log_model";
import { BusinessOperationModel } from "../model/business_operation_model";
import ApiService from "../../../api/service/api_service";
import { ApiResponse } from "../../../api/response/api_response";
import { PolicyResponseModel } from "../model/policy_response_model";

class QuestionService {
    private questionsApi: ApiService<Question, GetQuestion>;
    private logsApi: ApiService<ApiResponse<AnswerLog>, AnswerLog>;
    private answerApi: ApiService<PolicyResponseModel, BusinessOperationModel>;
    constructor() {
      this.questionsApi = new  ApiService<Question, GetQuestion>;
      this.logsApi = new ApiService<ApiResponse<AnswerLog>, AnswerLog>();
      this.answerApi = new ApiService<PolicyResponseModel, BusinessOperationModel>();
    }
    async getQuestion(nextQuestionId: string | "",token: string, getLastQuestion: boolean): Promise<Question> {
      try {
        const data : GetQuestion = {
          nextQuestionId: nextQuestionId ?? "",
          platformId:"1",
          getLastQuestion: getLastQuestion
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
    async sendBusinessOperationAnswer(data: BusinessOperationModel, token:string){
      try {
        const res= await this.answerApi.post(ApiEndpoints.BUSINESS_TYPE, ApiEndUrls.ANY, data, {'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}`});
        return res;
      } catch (error) {
        console.error('Error saving answer:', error);
      }
    }
  }
  
  export default QuestionService;