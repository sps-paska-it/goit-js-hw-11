import '../css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from '../js/fetchCountries';
import { renderFunctions } from './render_functions'
import { refs } from "./refs";

const DEBOUNCE_DELAY = 300;

const onSearchCountry = e => {
  const inputValue = e.target.value.trim();
  if (inputValue !== '') {
    fetchCountries(inputValue).then(filterCorrectInput).catch(onFetchError);
  }
};

const toMuchMatches = () => {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
};

const onFetchError = () => {
Notiflix.Notify.failure('Oops, there is no country with that name');
};

const filterCorrectInput = response => {
refs.listCountries.innerHTML = '';
refs.cardCountry.innerHTML = '';
  if (response.length > 10) {
    console.log(response.length);
   return toMuchMatches();
  }
  renderFunctions(response);
};

const onMarkupCardCountry = response => {
console.log(response, 'card');
};


refs.inputSearch.addEventListener(
  'input',
  debounce(e => {
    onSearchCountry(e);
  }, DEBOUNCE_DELAY)
);
