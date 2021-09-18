class Idea {
  constructor(title, body){
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }
  saveToStorage(){
    var stringifiedIdea = JSON.stringify(this);
    window.localStorage.setItem(this.id, stringifiedIdea)
  }

  deleteFromStorage(){
    window.localStorage.removeItem(this.id)
  }

  updateIdea(){
    if (!this.star) {
      this.star = true;
    } else {
      this.star = false;
    }
  }
}
