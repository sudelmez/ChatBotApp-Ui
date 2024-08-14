export interface AnswerLog{
    questionId: number;
    answerId: string | null;
    answerInput: string | null;
    username: string;
    transactionId: string
}