
const inputBox = document.getElementById("new-movie");
const listContainer = document.getElementById("list");

let currentMovieIndex = null;

function getMovies() {
    return JSON.parse(localStorage.getItem("movies")) || [];
}

function saveMovies(movies) {
    localStorage.setItem("movies", JSON.stringify(movies));
}

function renderMovies() {
    const movies = getMovies();
    listContainer.innerHTML = "";

    movies.forEach((movie) => {
        const movieName = document.createElement("div");
        movieName.classList.add('movie-name')
        movieName.textContent = movie.name;
        if (movie.checked) movieName.classList.add("check");

        const span = document.createElement("button");
        span.innerHTML = "\u00d7";
        movieName.appendChild(span);

        listContainer.appendChild(movieName);
    });
}

function newMovie() {
    const name = inputBox.value.trim();
    if (name === "") {
        alert("Enter a movie name");
        return;
    }

    const movies = getMovies();
    movies.push({ name, checked: false });
    saveMovies(movies);
    renderMovies();
    inputBox.value = "";
}

listContainer.addEventListener("click", function (e) {
    const li = e.target.closest("div");
    if (!li) return;

    const index = Array.from(listContainer.children).indexOf(li);
    currentMovieIndex = index;

    const movies = getMovies();
    const movie = movies[index];

    if (e.target.tagName === "BUTTON") {
        movies.splice(index, 1);
        saveMovies(movies);
        renderMovies();
        return;
    }

    // Show watched/unwatched modal
    const message = movie.checked
        ? "Do you want to uncheck this movie?"
        : "Have you watched this movie?";
    document.getElementById("statusMessage").innerText = message;
    document.getElementById("statusModal").style.display = "flex";
});

document.getElementById("statusYes").onclick = function () {
    const movies = getMovies();
    if (currentMovieIndex !== null) {
        movies[currentMovieIndex].checked = !movies[currentMovieIndex].checked;
        saveMovies(movies);
        renderMovies();
    }
    closeModal();
};

document.getElementById("statusNo").onclick = function () {
    closeModal();
};

function closeModal() {
    document.getElementById("statusModal").style.display = "none";
    currentMovieIndex = null;
}

// Delete All Modal Functions
function openDeleteModal() {
    document.getElementById("deleteModal").style.display = "flex";
}

function closeDeleteModal() {
    document.getElementById("deleteModal").style.display = "none";
}

function confirmDeleteAll() {
    const movies = getMovies();
    localStorage.setItem("deletedMovies", JSON.stringify(movies)); // Backup
    localStorage.removeItem("movies");
    renderMovies();
    closeDeleteModal();
}

renderMovies();

function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');

    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

const darkTheme = {
  "--bg": "#121212",
  "--text": "#f5f5f5",
  "--accent": "#ff4c4c",
  "--secondary": "#1e1e1e",
  "--muted": "#444444"
};

const lightTheme = {
  "--bg": "#f9f9f9",
  "--text": "#1a1a1a",
  "--accent": "#ff4c4c",
  "--secondary": "#ffffff",
  "--muted": "#dddddd"
};

function applyTheme(theme) {
  const root = document.documentElement;
  for (let key in theme) {
    root.style.setProperty(key, theme[key]);
  }
}
function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || "dark";
  if (currentTheme === "dark") {
    applyTheme(lightTheme);
    localStorage.setItem("theme", "light");
  } else {
    applyTheme(darkTheme);
    localStorage.setItem("theme", "dark");
  }
}
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme === "dark" ? darkTheme : lightTheme);
});
