import { useState, useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button, Link } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import '../myCss.css'

const MyVerticalTabs = ({ topics}) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [isDisplayed, setDstate] = useState(false);
    const [showShort, setShort] = useState("block");
    const[showLong, setLong] = useState("none");
    const[isMouseLocked, setLockMouse] = useState(false);
    const handleResize = () => {
        setWidth(window.innerWidth);
        if(width < 1000){
            setFirstWidth(width/4);
            setSecondtWidth(width/4);
            setThirdWidth(width/2);
        } else if(width > 1001 && width < 1550){
            setFirstWidth(width/5);
            setSecondtWidth(width/4);
            setThirdWidth(width*11/20);
        }else {//width > 1201
            setFirstWidth(width/5);
            setSecondtWidth(width/5);
            setThirdWidth(width*3/5);                    
        }
        
    };
    const[firstClmnWidth, setFirstWidth] = useState(() => handleResize);
    const[secondClmnWidth, setSecondtWidth] = useState(() => handleResize);
    const[thirdClmnWidth, setThirdWidth] = useState(() => handleResize); 
    useEffect(() => {
        handleResize;
        window.addEventListener('resize', handleResize);
        window.addEventListener('load', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', handleResize);
        // window.removeEventListener('DOMContentLoaded', handleResize);

        };
    }, []);    
    const onKey = (event) => {
        switch(event.key){
            case "a": case "b": case "c": case "d": case "e": 
            case "f": case "g": case "h": case "i": case "j": 
            case "k": case "l": case "m": case "n": case "o": 
            case "p": case "q": case "r": case "s": case "t": 
            case "u": case "v": case "w": case "x": case "y": 
                if(isDisplayed) {
                    setShort("none");
                    setLong("block");
                    setDstate(false);
                }
                else {
                    setShort("block");
                    setLong("none")
                    setDstate(true);
                }
                 break;
            case "z":
                if(isMouseLocked) setLockMouse(false);
                else setLockMouse(true);
                break;
            default: 
                return;
        }
    };
    const mouseOverOrNot = (e) => {
        if(!isMouseLocked) e.target.click();
    }
    useEffect(() => {
        document.addEventListener("keydown", onKey);
        return () => {
          document.removeEventListener("keydown", onKey);
        };
    });
    const navigate = useNavigate();
    const goPracticeIt = (question) => {
        navigate("/trainer", question);
    }
    // setFirstWidth(300);
    // setSecondtWidth(300);
    // setThirdWidth(600);
    return (
        <Tabs size={"sm"} orientation={"vertical"}>
            <TabList overflowY={"auto"} h={"94dvh"} style={{width: firstClmnWidth, scrollbarWidth: "thin"}}>
                {topics.map((t) => (
                    <Tab className="testClassForMyTabs" onMouseOver={mouseOverOrNot} key={t.topicName}>{t.topicName}</Tab>
                    // <Tab onMouseOver={(e) => e.target.click()} key={t.topicName}>{t.topicName}</Tab>
                ))}
            </TabList>
            <TabPanels>
                {topics.map((t) => (
                    // <TabPanel style={{width: "200px"}} key={t.topicName}>
                    <TabPanel key={t.topicName}>
                        <Tabs size={"sm"} orientation={"vertical"}>
                            <TabList overflowY={"auto"} h={"94dvh"} style={{width: secondClmnWidth, scrollbarWidth: "thin"}}>
                            {/* <TabList style={{width: "400px"}}> */}
                                {t.data.map((d) =>(
                                    <Tab className="testClassForMyTabs" onMouseOver={mouseOverOrNot} key={d.id}>{d.question}</Tab>
                                ))}
                            </TabList>
                            <TabPanels style={{width: thirdClmnWidth}}>
                                {t.data.map((d) =>(
                                    <TabPanel key={d.id} overflowY={"auto"} h={"94dvh"} style={{scrollbarWidth: "thin"}}>
                                        {/* <Box style={{display: showShort, width: "800px"}}> */}
                                        <Box style={{display: showShort}} dangerouslySetInnerHTML={{__html: d.question + " " + d.shortAnswer}}></Box>
                                        <Box style={{display: showLong}} dangerouslySetInnerHTML={{__html: d.question + " " + d.longAnswer}}></Box>
                                        <Button onClick={() => goPracticeIt(d.question)}>Пройти эту тему в тренажоре</Button>
                                        {/* <Link href="/trainer">Пройти эту тему в тренажоре</Link> */}
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </Tabs>
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
        
    );
};
export default MyVerticalTabs;