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
import Spinner from 'react-bootstrap/Spinner';
function ChatBotPage() {
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [end, setEnd] = useState<string>("");
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [problem, setProblem] = useState<string>("");
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("");
  const [requestedInfo, setRequestedInfo] = useState<PolicyResponseModel | null>(null);
  const service = new QuestionService();
  const { token, user } = useUserContext();

  const fetchQuestion = async (nextQuestionId?: string, getLastQuestion?: boolean) => {
    try {
      setLoading(true);
      const nextQuestion = await service.getQuestion(nextQuestionId ?? "", token ?? "", getLastQuestion ?? false);
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

  const sendLog = async (answerInput: string, questionId: string, answerId: string, infoPersonId: string) => {
    const log: AnswerLog = {
      questionId: questionId,
      answerId: answerId ?? "",
      answerInput: answerInput ?? "",
      username: infoPersonId,
    };
    await service.postLog(log, token ?? "");
  };

  const callbackSelected = async (answerInputValue: string,nextId: number | null | "", questionId: string, answerId: string, infoPersonId: string, businessTypeId: number | null, getLastQuestion: boolean) => {
    setSelectedAnswerId(answerId);
    await sendLog(answerInputValue, questionId, answerId, infoPersonId);
    const questionIndex = questionList.findIndex(q => q.questionId === questionId);
    if (questionIndex !== -1 && questionIndex !== null) {
      const newList = questionList.slice(0, questionIndex + 1);
      setQuestionList(newList);
    }
    if (businessTypeId === null) {
      await fetchQuestion((nextId?? "").toString(), getLastQuestion);
      return;
    }
    const res = await postAnswer(answerInputValue, businessTypeId);
    setProblem("");
    console.log(res);
    console.log(res?.data);
    setRequestedInfo(null);
    if (res?.success) {
      await fetchQuestion((nextId ?? "").toString(), getLastQuestion);
      setRequestedInfo(res?.data);
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
          <div className="col">
            {loading ? (
              <div className="col-md-12">
                <Spinner animation="grow" />
              </div>
            ) : (
              <div> {questionList.map((value, index) => {
                const isCurrent = value.questionId === currentQuestionId;
                return (end ===null || end ==="") ? (
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
                        isLastQuestion={value.getLastQuestion}
                      ></CustomSelect>
                    ) : (
                      <div>
                        <CustomInput callback={async(val) => {
                          await callbackSelected(val, null, value.questionId, "", user ?? "", value.businessTypeId, value.getLastQuestion);
                        }} ></CustomInput>
                        {!isCurrent && requestedInfo !== null && (
                          <CustomAlert title={requestedInfo?.policyHolderName ?? ""}></CustomAlert>
                        )}                      </div>
                    )}
                  </div>
                ): <div></div> ;
              })}
              {(end !== null && end !=="") && (<CustomAlert title={end}></CustomAlert>)}
              </div>
            )}
            {/* <h3>{problem}</h3> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBotPage;


{/* <div className="container-fluid">
  <div className="row">
    <div className="col-md-3">

    </div>
    <div className="col-md-9">
       <div className="row">
         
         col-md-12
       </div>
      </div>
  </div>
</div> */}