export interface AnswerLog{
    questionId: number;
    optionId: string | null;
    answerInput: string | null;
    username: string;
    transactionId: string;
    businessTypeId: number | null;
}