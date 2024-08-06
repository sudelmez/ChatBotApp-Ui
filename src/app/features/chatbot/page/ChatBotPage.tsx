import "./ChatBotPage.css";
import CustomSelect from '../components/select/CustomSelect';
import { useEffect, useState } from "react";
import CustomInput from "../../../components/form/input/CustomInput";
import QuestionService from "../services/QuestionService";
import { Question } from "../model/question_model";
import { AnswerLog } from "../model/answer_log_model";
import { BusinessOperationModel } from "../model/business_operation_model";
import { useUserContext } from "../../../context/user_context";
import { PolicyResponseModel } from "../model/policy_response_model";
import CustomAlert from "../../../components/ui/alerts/custom_alert";

function ChatBotPage() {
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [end, setEnd] = useState<string>("");
  const [inputVal, setInputVal] = useState<string>("");
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [problem, setProblem] = useState<string>("");
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("");
  const [requestedInfo, setRequestedInfo] = useState<PolicyResponseModel | null>(null);
  const service = new QuestionService();
  const { token, user } = useUserContext();

  const fetchQuestion = async (nextQuestionId?: string, isLastQuestion?: boolean) => {
    try {
      setLoading(true);
      const nextQuestion = await service.getQuestion(nextQuestionId ?? "", token ?? "", isLastQuestion ?? false);
      setLoading(false);
      if (!nextQuestion) {
        setEnd("Sohbet sona erdi.");
        console.error(`Soru bulunamadı id: ${nextQuestionId}`);
        return;
      }
      setQuestionList(prevQuestionList => {
        if (prevQuestionList.some(q => q.questionId === nextQuestion.questionId)) {
          return prevQuestionList;
        }
        return [...prevQuestionList, nextQuestion];
      });
    } catch (error) {
      setLoading(false);
      console.error('Error fetching question:', error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (questionList.length > 0) {
      setCurrentQuestionId(questionList[questionList.length - 1].questionId);
    }
  }, [questionList]);

  const postAnswer = async (answerInput: string, businessTypeId: number | null) => {
    const answerData: BusinessOperationModel = {
      answerInput: answerInput,
      businessTypeId: businessTypeId
    };
    const responseSaved = await service.sendBusinessOperationAnswer(answerData, token ?? "");
    console.log(responseSaved);
    return responseSaved;
  };

  const sendLog = async (questionId: string, answerId: string, infoPersonId: string) => {
    const log: AnswerLog = {
      questionId: questionId,
      answerId: answerId || "",
      answerInput: inputVal || "",
      username: infoPersonId,
    };
    console.log(log);
    await service.postLog(log, token ?? "");
  };

  const callbackSelected = async (nextId: number | null | "", questionId: string, answerId: string, infoPersonId: string, businessTypeId: number | null, isLastQuestion: boolean) => {
    setSelectedAnswerId(answerId);
    await sendLog(questionId, answerId, infoPersonId);
    const questionIndex = questionList.findIndex(q => q.questionId === questionId);
    if (questionIndex !== -1 && questionIndex !== null) {
      const newList = questionList.slice(0, questionIndex + 1);
      setQuestionList(newList);
    }
    if (businessTypeId === null && nextId !== null) {
      await fetchQuestion(nextId.toString(), isLastQuestion);
      setEnd("");
      setInputVal("");
      setRequestedInfo(null);
      return;
    }
    const res = await postAnswer(inputVal, businessTypeId);
    setProblem("");
    setRequestedInfo(null);
    if (res?.success && nextId !== null) {
      await fetchQuestion((nextId).toString(), isLastQuestion);
      setRequestedInfo(res?.data);
      setEnd("");
      setInputVal("");
      return;
    } else if (res?.success === false) {
      setProblem(res.message ?? res.validationErrors[0] ?? "");
    }
  };

  return (
    <div className="Page">
      <div className="backgroundImageLeft"></div>
      <div className="card-custom">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            {loading ? (
              <div>
                <h3>Loading</h3>
              </div>
            ) : (
              questionList.map((value, index) => {
                const isCurrent = value.questionId === currentQuestionId;
                return (
                  <div key={index} className="item-padding">
                    <div className="header-padding">
                      <h2 className={isCurrent ? "header": "header-last"}>{value.title}</h2>
                    </div>
                    {value.answerType.title === "select" ? (
                      <CustomSelect
                        values={value.answers}
                        selectedValue={selectedAnswerId}
                        callback={callbackSelected}
                        questionId={value.questionId}
                        infoPersonId={user ?? ""}
                        businessTypeId={value.businessTypeId}
                        isLastQuestion={value.isLastQuestion}
                      ></CustomSelect>
                    ) : (
                      <div>
                        <CustomInput callback={(val) => {
                          setInputVal(val);
                          callbackSelected("", value.questionId, "", user ?? "", value.businessTypeId, value.isLastQuestion);
                        }} ></CustomInput>
                      </div>
                    )}
                  </div>
                );
              })
            )}
            {requestedInfo !== null && (<CustomAlert title={requestedInfo?.policyNumber ?? ""}></CustomAlert>)}
            <h3>{problem}</h3>
            <h2 className="endheader">{end}</h2>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}

export default ChatBotPage;

