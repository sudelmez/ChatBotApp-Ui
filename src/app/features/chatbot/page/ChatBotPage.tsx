import "./ChatBotPage.css";
import CustomSelect from '../components/select/CustomSelect';
import { useEffect, useState, useRef } from "react";
import CustomInput from "../../../components/form/input/CustomInput";
import QuestionService from "../services/QuestionService";
import { Question } from "../model/question_model";
import { AnswerLog } from "../model/answer_log_model";
import { useUserContext } from "../../../context/user_context";
import CustomAlert, { AlertType } from "../../../components/ui/alerts/custom_alert";
import Spinner from 'react-bootstrap/Spinner';
import CustomFileInput from "../../../components/form/file_input/file_input";
import CustomDateInput from "../../../components/form/date_input/date_input";
import { ApiResponse } from "../../../api/response/api_response";
import { AutoResponseModel } from "../model/auto_response_model";
import CustomButton from "../../../components/form/button/CustomButton";
import SelectableInput from "../../../components/form/selectable_input/selectable_input";
function ChatBotPage() {
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [end, setEnd] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [problem, setProblem] = useState<string>("");
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>();
  const service = new QuestionService();
  const { token, user, transactionId } = useUserContext();
  const [selectedInfo, setSelectedInfo] = useState<string | null>(null);
  const lastQuestionRef = useRef<HTMLDivElement>(null);
  const [bResponse, setBResponse] = useState("");

  const fetchQuestion = async (nextQuestionId?: number | null) => {
    try {
      setProblem("");
      const nextQuestion = await service.getQuestion(nextQuestionId ?? null, token ?? "");
      //setLoading(false);
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
      setProblem("Bir sorun oluştu.");
      console.error('Error fetching question:', error);
    }
  };

  useEffect(() => {
    setProblem("");
    setSelectedInfo("");
    setBResponse("");
    localStorage.clear();
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (questionList.length > 0) {
      setCurrentQuestionId(questionList[questionList.length - 1].questionId);
    }if (lastQuestionRef.current) {
      lastQuestionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [questionList]);

  const postBusinessOperationModel = async (document: File[] | null, data: AnswerLog)=>{
    try {
      const formData = new FormData();
      if(document !==null){document.forEach(element => {
        formData.append('formFiles', element);
      });}
    formData.append('jsonDatas', JSON.stringify(data));
    const response = await service.sendBusinessOperation(formData);
    setBResponse(response?.message ?? "");
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const callbackHandlePress = async(document: File[] | null, questionId: number, optionId: string | null, optionInfo: string, businessTypeId: number | null, input?: string | null, nextId?: number | null) : Promise<ApiResponse<AutoResponseModel>  | undefined>=>{
    const questionIndex = questionList.findIndex(q => q.questionId === questionId);
    if (questionIndex !== -1 && questionIndex !== null) {
      const newList = questionList.slice(0, questionIndex + 1);
      setQuestionList(newList);
    }
    try {
    const log: AnswerLog = {
      questionId: questionId,
      optionId: optionId?.toString() ?? "",
      answerInput: input ?? "",
      username: user ?? "",
      businessTypeId: businessTypeId,
      transactionId: transactionId
    };
    const res= await postBusinessOperationModel(document, log );
    if (res?.success) {
      setSelectedInfo(optionInfo);
      await fetchQuestion(nextId ?? null);
    } else if (res?.success === false && res.message!== null && res.message!=="") {
      setProblem(res.message);
    }
    return res;
    } catch (error) {
      setProblem("Bir sorun oluştu.");
    }
  }

  const callbackSelected = async (
    answerInputValue: string,
    nextId: number | null,
    questionId: number,
    answerId: string,
    businessType: number |null
  ) => {
    const selectedOption = questionList
      .find(q => q.questionId === questionId)
      ?.options.find(option => option.optionId === answerId);
    await callbackHandlePress(null,questionId, answerId, selectedOption?.info ?? "", businessType, answerInputValue, nextId);
    return;
  };

  const getQuestionWithType = (value: Question, isCurrent: boolean, index: number) => {
    const alertComponent = (isCurrent && selectedInfo !== null && selectedInfo !== "" && (
      <CustomAlert title={selectedInfo} />
    ));
    const questionComponent = (<div className="header-padding">
      <h2 className={isCurrent ? "header": "header-last"}>{value.title}</h2>
    </div>);
    switch (value.optionType.title) {
      case "select":
        return (
          <div>
            {value.isEnd && isCurrent && bResponse !== null && bResponse !== "" && (
              <CustomAlert title={bResponse} />
            )}
            {!value.isEnd && alertComponent}
            {questionComponent}
            <CustomSelect
              isLasted={!isCurrent}
              values={value.options}
              callback={callbackSelected}
              questionId={value.questionId}
              businessTypeId={value.businessTypeId}
              index = {index}
            />
            {value.isEnd && alertComponent}
          </div>
        );
      case "input":
        return (
          <div>
            {value.isEnd &&isCurrent && bResponse !== null && bResponse !== "" && (
              <CustomAlert title={bResponse} />
            )}
            {!value.isEnd && alertComponent}
            {questionComponent}
            <CustomInput
              type={value.validationRules[0].inputType ?? "text"}
              optionId={value.options[0].optionId}
              validationRule={value.validationRules[0]}
              isLasted={!isCurrent}
              callback={async (val) => {
                callbackHandlePress(null,value.questionId,value.options[0].optionId ,value.options[0].info ?? "", value.businessTypeId, val, value.options[0].nextQuestionId);
              }}
            />
            {value.isEnd && alertComponent}
          </div>
        );
        case "selectableInput":
          return (
            <div>
              {value.isEnd && isCurrent && bResponse !== null && bResponse !== "" && (
              <CustomAlert title={bResponse} />
            )}
              {!value.isEnd && alertComponent}
              {questionComponent}
              <SelectableInput 
                optionId={value.options[0].optionId}
                validationRule={value.validationRules}
                isLasted={!isCurrent}
                optionvalues={value.options}
                callback={async (val, opt) => {
                  callbackHandlePress(null, value.questionId, opt.optionId , opt.info ?? "", opt.businessTypeId, val,  opt.nextQuestionId);
              }}></SelectableInput>
              {value.isEnd &&  alertComponent}
            </div>
          );
      case "fileInput":
        return (
          <div>
            { value.isEnd &&isCurrent && bResponse !== null && bResponse !== "" && (
              <CustomAlert title={bResponse} />
            )}
            {!value.isEnd && alertComponent}
            {questionComponent}
            <CustomFileInput
              callback={(val) => 
                callbackHandlePress(val, value.questionId, value.options[0].optionId, value.options[0].info ?? "", value.businessTypeId, null, value.options[0].nextQuestionId)
              }
              isLasted={!isCurrent}
            />
            {value.isEnd && alertComponent}
          </div>
        );
      case "fileDownload":
        return (
          <div>
            {value.isEnd && isCurrent && bResponse !== null && bResponse !== "" && (
              <CustomAlert title={bResponse} />
            )}
            {!value.isEnd && alertComponent}
            {questionComponent}
            <CustomButton toDownload={true} title="İndir" handlePress={()=>{}} pressed={!isCurrent}></CustomButton>
            {value.isEnd && alertComponent}
          </div>
        );
      case "dateInput":
        return (
          <div>
            {value.isEnd && isCurrent && bResponse !== null && bResponse !== "" && (
              <CustomAlert title={bResponse} />
            )}
            {!value.isEnd && alertComponent}
            {questionComponent}
            <CustomDateInput
              typeDate={value.businessTypeId ?? 0}
              callback={async (val) => {
                callbackHandlePress(null, value.questionId, value.options[0].optionId, value.options[0].info ?? "", value.businessTypeId, "14/02/2024", value.options[0].nextQuestionId);
              }}
              isLasted={!isCurrent}
              title={value.title}
            />
            {value.isEnd && alertComponent}
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
            <div className="paddingArrange">{
              <div> {questionList.map((value, index) => {
                const isCurrent = value.questionId === currentQuestionId;
                return (
                  <div key={index} className="item-padding" ref={isCurrent ? lastQuestionRef : null}>
                   {getQuestionWithType(value, isCurrent, index)}
                  </div>
                );
              })}
              {(end !== null && end !=="") && (<CustomAlert title={end}></CustomAlert>)}</div>
            }
            {(problem!==null && problem!=="") && (<CustomAlert type={AlertType.Danger} title={problem}></CustomAlert>)}
            </div>
            </div>
          </div>
          </div>
        </div>
      </div>
  );
}

export default ChatBotPage;
