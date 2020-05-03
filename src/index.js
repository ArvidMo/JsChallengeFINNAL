import { background_init } from "./backgroundImg.js";
import { get_clock, hours } from "./timer.js";
import { loc_init, fn_locLogout } from "./locInfo.js";
import { todolistInit } from "./todolist.js";

const locInfo = document.querySelector(".loc_info-div");
const userLogoutDiv = document.querySelector(".logout-div");
const userLogout = document.querySelector(".logout-button");
const initId = document.querySelector(".init_id-div");
const todolistDiv = document.querySelector(".todolist_div");
const userGreeting = document.querySelector(".user_greeting-h2");

const userKey = "userID";

function fn_logoutEvenvHandler(e) {
  e.preventDefault();
  localStorage.removeItem(userKey);
  fn_locLogout();
  location.reload();
  init();
}
function fn_idEventHandler(e) {
  e.preventDefault();
  localStorage.setItem(userKey, e.target.firstElementChild.value);
  e.target.firstElementChild.value = "";
  location.reload();
  init();
}

function init() {
  background_init();
  setInterval(function () {
    get_clock();
  }, 1000);
  const lsUser = localStorage.getItem(userKey);
  if (lsUser === null || lsUser === "") {
    locInfo.classList.add("hidden");
    userLogoutDiv.classList.add("hidden");
    todolistDiv.classList.add("hidden");
    initId.classList.remove("hidden");
    initId.addEventListener("submit", fn_idEventHandler);
  } else {
    locInfo.classList.remove("hidden");
    userLogoutDiv.classList.remove("hidden");
    todolistDiv.classList.remove("hidden");
    initId.classList.add("hidden");
    loc_init();
    todolistInit();
    if (hours < 12) {
      userGreeting.innerHTML = "GoodMoning," + lsUser;
    } else if (hours < 18) {
      userGreeting.innerHTML = "GoodAfternoon," + lsUser;
    } else {
      userGreeting.innerHTML = "GoodEvening," + lsUser;
    }
    userLogout.addEventListener("click", fn_logoutEvenvHandler);
  }
}

init();
