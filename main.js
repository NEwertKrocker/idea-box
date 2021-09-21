//ARRAY
var ideas = [];


//QUERY SELECTORS
var saveButton = document.querySelector('#saveButton');
var ideaTitle = document.querySelector('#ideaTitle');
var ideaBodyText = document.querySelector('#ideaBodyText');
var cardGrid = document.querySelector('#cardGrid');
var favIcon = document.querySelector('#starIcon');
var filterButton = document.querySelector('#filterButton');
var searchBar = document.querySelector('#searchField');
var addCommentIcon = document.querySelector('#addComment');
var ideaContainer= document.querySelector('#ideaContainer');


//EVENT LISTENERS
saveButton.addEventListener('click', saveNewIdea);
ideaBodyText.addEventListener('keyup', readySaveButton);
ideaTitle.addEventListener('keyup', readySaveButton);
cardGrid.addEventListener('click', getIdeaID);
cardGrid.addEventListener('keyup', readySaveCommentButton);
filterButton.addEventListener('click', toggleFilter);
searchBar.addEventListener('keyup', searchIdeas);
//ideaContainer.addEventListener('keyup', readySaveCommentButton);

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
        <img src="${favImg}" alt="Favorite" id="starIcon">
        <img src="./assets/delete.svg" alt="Delete" id="deleteIcon">
      </header>
      <div class="idea-text">
        <h1>${ideas[i].title}</h1>
        <h3>${ideas[i].body}</h3>
      </div>
      <div>
        <footer class="card-footer">
          <img id="addComment" src="./assets/comment.svg" alt="Comment">Comment
        </footer>
        <div id="${i}" class="hidden">
          <input type="text" class="input comment" id="commentInput">
          <footer class="comment-footer">
            <button class= "small-comment" type="button"> Add Comment </button>
          </footer>
        </div>
      </div>
    </article>`;
    allIdeas += ideaCardHTML;
  }
  cardGrid.innerHTML = allIdeas;
};

function readySaveButton() {
  if(ideaTitle.value && ideaBodyText.value){
    saveButton.classList.add('button-ready');
    saveButton.disabled = false;
  } else{
    saveButton.disabled = true;
    saveButton.classList.remove('button-ready');
  }
}


function readySaveCommentButton() {
  var commentInputContent = event.target.value;
  var saveCommentButton = event.target.nextSibling.nextSibling.firstChild.nextSibling;
  if(commentInputContent){
    saveCommentButton.classList.add('button-ready');
    saveCommentButton.disabled = false;
  } else{
    saveCommentButton.disabled = true;
    saveCommentButton.classList.remove('button-ready');
  }
}


function getIdeaID(event){
  if(event.target.id === "deleteIcon"){
    deleteIdea();
  } else if(event.target.id === "starIcon"){
    console.log('im in the favIdea if statement');
    favIdea();
  } else if(event.target.id === "addComment"){
    showCommentForm();
  } else if(event.target.classList.contains('small-comment')){
    readySaveButton();
      //ready add comment button
      //FUNCTION
        //create a new comment object, add it to the idea card in idea.comments
        //attach the comment to the card somehow
    };
    addNewComment();
  }


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

function deleteIdea(){
  for (var i = 0; i < ideas.length; i++){
    if(ideas[i].id == event.target.parentElement.parentElement.id){
      ideas[i].deleteFromStorage();
      ideas.splice(i, 1);
    }
  }
  displayGrid();
}

window.addEventListener('load', loadSavedIdeas);

function loadSavedIdeas() {
  var loadedIdea = '';
  var retrievedIdea = '';
  for (var i = 0; i < localStorage.length; i++) {
    loadedIdea = localStorage.key(i);
    retrievedIdea = JSON.parse(localStorage.getItem(loadedIdea));
    var idea = new Idea (retrievedIdea.title, retrievedIdea.body);
    idea.id = retrievedIdea.id;
    idea.star = retrievedIdea.star;
    idea.comments = retrievedIdea.comments;
    ideas.push(idea);
  }
  displayGrid();
  console.log(ideas)
}

function toggleFilter(){
  var ideaCards = document.querySelectorAll(".idea-card");
  for (var i = 0; i < ideaCards.length; i++){
    if (ideaCards[i].classList.contains("not-faved")){
      ideaCards[i].classList.toggle("hidden");
    }
  }
  if (filterButton.innerText === "Show Starred Ideas"){
    filterButton.innerText = "Show All Ideas"
  } else {
    filterButton.innerText = "Show Starred Ideas";
  }
}

function searchIdeas(){
  var search = searchBar.value;
  var ideaCards = document.querySelectorAll(".idea-card");
  for (var i = 0; i < ideaCards.length; i++){
    if (!ideaCards[i].innerText.includes(searchBar.value)){
      ideaCards[i].classList.add("search-hidden");
    } else if (searchBar.value === ""){
      ideaCards[i].classList.remove("search-hidden");
    }
  }
}

function showCommentForm(){
  var targetCard = event.target.parentElement.parentElement.parentElement;
  for (var i = 0; i < ideas.length; i++){
    if(ideas[i].id == targetCard.id){
      var commentBar = document.getElementById(`${i}`);
      commentBar.classList.remove('hidden');
    }
  }
}

function addNewComment(){
  var targetCard = event.target.parentElement.parentElement.parentElement.parentElement;
  var newCommentText = event.target.parentElement.previousSibling.previousSibling.value;
  for (var i = 0; i < ideas.length; i++){
    if(ideas[i].id == targetCard.id){
      var comment = new Comment(newCommentText);
      ideas[i].comments.push(comment);
      ideas[i].saveToStorage();
    }
  }
}
