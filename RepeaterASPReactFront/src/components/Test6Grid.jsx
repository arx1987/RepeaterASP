import { useEffect, useRef, useState } from "react";
import { Grid, GridItem, Button, Textarea } from "@chakra-ui/react"
const Test6Grid = (props) => { //(props) => {//trainerDt, otherQuestionWasClckd
    const onKey = (event) => {
        //if(event.key.ctrlKey && event.keyCode == 13){//не срабатывает
        //if(event.ctrlKey && event.key == 13){//не срабатывает
        // if(event.ctrlKey && event.key == 13){//не срабатывает
        //if(event.key == 13){//не срабатывает
        //if(event.key.ctrlKey){//не срабатывает
        //if(event.key == 'Enter'){//ЭТО РАБОТАЕТ
        //if(event.ctrlKey){//ЭТО РАБОТАЕТ
        if (event.altKey && event.key == "h") {
            showHint();
        }
    };    
    //const [otherQuestionWasClicked, setOQWC] = useState(props.otherQuesitonWasClkd);
    let otherQuestionWasClicked = props.otherQuestionWasClckd; 
    const hintsArea = useRef(null);
    let hintsLength = props.trainerDt.hints.length;
    //const [initial, setInitial] = useState(() => initialVars());
    //const [initial, setInitial] = useState(false);
    const [hintCount, setHintCount] = useState(0);
    useEffect(() => {//вроде как проблема useEffect в том, что он ререндерит страницу(но это не точно), и советуют использовать useRef вместо
        window.addEventListener('load', initialVars);
        return () => {
            window.removeEventListener('load', initialVars);
        };
    }, []);   
    useEffect(() => {
        document.addEventListener("keydown", onKey);
        return () => {
          document.removeEventListener("keydown", onKey);
        };
    });
    const initialVars = () => {
        if(otherQuestionWasClicked){
            hintsArea.current.innerText = 'Чтобы посмотреть подсказки, нажимайте Ctrl + H';
            setHintCount(0);
            otherQuestionWasClicked = false;
        }else {
            //alert("wtf");
            console.log("wtf");
        }
    }    
    const showHint = () => {
        if(hintsLength <= hintCount) { }
        else if(hintCount == 0) {
            hintsArea.current.innerText = '';
            hintsArea.current.innerText = props.trainerDt.hints[hintCount];
            setHintCount(hintCount + 1);
        }
        else {
            hintsArea.current.innerText = hintsArea.current.innerText + "; " + props.trainerDt.hints[hintCount];
            setHintCount(hintCount + 1);
        }
    };
    return (
    <Grid templateAreas={`"topicNQuestionSection topicNQuestionSection"
                                        "hintsSection hintButton"
                                        "answerSection answerSection"
                                        "checkSection checkSection"
                                        "rightAnswerSection rightAnswerSection"`}
                        gridTemplateRows={'50px 50px 1fr 50px 1fr'}
                        gridTemplateColumns={'1fr 150px'}
                        h='100vh'
                        gap='1'
                        color='blackAlpha.700'
                        fontWeight='bold'
    >
        <GridItem pl='2' bg='orange.300' area={'topicNQuestionSection'}>Тема: {props.trainerDt.topicName}. Вопрос: {props.trainerDt.question}</GridItem>
        <GridItem id='hints' pl='2' bg='pink.300' area={'hintsSection'} ref={hintsArea}></GridItem> {/* hints: вставлять параметры при нажатии на кнопку</GridItem> */}
        <GridItem bg='green.300' area={'hintButton'}><Button onClick={showHint} bg='red.200' height='100%' width='100%'>Show hint(H)</Button></GridItem>
        <GridItem bg='blue.300' area={'answerSection'}><Textarea height='100%' placeholder='Напишите ваш ответ здесь'></Textarea></GridItem>
        <GridItem bg='gray.300' area={'checkSection'}><Button  bg="green.200" height='100%' width='100%'>Кнопки "Проверить(C or Enter)", "Оценить" и инпуты будут здесь</Button></GridItem>
        <GridItem pl='2' bg='purple.300' area={'rightAnswerSection'}>Здесь должен отобразиться правильный ответ, после нажатия кнопки "Проверить"</GridItem>
    </Grid>
    );
};
export default Test6Grid;