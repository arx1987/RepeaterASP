import axios from "axios"
export const addTopicToDB = async (req) => {
    try {
        var response = await axios.post("https://localhost:7238/Topics/", req);
        console.log(response.data);
        return response.status;
    } catch(e) {
        console.error(e);
    }
};
export const addTagsForText = (text) => {
    //проверяем, есть ли тег <p>вначале этого текста, если есть - просто отправляем текст назад
    if(text.slice(0,3) == "<p>") return text.replaceAll("\n", "");
    //если нет - ставим с самого начала <p>, потом преобразовываем все \n в </p><p>
    else return "<p>" + text.replaceAll("\n", "</p><p>");
}