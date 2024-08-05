// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

export default renderImg;
const imageContainer = document.querySelector(".img-container-list");
const loader = document.querySelector('.loader');



function renderImg(images){
    loader.style.display = 'none';

    if(!images.length){
        iziToast.show({
            title: 'Error',
            titleColor: '#FAFAFB',
            titleSize: '16px',
            titleLineHeight: '24px',
            position: 'topRight',
            maxWidth: '432px',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            messageColor: '#FAFAFB',
            messageSize: '16px',
            messageLineHeight: ' 24px',
            backgroundColor: '#EF4040',
        });
        return;
    }
    
    imageContainer.insertAdjacentHTML("beforeend", createMarkup(images));

    const refreshPage = new SimpleLightbox('.wrap-img-item a', { 
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
    });

    refreshPage.refresh();
}

function createMarkup(arr){
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>
    `<li class="img-container-item">
        <div class="wrap-img-item">
            <a href="${largeImageURL}"><img class="img-item" src="${webformatURL}" alt="${tags}"/></a>
        </div>
        <div class="wrap-img-discr">
            <ul class="img-discr-list">
                <li class="img-discr-item">
                    <h2 class="img-discr-item-header">Likes</h2>
                    <p class="img-discr-item-text">${likes}</p>
                </li>
                <li class="img-discr-item">
                    <h2 class="img-discr-item-header">Views</h2>
                    <p class="img-discr-item-text">${views}</p>
                </li>
                <li class="img-discr-item">
                    <h2 class="img-discr-item-header">Comments</h2>
                    <p class="img-discr-item-text">${comments}</p>
                </li><li class="img-discr-item">
                    <h2 class="img-discr-item-header">Downloads</h2>
                    <p class="img-discr-item-text">${downloads}</p>
                </li>
            </ul>
        </div>
    </li>`)
    .join("");
}