const baseURL = `https://bjj-byob.herokuapp.com/list`

const apiBase = `https://api.openbrewerydb.org/breweries/`

fetch(baseURL)
.then((response) => response.json())
.then((tourList) => createToursList(tourList));
//Fetch Breweries



function createToursList(tourList) {
    for (tours of tourList) {
        createTourCard(tours)
       console.log(tours);
    }
}

    
async function createTourCard(tours){
    const {_id, name, breweries} = tours
    let initialBreweryList = []
    for (let i = 0; i < breweries.length; i++){
        fetch(`${apiBase}${breweries[i]}`)
        .then((response) => response.json())
        .then((list) => initialBreweryList.push(list))
    }
    console.log(initialBreweryList);
   
  
    let tourCard = document.createElement("div")
    tourCard.setAttribute("class", "saved_tour_outer")
    tourCard.innerHTML = `
    <div class="tour_name"><h3 tourname=${_id} id="title">${name}</h3></div>
    <div class="tour_body">
    <ul class="list-group list-group-flush" id="brew_list">
    </div>
      <div class="tour_buttons">
        <a href="#" class="btn btn-light" tourID=${_id} id="btn_edit">Edit</a> | <a href="#" tourID=${_id} class="btn btn-dark" id="delete_btn">Delete</a></div>
    </div>
  </div>`

  for (let i=0; i<initialBreweryList.length;i++){
    let brewItem = document.createElement("li")  
      brewItem.setAttribute("class", "list-group list-group flush")
      brewItem.innerHTML = `${initialBreweryList[i].name} - ${initialBreweryList[i].street}, ${initialBreweryList[i].city}, ${initialBreweryList[i].state} -- ${initialBreweryList[i].website_url}`
      document.getElementById("brew_list").appendChild(brewItem)
} 
  document.getElementById("tour_container").prepend(tourCard)


  tourCard.addEventListener("click", buttonHandler)


        function buttonHandler(evt) {
            console.log(evt.target);
        }
    }