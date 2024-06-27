// custom import
import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import errorSvg from './img/errorSvg.svg';
import warningSvg from './img/warningSvg.svg';
import informSvg from './img/informSvg.svg';
// SimpleLightBox library
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// iziToast library
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchFormElem = document.querySelector('.search-form');
const searchInputElem = document.querySelector('.search-input');
const standBySpanElem = document.querySelector('.loader');
const galleryElem = document.querySelector('.gallery');
const loadBtnElem = document.querySelector('.load-btn');
let gallery = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
const limit = 15;
let page = 1;
let totalPages = 0;
let requestValue = '';

searchFormElem.addEventListener('submit', async event => {
  event.preventDefault();
  if (!searchInputElem.value.trim()) {
    searchFormElem.reset();
    return;
  }
  try {
    page = 1;
    requestValue = '';
    loadBtnElem.classList.add('visually-hidden');
    galleryElem.innerHTML = '';
    standBySpanElem.classList.remove('visually-hidden');
    const fetchData = await fetchImages(
      searchInputElem.value.trim(),
      page,
      limit
    );
    if (!fetchData.total) {
      iziToast.error({
        iconUrl: errorSvg,
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      standBySpanElem.classList.add('visually-hidden');
      return;
    }
    standBySpanElem.classList.add('visually-hidden');
    galleryElem.insertAdjacentHTML('beforeend', renderImages(fetchData));
    gallery.refresh();
    totalPages = Math.ceil(fetchData.totalHits / limit);
    requestValue = searchInputElem.value.trim();
    if (page < totalPages) {
      loadBtnElem.classList.remove('visually-hidden');
    }
  } catch (error) {
    standBySpanElem.classList.add('visually-hidden');
    iziToast.warning({
      iconUrl: warningSvg,
      position: 'topRight',
      message: `${error}`,
    });
  }
  searchFormElem.reset();
});

loadBtnElem.addEventListener('click', async event => {
  page += 1;
  if (page === totalPages) {
    iziToast.info({
      iconUrl: informSvg,
      position: 'topRight',
      backgroundColor: '#09f',
      message: "We're sorry, but you've reached the end of search results.",
    });
    standBySpanElem.classList.add('visually-hidden');
    loadBtnElem.classList.add('visually-hidden');
  }
  try {
    standBySpanElem.classList.remove('visually-hidden');
    const fetchData = await fetchImages(requestValue, page, limit);
    standBySpanElem.classList.add('visually-hidden');
    galleryElem.insertAdjacentHTML('beforeend', renderImages(fetchData));
    gallery.refresh();
    window.scrollBy({
      top: galleryElem.firstChild.getBoundingClientRect().height * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    standBySpanElem.classList.add('visually-hidden');
    iziToast.warning({
      iconUrl: warningSvg,
      position: 'topRight',
      message: `${error}`,
    });
  }
});
