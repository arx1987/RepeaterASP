import { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
  Input,
  Textarea,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { fetchAllTopics } from "../../services/allTopicsInfo";
import { changeDbRecord } from "../../services/changeDbRecord";
import { addTagsForText } from "../../services/addPage";
import "../myCss.css";

const Change = () => {
  const mouseOverOrNot = (e) => e.target.click();
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let data = await fetchAllTopics();
      setTopics(data);
    };
    fetchData();
  }, []);
  const [topicToSend, setTopicToSend] = useState(null); //int Number, string TopicName, string Question, string ShortAnswer, string LongAnswer, string Hints
  const [inputTopicValue, setInputTopicValue] = useState("");
  const [inputQuestion, setInputQuestion] = useState("");
  const [tAreaShortAnswer, setTAreaShortAnswer] = useState("" );
  const [tAreaLongAnswer, settAreaLongAnswer] = useState("" );
  const [inputHints, setinputHints] = useState("" );
  const [inputNumber, setinputNumber] = useState("" );
  const [onClickNumber, setOnClickNumber] = useState("");
  const [inputFirstLastNumber, setinputFirstLastNumber] = useState("");
  
  const inputTopicHandle = (e) => {
    //setInputTopicValue(e.target.value);//убрал возможность изменения темы, когда это понадобится, тогда и сделаю(она общая для многих записей в бд)
    setTopicToSend({ ...topicToSend, topicName: e.target.value });
  };
  const questionInputHandle = (e) => {
    setInputQuestion(e.target.value);
    setTopicToSend({...topicToSend, question: e.target.value });
  }
  const textareaShortHandle = (e) => {
    setTAreaShortAnswer(e.target.value);
    setTopicToSend({...topicToSend, shortAnswer: addTagsForText(e.target.value)});
  };
  const textareaLongHandle = (e) => {
    settAreaLongAnswer(e.target.value);
    setTopicToSend({...topicToSend, longAnswer: addTagsForText(e.target.value)});
  };
  const hintsInputHandle = (e) => {
    setinputHints(e.target.value);
    setTopicToSend({...topicToSend, hints: e.target.value});
  };
  const numberInputHandle = (e) => {
    setinputNumber(e.target.value);
    //проверим есть ли уже такой номер или нет, если есть - подчеркиваем красным поле и ничего не отправляем
    let searchItem = parseInt(e.target.value);
    if(searchItem !== onClickNumber){
        let isNumberExist = false;
        let isNumberExist2 = false;
        topics.forEach( (topic) => {
            if(!isNumberExist){
                isNumberExist2 = topic.data.some(data => data.number === searchItem);
                isNumberExist = isNumberExist || isNumberExist2;
            }
        });  
        if(isNumberExist) {
            e.target.style.borderColor = "red";
            setTopicToSend({...topicToSend, number: -1})
        } 
    } else {
        e.target.style.borderColor = "rgb(203, 213, 224)";
        setTopicToSend({...topicToSend, number: parseInt(e.target.value)});//если нет
    }
  };
  const pickTopicToChange = (t, q) => {//id,number,topicName,question,shortAnswer,longAnswer,nextCheck,hints,addDate,rate,stage,totalChecksAmount
    setOnClickNumber(q.number);
    setInputTopicValue(q.topicName);
    setInputQuestion(q.question);
    setTAreaShortAnswer(q.shortAnswer);
    settAreaLongAnswer(q.longAnswer);
    setinputHints(q.hints);
    setinputNumber(q.number);
    setinputFirstLastNumber("Первый номер этой темы: " + t.data[0].number + ". Последний: " + t.data[t.data.length-1].number);
    setTopicToSend({...topicToSend, 
      id: q.id, 
      number: q.number, 
      topicName: q.topicName, 
      question: q.question, 
      shortAnswer: q.shortAnswer, 
      longAnswer: q.longAnswer, 
      hints: q.hints});
    //alert(q);
  }
  const sendToDB = (e) => {
    e.preventDefault(); //чтобы страница не обновлялась
    //проверить все ли введено верно,
    if(topicToSend.number === -1) {
        alert("Такой номер уже существует");
        //addTopicToDB(topicToSend);
    } else if(topicToSend.TopicName === "") {
        alert("Не введено имя топика")
    }else {
      if(topicToSend.Number == "" && topicToSend.topicName == "" && topicToSend.question == "" && topicToSend.shortAnswer == "" && topicToSend.longAnswer == "" && topicToSend.hints == "") {
        setTopicToSend({...topicToSend, 
          number: e.target.numberInput, 
          topicName: e.target.topicInput, 
          question: e.target.questionInput, 
          shortAnswer: e.target.shortAnswerTArea, 
          longAnswer: e.target.longAnswerTArea, 
          hints: e.target.hintsInput});
      }
      changeDbRecord(topicToSend);  
        //почистить поля или обновить страницу?
        //document.location.reload(); 
    }
  };
  return (
    <section className="flex flex-row !h-full justify-start items-start">
      <div className="flex flex-col basis-1/3 max-w-3xl bg-neutral-100">
        <div className="flex flex-row">
          <div className="flex flex-col basis-1/3 min-w-52 border">Topics</div>
          <div className="flex flex-col basis-2/3 min-w-96 border">Questions</div>
        </div>

        {/* <Tabs orientation={"vertical"} display={{display: showTabList ? "flex" : "none"}}> */}
        <Tabs orientation={"vertical"}>
          <TabList overflowY={"auto"} h={"96dvh"} className="flex flex-col basis-1/3 min-w-52 border overscroll-auto" style={{scrollbarWidth: "none"}}>
            {topics.map((t) => (
              <Tab onMouseOver={mouseOverOrNot} key={t.topicName}>{t.topicName}</Tab>
            ))}
          </TabList>
          <TabPanels overflowY={"auto"} h={"96dvh"} className="flex flex-col basis-2/3 min-w-96 border">
            {topics.map((t) => (
              <TabPanel key={t.topicName}>
                {t.data.map((q) => (
                //   <Button data-value={q.number} onClick={pickTopicToChange} placement="left" key={q.id}>
                //     {q.number}.{q.question}
                //   </Button>
                  <Button onClick={() => pickTopicToChange(t, q)} placement="left" width='100%' whiteSpace="normal" height="auto" blockSize="auto" key={q.id}>
                    {q.number}.{q.question}
                  </Button>
                ))}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>

      <div className="flex flex-col basis-2/3 bg-green-100">
        <form onSubmit={sendToDB} className="flex flex-col addPageHeight">
        <Grid templateAreas={`"inputTopicArea inputTopicArea"
                          "inputQuestionArea inputQuestionArea"
                          "textShortArea textShortArea"
                          "textLongArea textLongArea"
                          "inputHintsArea inputHintsArea"
                          "inputNumberArea inputNumberHintArea"
                          "buttonArea buttonArea"`}
                        gridTemplateRows={'40px 40px 1fr 2fr 40px 40px 40px'}
                        gridTemplateColumns={'1fr 1fr'}
                        h='100vh'
                        color='blackAlpha.700'
                        fontWeight='bold'
          >
            <GridItem area="inputTopicArea"><Input name="topicInput" placeholder="New topic or just pick some from select above" value={inputTopicValue} onChange={inputTopicHandle}/></GridItem>
            <GridItem area="inputQuestionArea"><Input name="questionInput" placeholder="Enter the question from topic above" value={inputQuestion} onChange={questionInputHandle}/></GridItem>
            <GridItem area="textShortArea"><Textarea name="shortAnswerTArea" className="!h-full" resize="none" placeholder="Short answer for question above" value={tAreaShortAnswer} onChange={textareaShortHandle}></Textarea></GridItem>
            <GridItem area="textLongArea"><Textarea name="longAnswerTArea" className="!h-full" resize="none" placeholder="Long answer for question above" value={tAreaLongAnswer} onChange={textareaLongHandle}></Textarea></GridItem>
            <GridItem area="inputHintsArea"><Input name="hintsInput" placeholder="Hints, separate each with semicolon" value={inputHints} onChange={hintsInputHandle} /></GridItem>
            <GridItem area="inputNumberArea"><Input name="numberInput" placeholder="Number, choose it wise" value={inputNumber} onChange={numberInputHandle}/></GridItem>
            <GridItem area="inputNumberHintArea"><Input defaultValue={inputFirstLastNumber} /></GridItem>
            <GridItem area="buttonArea"><button className="bg-green-500 hover:bg-green-400 !h-full !w-full" type="submit">
            Если ты УВЕРЕН, что готов изменить данные - сделай ТЫК
          </button></GridItem>
          </Grid>
        </form>
      </div>
    </section>
  );
};

export default Change;
