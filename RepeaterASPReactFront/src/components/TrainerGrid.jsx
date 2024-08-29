import { useEffect, useRef, useState } from 'react';
import { Grid, GridItem, Button, Textarea } from '@chakra-ui/react'
import { updateTrainerData } from '../../services/trainerData';
const TrainerGrid = (props) => { //(props) => {//trainerDt, otherQuestionWasClckd
    const onKey = (event) => {
        if (event.shiftKey && event.altKey && event.key == "C"){
            checkPressed(event);
        } else if (event.shiftKey && event.altKey && event.key == 'H') {
            showHint();
        }
        //else if (event.key == 'h') { showHint();}
    };
    
    //const [otherQuestionWasClicked, setOQWC] = useState(props.otherQuesitonWasClkd);
    //Кнопки "Проверить(C or Enter)", "Оценить" и инпуты будут здесь
    const [rateToSend, setRateToSend] = useState('');
    const [checkButtonText, setCheckButtonText] = useState('Проверить(Shift+Alt+C)'); 
    const [checkPressCount, setCheckPressCount] = useState(0);
    const [rightAnswerField, setRightAnswerField] = useState('Здесь должен отобразиться правильный ответ, после нажатия кнопки "Проверить"');
    const [showInput, setShowInput] = useState(false);
    const hintsArea = useRef(null);
    const checkInput = useRef(null);
    let hintsLength = props.trainerDt.hints.length;
    let startHintCount = parseInt(props.otherQuestionWasClckd);
    const [hintCount, setHintCount] = useState(startHintCount);
    useEffect(() => {
        document.addEventListener('keydown', onKey);
        return () => {
          document.removeEventListener('keydown', onKey);
        };
    });
    const showHint = () => {
        if(hintsLength <= hintCount) { }
        else if(hintCount == 0) {
            hintsArea.current.innerText = props.trainerDt.hints[0];
            setHintCount(1);
        }
        else {
            hintsArea.current.innerText = hintsArea.current.innerText + '; ' + props.trainerDt.hints[hintCount];
            setHintCount(hintCount + 1);
        }
    };
    const checkPressed = (event) => {
        event.preventDefault();//чтобы страница не обновлялась
        //инкрементнуть счетчик checkPressCount или обнулить, в зависимости от условия(1-ое нажатие или 2-ое нажатие)
        if(checkPressCount == 0) {//первое нажатие
            setCheckPressCount(1);
            //+изменить стили
            setShowInput(true);
            setCheckButtonText('Оценить(Shift+Alt+C)');
            //+вывести правильный ответ в блоке ниже
            setRightAnswerField(props.trainerDt.longAnswer);
            //+добавить поля формы в блок с кнопкой(или отобразить их, если решишь чтобы они были спрятанными)
            //-поставить фокус на поле формы
            //checkInput.current.autoFocus = true;//checkInput.current.focus(); checkInput.current.focus;-не работает; checkInput.focus();-ошибка
            checkInput.current.focus();//на самом деле оно фокусит инпут, а потом сбрасывает фокус(
        } else { //второе нажатие
            //обнулить счетчик
            setCheckPressCount(0);
            //отправить данные на сервер: это должен быть id - айди вопроса, rate - это наш инпут и на сервере уже получить текущее время, посчитать все что нужно, записать в бд. вернуть ок
            const req = { id: props.trainerDt.id, rate: rateToSend };
            updateTrainerData(req);
            //вернуть страничку в исходное состояние, только с учетом NextCheck, вероятно, достаточно просто обновить страницу
            setCheckButtonText('Проверить(Shift+Alt+C)');  
            setShowInput(false); 
            setRightAnswerField('Здесь должен отобразиться правильный ответ, после нажатия кнопки "Проверить"'); 
            //document.location.reload();     
        }  
    };
    const [isOn, setIsOn] = useState(true);
    const handleHideTabs = (event) => {        
        if(event.type == "focus"){//если тип ивента focus, то отправляем наверх false и скрываем колонку слева
            props.hideTabs(false);
            setIsOn(false);
        } else {
            props.hideTabs(!isOn);
            setIsOn(!isOn);
        }
    };
    return (
    <Grid templateAreas={`"questionInfo questionInfo hideLeftColumn"
                          "topicNQuestionSection topicNQuestionSection topicNQuestionSection"
                          "hintsSection hintButton hintButton"
                          "answerSection answerSection answerSection"
                          "checkSection checkSection checkSection"
                          "rightAnswerSection rightAnswerSection rightAnswerSection"`}
                        gridTemplateRows={'25px 50px 50px 1fr 50px 2fr'}
                        gridTemplateColumns={'1fr 110px 40px'}
                        h='96vh'
                        gap='1'
                        color='blackAlpha.700'
                        fontWeight='bold'
    >
        <GridItem bg='purple.200' area={'questionInfo'}>Вопрос задан: {props.trainerDt.totalChecksAmount} раз. Стадия изучения: {props.trainerDt.stage} из 10. Следующий раз: {props.trainerDt.nextCheck}</GridItem>
        <GridItem area={'hideLeftColumn'}><Button bg='teal.200' height='100%' width='100%' onClick={handleHideTabs}>O</Button></GridItem>
        <GridItem pl='2' bg='orange.300' area={'topicNQuestionSection'}>Тема: {props.trainerDt.topicName}. <p>Вопрос: <b>{props.trainerDt.question}</b></p></GridItem>
        <GridItem id='hints' pl='2' bg='pink.300' area={'hintsSection'} ref={hintsArea}>hints: нужна подсказка? кликай на кнопку справа</GridItem> {/* hints: вставлять параметры при нажатии на кнопку</GridItem> */}
        <GridItem bg='green.300' area={'hintButton'}><Button onClick={showHint} bg='red.200' height='100%' width='100%'>Подсказка</Button></GridItem>
        <GridItem bg='blue.300' area={'answerSection'}><Textarea onFocus={handleHideTabs} height='100%' placeholder='Напишите ваш ответ здесь'></Textarea></GridItem>
        <GridItem bg='gray.300' area={'checkSection'}>
            <form style={{display: 'inline-flex', height: '100%', width: '100%'}} onSubmit={checkPressed}>
                <input ref={checkInput} onChange={(e) => setRateToSend(e.target.value)} name="query" style={{display: showInput ? 'block' : 'none', width: '100%', paddingLeft: '20px'}} placeholder='Оцените ваш ответ цифрой от 0 до 10'/>
                <Button type='submit' bg='green.200' height='100%' width='100%'>{checkButtonText}</Button>
                {/* onClick={checkButtonCkicked}  */}
            </form>
        </GridItem>
        <GridItem pl='2' bg='purple.300' area={'rightAnswerSection'} overflowY={"auto"} dangerouslySetInnerHTML={{__html: rightAnswerField}}></GridItem>
    </Grid>
    );
};
export default TrainerGrid;