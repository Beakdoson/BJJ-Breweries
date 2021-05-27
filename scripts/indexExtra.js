///////////////////Logic handling for index/////////////
let currentList = [];
 //event listener for 'save wishlist button
 //<div id="submitButton">
savedList.addEventListener("submit", saveListHandler)
//</div>
//update event handler with name of card container
savedList.addEventListener("click", createCurrentList)

function saveListHandler(evt){
  let tourName = prompt("Please name your tour:")
  finalName = tourName ? tourName : "My beer tour"

  postTour(finalName, currentList)
}

function createCurrentList(evt){
  //need way to grab the brewery name..breweryname=${breweries.name}?
  
  const breweryCard = evt.target
  let breweryName = breweryCard.getAttribute("breweryname")
  if (breweryCard.getAttribute("state") === "add")
  {
  currentList.push(breweryName)
  document.getElementById("add_btn").setAttribute("class", "disabled")
  }
  else {
    breweryCard.getElementById("add_btn").setAttribute("state", "add")
    document.getElementById("add_btn").removeAttribute("class", "disabled")
  }
}

function postTour(tourName, listArray) {

  let tour = {
    name: tourName,
    breweries: listArray
  }

  const putURL = `https://bjj-byob.herokuapp.com/tours`
    fetch(putURL, {
        method: "POST",
        body: JSON.stringify(tour),
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