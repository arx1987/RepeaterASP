import axios from "axios"
let allDataFromBack = [];
// {topics.map((t) => 
//     { 
//         if(uniqueTopics.indesOf(topics.topicName) === -1){
//             uniqueTopics.push(topics.topicName);
//         }
//     }
// )}
export const fetchAllTopics = async () => {
    try{
        // var response = await axios.get("https://localhost:7238/topics/");
        var response = await axios.get("https://localhost:7238/Topics/");
        allDataFromBack = response.data;
        console.log(response.data);
        return response.data;
    } catch(e) {
        console.error(e);
    }
};