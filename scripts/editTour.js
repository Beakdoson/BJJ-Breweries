// function to capture button clicks for edit and delete

document.getElementById("btn_add").addEventListener("click", (addTourCard) => {
  // prevent default action of the webpage
  addTourCard.preventDefault();
  // object to capture click event
  let addBtn = addTourCard.target;

  // console log tour added
  console.log("Tour has been added");

  // create p tag to append new tour added
  const newTour = document.getElementById("new_tour");

  // creates new p tag for card if customer adds tour
  newTour.innerHTML += `
  <p>Did this work?</p>
  <button type"button">Add</button>
  `;

  //   document.getElementById("btn_add").appendChild(newTour);
});
document
  .getElementById("btn_delete")
  .addEventListener("click", (deleteTourCard) => {
    // prevent the default action of webpage
    deleteTourCard.preventDefault();
    // capture event of the webpage
    let deleteBtn = deleteTourCard.target();

    // deletes new_tour p tag
    const delTour = document.getElementById("new_tour");

    delTour.innerHTML -= `<p>${newTour}</p>`;
  });
