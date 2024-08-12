import "./ChatBotPage.css";
import CustomSelect from '../components/select/CustomSelect';
import { useEffect, useState } from "react";
import CustomInput from "../../../components/form/input/CustomInput";
import QuestionService from "../services/QuestionService";
import { Question } from "../model/question_model";
import { AnswerLog } from "../model/answer_log_model";
import { BusinessOperationModel } from "../model/business_operation_model";
import { useUserContext } from "../../../context/user_context";
import CustomAlert from "../../../components/ui/alerts/custom_alert";
import Spinner from 'react-bootstrap/Spinner';
import CustomFileInput from "../../../components/form/file_input/file_input";
import { AutoResponseModel } from "../model/auto_response_model";
import CustomDateInput from "../../../components/form/date_input/date_input";
function ChatBotPage() {
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [end, setEnd] = useState<string>("");
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [problem, setProblem] = useState<string>("");
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("");
  const service = new QuestionService();
  const [autoResponse, setAutoResponse] = useState<AutoResponseModel | null>(null);
  const { token, user, transactionId } = useUserContext();

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
      setEnd("Bir sorun oluştu.");
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

  const postBusinessModel = async (autoResponseId: string, businessTypeId: number | null, date?: Date | null, document?: File | null, input?: string | null) => {
    const answerData: BusinessOperationModel = {
      autoResponseId: autoResponseId,
      businessTypeId: businessTypeId,
      userId: user ?? "",
      transactionId: transactionId,
      uploadData: {
        dateInfo: {caseDate: date ?? null},
        uploadDocument: {docFileLink:"" ?? null, docFileName: document?.name ?? null, docFilePath:"" ?? null,fileExtension:"" ?? null},
        inputText: {answerInput: input ?? null}
      }
    };
    console.log(answerData);
    const responseSaved = await service.sendBusinessOperationAnswer(answerData, token ?? "");
    return responseSaved;
  };

  const sendLog = async (answerInput: string, questionId: string, answerId: string, infoPersonId: string) => {
    const log: AnswerLog = {
      questionId: questionId,
      answerId: answerId ?? "",
      answerInput: answerInput ?? "",
      username: infoPersonId,
      transactionId: transactionId
    };
    await service.postLog(log, token ?? "");
  };
  const callbackHandlePress = async(autoResponseId: string, businessTypeId: number | null, date?: Date | null, document?: File | null, input?: string | null, nextId?: string | null, getLastQuestion?: boolean)=>{
  try {
  const res = await postBusinessModel(autoResponseId, businessTypeId, date, document, input);
    setProblem("");
    console.log(res);
    if (res?.success) {
      await fetchQuestion((nextId ?? "").toString(), getLastQuestion);
      setAutoResponse(res?.data);
      return;
    } else if (res?.success === false) {
      setProblem(res.message ?? res.validationErrors[0] ?? "");
    }
    } catch (error) {
      setProblem("Bir sorun oluştu.");
    }
  }

  const callbackSelected = async (autoResponseId: string | null, answerInputValue: string, nextId: number | null | "", questionId: string, answerId: string, infoPersonId: string, businessTypeId: number | null, getLastQuestion: boolean) => {
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
  };

  const getQuestionWithType = (value: Question, isCurrent: boolean) => {
    switch (value.answerType.title) {
      case "select":
        return (
          <div>
          <CustomSelect
            autoResponseId={value.autoResponseId}
            isLasted={!isCurrent}
            values={value.answers}
            selectedValue={selectedAnswerId}
            callback={callbackSelected}
            questionId={value.questionId}
            infoPersonId={user ?? ""}
            businessTypeId={value.businessTypeId}
            isLastQuestion={value.getLastQuestion}
          />
          {!isCurrent && autoResponse !== null && autoResponse.autoResponseMessage !== "" && (
            <CustomAlert title={autoResponse?.autoResponseMessage ?? ""} />
          )}
          </div>
        );
      case "input":
        return (
          <div>
            <CustomInput
              typeInput={value.businessTypeId ?? 0}
              validationRule={value.validationRule}
              isLasted={!isCurrent}
              callback={async (val) => {
                callbackHandlePress(value.autoResponseId, value.businessTypeId, null, null, val);
              }}
            />
            {!isCurrent && autoResponse !== null && autoResponse.autoResponseMessage !== "" && (
              <CustomAlert title={autoResponse?.autoResponseMessage ?? ""} />
            )}
          </div>
        );
        case "fileInput":
        return (
          <div>
            <CustomFileInput typeFile={value.businessTypeId ?? 0} callback={async (val) => {
              callbackHandlePress(value.autoResponseId, value.businessTypeId, null, val, null);
              }} isLasted={!isCurrent} title={value.title}></CustomFileInput>
            {!isCurrent && autoResponse !== null && autoResponse.autoResponseMessage !== "" && (
              <CustomAlert title={autoResponse?.autoResponseMessage ?? ""} />
            )}
          </div>
        );
        case "fileDownload":
        return (
          <div>
            {!isCurrent && autoResponse !== null && autoResponse.autoResponseMessage !== "" && (
            <CustomAlert title={autoResponse?.autoResponseMessage ?? ""} />
          )}
          </div>
        );
        case "dateInput":
        return (
          <div>
            <CustomDateInput autoResponseId={value.autoResponseId} typeDate={value.businessTypeId ?? 0} callback={async (val) => {
              callbackHandlePress(value.autoResponseId, value.businessTypeId, val, null, null);
              }} isLasted={!isCurrent} title={value.title}></CustomDateInput>
            {!isCurrent && autoResponse !== null && autoResponse.autoResponseMessage !== "" && (
              <CustomAlert title={autoResponse?.autoResponseMessage ?? ""} />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
          <div className="backgroundImageLeft"></div>
          </div>
          <div className="col-md-8">
          <div className="row">
          <div className="col">
            <div className="paddingArrange">{loading ? (
              <div className="col-md-12">
                <Spinner animation="grow" />
              </div>
            ) : (
              <div> {questionList.map((value, index) => {
                console.log(value);
                const isCurrent = value.questionId === currentQuestionId;
                return (end ===null || end ==="") ? (
                  <div key={index} className="item-padding">
                    <div className="header-padding">
                      <h2 className={isCurrent ? "header": "header-last"}>{value.title}</h2>
                    </div>
                    {getQuestionWithType(value, isCurrent)}
                  </div>
                ): <div></div> ;
              })}
              {(end !== null && end !=="") && (<CustomAlert title={end}></CustomAlert>)}</div>
            )}
            {(problem!==null && problem!=="") && (<CustomAlert isError= {true} title={problem}></CustomAlert>)}
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ChatBotPage;
