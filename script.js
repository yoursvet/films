const apiKey = '7286ebcf';

document.getElementById('movie-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const movieTitle = document.getElementById('movie-title').value;
    fetchMovieData(movieTitle);
    return false; 
});

function fetchMovieData(title) {
    const url = `https://www.omdbapi.com/?t=${title}&apikey=7286ebcf`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('траблы');
            }
            return response.json();
        })
        .then(data => {
            if (data.Response === "False") {
                throw new Error(data.Error);
            }
            displayMovieData(data);
        })
        .catch(error => {
            displayError(error.message);
        });
}

function displayMovieData(data) {
    const movieInfo = document.getElementById('movie-info');
    movieInfo.innerHTML = `
        <h2>${data.Title}</h2>
        <p><strong>Год:</strong> ${data.Year}</p>
        <p><strong>Режиссер:</strong> ${data.Director}</p>
        <p><strong>Актеры:</strong> ${data.Actors}</p>
        <p><strong>Сюжет:</strong> ${data.Plot}</p>
        <img src="${data.Poster}" alt="Постер фильма">
    `;
    document.getElementById('error-message').innerHTML = '';
}

function displayError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerHTML = `Ошибка: ${message}`;
    document.getElementById('movie-info').innerHTML = '';
}
