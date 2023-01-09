// refs.inputEl.addEventListener('input', onInput);

// refs.countryList.insertAdjacentHTML('beforeend', createMarkup());

// function onInput(e) {
//   e.preventDefault();

//   const name = e.currentTarget.value;

//   fetchCountries(name);
// }
fetchCountries('peru');
// name, capital, population, flags, languages
function createMarkup(arr) {
  // return arr.map(({ name, population }) => {
  //   return ` <li>
  //               <svg href="${flags}"></svg>
  //                <h2>${name}</h2>
  //                <h2>${population}</h2>
  //           </li>`;
  // });
  console.log(arr);
}
export { createMarkup };
