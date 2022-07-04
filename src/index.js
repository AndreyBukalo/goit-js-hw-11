import { fetchPictures } from './js/fetchPictures';
import { renderGallery } from './js/renderHTML';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  moreBtn: document.querySelector('.more-button'),
  form: document.querySelector('.search-form'),
  searchBtn: document.querySelector('.input-button'),
  gallery: document.querySelector('.gallery'),
  upButton: document.querySelector('.home-button'),
};

let formInput = '';
let page = 1;
const perPage = 40;
let simpleLightBox;

refs.moreBtn.addEventListener('click', onMoreClick);
refs.form.addEventListener('submit', fetchResolved);

function fetchResolved(event) {
  event.preventDefault();
  page = 1;
  refs.gallery.innerHTML = '';
   refs.upButton.hidden = false;
  formInput = refs.form.elements.searchQuery.value.trim();
  if (formInput === '') {
    refs.moreBtn.hidden = true;
    emptyInput();
    return;
  } 
 fetchPictures(formInput, page, perPage)
    .then(image => {
      if (image.totalHits === 0) {
        refs.moreBtn.hidden = true;
        noImagesFound();
      } else if (image.totalHits < 10) {
        renderGallery(image.hits);
        refs.moreBtn.hidden = true;
        imagesFound(image);
        setTimeout(endOfPages, 500);

      }
      else {
        renderGallery(image.hits);
        refs.moreBtn.hidden = false;
        console.log(image.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        imagesFound(image);
      }
         
   
    })
    .catch(err => console.log(err.statusText)).finally(() => {
      refs.form.reset();
    });
  
}

function onMoreClick() {
  page += 1;
  fetchPictures(formInput, page, perPage)
    .then(image => {
        renderGallery(image.hits);
        refs.moreBtn.hidden = false;
        console.log(image.hits);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();
       const totalPages = image.totalHits / perPage;

      if (page > totalPages) {
        refs.moreBtn.hidden = true;
        endOfPages();
      }
      
    })
    .catch(error => console.log(error));
}

function imagesFound(image) {
  Notify.success(`Hooray! We found ${image.totalHits} images.`);
}

function emptyInput() {
  Notify.failure(
    'The search string cannot be empty. Please specify your search query.'
  );
}

function noImagesFound() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function endOfPages() {
  Notify.failure("We're sorry, but you've reached the end of search results.");
}


