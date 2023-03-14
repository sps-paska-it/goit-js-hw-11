import '../css/index.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { lightbox } from './simplelightbox';
import { fetchSearch } from './fetch_search';
import { renderFunctions } from './render_functions';
import { refs } from './refs';

const sum = {
  totalHitsMarkup: 0,
  page: 1,
};

refs.btnLoadMore.classList.add('hidden');

const onSearch = async e => {
  e.preventDefault();
  refs.btnLoadMore.classList.add('hidden');
  const inputValue = refs.inputSearch.value.trim();
  if (inputValue !== '') {
    refs.gallery.innerHTML = '';
    sum.page = 1;
    try {
     const response = await fetchSearch(sum.page);
     if (response.totalHits !== 0) {
       managementFunctionsRender(response)
       return
      }
      emptyFetch()
    } catch (error) {
      console.error(error.message);
    }
    return;
  }
  Notiflix.Notify.info('Please enter a search request.');
};

const managementFunctionsRender = response => {
  Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
  renderFunctions(response);
  lightbox.refresh();

  sum.totalHitsMarkup = 0;
  endImage(response);
};

const onAddImageNextPage = async () => {
  sum.page += 1;
  try {
    const response = await fetchSearch(sum.page);
    endImage(response)
   } catch (error) {
     console.error(error.message);
   }
};

const endImage = response => {
  sum.totalHitsMarkup += response.hits.length;
  if (response.totalHits === sum.totalHitsMarkup) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    refs.btnLoadMore.classList.add('hidden');
  } else {
    refs.btnLoadMore.classList.remove('hidden');
  }
  if (sum.totalHitsMarkup > 40) {
    renderFunctions(response);

    lightbox.refresh();
  }
};

const emptyFetch = () => {
  refs.gallery.innerHTML = '';
  refs.btnLoadMore.classList.add('hidden');
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
};

refs.btnSubmitForm.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onAddImageNextPage);