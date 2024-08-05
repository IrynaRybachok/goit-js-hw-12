
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

import searchImegesByQuery from "./js/pixabay-apy";
import renderImg from "./js/render-functions";
import ButtonService from "./js/load-more-btn";
import SpinerServise from "./js/spiner";

const form = document.querySelector('.search-img-form');
const loader = document.querySelector('.loader');
const imageContainer = document.querySelector('.img-container-list');
const btnLoadMore = document.querySelector('.load-more');
const btnService = new ButtonService(btnLoadMore, "is-hidden");
const spiner = new SpinerServise( loader );

const params = {
    page: 1,
    per_page: 15,
    q: "",
    maxPage: 0,
};

form.addEventListener("submit", heandlyClickBtnSearch);
btnService.hide();
spiner.hide();

async function heandlyClickBtnSearch(event){
    event.preventDefault();
    spiner.show();
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
        spiner.hide();
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
        spiner.hide();
        btnService.hide()
        if (err.name === 'TypeError' && err.message.includes("Failed to fetch")) {
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
            spiner.hide();
            btnService.hide()
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
    btnService.hide();
    spiner.show()
    params.page += 1;

    try{
        const { hits } = await searchImegesByQuery(params);
        renderImg( hits );
        myScroll();
        btnService.show();
    } catch(err){
        
        spiner.hide()
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
            iziToast.show({
                position: 'topRight',
                maxWidth: '432px',
                message: "We're sorry, but you've reached the end of search results.",
                messageColor: '#FAFAFB',
                messageSize: '16px',
                messageLineHeight: ' 24px',
                backgroundColor: '#09F',
            });
        } else{
            btnService.enable();
        }
    }
}

function myScroll(){
    const container = document.querySelector(".img-container-item");
    const containerParam = container.getBoundingClientRect().height;
    window.scrollBy({
        top: containerParam * 2,
        behavior: "smooth",
    });
}