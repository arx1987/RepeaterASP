import { Stack, Badge, Divider, Flex } from "@chakra-ui/react";
import { Outlet, Link } from "react-router-dom"

const Layout = () => {
    const addStyle = (e) => {
        // const badges = document.getElementsByTagName("BADGE");
        // const badges = document.getElementsByTagName("CHAKRA-BADGE");
        //const badges = document.getElementsByClassName("BADGE");
        const badges = document.getElementsByClassName("chakra-badge");
        for(let badge of badges){
            // badge.style.background="#C6F6D5";//green
            badge.style.background="#EDF2F7";//gray
        }
        e.target.parentNode.style.background="#C6F6D5";
    }
    return (
        <>
        <Stack direction='row'>
            <Badge onClick={addStyle}><Link to="/trainer">Trainer</Link></Badge>
            <Badge colorScheme="green" onClick={addStyle}><Link to="/">Info</Link></Badge>
            <Badge onClick={addStyle}><Link to="/add">Add</Link></Badge>
            <Badge onClick={addStyle}><Link to="/change">Change</Link></Badge>
            <Badge onClick={addStyle}><Link to="/test1">Test1</Link></Badge>
            <Badge onClick={addStyle}><Link to="/test2">Test2</Link></Badge>
            <Badge onClick={addStyle}><Link to="/test3">Test3</Link></Badge>
            <Badge onClick={addStyle}><Link to="/test4">Test4</Link></Badge>
            <Badge onClick={addStyle}><Link to="/test5">Test5</Link></Badge>
            <Badge onClick={addStyle}><Link to="/test6">Test6</Link></Badge>
            <Badge onClick={addStyle}><Link to="/test7">Test7</Link></Badge>
            <Badge onClick={addStyle}><Link to="/test8">Test8</Link></Badge>
        </Stack>
        <Divider/>

        <Outlet />
        </>
    )
};

export default Layout;