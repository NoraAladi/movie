import { combineReducers } from "redux";
import favoritesReducer from "./favoritesReducer";
import singleMovieReducer from "./singleMovieReducer";
import multipleMoviesReducer from "./multipleMoviesReducer";
 

export default combineReducers({
  favorites: favoritesReducer,
  movie: singleMovieReducer,
  movies: multipleMoviesReducer,
});
