import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import TrainerGrid from './TrainerGrid';
import { fetchTrainerData } from '../../services/trainerData';
// import { Fragment } from "react";

// export default function Home() {
//     return (
//         <Fragment><h2>Пока на странице Home ничего нет</h2></Fragment>
//     );
// }
const Trainer = () => {//(question) => {
  //let temp = "!bg-yellow-200";
  let temp = "!bg-green-200";
  const [trainerDt, setTrainerDt] = useState([]);
  //const [otherQuestionWasClicked, setOQWC] = useState(false);
  // const otherQuestionWasChosen = () => {
  //   setOQWC = true;
  // }
  useEffect(() => {
    const trainerData = async () => {
      let data = await fetchTrainerData();
      setTrainerDt(data);
      // alert(question.question);
      // let myUTArr = [];
      // data.map( el => {
      //   var findItem = myUTArr.find(x => x.topicName === el.topicName);
      //   if(!findItem) myUTArr.push(el);
      // });
      // setUniqueTopics(myUTArr);
    };
    trainerData();
  }, []);
  const [ showTabList, setShowTabList ] = useState(true);
  //let showTabList = true;
  const handleHideTabs = (param) =>{
    setShowTabList(param);
    //showTabList = false;
  };
  useEffect(() => {},[showTabList]);
    return (
      <Tabs orientation={"vertical"}>
        {/* <Tab onClick={otherQuestionWasChosen}> */}
        <TabList style={{display: showTabList ? "flex" : "none", scrollbarWidth: "thin"}} overflowY={"auto"} h={"94dvh"}>
            {trainerDt.map( (t) => (
              //<Tab className={"!"+t.questionBackground} key={t.id}>{t.question}</Tab>
              <Tab bg={t.questionBackground} key={t.id}>{t.question}</Tab>
              // <Tab className={temp} key={t.id}>{t.question}</Tab>
            ))}
        </TabList>
        <TabPanels>
          {trainerDt.map( (t) => (
              <TabPanel key={t.id} p={0}>
                  <TrainerGrid  trainerDt={t} hideTabs={handleHideTabs} otherQuestionWasClckd='0'/>
              </TabPanel>
          ))}
        </TabPanels>
      </Tabs>  
    );
};

export default Trainer;
