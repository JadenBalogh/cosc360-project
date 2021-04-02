import { BehaviorSubject } from "rxjs";
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
