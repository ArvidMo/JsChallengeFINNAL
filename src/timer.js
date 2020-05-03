const clock_h1 = document.querySelector(".clock");
export let hours = 0;
export function get_clock() {
  const now = new Date();
  const now_hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  const now_min = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const now_sec = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
  clock_h1.innerHTML = `${now_hour}:${now_min}:${now_sec}`;
  hours = now.getHours();
}
