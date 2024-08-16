import { useState, useEffect } from 'react';
const Test4 = () => {
    const [isDisplayed, setDstate] = useState(false);
    const [key, setKey] = useState("none");
    // const setTrue = () => {
    //     setKey("block");
    //     setDstate(true);
    // };
    // function setTrue() {
    //     setKey("block");
    //     setDstate(true);
    //     return;
    // }
    // const setFalse = () => {
    //     setKey("none");
    //     setDstate(false);

    // };
    const onKey = (event) => {
        switch(event.key){
            // case "a", "b", "c", "d", "e", "f", "g", "j", "i", "j", "k", "l", "m":
            case "a": case "b": case "c": case "d": case "e": 
            case "f": case "g": case "h": case "i": case "j": 
            case "k": case "l": case "m": case "n": case "o": 
            case "p": case "q": case "r": case "s": case "t": 
            case "u": case "v": case "w": case "x": case "y": 
            case "z":
                // isDisplayed ? setFalse() : setTrue();
                if(isDisplayed) {
                    setKey("none");
                    setDstate(false);
                }
                else {
                    setKey("block");
                    setDstate(true);
                }
                 break;
            // case "a":
            //     setKey("block");
            //     break;
            // case "b":
            //     setKey("none");
            //     break;
            default: 
                return;
        }
        //event.preventDefault();
        // setKey(event.key);
    };
    useEffect(() => {
        document.addEventListener("keydown", onKey);
        return () => {
          document.removeEventListener("keydown", onKey);
        };
    });
    return (
        <div>
            <div>Test4</div>
            <div>Press f or d to see/hide the message</div>
            <div style={{display: key}}>message</div>
        </div>
    )
};

export default Test4;