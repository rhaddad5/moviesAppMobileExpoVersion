import axios from "axios";
import {storeAccessToken, storeUsername} from "../SessionInfo";

export const login = (email, password) => {
  const headers = {"Access-Control-Allow-Origin": "*"};
  return axios.post("https://movies-rest-api-web.herokuapp.com/users/login", {email: email, password: password}, {headers: headers})
  .then((res) => {
    storeAccessToken(res.data.accessToken);
    console.log("Access token stored", res.data.accessToken);
    storeUsername(res.data.username);
    console.log("Username stored", res.data.username);
    console.log("login done")
    return res;
  })
  .catch((e) => {
    console.log("ERREUR LOGIN POST", e)
    return e.response;
  })
};
