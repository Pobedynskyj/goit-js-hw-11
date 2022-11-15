import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';

const axios = require('axios').default;

const refs = {
  searchForm: document.querySelector(`.search-form`),
  searchInput: document.querySelector(`.search-form__input`),
  btnSubmit: document.querySelector(`.search-form__button`),
  btnLoadMore: document.querySelector(`.load-more`),
  gallery: document.querySelector(`.gallery`),
};

const lastEl = refs.gallery.lastElementChild;

let page = 1;
let inputValue = '';
let totalHits;
let currentHits = 0;
const BASE_URL = `https://pixabay.com/api/`;
const MY_KEY = `31254208-ff4dd95c44a4a79ef6d4abce7`;

refs.btnLoadMore.classList.add(`disabled`);
refs.btnLoadMore.addEventListener(`click`, onLoadClick);

refs.searchForm.addEventListener('submit', formSubmit);

function formSubmit(event) {
  event.preventDefault();
  refs.btnLoadMore.classList.add(`disabled`);
  gallery.innerHTML = '';
  inputValue = form[0].value.trim();
  page = 1;
  currentHits = 0;

  fetchPhoto().then(array => {
    if (inputValue === '' || array.hits.length === 0) {
      refs.btnLoadMore.classList.add(`disabled`);
      return Notiflix.Notify.failure(
        'Sorry, there sre no images matching your search query. Please try again.'
      );
    }
    const markup = addMarkup(array.hits);
    refs.gallery.insertAdjacentElement('beforeend', markup),
      refs.btnLoadMore.classList.remove(`disabled`);
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
    if (currentHits < 40) {
      refs.btnLoadMore.classList.add(`disabled`);
    }
  });
  refs.searchForm.reset();
}

function addMarkup(array) {
  currentHits += array.length;
  const mark = arr.reduce((acc, element) => {
    acc += `<div class="photo-card" width="400px">
        
           <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
           
           <div class="info">
             <p class="info-item">
               <b>Likes</b>
               ${element.likes}
             </p>
             <p class="info-item">
               <b>Views</b>
               ${element.views}
             </p>
             <p class="info-item">
               <b>Comments</b>
               ${element.comments}
             </p>
             <p class="info-item">
               <b>Downloads</b>
               ${element.downloads}
             </p>
           </div>
        </div>`;
    return acc;
  }, '');
  return mark;
}
