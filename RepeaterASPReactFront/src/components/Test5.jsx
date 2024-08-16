import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Grid, GridItem } from '@chakra-ui/react'
const Test5 = () => {
    return (
        <Grid templateAreas={`"topicNQuestionSection topicNQuestionSection"
                                "hintsSection hintButton"
                                "answerSection answerSection"
                                "checkSection checkSection"
                                "rightAnswerSection rightAnswerSection"`}
                gridTemplateRows={'50px 50px 50px 50px 30px'}
                gridTemplateColumns={'1fr 150px'}
                h='100vh'
                gap='1'
                color='blackAlpha.700'
                fontWeight='bold'
        >
            <GridItem pl='2' bg='orange.300' area={'topicNQuestionSection'}>Тема: вставить параметр. Вопрос: вставить параметр</GridItem>
            <GridItem pl='2' bg='pink.300' area={'hintsSection'}>hints: вставлять параметры при нажатии на кнопку</GridItem>
            <GridItem pl='2' bg='green.300' area={'hintButton'}>Show hint</GridItem>
            <GridItem pl='2' bg='blue.300' area={'answerSection'}>Напишите свой ответ здесь:</GridItem>
            <GridItem pl='2' bg='gray.300' area={'checkSection'}>Кнопки "Проверить", "Оценить" и инпуты будут здесь</GridItem>
            <GridItem pl='2' bg='purple.300' area={'rightAnswerSection'}>Здесь должен отобразиться правильный ответ, после нажатия кнопки "Проверить"</GridItem>
        </Grid>
 
        // <Grid
        //     templateAreas={`"topic topic"
        //                     "tab answer"
        //                     "tab tt"`}
        //     gridTemplateRows={'50px 1fr 30px'}
        //     gridTemplateColumns={'50vh 1fr'}
        //     h='97vh'
        //     ml='300px'
        //     gap='1'
        //     color='blackAlpha.700'
        //     fontWeight='bold'
        //     >
        //     <GridItem pl='20' bg='orange.300' area={'topic'}>
        //         Topic
        //     </GridItem>
        //     <GridItem pl='2' bg='pink.300' area={'tab'}>
        //         Tab
        //     </GridItem>
        //     <GridItem pl='2' bg='green.300' area={'answer'}>
        //         Answer
        //     </GridItem>
        //     <GridItem pl='2' bg='blue.300' area={'tt'}>
        //         TT
        //     </GridItem>
        // </Grid>
    );
};

export default Test5;