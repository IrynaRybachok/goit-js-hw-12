
import ButtonService from "./js/load-more-btn";
import searchImegesByQuery from "./js/pixabay-apy"
import renderImg from "./js/render-functions"
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.search-img-form');
const loader = document.querySelector('.loader');
const imageContainer = document.querySelector('.img-container-list');
const btnLoadMore = document.querySelector('.load-more');
const btnService = new ButtonService(btnLoadMore);

const params = {
    page: 1,
    per_page: 15,
    q: "",
    maxPage: 0,
};



form.addEventListener('submit', heandlyClickBtnSearch);
btnService.hide();
loader.style.display = 'none';

async function heandlyClickBtnSearch(event){
    event.preventDefault();
    loader.style.display = 'block';
    imageContainer.innerHTML = '';

    params.q = event.currentTarget.elements.name.value.trim().toLowerCase();

    if (!params.q){

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

    btnService.show();
    btnService.disable();

    params.page = 1;

    try {
        const { hits, totalHits } = await searchImegesByQuery(params);
        params.maxPage = Math.ceil(totalHits / params.per_page);
        renderImg(hits);

        if(params.maxPage > 1){
            btnService.enable();
            btnLoadMore.addEventListener("click", handleLoadMore);
        }else{
            btnService.hide();
        }
    } catch(err){
        imageContainer.innerHTML = '';
        loader.style.display = 'none';
        if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
            iziToast.show({
                title: 'Error',
                titleColor: '#FAFAFB',
                titleSize: '16px',
                titleLineHeight: '24px',
                position: 'topRight',
                maxWidth: '432px',
                message: 'No internet connection',
                messageColor: '#FAFAFB',
                messageSize: '16px',
                messageLineHeight: ' 24px',
                backgroundColor: '#EF4040',
            });
        } else {
            iziToast.show({
                title: 'Error',
                titleColor: '#FAFAFB',
                titleSize: '16px',
                titleLineHeight: '24px',
                position: 'topRight',
                maxWidth: '432px',
                message: `An error occurred: ${err.message}`,
                messageColor: '#FAFAFB',
                messageSize: '16px',
                messageLineHeight: ' 24px',
                backgroundColor: '#EF4040',
            });
        }
    }
    finally{
        form.reset()
    }
}

async function handleLoadMore(){
    btnService.disable();
    params.page += 1;

    try{
        const { hits } = await searchImegesByQuery(params);
        renderImg( hits );
    } catch(err){
        iziToast.show({
            title: 'Error',
            titleColor: '#FAFAFB',
            titleSize: '16px',
            titleLineHeight: '24px',
            position: 'topRight',
            maxWidth: '432px',
            message: `An error occurred: ${err.message}`,
            messageColor: '#FAFAFB',
            messageSize: '16px',
            messageLineHeight: ' 24px',
            backgroundColor: '#EF4040',
        });
    } finally{
        if(params.page === params.maxPage){
            btnService.hide();
            btnLoadMore.removeEventListener("click", handleLoadMore);
        } else{
            btnService.enable();
        }
    }
}