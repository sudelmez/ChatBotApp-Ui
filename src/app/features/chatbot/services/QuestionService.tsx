import { GetQuestion, Question } from "../model/question_model";
import { ApiEndUrls,ApiEndpoints } from "../../../api/endUrls/api_urls";
import ApiService from "../../../api/service/api_service";
import { AutoResponseModel } from "../model/auto_response_model";

class QuestionService {
    private questionsApi: ApiService<Question, GetQuestion>;
    private fileApi: ApiService<AutoResponseModel, FormData>;
    constructor() {
      this.questionsApi = new  ApiService<Question, GetQuestion>;
      this.fileApi = new ApiService<AutoResponseModel, FormData>();
    }
    async getQuestion(nextQuestionId: number | null,token: string): Promise<Question> {
      try {
        const data : GetQuestion = {
          nextQuestionId: nextQuestionId ?? null,
          platformId:"1",
        }
        const question = await this.questionsApi.post(ApiEndpoints.QUESTION, ApiEndUrls.ANY, data, {'accept': 'text/plain', 'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}`});
        return question.data!; 
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error; 
      }
    }
    async sendBusinessOperation(data: FormData){
      try {
        const res= await this.fileApi.post(ApiEndpoints.BUSINESS, ApiEndUrls.ANY, data, {'accept': 'text/plain', 'Content-Type': 'multipart/form-data'});
        return res;
      } catch (error) {
        console.error('Error sending business:', error);
      }
    }
  }
  
  export default QuestionService;