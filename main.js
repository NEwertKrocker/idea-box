//ARRAY
var ideas = [];


//QUERY SELECTORS
var saveButton = document.querySelector('#save-button');
var ideaTitle = document.querySelector('#idea-title');
var ideaBodyText = document.querySelector('#idea-body-text');
var cardGrid = document.querySelector('#card-grid');


//EVENT LISTENERS
saveButton.addEventListener('click', saveNewIdea);
ideaTitle.addEventListener('onkeyup', readySaveButton);

//EVENT HANDLERS & FUNCTIONS
function saveNewIdea() {
  var idea = new Idea (ideaTitle.value, ideaBodyText.value);
  ideas.push(idea);
  displayGrid();
};

function displayGrid() {
  var allIdeas = "";
  for (var i = 0; i < ideas.length; i++) {
  var ideaCardHTML = `<article class="idea-card" id="${ideas[i].id}">
    <header class="card-header">
      <img src="./assets/star.svg" alt="Not favorited">
      <img src="./assets/delete.svg" alt="Delete">
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
  cardGrid.innerHTML = allIdeas;
}
};

function readySaveButton() {
  saveButton.classList.add('.button-ready')
}
