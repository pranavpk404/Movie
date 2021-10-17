const API = "3fd2be6f0c70a2a598f084ddfb75487c";

let url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API}&page=1`;

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Get initial movies
getMovies(url);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

function change(clicked_id) {
  url = `https://api.themoviedb.org/3/discover/movie?api_key=${API}&with_genres=${clicked_id}`;
  getMovies(url);
}
function popular() {
  url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API}&page=1`;
  getMovies(url);
}

function loadNextPage() {
  z = Math.ceil(1 + (25 - 1) * Math.random());
  url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API}&page=${z}`;
  getMovies(url);
}

// Apply the cached theme on reload
const theme = localStorage.getItem("theme");
if (theme) {
  let = bodyValue = body.classList.value;
  body.classList.replace(bodyValue, theme);
}
function myFunction() {
  let toggle = document.getElementById("toggle");
  if (toggle.checked == false) {
    body.classList.replace("theme-light", "theme-dark");
    localStorage.setItem("theme", "theme-dark");
  } else {
    body.classList.replace("theme-dark", "theme-light");
    localStorage.setItem("theme", "theme-light");
  }
}
