import { BehaviorSubject } from "rxjs";
import { handleResponse } from "../_helpers";
import axios from "axios";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);
const loginURL = `${process.env.REACT_APP_HOST || ""}/accounts/login`;

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

function login(email, password) {
  // const requestOptions = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ username, password }),
  // };
  //
  // return fetch(`${process.env.REACT_APP_HOST}/accounts/login`, requestOptions)
  //   .then(handleResponse)
  //   .then((user) => {
  //     // store user details and jwt token in local storage to keep user logged in between page refreshes
  //     localStorage.setItem("currentUser", JSON.stringify(user));
  //     currentUserSubject.next(user);
  //
  //     return user;
  //   });
  return axios.post(loginURL, { email, password }).then((response) => {
    const user = response.data;
    localStorage.setItem("currentUser", JSON.stringify(user));
    currentUserSubject.next(user);
    console.log(user);
  });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
