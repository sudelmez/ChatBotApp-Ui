import "./ChatBotPage.css";
import CustomSelect from '../components/select/CustomSelect';
import { useEffect, useState } from "react";
import NavBar from "../../../components/ui/navbar/NavBar";
import CustomInput from "../../../components/form/input/CustomInput";
import CustomButton from "../../../components/form/button/CustomButton";
import QuestionService from "../services/QuestionService";
import { Question } from "../model/question_model";
import { AnswerLog } from "../model/answer_log_model";
import { BusinessOperationModel } from "../model/business_operation_model";
import { useUserContext } from "../../../context/user_context";
function ChatBotPage() {
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [end, setEnd] = useState<string>("");
  const [inputVal, setInputVal] = useState<string>("");
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>("");
  const [buttonVis, setButtonVis] = useState<boolean>(false);
  const [loading,setLoading]=useState<boolean>(false);
  const [problem, setProblem] = useState<string>("");
  const service = new QuestionService();
  const {token, user} = useUserContext();

  const fetchQuestion = async (nextQuestionId?: string | "") => {
    try {
      setLoading(true);
      const nextQuestion = await service.getQuestion(nextQuestionId ?? "", token ?? "");
      setLoading(false);
      setQuestionList([...questionList, nextQuestion]);
      if (!nextQuestion) {
        setEnd("Sohbet sona erdi.");
        console.error(`Soru bulunamadı id: ${nextQuestionId}`);
        return;
      }
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  }

  useEffect(() => {
    fetchQuestion();
  }, []);

  const saveAnswer = async (businessTypeId: number | null) => {
    const answerData : BusinessOperationModel={
      answerInput: inputVal,
      businessTypeId: businessTypeId
    }
    const responseSaved= await service.saveAnswer(answerData, token ?? "");
    return responseSaved;
  }
  const sendLog = async (questionId: string, answerId:string, infoPersonId: string) => {
    const log: AnswerLog = {
      questionId: questionId,
      answerId: answerId || "",
      answerInput: inputVal || "",
      username: infoPersonId,
    };
    console.log(log);
    await service.postLog(log, token ?? "");
  }

  const callBackInput = (val: string) => {
    setButtonVis(true);
    setInputVal(val);
  }

  const callbackSelected = async(nextId: number | null | "", questionId: string, answerId: string, infoPersonId: string, businessTypeId: number | null) => {
    setSelectedAnswerId(answerId);
    sendLog(questionId, answerId, infoPersonId);
    if (nextId === null || nextId=== "") {
      setEnd("Sohbet sona erdi.");
      console.log("Sohbet sona erdi.");
      return;
    }
    if(businessTypeId === null){
      if(nextId !== null ) {
        fetchQuestion(nextId.toString());
        setButtonVis(false);
        setEnd("");
        setInputVal("");
      }
      return;}
      const res = await saveAnswer(businessTypeId);
      console.log("saved answer res");
      console.log(res);
      setProblem("");
      if(res?.success){
        if(nextId !== null ) {
          fetchQuestion(nextId.toString());
          setButtonVis(false);
          setEnd("");
          setInputVal("");
        }
    }else if(res?.success===false){
      setProblem(res.message ?? res.validationErrors[0] ?? "");
    }
  };

  return (
    <div className="Page">
      <NavBar title={"Chat Bot"}></NavBar>
      <div className="chatbot">
        {loading == false ?(questionList.map((value, index) => {
         if (!value || !value.title || !value.answerType) {
          return null;
        }
        return (
            <div key={index} className="items">
              <h2 className="header">{value.title}</h2>
              {value.answerType.title === "select" ? (
                <CustomSelect
                  index={index}
                  values={value.answers}
                  selectedValue={selectedAnswerId}
                  callback={callbackSelected}
                  questionId={value.questionId}
                  infoPersonId={user ?? ""}
                  businessTypeId={value.businessTypeId}
                ></CustomSelect>
              ) : (
                <div>
                  <CustomInput index={index} callback={(val) => callBackInput(val)} title={"Değer giriniz."}></CustomInput>
                  {buttonVis === true && <div className="rowButtons">
                    {value.answers.map((val) => {
                      return (
                        <CustomButton key={val.title} handlePress={() => callbackSelected(parseInt(val.nextQuestionId ?? '-1'), value.questionId, val.answerId, user ?? "", value.businessTypeId)} title={val.title}></CustomButton>
                      );
                    })}
                    </div>}
                </div>
              )}
            </div>
          );
        }
        )):( <div>
          <h3>Loading</h3> 
        </div>) }  
        <h3>{problem}</h3>
        <h2 className="endheader">{end}</h2>
      </div>
      <div className="background-image"></div>
      <div className="background-image-left"></div>
    </div>
  );
}

export default ChatBotPage;
