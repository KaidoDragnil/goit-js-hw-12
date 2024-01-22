import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const searchForm = document.querySelector('.image-search-form');
const searchInput = document.querySelector('.image-search-name');
const loaderContainer = document.querySelector('.loader-container');
const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector('.more-button');

function showLoader() {
  loaderContainer.style.display = 'block';
}

function hideLoader() {
  loaderContainer.style.display = 'none';
}

let currentPage = 1;
const perPage = 40;
let searchQ = '';

async function searchImages(query, currentPage) {
  searchQ = query;
  const requestParams = {
    key: '41964053-c955e63b08cf707b650cdfd9b',
    q: searchQ,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: perPage,
  };
  const searchParams = new URLSearchParams(requestParams);

  showLoader();
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?${searchParams}`
    );
    hideLoader();
    const lightbox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
      captionsData: 'alt',
      close: true,
    });
    lightbox.refresh();
    const { hits, totalHits } = response.data;
    if (currentPage === 1) {
      gallery.innerHTML = '';
    }

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
    gallery.insertAdjacentHTML('beforeend', galleryHtml);
    lightbox.refresh();
    if (totalHits <= currentPage * perPage) {
      moreBtn.style.display = 'none';
      iziToast.error({
        title: 'Error',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      moreBtn.style.display = 'block';
      const linkImage = document.querySelector('.gallery-link');
      const scrollImageHight = linkImage.getBoundingClientRect().height;
      window.scrollBy({
        top: scrollImageHight * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topRight',
    });
  }
}

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const query = searchInput.value.trim();
  currentPage = 1;
  searchImages(query, currentPage);
  searchForm.reset();
});
moreBtn.addEventListener('click', () => {
  currentPage += 1;
  searchImages(searchQ, currentPage);
});
