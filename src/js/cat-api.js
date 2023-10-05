const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_R0pSxiUGQaRQqovb5i1Ve9atXSVL5svpipzvORQLCdTAnUcDjw79M4gg1u38bTkc';

const options = {
    headers: {
        'x-api-key': API_KEY,
    },
};

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, options)
    .then(res => {
          if (!res.ok) {
        throw new Error(res.status);
      }
           return res.json();
    });
}

export function fetchBreedImgs(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, options)
    .then(res => {
           if (!res.ok) {
        throw new Error(res.status);
      }
           return res.json();
    });
}