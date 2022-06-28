import axios from 'axios';

export async function fetchPictures(name, page, perPage) {
  const PIXA_KEY = '28301212-4ad2581bf94573ba1d8a79e90';
  axios.defaults.baseURL = 'https://pixabay.com/api/';
  const respone = await axios.get(
    `?key=${PIXA_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return respone.data;
}

let name = '';
let page = 1;
const perPage = 40;
let simpleLightBox;

export const fetchResolved = () => {
  fetchPictures(formInput, page, perPage)
    .then(image => {
      if (image.totalHits === 0) {
        noImagesFound();
      } else {
        renderGallery(image.hits);
        console.log(image.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        alertImagesFound(image);
      }
      if (image.totalHits > perPage) {
      }
    })
    .catch(err => console.log(err.statusText));
};
