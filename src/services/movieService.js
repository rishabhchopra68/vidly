// import axios from "";
// import { apiUrl } from "../config.json";
import http from "../services/httpService";
// import { saveMovie } from "./fakeMovieService";

const apiEndPoint = "/movies";

function movieUrl(movieId) {
  return `${apiEndPoint}/${movieId}`;
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function getMovies() {
  return http.get(apiEndPoint);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}

export function saveMovie(movie) {
  // if movie exists
  if (movie._id) {
    const body = { ...movie };
    delete body._id; // restful api doesnt want id parameter
    return http.put(movieUrl(movie._id), body);
  }
  return http.post(apiEndPoint, movie);
}
