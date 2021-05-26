const searchContainer = document.getElementById("list");
const searchCity = document.getElementById("city");
const searchState = document.getElementById("state");
let breweriesList = [];

searchCity.addEventListener("input", (e) => {
  const searchString = e.target.value.toLowerCase();
  let filteredBreweries = breweriesList.filter((brewery) => {
    return brewery.city.toLowerCase().includes(searchString);
  });
  displayBreweries(filteredBreweries);
});

searchState.addEventListener("input", (e) => {
  const searchString = e.target.value.toLowerCase();
  let filteredBreweries = breweriesList.filter((brewery) => {
    return brewery.state.toLowerCase().includes(searchString);
  });
  displayBreweries(filteredBreweries);
});

async function getBreweries() {
  const response = await fetch(`https://api.openbrewerydb.org/breweries`);
  breweriesList = await response.json();
  return breweriesList;
}

getBreweries().then((response) => {
  console.log(breweriesList);
});

const displayBreweries = (breweries) => {
  const htmlString = breweries.map((breweries) => {
    return `
          <li class="brewery">
              <h2>${breweries.name}</h2>
              <p>Address: ${breweries.street}</p>
              <p>Location: ${breweries.city} ${breweries.state}</p>
              <p>Website: ${breweries.website_url}</p>
          </li>
      `;
  });
  searchContainer.innerHTML = htmlString;
};
