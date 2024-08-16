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
} from "@chakra-ui/react";
import { fetchAllTopics } from "../../services/allTopicsInfo";
import { addTagsForText, addTopicToDB } from "../../services/addPage";
import "../myCss.css";

const Add = () => {
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
  const inputTopicHandle = (e) => {
    setInputTopicValue(e.target.value);
    setTopicToSend({ ...topicToSend, topicName: e.target.value });
  };
  const questionInputHandle = (e) => {
    setTopicToSend({...topicToSend, question: e.target.value });
  }
  const textareaShortHandle = (e) => {
    setTopicToSend({...topicToSend, shortAnswer: addTagsForText(e.target.value)});
  };
  const textareaLongHandle = (e) => {
    setTopicToSend({...topicToSend, longAnswer: addTagsForText(e.target.value)});
  };
  const hitsInputHandle = (e) => {
    setTopicToSend({...topicToSend, hints: e.target.value});
  };
  const numberInputHandle = (e) => {
    //проверим есть ли уже такой номер или нет, если есть - подчеркиваем красным поле и ничего не отправляем
    let searchItem = parseInt(e.target.value);
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
    } else {
        e.target.style.borderColor = "rgb(203, 213, 224)";
        setTopicToSend({...topicToSend, number: parseInt(e.target.value)});//если нет
    }
  };
  const sendToDB = (e) => {
    e.preventDefault(); //чтобы страница не обновлялась
    //получаем данные: topicInput, questionInput, shortAnswerTArea, longAnswerTArea, hintsInput, numberInput
    // let topicInputData = e.target.topicInput;
    // let questionInputData = e.target.questionInput;
    // let shortAnswerAreaData = e.target.shortAnswerTArea;
    // let longAnswerAreaData = e.target.longAnswerTArea;
    // let hitnsInputData = e.target.hintsInput;
    // let numberInputData = e.target.numberInput;
    //проверить все ли введено верно,
    if(topicToSend.number === -1) {
        alert("Такой номер уже существует");
        //addTopicToDB(topicToSend);
    } else if(topicToSend.TopicName === "") {
        alert("Не введено имя топика")
    }else {
        addTopicToDB(topicToSend);  
        //почистить поля или обновить страницу?
        //document.location.reload(); 
    }
    //если нет - оставляем поля заполненными, выделяем неверные поля красным
    //если да - то преобразуем в нужный нам формат
    //переводим shortAnswer и longAnswer в теги!!!!!
    //shortAnswerAreaData = addTagsForText(shortAnswerAreaData);
    //longAnswerAreaData = addTagsForText(longAnswerAreaData);
    //формируем объект req с полями int Number, string TopicName, string Question, string ShortAnswer, string LongAnswer, string Hints
    //и отправляем в бд
    ////передать в параметр req
  };
  return (
    <section className="flex flex-row !h-full justify-start items-start">
      <div className="flex flex-col basis-1/3 bg-neutral-100">
        <div className="flex flex-row">
          <div className="flex flex-col basis-1/3 border">Topics</div>
          <div className="flex flex-col basis-2/3 border">Questions</div>
        </div>

        {/* <Tabs orientation={"vertical"} display={{display: showTabList ? "flex" : "none"}}> */}
        <Tabs orientation={"vertical"}>
          <TabList overflowY={"auto"} h={"96dvh"} className="flex flex-col basis-1/3 border overscroll-auto" style={{scrollbarWidth: "none"}}>
            {topics.map((t) => (
              <Tab onMouseOver={mouseOverOrNot} key={t.topicName}>{t.topicName}</Tab>
            ))}
          </TabList>
          <TabPanels overflowY={"auto"} h={"96dvh"} className="flex flex-col basis-2/3 border">
            {topics.map((t) => (
              <TabPanel key={t.topicName}>
                {t.data.map((q) => (
                  <p placement="left" key={q.id}>
                    {q.number}.{q.question}
                  </p>
                ))}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>

      <div className="flex flex-col basis-2/3  bg-green-100">
        <form onSubmit={sendToDB} className="flex flex-col addPageHeight">
        <Grid templateAreas={`"selectArea"
                          "inputTopicArea"
                          "inputQuestionArea"
                          "textShortArea"
                          "textLongArea"
                          "inputHintsArea"
                          "inputNumberArea"
                          "buttonArea"`}
                        gridTemplateRows={'40px 40px 40px 1fr 2fr 40px 40px 40px'}
                        h='100vh'
                        color='blackAlpha.700'
                        fontWeight='bold'
          >
            <GridItem area="selectArea"><Select onChange={inputTopicHandle} placeholder="Select topic or just type it below">
              {topics.map((t) => (
                <option key={t.topicName} value={t.topicName}>{t.topicName}</option>
              ))}
            </Select></GridItem>
            <GridItem area="inputTopicArea"><Input name="topicInput" placeholder="New topic or just pick some from select above" value={inputTopicValue} onChange={inputTopicHandle}/></GridItem>
            <GridItem area="inputQuestionArea"><Input name="questionInput" placeholder="Enter the question from topic above" onChange={questionInputHandle}/></GridItem>
            <GridItem area="textShortArea"><Textarea name="shortAnswerTArea" className="!h-full" resize="none" placeholder="Short answer for question above" onChange={textareaShortHandle}></Textarea></GridItem>
            <GridItem area="textLongArea"><Textarea name="longAnswerTArea" className="!h-full" resize="none" placeholder="Long answer for question above" onChange={textareaLongHandle}></Textarea></GridItem>
            <GridItem area="inputHintsArea"><Input name="hintsInput" placeholder="Hints, separate each with semicolon" onChange={hitsInputHandle} /></GridItem>
            <GridItem area="inputNumberArea"><Input name="numberInput" placeholder="Number, choose it wise" onChange={numberInputHandle}/></GridItem>
            <GridItem area="buttonArea"><button className="bg-green-500 hover:bg-green-400 !h-full !w-full" type="submit">
            Тык
          </button></GridItem>
          </Grid>
        </form>
      </div>
    </section>
  );
};

export default Add;
