const apiUrl = 'https://www.omdbapi.com/'; // OMDB API base URL

async function searchMovie() {
    const movieInput = document.getElementById('movieInput').value.trim();
    const movieDetails = document.getElementById('movieDetails');
    
    // Clear previous results
    movieDetails.innerHTML = '';

    if (!movieInput) {
        movieDetails.innerHTML = '<p>Please enter a movie title.</p>';
        return;
    }

    try {
        // Make a fetch request to the OMDB API using the user's input
        const response = await fetch(`${apiUrl}?t=${encodeURIComponent(movieInput)}&apikey=${apiKey}`);
        const data = await response.json();

        // Check if the movie was found in the API response
        if (data.Response === "True") {
            displayMovie(data);
        } else {
            movieDetails.innerHTML = '<p>Movie not found. Please try again.</p>';
        }
    } catch (error) {
        console.error(error);
        movieDetails.innerHTML = `<p>Error fetching movie data. Please try again later.</p>`;
    }
}

function displayMovie(movie) {
    const movieDetails = document.getElementById('movieDetails');
    
    movieDetails.innerHTML = `
        <div class="movie-card clearfix">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200'}" alt="${movie.Title}">
            <div class="movie-info">
                <h2>${movie.Title}</h2>
                <p><strong>Year:</strong> ${movie.Year}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Plot:</strong> ${movie.Plot}</p>
                <p><strong>Actors:</strong> ${movie.Actors}</p>
                <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
            </div>
        </div>
    `;
}
