// obj's to pull brewery list from Heroku and Api brewery
const baseURL = "https://bjj-byob.herokuapp.com";
const BASEAPI = `https://api.openbrewerydb.org/breweries?by_name=`;

// obj to get the query string into from savedTours.html
// let urlList = new URL(
//   "https://bjj-byob.herokuapp.com/id/60ae65599c5ba000150f1972"
// );

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

  function createEditCard(eachApiDataContainer) {}

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
        <h3 tourname=${name} id="title">${name}</h3>
        </div>
        <div class="tour_body tour_inner" id="${_id}">
        <p>${street}</p>
        <p>${city}, ${state}</p>
        <p>${phone}</P>
        <p>${brewery_type}</p>
        <a href="${website_url}" target="_blank">${website_url}</a>
        </div>
          <div class="tour_buttons tour_inner">
            <a href="#" tourID=${_id} class="btn btn-dark" button="delete" id="delete_btn">Delete Tour</a></div>
        </div>
      </div>`;
      document.getElementById("tour_container").prepend(editTourCard);
      editTourCard.addEventListener("click", handleClick);
    }
  }
  // catch error and console log report
  // } catch (err) {
  //   console.log("Unable to to grab tour list " + err);
  // }
};
function handleClick() {}
// async function editTourCard(tours) {
//   const { name, street, state, city, website_url } = tours;
// }

// let editCard = document.createElement("div");
// editCard.setAttribute("class", "saved_tour_outer");
// editCard.innerHTML = `
//     <div class="tour_name"><h3 tourname=${_id} id="title">${name}</h3></div>
//     <div class="tour_body">
//     <ul class="list-group list-group-flush" id="brew_list">
//     </div>
//       <div class="tour_buttons">
//         <a href="#" class="btn btn-light" tourID=${_id} id="btn_edit">Edit</a> | <a href="#" tourID=${_id} class="btn btn-dark" id="delete_btn">Delete</a></div>
//     </div>
//   </div>`;
