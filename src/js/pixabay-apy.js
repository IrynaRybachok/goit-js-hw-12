export default searchImegesByQuery;


const URL = 'https://pixabay.com/api/';

function searchImegesByQuery(query){
    
    const params = new URLSearchParams({
        "key": "45131353-6378824e083214db07911a1d4",
        "q": `${query}`,
        "image_type": "photo",
        "orientation": "horizontal",
        "safesearch": "true"
    })

    return fetch(`${URL}?${params}`).then((response) => {
        if(!response.ok){
            throw new Error(response.status);
        }
        return response.json();
    });
}