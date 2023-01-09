import 'reset-css';
import './css/styles.css';
import { fetchCountries } from './JS/fetchCountries';
import lodash from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
// const a = [1, 2, 3, 4];
// console.log(...a);

const refs = {
  inputEl: document.querySelector('#js-search-box'),
  countryList: document.querySelector('.country-list'),
};

refs.inputEl.addEventListener('input', lodash(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault();
  const countryName = e.target.value.trim();

  fetchCountries(countryName)
    .then(data => {
      if (data.length > 2 && data.length < 10) {
        makeMurkupCountries(data);
        return;
      } else if (data.length === 1) {
        makeMurkupCountry(data);
        return;
      } else if (data.length > 10) {
        Notiflix.Notify.failure(
          'Too many matches found. Please enter a more specific name.'
        );
      }

      refs.countryList.innerHTML = murkup;
    })
    .catch(err =>
      Notiflix.Notify.warning(`Oops, there is no country with that name`)
    );
}
function makeMurkupCountries(arr) {
  // console.log(arr);
  const murkup = arr
    .map(({ name: { official }, flags: { svg } }) => {
      return `
      <li>
        <img src="${svg}" alt="" width="100" height="50" >
         <h2>${official}</h2>
      </li>`;
    })
    .join('');
  refs.countryList.innerHTML = murkup;
}

function makeMurkupCountry(arr) {
  const murkup = arr
    .map(
      ({
        name: { official },
        capital,
        population,
        languages,
        flags: { svg },
      }) => {
        return `
          <div class="country">
           <img src="${svg}" alt="" class="country-flag">
           <h2 class="country-name">${official}</h2>
         </div>
         <ul class="country-info">
           <li>Capital: ${capital}</li>
           <li>Population: ${population}</li>
           <li>Languages: ${Object.values(languages)}</li>
         </ul>
      `;
      }
    )
    .join('');
  refs.countryList.innerHTML = murkup;
}
