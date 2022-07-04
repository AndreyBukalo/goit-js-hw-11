import axios from 'axios';

export async function fetchPictures(name, page, perPage) {
  const PIXA_KEY = '28301212-4ad2581bf94573ba1d8a79e90';
  axios.defaults.baseURL = 'https://pixabay.com/api/';
  const respone = await axios.get(
    `?key=${PIXA_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return respone.data;
}



