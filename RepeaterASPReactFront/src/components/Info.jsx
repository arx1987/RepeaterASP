import { Grid, GridItem, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchAllTopics } from '../../services/allTopicsInfo';
import MyVerticalTabs from "./MyVerticalTabs";
const Info = () => {
    const [uniqueTopics, setUniqueTopics] = useState([]);
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          let data = await fetchAllTopics();
          setTopics(data);
          let myUTArr = [];
          data.map( el => {
            var findItem = myUTArr.find(x => x.topicName === el.topicName);
            if(!findItem) myUTArr.push(el);
          });
          setUniqueTopics(myUTArr);
        };
        fetchData();
      }, []);
    return (
        <MyVerticalTabs topics={topics} />
        // <Grid h='100vh' templateColumns='repeat(10, 1fr)' gap={1}>
        //     <GridItem colSpan={2} bg='papayawhip'>
        //         {topics.map((t) => (
        //             // <Box as='li' key={t.id}>
        //             <Box key={t.topicName}>
        //                 {t.topicName}
        //             </Box>
        //         ))}
        //     </GridItem>
        //     <GridItem colSpan={2} bg='tomato'></GridItem>
        //     <GridItem colSpan={6} bg='grey'></GridItem>
        //     {/* {
        //         topics.map(topic => (
        //             <Box key={topic.id}>
        //                 <Text>{topic.TopicName}</Text>    
        //             </Box>
        //         ))
        //     } */}
        // </Grid>
    );
};

export default Info;