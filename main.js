let noteForm = document.querySelector("#note-form");

noteForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let noteTitleInput = document.querySelector("#title-input");
  let titleText = noteTitleInput.value;
  let noteInput = document.querySelector("#note-text")
  let noteText = noteInput.value
  createNewNote(titleText, noteText);
});

function createNewNote(title, note){
  fetch("http://localhost:3000/notes/", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({tItem: title, nItem: note, created: moment().format("MMMM Do YYYY, h:mm:ss a")})
  })
  }
