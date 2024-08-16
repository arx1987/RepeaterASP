import { useState, useEffect } from 'react';

const Test7 = () => {
    const [key, setKey] = useState("Press key");
    const onKey = (event) => {
        //if(event.key.ctrlKey && event.keyCode == 13){//не срабатывает
        //if(event.ctrlKey && event.key == 13){//не срабатывает
        // if(event.ctrlKey && event.key == 13){//не срабатывает
        //if(event.key == 13){//не срабатывает
        //if(event.keyCode == 13){//не срабатывает Ошибка: cannot set property keyCode of #<KeyboardEvent> which has only a getter
        //if(event.key.ctrlKey){//не срабатывает
        //}else if(event.key == ' ' && event.key == 'h'){ //пробел + h не работает
        //}else if (event.shiftKey && event.key == 'h'){ //shift + h тоже НЕ работает потому, что шифт заставляет сделать букву большой, а проверка идет на маленькую!
        //if(event.key == 'Enter'){//ЭТО РАБОТАЕТ
        //if(event.ctrlKey){//ЭТО РАБОТАЕТ
        if(event.altKey && event.key == 'h'){
            setKey("Все работает!");
        }else if (event.altKey && event.key == 'р'){
            setKey("Если ты нажимаешь alt+h, но ничего не меняется, проверь, может быть у тебя НЕ английская раскладка клавиатуры");
        }else if(event.key == ' ' && event.key == 'h'){
            setKey("Ты нажал пробел и h");
        }else if(event.shiftKey && event.key == 'H'){
            setKey("Shift + h был нажат. Важно знать, что шифт делает букву большой, т.е по факту было нажато сочетание Shift + H");
        }  
    };
    useEffect(() => {
        document.addEventListener("keydown", onKey);
        return () => {
          document.removeEventListener("keydown", onKey);
        };
    },[]);
    return (
        <div>
            <h2>Тест работы горячей клавиши Alt + H </h2>
            <div>{key}</div>
        </div>
    )
}
export default Test7;