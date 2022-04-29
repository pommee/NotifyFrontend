var g_rated = false;
var pg_7 = false;
var pg_11 = false;
var pg_15 = false;

var movies = null;
var data = null;
function fetchNotes() {
  fetch("https://notifykaffepause.herokuapp.com/api/users/", {
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
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].notes.length; j++) {
      console.log(data[i].notes[j]);
      displayMovieCard(data[i].notes[j]);
    }
  }
  setupCardHandlers();
}

function displayMovieCard(note) {

  let html = `
    <div class="movie_card" id="${note.id}">
      <div class="info_section">
       <div class="movie_header">
         <h1 id="title">${note.title}</h1>
         <h4>${note.created}, ${note.changed}</h4>
          <br>
    </div>
    <div class="movie_desc">
    <form>
     <textarea id="body" rows="8" cols="50">
        ${note.body}
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
}

function setupCardHandlers() {

  let cards = document.getElementsByClassName('movie_card');
  for (let card of cards) {
    card.addEventListener('dblclick', () => {
      // Öppna movieInfo med hjälp av movieId variablen nedan
      movieId = card.id;
      let text = document.getElementById("body").value;
      let title = document.getElementById("title").innerHTML;
      console.log(text);
      console.log(title);
    });
  }
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

 fetch("https://notifykaffepause.herokuapp.com/api/notes/" + movieId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: movieId,
          title:
        })
      }).then(response => {
        return response.json()
      }).then(data =>
        // this is the data we get after putting our data,
        console.log(data)
      );

*/