const baseURL = `https://bjj-byob.herokuapp.com`
const apiBase = `https://api.openbrewerydb.org/breweries?by_name=`

fetch(`${baseURL}/list`)
.then((response) => response.json())
.then((tourList) => createToursList(tourList));


function createToursList(tourList) {
    for (tours of tourList) {
        createTourCard(tours)
       console.log(tours);
    }
}

    
async function createTourCard(tours){
    const {_id, name, breweries} = tours

    
    for (brewery of breweries){
      console.log(brewery);
        fetch(`${apiBase}${brewery}`)
        .then((response) => response.json())
        .then((list) => createBrewLI(list))
    }
  
  
    let tourCard = document.createElement("div")
    tourCard.setAttribute("class", "saved_tour_outer")
    tourCard.innerHTML = `
    <div class="tour_name tour_inner"><h3 tourname=${_id} id="title">${name}</h3></div>
    <div class="tour_body tour_inner">
    <ul class="list-group list-group-flush" id="brew_list${_id}">
    </div>
      <div class="tour_buttons tour_inner">
        <a href="editTour.html?=${_id}" class="btn btn-light" tourID=${_id} button="edit" id="btn_edit">Edit Tour</a> | <a href="#" tourID=${_id} class="btn btn-dark" button="delete" id="delete_btn">Delete Tour</a></div>
    </div>
  </div>`

  function createBrewLI(li) {
   
    console.log(li);
  for (let i=0; i<li.length;i++){
    let name = li[i].name ? li[i].name : ""
    let street = li[i].street ? li[i].street : ""
    let city = li[i].city ? li[i].city : ""
    let state = li[i].state ? li[i].state : ""
    let url = li[i].website_url ? li[i].website_url : "#"

    let brewItem = document.createElement("li") 

      brewItem.setAttribute("class", "list-group-item tour_group_item")
      brewItem.innerHTML = `<a href='${url}' target='_blank'>${name} - ${street}, ${city}, ${state} </a>`
      document.getElementById(`brew_list${_id}`).appendChild(brewItem)
  }
}
  document.getElementById("tour_container").prepend(tourCard)

  tourCard.addEventListener("click", buttonHandler)

 }

 function buttonHandler(evt) {
  const event = evt.target
  if (event.getAttribute("button") === "delete") {
      deleteTour(evt)
  }
  else if (event.getAttribute("button") === "edit") {
      // editCard(evt)
  }
}

function deleteTour(evt) {
  const id = evt.target.getAttribute("tourid")
 
  const deleteURL = `${baseURL}/tours/${id}`
    fetch(deleteURL,{
        method: "DELETE"
    })
    .then(res => {
    location.reload()
    })
}