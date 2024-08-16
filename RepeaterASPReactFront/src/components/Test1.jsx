import { useState, useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const Test1 = () => {
    const [width, setWidth] = useState(400);
    const [color, setColor] = useState("red");
    // const [width, setWidth] = useState(window.innerWidth);
    // const[firstClmnWidth, setFirstWidth] = useState(width/5);
    // const[secondClmnWidth, setSecondtWidth] = useState(width/5);
    // const[thirdClmnWidth, setThirdWidth] = useState(width*3/5);
    
    // useEffect(() => {
    //     const handleResize = (event) => {
    //         setWidth(event.target.innerWidth);
    //         if(width < 1000){
    //             setFirstWidth(width/4);
    //             setSecondtWidth(width/4);
    //             setThirdWidth(width/2);
    //         } else if(width > 1001 && width < 1550){
    //             setFirstWidth(width/5);
    //             setSecondtWidth(width/4);
    //             setThirdWidth(width*11/20);
    //         }else {//width > 1201
    //             setFirstWidth(width/5);
    //             setSecondtWidth(width/5);
    //             setThirdWidth(width*3/5);                    
    //         }
    //         let temp1 = firstClmnWidth;
    //         let temp2 = secondClmnWidth;
    //         let temp3 = thirdClmnWidth;
    //         let temp = temp1 + temp2 + temp3;
            
    //     };
    //     window.addEventListener('resize', handleResize);
    //     window.addEventListener('load', handleResize);
    //     return () => {
    //     window.removeEventListener('resize', handleResize);
    //     window.removeEventListener('load', handleResize);
    //     // window.removeEventListener('DOMContentLoaded', handleResize);

    //     };
    // }, []); 
    return (
        <div style={{padding: 0}}>
            <div style={{width: width, color: color}}>Перевет</div>
        <Tabs orientation={"vertical"}>
            {/* <TabList style={{width: {width}}}> */}
            {/* <TabList width={firstClmnWidth}> */}
            <TabList>
                <Tab>One</Tab>
                <Tab>Two</Tab>
                <Tab>А если чуть более длинная надпись</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Tabs orientation={"vertical"}>
                        {/* <TabList width={secondClmnWidth}> */}
                        <TabList>
                            <Tab>Four</Tab>
                            <Tab>А если и здесь тоже длинная надпись?</Tab>
                        </TabList>
                        {/* <TabPanels width={thirdClmnWidth}> */}
                        <TabPanels>
                            <TabPanel>
                                <p>Рабочая тема</p>
                            </TabPanel>
                            <TabPanel>
                                <p>Супер. Для начала сделаю через табы</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
                <TabPanel>
                    <p>three!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
        </div>
    )
};

export default Test1;
