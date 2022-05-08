let cookie = localStorage.getItem("cookie");
let user = JSON.parse(cookie).value;

var userNotes = null; // Currently notes are locally stored in this array. Can be replaced with localStorage 
var selectedNote = null;
var filterValue = null;

async function fetchNotesFromUser() {
  fetch("http://localhost:8080/api/users/" + user, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  }).then(async res => {
    if (res.status === 200) {
      data = await res.json();
      userNotes = data.notes;
      displayNotes(); // Once the notes are fetched, display them
    } else
      snackbar("Couldn't fetch notes.")
  });
}

function displayNotes() {
  let notesToDisplay = [];
  let html = "";
  for (let i = 0; i < userNotes.length; i++) {
    if (userNotes[i].title.includes(filterValue) || filterValue === null) { // Add notes that fit the filter to notesToDisplay array
      notesToDisplay.push(userNotes[i]);
    }
  }
  for (let i = 0; i < notesToDisplay.length; i++) {
    if (i === 0) { // Set first note as selected
      html += `
      <div class="notes__list-item notes__list-item--selected" id="${notesToDisplay[i].id}">
        <div class="notes__small-title">${notesToDisplay[i].title}</div>
        <div class="notes__small-body">${notesToDisplay[i].body}</div>
        <div class="notes__small-updated">${notesToDisplay[i].lastChange}</div>
      </div>
      `
      selectedNote = notesToDisplay[i];
      populatePreviewWindow(selectedNote) // Show the first note in preview window by default
    } else {
      html += `
      <div class="notes__list-item" id="${notesToDisplay[i].id}">
        <div class="notes__small-title">${notesToDisplay[i].title}</div>
        <div class="notes__small-body">${notesToDisplay[i].body}</div>
        <div class="notes__small-updated">${notesToDisplay[i].lastChange}</div>
      </div>
      `
    }
  }
  document.querySelector(".notes__list").innerHTML = html;
  setupNoteClickFunctionalities(); // Once HTML is built, add listeners
}

function populatePreviewWindow(note) { // Displays selected note in preview window
  titleArea = document.getElementsByClassName("notes__title")
  bodyArea = document.getElementsByClassName("notes__body")
  titleArea[0].value = note.title;
  bodyArea[0].value = note.body;
}

function setupAddNoteFunctionality() { // Sets up eventlistener for add note button
  document.getElementById("addNoteButton").addEventListener('click', () => {
    let newNote = {
      title: 'Untitled',
      body: 'No body',
      created: new Date(),
      lastChange: new Date()
    }
    jsonData = JSON.stringify(newNote)
    fetch("http://localhost:8080/api/users/" + user + '/addNote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    }).then(async response => {
      if (response.status === 200) {
        let data = await response.json()
        userNotes.push(data.notes[data.notes.length - 1]);
        displayNotes();
      } else {
        snackbar("Couldn't add note")

      }
    })
  })
}

function setupNoteClickFunctionalities() { // Sets up listener that highlights and shows selected note in preview window
  notes = document.getElementsByClassName("notes__list-item");
  for (let note of notes) {
    note.addEventListener('click', () => {
      selectedNote = findNoteInArrayFromId(note.id)
      populatePreviewWindow(selectedNote);
      document.getElementsByClassName("notes__list-item--selected")[0].classList.remove("notes__list-item--selected")
      note.classList.add("notes__list-item--selected")
    });
  }
}

function setupDeleteNoteFunctionality() { // Delete button listener that deletes currently selected note after prompt
  document.getElementById("deleteNoteButton").addEventListener('click', () => {
    console.log(selectedNote)
    if (confirm("Delete note with id: " + selectedNote.id)) {
      fetch("http://localhost:8080/api/notes/" + selectedNote.id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: null
      }).then(response => {
        if (response.status === 200) {
          indexToRemove = (userNotes.findIndex(note => {
            return note.id === selectedNote.id
          }))
          userNotes.splice(indexToRemove, 1)
          displayNotes();
        } else {
          console.log()
        }
      })
    }
  })
}

function setupUpdateNoteFunctionality() { // Updates the currently selected note
  document.getElementById("saveNoteButton").addEventListener('click', () => {
    if (confirm("Do you want to update this note to the current state?")) {
      let newNote = {
        title: titleArea = document.getElementsByClassName("notes__title")[0].value,
        body: bodyArea = document.getElementsByClassName("notes__body")[0].value,
        lastChange: new Date()
      }
      jsonData = JSON.stringify(newNote)
      fetch("http://localhost:8080/api/notes/" + selectedNote.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData
      }).then(response => {
        if (response.status === 200) {
          indexToUpdate = userNotes.findIndex(note => {
            return note.id === selectedNote.id
          })
          userNotes[indexToUpdate].title = newNote.title
          userNotes[indexToUpdate].body = newNote.body
          displayNotes();
        } else {
          console.log("ouch")
        }
      })
    }
  })
}

function setupFilterFunctionality() { // Input listener for filter field that updates filter variable used in displayNotes()
  filterBox = document.getElementById("notes__filter");
  filterBox.addEventListener('input', () => {
    if (filterBox.value.length > 0) {
      filterValue = filterBox.value;
    } else {
      filterValue = null;
    }
    displayNotes();
  })
}


function findNoteInArrayFromId(id) { // Returns a note object from the array by passing id
  for (let i = 0; i < userNotes.length; i++) {
    if (userNotes[i].id == id) {
      return userNotes[i]
    }
  }
  return null;
}
// Below functions are only called on page refresh / load
fetchNotesFromUser();
setupAddNoteFunctionality();
setupUpdateNoteFunctionality();
setupDeleteNoteFunctionality();
setupFilterFunctionality();