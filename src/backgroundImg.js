const body_dom = document.querySelector("body");

function backgroundImg_set(rnum) {
  const imgSet = new Image();
  imgSet.src = `./src/img/${rnum}.jpg`;
  console.log(imgSet.src);
  imgSet.classList.add("bgImg");
  body_dom.appendChild(imgSet);
}
function randomBox() {
  const randomNum = Math.floor(Math.random() * 5 + 1);
  console.log(randomNum);
  return randomNum;
}
export function background_init() {
  const bgImgNum = randomBox();
  backgroundImg_set(bgImgNum);
}
