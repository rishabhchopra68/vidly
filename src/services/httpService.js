import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";
// import auth from "./authService";
// called everytime we use axios even for success which is the first prop

// setting header on all types of http requests

axios.defaults.baseURL = process.env.REACT_APP_API_URL; // this will change according to env

axios.interceptors.response.use(
  (success) => {
    console.log("Hurray !!!");
    return success;
  },
  (error) => {
    // handle for unexpected errors here

    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      logger.log(error);
      toast("An unexpected error occured ");
    }
    return Promise.reject(error); // to send control to catch block
  }
);

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
