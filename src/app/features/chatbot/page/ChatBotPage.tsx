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
import CustomDateInput from "../../../components/form/date_input/date_input";
function ChatBotPage() {
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [end, setEnd] = useState<string>("");
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [problem, setProblem] = useState<string>("");
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>();
  const service = new QuestionService();
  const { token, user, transactionId } = useUserContext();
  const [selectedInfo, setSelectedInfo] = useState<string | null>(null);

  const fetchQuestion = async (nextQuestionId?: number | null) => {
    try {
      setLoading(true);
      const nextQuestion = await service.getQuestion(nextQuestionId ?? null, token ?? "");
      setLoading(false);
      if (!nextQuestion) {
        setEnd("Sohbet sona erdi.");
        console.error(`Soru bulunamadı id: ${nextQuestionId}`);
        return;
      }
      setProblem("");
      setQuestionList(prevQuestionList => {
        if (prevQuestionList.some(q => q.questionId === nextQuestion.questionId)) {
          return prevQuestionList;
        }
        return [...prevQuestionList, nextQuestion];
      });
    } catch (error) {
      setLoading(false);
      setProblem("Bir sorun oluştu.");
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

  const postBusinessModel = async (businessTypeId: number | null, date?: Date | null, input?: string | null) => {
  try {
    const answerData: BusinessOperationModel = {
      businessTypeId: businessTypeId,
      userId: user ?? "",
      transactionId: transactionId,
      uploadData: {
        dateInfo: {caseDate: date ?? null},
        inputText: {answerInput: input ?? ""}
      }
    };
    const responseSaved = await service.sendBusinessOperationAnswer(answerData, token ?? "");
    return responseSaved;
  } catch (error) {
    console.log(error);
  }
  };

  const postBusinessFileModel = async (document: File[], nextId?: number | null) => {
  try {
    const formData = new FormData();
    document.forEach(element => {
      formData.append('formFiles', element);
    });
    const responseSaved = await service.sendBusinessFile(formData);
      if (responseSaved?.success) {
        await fetchQuestion(nextId ?? null);
        return;
      } else if (responseSaved?.success === false) {
        setProblem(responseSaved.message ?? responseSaved.validationErrors[0] ?? "");
        return;
      }
      return responseSaved;
  } catch (error) {
    console.log(error);
  }
  }

  const sendLog = async (answerInput: string, questionId: number, answerId: string, infoPersonId: string) => {
    const log: AnswerLog = {
      questionId: questionId,
      answerId: answerId ?? "",
      answerInput: answerInput ?? "",
      username: infoPersonId,
      transactionId: transactionId
    };
    await service.postLog(log, token ?? "");
  };
  const callbackHandlePress = async(optionInfo: string, businessTypeId: number | null, date?: Date | null, input?: string | null, nextId?: number | null)=>{
  try {
    const res = await postBusinessModel(businessTypeId, date, input);
    if (res?.success) {
      await fetchQuestion(nextId ?? null);
      setSelectedInfo(optionInfo);
      return;
    } else if (res?.success === false) {
      setProblem(res.message ?? res.validationErrors[0] ?? "");
    }
    } catch (error) {
      setProblem("Bir sorun oluştu.");
    }
  }

  const callbackSelected = async (
    answerInputValue: string,
    nextId: number | null,
    questionId: number,
    answerId: string,
    infoPersonId: string,
  ) => {
    setSelectedOptionId(answerId);
    const selectedOption = questionList
      .find(q => q.questionId === questionId)
      ?.options.find(option => option.optionId === answerId);
    setSelectedInfo(selectedOption?.info ?? null);
    await sendLog(answerInputValue, questionId, answerId, infoPersonId);
    const questionIndex = questionList.findIndex(q => q.questionId === questionId);
    if (questionIndex !== -1 && questionIndex !== null) {
      const newList = questionList.slice(0, questionIndex + 1);
      setQuestionList(newList);
    }
    await fetchQuestion(nextId ?? null);
    return;
  };
  const getQuestionWithType = (value: Question, isCurrent: boolean) => {
    const alertComponent = (isCurrent && selectedInfo !== null && selectedInfo !== "" && (
      <CustomAlert title={selectedInfo} />
    ));
  
    switch (value.optionType.title) {
      case "select":
        return (
          <div>
            {!value.isLastQuestion && alertComponent}
            <CustomSelect
              isLasted={!isCurrent}
              values={value.options}
              selectedValue={selectedOptionId}
              callback={callbackSelected}
              questionId={value.questionId}
              infoPersonId={user ?? ""}
              businessTypeId={value.businessTypeId}
              isLastQuestion={value.isLastQuestion}
            />
            {value.isLastQuestion && alertComponent}
          </div>
        );
      case "input":
        return (
          <div>
            {!value.isLastQuestion && alertComponent}
            <CustomInput
              typeInput={value.businessTypeId ?? 0}
              validationRule={value.validationRule}
              isLasted={!isCurrent}
              callback={async (val) => {
                callbackHandlePress(value.options[0].info ?? "", value.businessTypeId, null, val, value.options[0].nextQuestionId);
              }}
            />
            {value.isLastQuestion && alertComponent}
          </div>
        );
      case "fileInput":
        return (
          <div>
            {!value.isLastQuestion && alertComponent}
            <CustomFileInput
              typeFile={value.businessTypeId ?? 0}
              callback={(val) => postBusinessFileModel(val, value.options[0].nextQuestionId)}
              isLasted={!isCurrent}
              title={value.title}
            />
            {value.isLastQuestion && alertComponent}
          </div>
        );
      case "fileDownload":
        return (
          <div>
            {value.isLastQuestion && alertComponent}
          </div>
        );
      case "dateInput":
        return (
          <div>
            {!value.isLastQuestion && alertComponent}
            <CustomDateInput
              typeDate={value.businessTypeId ?? 0}
              callback={async (val) => {
                callbackHandlePress(value.options[0].info ?? "", value.businessTypeId, val, null, value.options[0].nextQuestionId);
              }}
              isLasted={!isCurrent}
              title={value.title}
            />
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
                const isCurrent = value.questionId === currentQuestionId;
                return (end ===null || end ==="") ? (
                  <div key={index} className="item-padding">
                    <div className="header-padding">
                      <h2 className={isCurrent ? "header": "header-last"}>{value.title}</h2>
                    </div>{getQuestionWithType(value, isCurrent)}
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
