export interface Question {
    category: {
      title: string;
      categoryId: string;
    };
    questionId: string;
    title: string;
    answerType: {
      title: string;
      answerTypeId: string;
    };
    isDisabled: boolean;
    answers: {
      title: string;
      nextQuestionId: string | null;
      answerId: string;
    }[];
}