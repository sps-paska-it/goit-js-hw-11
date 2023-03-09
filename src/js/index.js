import '../css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import { fetchSearch } from '../js/fetch-search';
// import { renderFunctions } from './render_functions';
import { refs } from './refs';

const DEBOUNCE_DELAY = 1000;

// console.log(refs.inputSearch.value);

const onSearch = e => {
  const inputValue = e.target.value.trim();
  // refs.listCountries.innerHTML = '';
  // refs.cardCountry.innerHTML = '';
  if (inputValue !== '') {
    fetchSearch(inputValue).then(resp => console.log(resp)).catch(error => console.log(error));
  }
};

refs.inputSearch.addEventListener(
  'input',
  debounce(e => {
    onSearch(e);
  }, DEBOUNCE_DELAY)
);