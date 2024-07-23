import "./ChatBotPage.css";
import CustomSelect from '../components/select/CustomSelect';
import { useEffect, useState } from "react";
import NavBar from "../../../components/ui/navbar/NavBar";
import CustomInput from "../../../components/form/input/CustomInput";
import CustomButton from "../../../components/form/button/CustomButton";
import QuestionService from "../services/QuestionService";
import {Question} from "../model/question_model";
function ChatBotPage() {
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [fetchedquestionList, setfetchedQuestionList] = useState<Question[]>([]);
  const [end, setEnd] = useState<string>("");
  const [ind, setInd] = useState<number>(0);
  const [inputVal, setInputVal] = useState<string>("");
  const [buttonVis, setButtonVis] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const service = new QuestionService(); 
        const questions = await service.getQuestions(); 
        setfetchedQuestionList(questions);
        if (questions.length > 0) {
          setQuestionList([questions[0]]);
        }
        console.log("fetched questions");
        console.log(questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions(); 
  }, []);

  const callBackInput = (val: string) => {
    setButtonVis(true);
    setInputVal(val);
  }

  const callbackSelected = (nextId: number | null, index:number) => {
    if (nextId === -1) {
      return;
    } else if (nextId === null) {
      setEnd("Sohbet sona erdi.");
      console.log("Sohbet sona erdi.");
      return;
    }
    const nextQuestion = fetchedquestionList.find((question: Question) => parseInt(question.questionId) === nextId);
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
        {questionList.map((value, index) => {
          return (
            <div key={index} className="items">
              <h2 className="header">{value.title}</h2>
              {value.answerType.title === "select" ? (
                <CustomSelect
                  index={index}
                  isDisabled={value.isDisabled}
                  values={value.answers}
                  callback={callbackSelected}
                ></CustomSelect>
              ) : (
                <div>
                  <CustomInput index={index} callback={callBackInput} title={"Değer giriniz."}></CustomInput>
                  {buttonVis === true && <div className="rowButtons">
                    {value.answers.map((val) => {
                      return (
                        <CustomButton key={val.title} handlePress={() => callbackSelected(parseInt(val.nextQuestionId ?? '-1'), index)} title={val.title}></CustomButton>
                      );
                    })}
                  </div>}
                </div>
              )}
            </div>
          );
        })}
        <h2 className="endheader">{end}</h2>
      </div>
    </div>
  );
}

export default ChatBotPage;
