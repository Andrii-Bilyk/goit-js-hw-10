import SlimSelect from 'slim-select'; 
import 'slim-select/dist/slimselect.css'; 
import Notiflix from 'notiflix'; 
import { fetchBreedImgs, fetchBreeds } from './js/cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const slim = new SlimSelect(breedSelect, {
  placeholder: 'Select a breed',
});

breedSelect.addEventListener('change', OnSelectChange);


loader.classList.remove('visually-hidden');


function OnSelectChange(e) {

  const breedsId = e.target.value;

  breedSelect.classList.add('visually-hidden');
  loader.classList.remove('visually-hidden');
  errorElement.classList.add('visually-hidden');
  catInfo.classList.add('visually-hidden');

  fetchBreedImgs(breedsId)
      .then(data => {
         console.log(data);
 
      if (data.length > 0) {
        const { url } = data[0];
        const breedInfo = data[0].breeds[0];
        const { name, description, temperament } = breedInfo;

        const markup = `
        <img src="${url}" alt="${name}"/>
        <h3>${name}</h3>
        <p>Description: ${description}</p>
        <p>Temperament: ${temperament}</p>
      `;

        catInfo.innerHTML = markup;

        breedSelect.classList.remove('visually-hidden');
        loader.classList.add('visually-hidden');
        catInfo.classList.remove('visually-hidden');
      } else {
          Notiflix.Notify.failure('No images found for this breed.');

        breedSelect.classList.remove('visually-hidden');
        loader.classList.add('visually-hidden');
        errorElement.classList.add('visually-hidden');
        catInfo.classList.add('visually-hidden');
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!',
        {
          closeButton: true,
          cssAnimationStyle: 'from-top',
          timeout: 3000,
        }
      );

      breedSelect.classList.remove('visually-hidden');
      loader.classList.add('visually-hidden');
      errorElement.classList.add('visually-hidden');
      catInfo.classList.add('visually-hidden');
    });
}

fetchBreeds()
  .then(res => {
        const markup = res
      .map(el => {
        return `<option value="${el.id}">${el.name}</option>`;
      })
      .join('');

    breedSelect.innerHTML = markup;

     loader.classList.add('visually-hidden');
    breedSelect.classList.remove('visually-hidden');
  })
  .catch(error => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!',
      {
        closeButton: true,
        cssAnimationStyle: 'from-top',
        timeout: 3000,
      }
    );

    errorElement.classList.remove('visually-hidden');
    breedSelect.classList.add('visually-hidden');
  })
  .finally(() => {
        loader.classList.add('visually-hidden');
  });