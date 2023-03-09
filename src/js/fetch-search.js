export const fetchSearch = inputValue => {
   const API_KEY = '34275964-1302058c3a7bcefadef046d6c';
  const URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
  return fetch(URL)
  .then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
};


// var API_KEY = '34275964-1302058c3a7bcefadef046d6c';
// var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });