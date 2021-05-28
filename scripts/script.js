const searchContainer = document.getElementById("list");
const searchBrewery = document.getElementById("myForm");
let breweriesList = [];
let currentList = [];

document.getElementById("myForm").addEventListener("input", (e) => {
  const searchString = e.target.value.toLowerCase();
  console.log(e.target.value.toLowerCase());
  filteredBreweries = breweriesList.filter((brewery) => {
    return (
      brewery.state.toLowerCase().includes(searchString) ||
      brewery.city.toLowerCase().includes(searchString)
    );
  });
});

searchBrewery.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.getElementById("tour_container").innerHTML = "";
    breweryCard(filteredBreweries);
    document.forms["myForm"].reset();
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
      if (brewery.website_url === null) {
        brewery.website_url = "";
      }
      let tourCard = document.createElement("div");
      tourCard.setAttribute("class", "saved_tour_outer");
      tourCard.innerHTML = `
    <div class="tour_name tour_inner"><h3 id="title">${brewery.name}</h3></div>
    <div class="tour_body tour_inner">
    <p>Address: ${brewery.street}</p>
    <p>Location: ${brewery.city} ${brewery.state}</p>
    <p>Website: ${brewery.website_url}</p>
    </div>
      <div class="tour_buttons tour_inner">
        <a href="#" breweryName="${brewery.name}" class="btn" button="add" state="add" id="add_btn">Add to Tour</a></div>
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
document
  .getElementById("tourCreator")
  .addEventListener("click", saveListHandler);
/////////////////
///////////////////Logic handling for index/////////////
//event listener for 'save wishlist button

function saveListHandler(evt) {
  let tourName = prompt("Please name your tour:");
  console.log(tourName);
  window.alert(
    "Your Tour has been saved. Click Saved Tours to find your Tours."
  );
  finalName = tourName ? tourName : "My beer tour";
  postTour(finalName, currentList);
}

function createCurrentList(evt) {
  //need way to grab the brewery name..breweryname=${breweries.name}?
  const breweryCard = evt.target;
  let breweryName = breweryCard.getAttribute("breweryName");
  console.log(breweryName);
  if (breweryCard.getAttribute("state") === "add") {
    currentList.push(breweryName);
    console.log(currentList);
  } else {
    // breweryCard.getElementById("add_btn").setAttribute("state", "add");
  }
}

function postTour(tourName, listArray) {
  let tour = {
    name: tourName,
    breweries: listArray,
  };

  const putURL = `https://bjj-byob.herokuapp.com/tours`;
  fetch(putURL, {
    method: "POST",
    body: JSON.stringify(tour),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      response.json();
      console.log("heeeelp");
    })
    .then((response) => {
      location.reload();
    });
}
