let noteForm = document.querySelector("#note-form");
let board = document.querySelector("#board");
noteForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let noteTitleInput = document.querySelector("#title-input");
  let titleText = noteTitleInput.value;
  let noteInput = document.querySelector("#note-text");
  let noteText = noteInput.value;
  createNewNote(titleText, noteText);
});

function createNewNote(title, note) {
  fetch("http://localhost:3000/notes/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      noteTitle: title,
      noteBody: note,
      created: moment().format("MMMM Do YYYY, h:mm:ss a"),
    }),
  }).then(() => renderNotes());
}

function renderNotes() {
  fetch("http://localhost:3000/notes/", { method: "GET" }
  ).then((res) => res.json()
  ).then(function(data){
    for (let item of data){

      let card = document.createElement("div");
      card.classList.add("card")
      card.dataset.id = item.id
      let title = document.createElement("div")
      title.classList.add("title")
      title.innerHTML = `<h2>${item.noteTitle}</h2>`
      card.appendChild(title)
      let deleteButton = document.createElement("button")
      deleteButton.classList.add("delete")
      deleteButton.textContent = "Delete"
      card.appendChild(deleteButton)
      let note = document.createElement("div")
      note.classList.add("note")
      note.innerHTML = `<p>${item.noteBody}</p>`
      card.appendChild(note)
      board.appendChild(card)
    }
  })
}

renderNotes()