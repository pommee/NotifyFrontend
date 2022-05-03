var g_rated = false;
var pg_7 = false;
var pg_11 = false;
var pg_15 = false;

var movies = null;
var data = null;
let user = 'dummy@gmail.com'
//let cookie = localStorage.getItem("cookie");
//let user = JSON.parse(cookie).value;

function fetchNotes() {
  fetch("https://notifykaffepause.herokuapp.com/api/users/" + user, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  }).then(async res => {
    if (res.status === 200) {
      data = await res.json();
      listNotes();
    } else
      snackbar("Wrong password or email, or the account does not exist")
  });
}

fetchNotes();

function listNotes() {

  document.querySelector('.movies').innerHTML = '';

  for (let j = 0; j < data.notes.length; j++) {
    displayMovieCard(data.notes[j]);
  }

  const newNoteButton = document.getElementById("myBtn");
  newNoteButton.addEventListener("click", createNote);

  const element = document.getElementById("saveChanges");
  element.addEventListener("click", setupCardHandlers);
}

function displayMovieCard(note) {

  let html = `
    <div class="movie_card" id="${note.id}">
      <div class="info_section">
       <div class="movie_header">
       <form>  
       <input type="text" class"title_area" value='${note.title}'><br>
       </form>
         <h4>${note.created}</h4>
          <br>
    </div>
    <div class="movie_desc">
    <form>
     <textarea id="body" rows="8" cols="50">
        ${note.body}
     </textarea>
    </form>
  <br>
    </div>
  </div>
  <div class="blur_back background_img"></div>
</div>
`

  document.querySelector('.movies').innerHTML += html;
}

function setupCardHandlers() {

  let cards = document.getElementsByClassName('movie_card');
  const bodys = document.getElementsByTagName('textarea');
  const titles = document.getElementsByTagName('input');
  const dates = document.getElementsByTagName('h4');

  for (let i = 0; i <= bodys.length - 1; i++) {
    let note = {
      title: titles[i].value,
      body: bodys[i].value,
      created: dates[i].textContent,
      lastChange: null
    }
    updateId = cards[i].id;
    jsonNote = JSON.stringify(note);
    console.log(jsonNote);

    fetch("https://notifykaffepause.herokuapp.com/api/notes/" + updateId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonNote
    }).then(response => {
      return response.json()
    })

  }

}


function createNote() {
  let today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd + 'T13:34:00';
  let html = `
    <div class="movie_card" id="${data.notes.length + 1}">
      <div class="info_section">
       <div class="movie_header">
       <form>  
       <input type="text" id="title" name="Title" value='Untitled'><br>

       </form>
         <h4 id="created">${today}</h4>
          <br>
    </div>
    <div class="movie_desc">
    <form>
     <textarea id="body" rows="8" cols="50">
      
     </textarea>
    </form>
  <br>
  <input type="submit" id="saveButton" value="Save">
    </div>
  </div>
  <div class="blur_back background_img"></div>
</div>
`

  document.querySelector('.movies').innerHTML += html;
  window.scrollTo(0, document.body.scrollHeight);



  //console.log(today);

  let newNote = {
    title: 'Untitled',
    body: ' ',
    created: today,
    lastChange: null
  }
  data.notes.push(newNote);
  jsonData = JSON.stringify(newNote)

  fetch("https://notifykaffepause.herokuapp.com/api/users/" + user + '/addNote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonData
  }).then(response => {
    return response.json()
  })

}




/*
function setupFilterHandlers() {
  let buttons = document.getElementsByClassName('filter_button');

  for (let button of buttons) {
    button.addEventListener('click', () => {
      button.classList.toggle('filter_button_active');
      if (button.id === 'g_rated') {
        if (!g_rated) {
          g_rated = true;
        } else {
          g_rated = false;
        }
      } else if (button.id === 'pg_7') {
        if (!pg_7) {
          pg_7 = true;
        } else {
          pg_7 = false;
        }
      } else if (button.id === 'pg_11') {
        if (!pg_11) {
          pg_11 = true;
        } else {
          pg_11 = false;
        }
      } else if (button.id === 'pg_15') {
        if (!pg_15) {
          pg_15 = true;
        } else {
          pg_15 = false;
        }
      }
      listMovies();
    });
  }
}

*/