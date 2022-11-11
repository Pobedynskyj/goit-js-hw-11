import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';

const axios = require('axios').default;

const refs = {
  searchForm: document.querySelector(`.search-form`),
  searchInput: document.querySelector(`.search-form__input`),
  btnSubmit: document.querySelector(`.search-form__input`),
  btnLoadMore: document.querySelector(`.load-more`),
};

btnSubmit.classList.add(`disabled`);

refs.btnSubmit.addEventListener('click', btnClick);
refs.searchForm.addEventListener('submit', formSubmit);

let page = 1;
let inputValue = '';
