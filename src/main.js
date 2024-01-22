import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.image-search-form');
const searchInput = document.querySelector('.image-search-name');
const loaderContainer = document.querySelector('.loader-container');

function showLoader() {
  loaderContainer.style.display = 'block';
}
function hideLoader() {
  loaderContainer.style.display = 'none';
}

let requestParams = {
  key: '41964053-c955e63b08cf707b650cdfd9b',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

function searchImages(query) {
  requestParams.q = query;
  const searchParams = new URLSearchParams(requestParams);

  showLoader();

  fetch(`https://pixabay.com/api/?${searchParams}`)
    .then(response => {
      hideLoader();

      if (!response.ok) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
      return response.json();
    })

    .then(({ hits }) => {
      const gallery = document.querySelector('.gallery');

      if (hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
        close: true,
      });

      const galleryHtml = hits.reduce(
        (html, image) =>
          html +
          `<a class="gallery-link" href="${image.largeImageURL}">
            <img
                class="gallery-image"
                src="${image.webformatURL}"
                alt="${image.tags}"
            />
           <ul class="gallery-info-list">
              <li class="gallery-info-item">
                  <p class="gallery-info-title">Likes</p>
                  <p class="gallery-info-value">${image.likes}</p>
              </li>
              <li class="gallery-info-item">
                  <p class="gallery-info-title">Views</p>
                  <p class="gallery-info-value">${image.views}</p>
              </li>
              <li class="gallery-info-item">
                  <p class="gallery-info-title">Comments</p>
                  <p class="gallery-info-value">${image.comments}</p>
              </li>
              <li class="gallery-info-item">
                  <p class="gallery-info-title">Downloads</p>
                  <p class="gallery-info-value">${image.downloads}</p>
              </li>
            </ul>
        </a>`,
        ''
      );
      gallery.innerHTML = galleryHtml;
      lightbox.refresh();
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: error.message,
        position: 'topRight',
      });
    });
}

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const searchQuery = searchInput.value.trim();
  searchImages(searchQuery);
  searchForm.reset();
});
