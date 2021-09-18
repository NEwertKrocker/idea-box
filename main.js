//ARRAY
var ideas = [];


//QUERY SELECTORS
var saveButton = document.querySelector('#save-button');
var ideaTitle = document.querySelector('#idea-title');
var ideaBodyText = document.querySelector('#idea-body-text');
var cardGrid = document.querySelector('#card-grid');


//EVENT LISTENERS
saveButton.addEventListener('click', saveNewIdea);
ideaBodyText.addEventListener('keyup', readySaveButton);
ideaTitle.addEventListener('keyup', readySaveButton);
cardGrid.addEventListener('click', getIdeaID);


//EVENT HANDLERS & FUNCTIONS
function saveNewIdea() {
  var idea = new Idea (ideaTitle.value, ideaBodyText.value);
  ideas.push(idea);
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
    var ideaCardHTML = `
    <article class="idea-card" id="${ideas[i].id}">
      <header class="card-header">
        <img src="./assets/star.svg" alt="Not favorited" id="star-icon">
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
    deleteIdea()
  }
}

function deleteIdea(){
  console.log(event.target.parentElement.parentElement.id)
  for (var i = 0; i < ideas.length; i++){
    if(ideas[i].id == event.target.parentElement.parentElement.id){
      console.log("in deleteIdea if");
      ideas.splice(i, 1);
    }
  }
  displayGrid();
}
