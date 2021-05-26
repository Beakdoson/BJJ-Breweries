// dependencies to run services
const express = require(`express`);
const cors = require("cors");
const fetch = require("node-fetch");

// obj to use express function
const app = express();
app.use(express.json());
app.use(cors());

// obj's to pull brewery list from Heroku and Api brewery
const savedListUrl = `https://bjj-byob.herokuapp.com/list`;
const apiBase = `https://api.openbrewerydb.org/breweries/`;

// fetch function to get saved list from database
fetch(savedListUrl)
  .then((response) => response.json())
  .then((savedToursList) => fetchToursList(savedToursList));

function fetchToursList(savedToursList) {
  for (tours of savedToursList) {
    createTourCard(tours);
    console.log(tours);
  }
}

// obj to get the query string into from savedTours.html
let savedListUrl = new URL("");

window.onload = function () {
  try {
    let url_string = window.location.href.toLowerCase();
    let savedListUrl = new URL(url_string);
    let _id = url.searchParams.get(`${_id}`);
    let name = url.searchParams.get(`${name}`);
    let brewers = url.searchParams.get(`${breweries}`);
    console.log(`${savedListUrl}`);
  } catch (err) {
    console.log("Unable to to grab tour list");
  }
};

async function editTourCard(tours) {
  const { _id, name, breweries } = tours;
}

let editCard = document.createElement("div");
editCard.setAttribute("class", "saved_tour_outer");
editCard.innerHTML = `
    <div class="tour_name"><h3 tourname=${_id} id="title">${name}</h3></div>
    <div class="tour_body">
    <ul class="list-group list-group-flush" id="brew_list">
    </div>
      <div class="tour_buttons">
        <a href="#" class="btn btn-light" tourID=${_id} id="btn_edit">Edit</a> | <a href="#" tourID=${_id} class="btn btn-dark" id="delete_btn">Delete</a></div>
    </div>
  </div>`;
