import { ValidationRuleModel } from "./validation_rule_model";

export interface Question {
    questionId: number;
    title: string;
    businessTypeId : number | null;
    info: string | null;
    mandatory: boolean;
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
      businessTypeId: number | null;
    }[];
    validationRules: ValidationRuleModel[]
}
export interface GetQuestion{
  nextQuestionId: number | null;
  platformId: string;
}