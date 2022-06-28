import { fetchPictures } from './js/fetchPictures';
import { renderGallery } from './js/renderHTML';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const refs = {
  form: document.querySelector('.search-form'),
  searchBtn: document.querySelector('.input-button'),
  gallery: document.querySelector('.gallery'),
};
let formInput = '';
let page = 1;
const perPage = 10;
let simpleLightBox;

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  page = 1;
  gallery.innerHTML = '';
  formInput = refs.form.elements.searchQuery.value.trim();
  if (formInput === '') {
    emptyInput();
    return;
  }
  fetchResolved();
});

const fetchResolved = () => {
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



function alertImagesFound(image) {
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

function alertEndOfSearch() {
  Notify.failure("We're sorry, but you've reached the end of search results.");
}
const options = {
  rootMargin: '200%',
  threshold: 1.0,
};
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
       fetchResolved;
      console.log(entry);
      
      page += 1;
    }
  });
}, options);
observer.observe(document.querySelector('.scroll-guard'));
