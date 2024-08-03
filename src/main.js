
import searchImegesByQuery from "./js/pixabay-apy"
import renderFunction from "./js/render-functions"
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.search-img-form');
const loader = document.querySelector('.loader');
const imageContainer = document.querySelector(".img-container-list");


form.addEventListener('submit', heandlyClickBtnSearch);
loader.style.display = 'none';

function heandlyClickBtnSearch(event){
    event.preventDefault();
    loader.style.display = 'block';
    imageContainer.innerHTML = '';

    const inputName = event.currentTarget.elements.name.value.trim().toLowerCase();

    if (!inputName){

        iziToast.show({
            title: 'Caution',
            titleColor: '#FAFAFB',
            titleSize: '16px',
            titleLineHeight: '24px',
            position: 'topRight',
            maxWidth: '432px',
            message: 'Ops.. You forgot to write the keyword!',
            messageColor: '#FAFAFB',
            messageSize: '16px',
            messageLineHeight: ' 24px',
            backgroundColor: '#FFA000',
        });
        loader.style.display = 'none';
        form.reset();
        return;
    }

    searchImegesByQuery(inputName)
    .then(renderFunction.renderImg)
    .catch(renderFunction.onFetchError)
    .finally(() => form.reset());
}