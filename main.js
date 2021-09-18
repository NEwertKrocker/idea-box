//ARRAY
var ideas = [];


//QUERY SELECTORS
var saveButton = document.querySelector('#save-button');
var ideaTitle = document.querySelector('#idea-title');
var ideaBodyText = document.querySelector('#idea-body-text');
var cardGrid = document.querySelector('#card-grid');
var favIcon = document.querySelector('#star-icon');
var filterButton = document.querySelector('#filter-button');


//EVENT LISTENERS
saveButton.addEventListener('click', saveNewIdea);
ideaBodyText.addEventListener('keyup', readySaveButton);
ideaTitle.addEventListener('keyup', readySaveButton);
cardGrid.addEventListener('click', getIdeaID);
filterButton.addEventListener('click', toggleFilter);


//EVENT HANDLERS & FUNCTIONS
function saveNewIdea() {
  var idea = new Idea (ideaTitle.value, ideaBodyText.value);
  ideas.push(idea);
  idea.saveToStorage();
  displayGrid();
  clearFields();
};

function clearFields(){
  ideaTitle.value = "";
  ideaBodyText.value = "";
  saveButton.classList.remove('button-ready');
  saveButton.disabled = true;
}

function displayGrid() {
  var allIdeas = "";
  for (var i = 0; i < ideas.length; i++) {
    var favImg = '';
    var favStatus = '';
    if(ideas[i].star){
      favImg = './assets/star-active.svg';
      favStatus = 'faved';
    } else {
      favImg = './assets/star.svg';
      favStatus = 'not-faved';
    }
    var ideaCardHTML = `
    <article class="idea-card ${favStatus}" id="${ideas[i].id}">
      <header class="card-header">
        <img src="${favImg}" alt="Favorite" id="star-icon">
        <img src="./assets/delete.svg" alt="Delete" id="delete-icon">
      </header>
      <div>
        <p>${ideas[i].title}</p>
        <p>${ideas[i].body}</p>
      </div>
      <footer class="card-footer">
        <img src="./assets/comment.svg" alt="Comment">Comment
      </footer>
    </article>`;
    allIdeas += ideaCardHTML;
  }
  cardGrid.innerHTML = allIdeas;
};

function readySaveButton() {
  // console.log("I'm in the readySaveButton func");
  if(ideaTitle.value && ideaBodyText.value){
    // console.log("I'm in the readySaveButton if statement");
    saveButton.classList.add('button-ready');
    saveButton.disabled = false;
  }
}

function getIdeaID(event){
  if(event.target.id === "delete-icon"){
    deleteIdea();
  } else if(event.target.id === "star-icon"){
    favIdea();
  }
}

//order of favorite array starred cards matter

function favIdea(){
  var targetCard = event.target.parentElement.parentElement;
  for (var i = 0; i < ideas.length; i++){
    if(ideas[i].id == targetCard.id){
      ideas[i].updateIdea();
      ideas[i].saveToStorage();
    }
  }
  displayGrid();
}

    //querySelectorVariableForStarIMG.src = ./assets/star-active.svg;
    //querySelectorVariableForStarIMG.src = ./assets/star.svg;


function deleteIdea(){
  for (var i = 0; i < ideas.length; i++){
    if(ideas[i].id == event.target.parentElement.parentElement.id){
      ideas[i].deleteFromStorage();
      ideas.splice(i, 1);
    }
  }
  displayGrid();
}

// window.addEventListener('load', loadedTracker);
//
// function loadedTracker(){
//   alert("The page has loaded.")
// }
window.addEventListener('load', loadSavedIdeas);
window.addEventListener('load', displayGrid);

function loadSavedIdeas() {
  var loadedIdea = '';
  var retrievedIdea = '';
  for (var i = 0; i < localStorage.length; i++) {
    loadedIdea = localStorage.key(i);
    retrievedIdea = JSON.parse(localStorage.getItem(loadedIdea));
    var idea = new Idea (retrievedIdea.title, retrievedIdea.body);
    idea.id = retrievedIdea.id;
    idea.star = retrievedIdea.star;
    ideas.push(idea);
  }
  console.log(ideas)
}

function toggleFilter(){
  var ideaCards = document.querySelectorAll(".idea-card");
  for (var i = 0; i < ideaCards.length; i++){
    if (ideaCards[i].classList.contains("not-faved")){
      ideaCards[i].classList.toggle("hidden");
    }
  }



}
