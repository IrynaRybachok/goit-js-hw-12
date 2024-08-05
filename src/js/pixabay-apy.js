export default searchImegesByQuery;
import axios from 'axios';

axios.defaults.baseURL = "https://pixabay.com";

function searchImegesByQuery({q = "query", page = 1, per_page = 15} = {
    q: "query",
    page: 1,
    per_page: 15,
}){

    return axios.get("/api/" , {
        params: {
            key: "45131353-6378824e083214db07911a1d4",
            q,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            page,
            per_page
        }}).then(({data}) => data);
}

