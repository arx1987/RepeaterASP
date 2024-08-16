import { useState, useEffect } from 'react';
const Test3 = () => {
    const [key, setKey] = useState("Press key");
    const onKey = (event) => {
        setKey(event.key);
    };
    useEffect(() => {
        document.addEventListener("keydown", onKey);
        return () => {
          document.removeEventListener("keydown", onKey);
        };
    },[]);
    return <div>{key}</div>;
};

export default Test3;