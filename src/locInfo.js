const geoLoc = document.querySelector(".geo_loc-h3");
const locWeather = document.querySelector(".loc_weather-h3");

const API_KEY = "4591ecdae64388f85ded15aa504452c7";
const LOCATION_LSKEY = "location";

export function fn_locLogout() {
  localStorage.removeItem(LOCATION_LSKEY);
}
function fn_geoLocation(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.dir(json);
      geoLoc.innerHTML = json.name;
      locWeather.innerHTML = json.weather[0].main;
    });
}

function fn_geoSucCallback(e) {
  console.dir(e);
  console.dir(e.coords.latitude);
  console.log(e.coords.longitude);
  let loc = {};
  loc = { lat: e.coords.latitude, lon: e.coords.longitude };
  localStorage.setItem(LOCATION_LSKEY, JSON.stringify(loc));
  fn_geoLocation(e.coords.latitude, e.coords.longitude);
}

function fn_geoErrCallback() {
  alert("지역정보를 가져오지 못했습니다.");
}

function fn_navigationCheck() {
  navigator.geolocation.getCurrentPosition(fn_geoSucCallback, fn_geoErrCallback);
}

export function loc_init() {
  let loc_LS = JSON.parse(localStorage.getItem(LOCATION_LSKEY));
  if (loc_LS === null || loc_LS === "") {
    console.log("chk");
    fn_navigationCheck();
  } else {
    fn_geoLocation(loc_LS.lat, loc_LS.lon);
  }
}
