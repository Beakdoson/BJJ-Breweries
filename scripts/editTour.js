// obj's to pull brewery list from Heroku and Api brewery
// const baseURL = `https://bjj-byob.herokuapp.com/id/60ae65599c5ba000150f1972`;
// const apiBase = `https://api.openbrewerydb.org/breweries/`;

const baseURL = "https://bjj-byob.herokuapp.com";
const BASEAPI = `https://api.openbrewerydb.org/breweries?by_name=`;

// obj to get the query string into from savedTours.html
let urlList = new URL(
  "https://bjj-byob.herokuapp.com/id/60ae65599c5ba000150f1972"
);

// function to run on loading of editTour.html webpage
window.onload = async function editBreweyList() {
  try {
    // const brewData = await fetch(urlList);
    // const brewResponse = await brewData.json();

    // function split data in
    let url_string = window.location.href.toLowerCase();
    console.log(url_string);
    const splitURL = url_string.split("=");
    console.log(splitURL[splitURL.length - 1]);
    const fetchBasedOnID = await fetch(
      `${baseURL}/id/${splitURL[splitURL.length - 1]}`
    );
    const fetchedData = await fetchBasedOnID.json();
    console.log(fetchedData);

    const { _id, breweries, name } = fetchedData[0];
    const apiDataContainer = [];
    for (let brew of breweries) {
      let fetchDataFromAPI = await fetch(`${BASEAPI}${brew}`);
      let responseData = await fetchDataFromAPI.json();
      apiDataContainer.push(responseData);
    }
    console.log(apiDataContainer);
    // display the data
    const eachApiDataContainer = [];
    for (let i = 0; i < apiDataContainer.length; i++) {
      // console.log(apiDataContainer[i]]);
      const eachApiData = apiDataContainer[i];
      // console.log(eachApiData[0]);
      const { name, street, state, city, website_url } = eachApiData[0];
      eachApiDataContainer.push({ name, street, state, city, website_url });
    }
    console.log(eachApiDataContainer);
  } catch (err) {
    console.log("Unable to to grab tour list " + err);
  }
};

// async function editTourCard(tours) {
//   const { _id, name, breweries } = tours;
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
