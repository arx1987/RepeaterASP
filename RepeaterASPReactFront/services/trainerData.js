import axios from "axios"
// let allDataFromBack = [];
// {topics.map((t) => 
//     { 
//         if(uniqueTopics.indesOf(topics.topicName) === -1){
//             uniqueTopics.push(topics.topicName);
//         }
//     }
// )}
export const fetchTrainerData = async () => {
    try{
        // var response = await axios.get("https://localhost:7238/topics/");
        var response = await axios.get("https://localhost:7238/Topics/TrainerData");
        //allDataFromBack = response.data;
        console.log(response.data);
        return response.data;
    } catch(e) {
        console.error(e);
    }
};
export const updateTrainerData = async (req) => {
    try {
        var response = await axios.post("https://localhost:7238/Topics/TrainerData", req);
        console.log(response.data);
        return response.status;
    } catch(e) {
        console.error(e);
    }
};