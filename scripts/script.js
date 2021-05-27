const searchContainer = document.getElementById("list");
const searchBrewery = document.getElementById("myForm");
let breweriesList = [];

document.getElementById("myForm").addEventListener("input", (e) => {
  const searchString = e.target.value.toLowerCase();
  filteredBreweries = breweriesList.filter((brewery) => {
    return (
      brewery.city.toLowerCase().includes(searchString) ||
      brewery.state.toLowerCase().includes(searchString)
    );
  });
});

searchBrewery.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    breweryCard(filteredBreweries);
  }
});

async function getBreweries() {
  const response = await fetch(
    `https://api.openbrewerydb.org/breweries/search?query=state&city`
  );
  breweriesList = await response.json();
  return breweriesList;
}

getBreweries().then((response) => {
  console.log(breweriesList);
});

function breweryCard(breweries) {
  let count = 10;

  for (brewery of breweries) {
    if (count > 0) {
      let tourCard = document.createElement("div");
      tourCard.setAttribute("class", "saved_tour_outer");
      tourCard.innerHTML = `
    <div class="tour_name tour_inner"><h3 breweryname=${brewery.name} id="title">${brewery.name}</h3></div>
    <div class="tour_body tour_inner">
    <p>Address: ${brewery.street}</p>
    <p>Location: ${brewery.city} ${brewery.state}</p>
    <p>Website: ${brewery.website_url}</p>
    </div>
      <div class="tour_buttons tour_inner">
        <a href="#" tourID= class="btn btn-dark" button="add" id="add_btn">add to Tour</a></div>
    </div>
  </div>`;

      const tourContainer = document.getElementById("tour_container");
      tourContainer.appendChild(tourCard);
      tourCard.addEventListener("click", createCurrentList);

      console.log(brewery);
      count--;
      console.log(count);
    }
  }
  console.log(breweries);
}
function createCurrentList(event) {}
