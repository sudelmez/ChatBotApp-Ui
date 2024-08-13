import { AutoResponseModel } from "../../features/chatbot/model/auto_response_model";

export interface ApiResponse<T> {
    data: T | null;
    message: string | null;
    success: boolean;
    validationErrors : Array<string> | [];
    autoResponse: AutoResponseModel | null;
}