import axios from "axios";
// import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndPoint = "/genres";
export function getGenres() {
  return http.get(apiEndPoint);
}
