const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjE4YzJkNTI2MjAwMTViNmRjOTIiLCJpYXQiOjE2MzUxNTczNzUsImV4cCI6MTYzNjM2Njk3NX0.SiQwb-5PQumcKNmJihl_dm7xX7Hb0NGM_1O9zO0m85I";
//Sci-fi movies categories
const url = "https://striveschool-api.herokuapp.com/api/movies/";

// loader/spinner
const isLoading = (loading) => {
  if (loading) {
    document.getElementById("loader").classList.remove("d-none");
  } else {
    document.getElementById("loader").classList.add("d-none");
  }
};

//function to get movie categories
const getAllMovieCategories = async () => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const allCategories = await response.json();

    return allCategories;
  } catch (error) {}
};

const movieCategories = [];
// function to display movie categories
const displayMovieCategories = (categories) => {
  //target all movie container

  const getAllMoviesContainer = document.querySelector(".allMoviesContainer");

  // create categories dynamically  - fetch from movie

  categories.forEach((category) => {
    getAllMoviesContainer.innerHTML += `<h6 class="text-white ml-5">${category}</h6>
        <div class="row ${category} ml-5 mb-3">
           
        </div>`;

    movieCategories.push(category);
  });
};

//function to fetch movies from API
const getAllMovies = () => {
  movieCategories.forEach(async (movie) => {
    try {
      const response = await fetch(url + movie, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (response.ok) {
        const allMovies = await response.json();
        console.log(allMovies);
        displayMoviesInCategories(allMovies);
      }
    } catch (error) {}
  });
};

//adding movies in their respective categories
// fetch from their respective categories --- movies/category
const displayMoviesInCategories = (movies) => {
  //target the categories the movies belong to || pre-added the classes in the step above
  const movieContainer = document.querySelector(`.${movies[0].category}`);

  movies.forEach((movie) => {
    movieContainer.innerHTML += `
<a href="./backoffice.html?id=${movie._id}" class="movieLink card col col-sm-6 col-md-4 col-lg-4 p-1 mr-3 movieCard">
        <img class="card-img-top movie-image w-100" src="${movie.imageUrl}" alt="movie image">
        <div class="card-body pt-1 p-0">
            <p class="card-title text-center movieLink">${movie.name}</p>          
        </div>

</a>  `;
  });
};

//fetch available movies from our API
window.onload = async () => {
  try {
    //to show the spinner when fetching from API
    isLoading(true);

    const allMovieCategories = await getAllMovieCategories();

    displayMovieCategories(allMovieCategories);

    getAllMovies(); //get and display in each fetch
  } catch (error) {
    console.log(error);
  } finally {
    //to hide the spinner
    isLoading(false);
  }
};
