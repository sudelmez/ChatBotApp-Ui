export interface Question {
    questionId: string;
    title: string;
    answerType: {
      title: string;
      answerTypeId: string;
    };
    answers: {
      title: string;
      nextQuestionId: string | null;
      answerId: string;
    }[];
}
export interface GetQuestion{
  nextQuestionId: string | "";
  platformId: string;
}