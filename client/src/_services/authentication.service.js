import { BehaviorSubject } from "rxjs";
import axios from "axios";
import {authHeader} from "../_helpers";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);
const loginURL = `${process.env.REACT_APP_HOST || ""}/accounts/login`;
const updatedURL = `${process.env.REACT_APP_HOST || ""}/accounts/updated-user`;

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

export function updateAuthenticatedUserData(userId) {
  axios
    .get(updatedURL, {
      id: userId,
      headers: authHeader(),
    })
    .then((response) => {
      const user = response.data;
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUserSubject.next(user);
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function login(email, password) {
  return axios
    .post(loginURL, { email, password })
    .then((response) => {
      const user = response.data;
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUserSubject.next(user);
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
