import "./ChatBotPage.css";
import CustomSelect from '../components/select/CustomSelect';
import { useEffect, useState } from "react";
import NavBar from "../../../components/ui/navbar/NavBar";
import CustomInput from "../../../components/form/input/CustomInput";
import CustomButton from "../../../components/form/button/CustomButton";
import QuestionService from "../services/QuestionService";
import { Question } from "../model/question_model";
import { AnswerLog } from "../model/answer_log_model";
// import {CircularProgress} from "@nextui-org/progress"; TODO!!!!
function ChatBotPage() {
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [fetchedQuestionList, setFetchedQuestionList] = useState<Question[]>([]);
  const [end, setEnd] = useState<string>("");
  const [ind, setInd] = useState<number>(0);
  const [inputVal, setInputVal] = useState<string>("");
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>("");
  const [buttonVis, setButtonVis] = useState<boolean>(false);
  const [loading,setLoading]=useState<boolean>(false);
  const service = new QuestionService();
  const fetchQuestions = async () => {
    try {
      const questions = await service.getQuestions();
      setFetchedQuestionList(questions);
      if (questions.length > 0) {
        setQuestionList([questions[0]]);
      }
      console.log("fetched questions");
      console.log(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchQuestions();
    setLoading(false);
  }, []);

  const sendLog = async (questionId: string, answerId:string, categoryId: string, infoPersonId: string) => {
    const log: AnswerLog = {
      questionId: questionId,
      answerId: answerId || "",
      answerInput: inputVal || "",
      categoryId: categoryId,
      infoPersonId: infoPersonId
    };
    console.log(log);
    await service.postLog(log);
  }

  const callBackInput = (val: string) => {
    setButtonVis(true);
    setInputVal(val);
  }

  const callbackSelected = (nextId: number | null, index: number, questionId: string, answerId: string, categoryId: string, infoPersonId: string) => {
    sendLog(questionId, answerId, categoryId, infoPersonId);
    if (nextId === -1) {
      return;
    } else if (nextId === null) {
      setEnd("Sohbet sona erdi.");
      console.log("Sohbet sona erdi.");
      return;
    }
    const nextQuestion = fetchedQuestionList.find((question: Question) => parseInt(question.questionId) === nextId);
    if (!nextQuestion) {
      setEnd("Sohbet sona erdi.");
      console.error(`Soru bulunamadı id: ${nextId}`);
      return;
    }
    if (ind !== 0 && index < ind) {
      console.log("last indexed question alert");
      questionList.splice(ind, 1);
    }
    setButtonVis(false);
    setQuestionList([...questionList, nextQuestion]);
    setInd(questionList.length);
    setEnd("");
    setInputVal("");
  };

  return (
    <div className="Page">
      <NavBar title={"Chat Bot"}></NavBar>
      <div className="chatbot">
      {loading == false ?(questionList.map((value, index) => {
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
                  categoryId={value.category.categoryId}
                  infoPersonId={"347652"}
                ></CustomSelect>
              ) : (
                <div>
                  <CustomInput index={index} callback={(val) => callBackInput(val)} title={"Değer giriniz."}></CustomInput>
                  {buttonVis === true && <div className="rowButtons">
                    {value.answers.map((val) => {
                      return (
                        // TODO control et
                        <CustomButton key={val.title} handlePress={() => callbackSelected(parseInt(val.nextQuestionId ?? '-1'), index, value.questionId, val.answerId, value.category.categoryId, "347652")} title={val.title}></CustomButton>
                      );
                    })}
                    </div>}
                </div>
              )}
            </div>
          );
        })):( <div>
          {/* <CircularProgress/> */}
          <h3>Loading</h3> 
          {/* TODO circle progres bar eklenecek */}
        </div>) }  
        <h2 className="endheader">{end}</h2>
      </div>
    </div>
  );
}

export default ChatBotPage;
