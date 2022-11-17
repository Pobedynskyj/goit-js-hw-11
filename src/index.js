import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';

const axios = require('axios').default;

const refs = {
  searchForm: document.querySelector(`.search-form`),
  searchInput: document.querySelector(`.search-form__input`),
  btnSubmit: document.querySelector(`.search-form__button`),
  btnLoadMore: document.querySelector(`.load-more`),
  gallery: document.querySelector(`.gallery`),
};

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
  refs.gallery.innerHTML = '';
  inputValue = refs.searchForm[0].value.trim();
  page = 1;
  currentHits = 0;

  fetchPhoto().then(array => {
    if (inputValue === '' || array.hits.length === 0) {
      refs.btnLoadMore.classList.add(`disabled`);
      return Notiflix.Notify.failure(
        'Sorry, there sre no images matching your search query. Please try again.'
      );
    }
    let markup = addMarkup(array.hits);
    refs.gallery.insertAdjacentHTML(`beforeend`, markup);
    refs.btnLoadMore.classList.remove(`disabled`);
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
    if (currentHits < 40) {
      refs.btnLoadMore.classList.add(`disabled`);
    }
  });
  refs.searchForm.reset();
}

async function fetchPhoto(page = 1) {
  try {
    const options = new URLSearchParams({
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    });
    let url = `${BASE_URL}?key=${MY_KEY}&q=${inputValue}&page=${page}&${options}`;
    const response = await axios.get(url, options);
    const photos = await response.data;
    totalHits = await response.data.totalHits;
    return photos;
  } catch {
    error;
  }
}

function addMarkup(array) {
  currentHits += array.length;
  const mark = array.reduce((acc, element) => {
    acc += `<div class="photo-card" width="400px">
        <a href="${element.webformatURL}">
           <img class="photo-img" src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
           </a>
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

function onLoadClick() {
  page += 1;
  if (currentHits >= totalHits) {
    refs.btnLoadMore.classList.add(`disabled`);
    return Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
  fetchPhoto(page).then(array => {
    let markup = addMarkup(array.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    const lightbox = new SimpleLightbox('.gallery a', {
      captionsDelay: 250,
      captionsData: 'alt',
    });
    if (array.totalHits <= page * 40) {
      refs.btnLoadMore.classList.add(`disabled`);
      return Notiflix.Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  });
}
