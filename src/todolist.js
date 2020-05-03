const todolistForm = document.querySelector(".toDolist-form");
const todolistUl = document.querySelector(".toDoList-ul");

let toDoListKEY = localStorage.getItem("userID") + "_todolist";
let todolistJSON = [];
todolistForm.addEventListener("submit", fn_submitHandler);

function fn_submitHandler(e) {
  e.preventDefault();
  let todoCount = 0;
  let arrEvent = Array.from(e.target.elements);
  if (todolistJSON != null) {
    todoCount = todolistJSON.length;
  } else {
    todolistJSON = [];
  }
  let subJson = { id: todoCount + 1, value: arrEvent[0].value };
  todolistJSON.push(subJson);
  arrEvent[0].value = "";
  fn_LSreset();
}

function fn_LSreset() {
  localStorage.removeItem(toDoListKEY);
  localStorage.setItem(toDoListKEY, JSON.stringify(todolistJSON));
  fn_todoListReset();
}

function fn_todoListReset() {
  let count = todolistUl.children.length;
  for (var i = 0; i < count; i++) {
    todolistUl.removeChild(todolistUl.firstChild);
  }
  fn_getLStoDoList();
}

function fn_getLStoDoList() {
  todolistJSON = JSON.parse(localStorage.getItem(toDoListKEY));
  if (todolistJSON != null) {
    todolistJSON.forEach((element) => {
      fn_printToDoList(element.id, element.value);
    });
  }
}

function fn_DelBtnHandler(e) {
  e.preventDefault();
  let tempArr = [];
  let todoCount = 0;
  todolistJSON.forEach((Element) => {
    if (Element.id != e.target.parentElement.id) {
      todoCount = todoCount + 1;
      let tempJson = {};
      tempJson.id = todoCount;
      tempJson.value = Element.value;
      tempArr.push(tempJson);
    }
  });
  todolistJSON = {};
  todolistJSON = tempArr;
  fn_LSreset();
}

function fn_printToDoList(id, text) {
  const addLi = document.createElement("li");
  const addBtn = document.createElement("button");
  const addSpan = document.createElement("span");
  addSpan.innerHTML = text;
  addBtn.innerHTML = "❌";
  addBtn.addEventListener("click", fn_DelBtnHandler);
  addLi.appendChild(addSpan);
  addLi.appendChild(addBtn);
  addLi.id = id;
  todolistUl.appendChild(addLi);
}

export function todolistInit() {
  fn_getLStoDoList();
}
