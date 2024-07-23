export interface Question {
    questionId: string;
    title: string;
    answerType: {
      title: string;
      answerTypeId: string | null;
    };
    isDisabled: boolean;
    answers: {
      title: string;
      nextQuestionId: string | null;
    }[];
}