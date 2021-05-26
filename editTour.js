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

// creating a server for web app to contact backend database
app.listen(3000, function () {
  console.log(`Listening on 3000`);
});

// get function to receive list of breweries

// // function to capture button clicks for edit and delete
// document.getElementById("btn_add").addEventListener("click", (addTourCard) => {
//   // prevent default action of the webpage
//   addTourCard.preventDefault();
//   // object to capture click event
//   let addBtn = addTourCard.target;

//   // console log tour added
//   console.log("Tour has been added");

//   // create p tag to append new tour added
//   const newTour = document.getElementById("new_tour");

//   // creates new p tag for card if customer adds tour
//   newTour.innerHTML += `
//   <p>Did this work?</p>
//   <button type"button">Add</button>
//   `;

//   //   document.getElementById("btn_add").appendChild(newTour);
// });
// document
//   .getElementById("btn_delete")
//   .addEventListener("click", (deleteTourCard) => {
//     // prevent the default action of webpage
//     deleteTourCard.preventDefault();
//     // capture event of the webpage
//     let deleteBtn = deleteTourCard.target();

//     // deletes new_tour p tag
//     const delTour = document.getElementById("new_tour");

//     delTour.innerHTML -= `<p>${newTour}</p>`;
//   });
