const gallery = document.querySelector('.gallery');

export const renderGallery = image => {
  const markup = image
    .map(image => {
      const {
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `
       <a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>: ${likes}</p>
              <p class="info-item"><b>Views</b>: ${views}</p>
              <p class="info-item"><b>Comments</b>: ${comments}</p>
              <p class="info-item"><b>Downloads</b>: ${downloads}</p>
            </div>
          </div>
        </a>
        `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

// export const renderGallery = image => {
//   return image.map(
//       ({ webformatURL , largeImageURL , tags , likes , views ,comments,downloads   }) =>
//         `<div class="photo-card">
//   <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes:${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views:${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments:${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads:${downloads}</b>
//     </p>
//   </div>
// </div>`
//     )
//         .join('');
//       gallery.insertAdjacentHTML('beforeend', renderGallery);
// };
