import axios from "axios";
import {fetchFavouriteMovies, fetchFavouriteMovie} from "../../redux/actions";
import {getAccessToken} from "../SessionInfo";

export const saveFavouriteMovie = async (title, releaseDate, id, overview, imagePath) => {
  const token = await getAccessToken();
  let headers = {"Authorization": `Bearer ${token}`, "Access-Control-Allow-Origin": "*"};
  let alreadyFav = false;
  axios.get("https://movies-rest-api-web.herokuapp.com/movies", {headers: headers})
  .then((res) => {
    res.data.forEach((movie) => {
      if(movie.tmdbId === id) {
        alreadyFav = true;
      }
    });
    if(alreadyFav) {
      console.log("Movie already in favourites");
    } else {
      axios.post("https://movies-rest-api-web.herokuapp.com/movies", {title: title, releaseDate: releaseDate, tmdbId: id, overview: overview, imagePath: imagePath}, {headers: headers})
      .then((res) => console.log("REPONSE POST", res))
      .catch((e) => console.log("ERREUR POST", e))
    }
  })
  .catch((e) => console.log("ERREUR GET FAV", e))
};

export const destroyFavouriteMovie = (id) => {
  let headers = {"Access-Control-Allow-Origin": "*"};
  axios.delete(`https://movies-rest-api-web.herokuapp.com/movies/${id}`, {headers: headers})
  .then((res) => console.log("REPONSE DELETE", res))
  .catch((e) => console.log("ERREUR DELETE", e))
};

export const getFavouriteMovies = async (dispatch) => {
  const token = await getAccessToken();
  let headers = {"Authorization": `Bearer ${token}`, "Access-Control-Allow-Origin": "*"};
  axios.get("https://movies-rest-api-web.herokuapp.com/movies", {headers: headers})
  .then((res) => {
    // console.log("RES DATA", res.data)
    dispatch(fetchFavouriteMovies(res.data))
  })
  .catch((e) => console.log("ERREUR GET FAV", e))
};

