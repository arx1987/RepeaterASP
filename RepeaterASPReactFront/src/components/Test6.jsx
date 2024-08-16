import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Test6Grid from './Test6Grid';
import { fetchTrainerData } from '../../services/trainerData';
const Test6 = () => {
    const [trainerDt, setTrainerDt] = useState([]);
    const [otherQuestionWasClicked, setOQWC] = useState(false);
    const otherQuestionWasChosen = () => {
        setOQWC(true);
    }
    useEffect(() => {
        const trainerData = async () => {
        let data = await fetchTrainerData();
        setTrainerDt(data);
        };
        trainerData();
    }, []);
    return (
    <Tabs orientation={"vertical"}>
        {/* <Tab onClick={otherQuestionWasChosen}> */}
        <TabList>
            {trainerDt.map( (t) => (
            <Tab onClick={otherQuestionWasChosen} key={t.id}>{t.question}</Tab>
            ))}
        </TabList>
        <TabPanels>
        {trainerDt.map( (t) => (
            <TabPanel key={t.id}>
                <Test6Grid trainerDt={t} otherQuestionWasClckd={otherQuestionWasClicked}/>
            </TabPanel>
        ))}
        </TabPanels>
    </Tabs>  
    );

};

export default Test6;