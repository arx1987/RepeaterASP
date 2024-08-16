import { useState, useEffect } from 'react';
import { Button, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

const Test8 = () => {
        const [name, setName] = useState("");
        const handleSubmit = (event) => {
            event.preventDefault();
            alert(`The name you entered was: ${name}`);
        };
        const navigate = useNavigate();
        const goToPage = ( (name) => {
            navigate(name);
        });

        return (
            <>
                <Button onClick={() => goToPage("/test7")}>go to page test7</Button>
            </>
        )
}
export default Test8;