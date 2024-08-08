import { ValidationRuleModel } from "./validation_rule_model";

export interface Question {
    questionId: string;
    title: string;
    businessTypeId : number | null;
    answerType: {
      title: string;
      answerTypeId: string;
    };
    answers: {
      title: string;
      nextQuestionId: string | null;
      answerId: string;
    }[];
    getLastQuestion: boolean;
    validationRule: ValidationRuleModel
}
export interface GetQuestion{
  nextQuestionId: string | "";
  platformId: string;
  getLastQuestion: boolean
}