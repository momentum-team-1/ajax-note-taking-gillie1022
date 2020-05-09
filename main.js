let noteForm = document.querySelector("#note-form");

noteForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let noteTitleInput = document.querySelector("#title-input");
  let titleText = noteTitleInput.value;
  createNewNote(titleText);
});
