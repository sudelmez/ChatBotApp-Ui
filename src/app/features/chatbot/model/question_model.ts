import { ValidationRuleModel } from "./validation_rule_model";

export interface Question {
    questionId: number;
    title: string;
    businessTypeId : number | null;
    info: string | null;
    optionType: {
      title: string;
      optionTypeId: string;
    };
    isLastQuestion: boolean
    options: {
      title: string;
      nextQuestionId: number | null;
      optionId: string;
      info: string | null;
    }[];
    validationRule: ValidationRuleModel
}
export interface GetQuestion{
  nextQuestionId: number | null;
  platformId: string;
}