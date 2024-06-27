// Axios library
import axios from 'axios';
export const fetchImages = async (requestInput, page, limit) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '44175237-f9b9fdf7256a15d8718cda915',
      q: requestInput,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: limit,
    },
  });
  return response.data;
};
