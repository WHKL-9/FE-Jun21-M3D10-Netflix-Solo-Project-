const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZjE4YzJkNTI2MjAwMTViNmRjOTIiLCJpYXQiOjE2MzUxNTczNzUsImV4cCI6MTYzNjM2Njk3NX0.SiQwb-5PQumcKNmJihl_dm7xX7Hb0NGM_1O9zO0m85I";
// endpoint for our API
const url = "https://striveschool-api.herokuapp.com/api/movies/";

const movieId = new URLSearchParams(location.search).get("id");

console.log(movieId);

// taking the movie ID
const endpoint = movieId ? url + movieId : url;

//deciding for put or post
const method = movieId ? "PUT" : "POST";

//changing innerHTML of the button - depending if movie ID is available
const submitButton = document.querySelector("button[type='submit']");

//loading spinner
const isLoading = (loading) => {
  if (loading) {
    document.getElementById("spinner").classList.remove("d-none");
  } else {
    document.getElementById("spinner").classList.add("d-none");
  }
};

//create or edit button - both under handle submit
const handleSubmit = async (event) => {
  // important to prevent default browser behavior - auto refresh
  event.preventDefault();

  //make loader invisible in the beginning for all situations
  isLoading(true);

  //new Object to be uploaded
  const newMovie = {
    name: document.querySelector("#movieName").value,
    description: document.querySelector("#movieDescription").value,
    category: document.querySelector("#movieCategory").value,
    imageUrl: document.querySelector("#movieUrl").value,
  };

  // console.log(newMovie) - tested: newMovie is working

  //fetch newMovie into our array

  //put and post requires different endpoint
  try {
    const response = await fetch(endpoint, {
      method: method,
      body: JSON.stringify(newMovie),
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const movieResponse = await response.json();
      if (movieId) {
        alert(`Movie with ID: ${movieResponse._id} was successfully edited`);
      } else {
        alert(`Movie with ID${movieResponse._id} was successfully created`);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading(false);
  }
};

//handle delete button
const handleDelete = async () => {
  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    if (response.ok) {
      const deletedObject = response.json();
      alert(`Event with ID ${deletedObject._id} was deleted successfully`);
      window.location.assign("./homepage.html");
    } else {
      alert(`Error: Event can't be deleted.`);
    }
  } catch (error) {}
};

//------//
window.onload = async () => {
  try {
    //to edit
    if (movieId) {
      // title - edit
      document.querySelector(".edit-or-create").innerHTML =
        "Edit Movie Details";

      //add colour to submit button
      submitButton.classList.add("btn-primary");

      //edit text in submit button - to edit
      submitButton.querySelector("span").innerText = "Edit Movie";

      //making delete button visible (only in the case of editing)
      document.querySelector(".deleteButton").classList.remove("d-none");

      //fetching existed data in Input field from API
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      const movieDetails = await response.json();

      document.getElementById("movieName").value = movieDetails.name;
      document.getElementById("movieDescription").value =
        movieDetails.description;
      document.getElementById("movieCategory").value = movieDetails.category;
      document.getElementById("movieUrl").value = movieDetails.imageUrl;
    } else {
      //to create

      // title - create
      document.querySelector(".edit-or-create").innerHTML = "Create New Movie";

      //add colour to submit button
      submitButton.classList.add("btn-success");

      //edit text in submit button - to create
      submitButton.querySelector("span").innerText = "Create Movie";
    }
  } catch (error) {
    console.log(error);
  } finally {
    //hide spinner again
    isLoading(false);
  }
};
