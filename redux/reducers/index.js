import {combineReducers} from "redux";
import {moviesListReducer} from "./moviesListReducer";
import {userReducer} from "./userReducer";
import {movieFavReducer} from "./movieFavReducer";

export default combineReducers({moviesListReducer, userReducer, movieFavReducer});
