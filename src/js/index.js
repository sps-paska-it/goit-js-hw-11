import '../css/index.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchSearch } from './fetch_search';
import { renderFunctions } from './render_functions';
import { refs } from './refs';

const sum = {
  totalHitsMarkup: 0,
  page: 1,
}

refs.btnLoadMore.classList.add('hidden');

const onSearch = e => {
  e.preventDefault();
  refs.gallery.innerHTML = '';
sum.page = 1;
  fetchSearch(sum.page).then(filterCorrectInput).catch(onFetchError);
};


const filterCorrectInput = response => {
  Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
  renderFunctions(response);
  
  new SimpleLightbox('.gallery a', {
    captionType: 'attr',
    captionsData: 'alt',
    captionDelay: 250,
  });
  sum.totalHitsMarkup = 0;
  endImage(response);
};

const onAddImageNextPage = () => {
    sum.page += 1;
    fetchSearch(sum.page).then(endImage).catch(onFetchError)
};

const endImage = (response) => {
  console.log(sum.totalHitsMarkup);
  sum.totalHitsMarkup += response.hits.length;
  console.log(sum.totalHitsMarkup);
  console.log(response.totalHits);
  if (response.totalHits === sum.totalHitsMarkup) {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    refs.btnLoadMore.classList.add('hidden');
  } else {
    refs.btnLoadMore.classList.remove('hidden');
  }
  if (sum.totalHitsMarkup > 40) {
    renderFunctions(response);

    new SimpleLightbox('.gallery a', {
      captionType: 'attr',
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
};  

const onFetchError = () => {
  refs.gallery.innerHTML = '';
  refs.btnLoadMore.classList.add('hidden');
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
};

refs.btnSubmitForm.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onAddImageNextPage);