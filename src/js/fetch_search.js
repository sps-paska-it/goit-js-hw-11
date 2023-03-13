import axios from 'axios';
import { refs } from './refs';
const page = 1;

export const fetchSearch = async page => {
  const API_KEY = '34275964-1302058c3a7bcefadef046d6c';
  const BASE = 'https://pixabay.com/api/';
  const inputValue = refs.inputSearch.value.trim();
  const URL = `${BASE}?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  try {
    const response = await axios(URL);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};