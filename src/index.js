import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';

const axios = require('axios').default;

const refs = {
  searchForm: document.querySelector(`.search-form`),
  searchInput: document.querySelector(`.search-form__input`),
  btnSubmit: document.querySelector(`.search-form__input`),
  btnLoadMore: document.querySelector(`.load-more`),
  gallery: document.querySelector(`.gallery`),
};

const lastEl = refs.gallery.lastElementChild;

const URL = `https://pixabay.com/api/`;
const KEY = `31254208-ff4dd95c44a4a79ef6d4abce7`;

btnSubmit.classList.add(`disabled`);

refs.btnSubmit.addEventListener('click', btnClick);
refs.searchForm.addEventListener('submit', formSubmit);

let page = 1;
let inputValue = '';
let totalHits;
