export function renderImages(images) {
  return images.hits
    .map(image => {
      return `<li class="gallery-item">
        <a class="image-link" href="${image.largeImageURL}"
          ><img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}"
        /></a>
        <div class="image-stats">
          <div class="image-stat">
            <b>Likes</b>
            <p>${image.likes}</p>
          </div>
          <div class="image-stat">
            <b>Views</b>
            <p>${image.views}</p>
          </div>
          <div class="image-stat">
            <b>Comments</b>
            <p>${image.comments}</p>
          </div>
          <div class="image-stat">
            <b>Downloads</b>
            <p>${image.downloads}</p>
          </div>
        </div>
      </li>`;
    })
    .join('');
}
