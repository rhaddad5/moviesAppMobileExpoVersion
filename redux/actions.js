export const fetchMovies = (data) => ({
  type: "ADD_MOVIES",
  payload: {
    data
  }
});

export const fetchMovieDetails = (data) => ({
  type: "ADD_MOVIE_DETAILS",
  payload: {
    data
  }
});

export const fetchFavouriteMovies = (data) => ({
  type: "ADD_FAVOURITE_MOVIES",
  payload: {
    data
  }
});

export const checkFavouriteMovie = (data) => ({
  type: "CHECK_MOVIE",
  payload: {
    data
  }
});

export const fetchUsername = (data) => ({
  type: "ADD_USERNAME",
  payload: {
    data
  }
});
