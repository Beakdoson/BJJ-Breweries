// obj's to pull brewery list from Heroku and Api brewery
const baseURL = "https://bjj-byob.herokuapp.com";
const BASEAPI = `https://api.openbrewerydb.org/breweries?by_name=`;

// obj to get the query string into from savedTours.html


// async function to run on loading of editTour.html webpage
window.onload = async function editBreweyList() {
  // try {
  // const brewData = await fetch(urlList);
  // const brewResponse = await brewData.json();

  // function split data in
  let url_string = window.location.href.toLowerCase();
  console.log(url_string);
  // obj to break query string data into individual var's with split()
  const splitURL = url_string.split("=");
  console.log(splitURL[splitURL.length - 1]);
  // fetch data based on ID from the URL
  const fetchBasedOnID = await fetch(
    `${baseURL}/id/${splitURL[splitURL.length - 1]}`
  );
  const fetchedData = await fetchBasedOnID.json();
  console.log(fetchedData);

  // for loop to store
  const { _id, breweries, name } = fetchedData[0];
  const apiDataContainer = [];
  for (let brew of breweries) {
    let fetchDataFromAPI = await fetch(`${BASEAPI}${brew}`);
    let responseData = await fetchDataFromAPI.json();
    apiDataContainer.push(responseData);
  }
  console.log(apiDataContainer);
  // for loop to loop through fetch'ed data
  const eachApiDataContainer = [];
  for (let i = 0; i < apiDataContainer.length; i++) {
    // console.log data from length of obj array
    const eachApiData = apiDataContainer[i];
    // console.log for each index, name, street, etc
    const { name, street, state, city, website_url, phone, brewery_type } =
      eachApiData[0];
    eachApiDataContainer.push({
      name,
      street,
      state,
      city,
      website_url,
      phone,
      brewery_type,
    });
  }
  console.log(eachApiDataContainer);
  createCard(eachApiDataContainer);
  document.getElementById("brewery_tour").innerText = `${name}`;

  //Function to create each individual brewery and append to tour_body via id=${id}


  function createCard(breweries) {
    console.log(breweries);
    for (let i = 0; i < breweries.length; i++) {
      let name = breweries[i].name ? breweries[i].name : "";
      let street = breweries[i].street ? breweries[i].street : "";
      let city = breweries[i].city ? breweries[i].city : "";
      let state = breweries[i].state ? breweries[i].state : "";
      let brewery_type = breweries[i].city ? breweries[i].brewery_type : "";
      let phone = breweries[i].city ? breweries[i].phone : "";
      let website_url = breweries[i].website_url
        ? breweries[i].website_url
        : "";

      let editTourCard = document.createElement("div");
      editTourCard.setAttribute("class", "saved_tour_outer");
      editTourCard.innerHTML = `
        <div class="tour_name tour_inner">
        <h3 breweryname=${name} id="title">${name}</h3>
        </div>
        <div class="tour_body tour_inner" id="${_id}">
        <label for="street">Street</label>
        <p>${street}</p>
        <label for="city_state">City & State</label>
        <p>${city}, ${state}</p>
        <label for="phone">Phone</label>
        <p>${phone}</P>
        <label for="brewery_type">Brewery Type</label>
        <p>${brewery_type}</p>
        <label for="website">Brewery Website</label>
        <a href="${website_url}" target="_blank">${website_url}</a>
        </div>
          <div class="tour_buttons tour_inner">
            <a href="#" tourID="${_id}" bname="${name}" class="btn btn-dark" button="delete" id="delete_btn">Delete Tour</a></div>
        </div>
      </div>`;
      document.getElementById("tour_container").prepend(editTourCard);
      editTourCard.addEventListener("click", handleClick);
    }
  }

};
function handleClick(evt) {
  const event = evt.target;
  if (event.getAttribute("button") === "delete") {
    deleteBrewery(evt);
  }
}

async function deleteBrewery(evt) {
  const id = evt.target.getAttribute("tourid");
  const tourName = document.getElementById("brewery_tour").firstChild.data;
  const deleteBrewery = evt.target.getAttribute("bname");
  const deleteBreweryArr = []
  deleteBreweryArr.push(deleteBrewery)
  const deleteUrl = `https://bjj-byob.herokuapp.com/toursedit/remove/${id}`;
  console.log(id);
  let putTour = {
    name: tourName,
    breweries: deleteBreweryArr
  };
  console.log(putTour);
 await fetch(deleteUrl, {
    method: "PUT",
    body: JSON.stringify(putTour),
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    } 
})
.then((response) => {response.json()
  console.log('heeeelp')})
.then(response => { 
  location.reload()
  })
}