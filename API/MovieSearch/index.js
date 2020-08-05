import axios from "axios";
import {fetchMovies, fetchMovieDetails} from "../../redux/actions";

export const moviesListSearch = (query, dispatch) => {
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=7ea46f482f53526386b509ee7fe0fe02&query=${query}&language=en-US`)
  .then((res) => {
    dispatch(fetchMovies(res.data.results)) ;
  })
  .catch((e) => console.log("erreur get movies:", e))
};

export const movieDetailsSearch = (id, dispatch) => {
  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=7ea46f482f53526386b509ee7fe0fe02&language=en-US`)
  .then((res) => {
    dispatch(fetchMovieDetails(res.data));
  })
  .catch((e) => console.log("erreur get movie:", e))
};
