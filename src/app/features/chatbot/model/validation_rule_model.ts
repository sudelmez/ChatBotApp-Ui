export interface ValidationRuleModel{
    pattern: string;
    minLength: number | null;
    maxLength: number | null;
    message: string;
    inputType: string | null;
}