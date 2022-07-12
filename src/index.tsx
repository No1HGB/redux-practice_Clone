import { legacy_createStore } from "redux";

interface Add {
  type: "ADD_TODO";
  text: string;
}
interface Delete {
  type: "DELETE_TODO";
  text: string;
  id: number;
}
type Action = Add | Delete;

const form = document.querySelector("form") as HTMLElement;
const input = document.querySelector("input") as HTMLInputElement;
const ul = document.querySelector("ul") as HTMLElement;

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state: any = [], action: Action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE_TODO:
      return state.filter((toDo: any) => toDo.id !== action.id);
    default:
      return state;
  }
};
const store = legacy_createStore(reducer);

const addToDo = (text: string) => {
  store.dispatch({ type: ADD_TODO, text });
};

const deleteToDo = (e: any) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch({ type: DELETE_TODO, text: "", id });
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo: any) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", deleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (e: Event) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  addToDo(toDo);
};

form.addEventListener("submit", onSubmit);
