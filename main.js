//ARRAY
var ideas = [];


//QUERY SELECTORS
var saveButton = document.querySelector('#save-button');
var ideaTitle = document.querySelector('#idea-title');
var ideaBodyText = document.querySelector('#idea-body-text');
var cardGrid = document.querySelector('#card-grid');


//EVENT LISTENERS
saveButton.addEventListener('click', saveNewIdea);



//EVENT HANDLERS & FUNCTIONS
function saveNewIdea() {
  var idea = new Idea (ideaTitle.value, ideaBodyText.value);
  ideas.push(idea);
  displayGrid();
}

function displayGrid() {
  var allIdeas = "";
  var ideaCardHTML = `<article class="idea-card">
    <header class="card-header">
      <img src="./assets/star.svg" alt="Not favorited">
      <img src="./assets/delete.svg" alt="Delete">
    </header>
    <div>
      <p>${ideas[0].title}</p>
      <p>${ideas[0].body}</p>
    </div>
    <footer class="card-footer">
      <img src="./assets/comment.svg" alt="Comment">Comment
    </footer>
  </article>`;
  allIdeas += ideaCardHTML;
  cardGrid.innerHTML = allIdeas;
}
