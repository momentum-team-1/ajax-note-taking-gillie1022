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
  fetch("http://localhost:3000/notes/", { method: "GET" })
    .then((res) => res.json())
    .then(function (data) {
      for (let item of data) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = item.id;
        let title = document.createElement("div");
        title.classList.add("title");
        title.id = "title" + card.dataset.id;
        title.innerHTML = `<h2>${item.noteTitle}</h2>`;
        card.appendChild(title);
        let note = document.createElement("div");
        note.classList.add("note");
        note.innerHTML = `<p>${item.noteBody}</p>`;
        card.appendChild(note);
        board.appendChild(card);
        let deleteButton = document.createElement("span");
        deleteButton.id = "delete";
        deleteButton.classList.add("delete");
        deleteButton.textContent = "Delete";
        card.appendChild(deleteButton);
        let editButton = document.createElement("span");
        editButton.id = "edit";
        editButton.classList.add("edit");
        editButton.textContent = "Edit";
        card.appendChild(editButton);
        
      }
    });
}

board.addEventListener("click", function (event) {
  let targetEl = event.target;
  if (targetEl.matches("#delete")) {
    console.log("DELETE");
    deleteCard(targetEl.parentElement.dataset.id);
  }
});

function deleteCard(cardId) {
  let cardToDelete = document.querySelector(`div[data-id="${cardId}]"`);
  fetch(`http://localhost:3000/notes/${cardId}`, { method: "DELETE" }).then(
    function () {
      document.querySelector("#board").removeChild(cardToDelete);
    }
  );
}
board.addEventListener("click", function(event){
  let targetEl = event.target;
  if (targetEl.matches("#edit")){
    console.log("EDIT");
    editCard()
  }
})


function editCard(){
 let card = document.querySelector(".card")
 let title = document.querySelector(".title")
 let editTitleBox = document.createElement("input")
 editTitleBox.setAttribute("placeholder", title.firstChild.textContent)
 title.replaceChild(editTitleBox, title.firstChild)
}

renderNotes();
