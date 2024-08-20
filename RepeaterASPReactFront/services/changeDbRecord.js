import axios from "axios"
export const changeDbRecord = async (req) => {
    try {
        var response = await axios.post("https://localhost:7238/Topics/UpdateTopicData", req);
        console.log(response.data);
        return response.status;
    } catch(e) {
        console.error(e);
    }
};