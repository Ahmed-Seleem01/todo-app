import { unorderedListElm } from './elements';

const filterActiveTodosLength = (todoArr) => todoArr.filter((todo) => !todo.isChecked).length;

const renderList = (todoListItems) => {
  let htmlContent = '';
  todoListItems.forEach((todo, index) => {
    htmlContent += `<li data-position=${index} class="section__list-item section__todo ${todo.isChecked ? 'section__todo--completed' : 'section__todo--active'}" draggable="true">
        <button class="section__check-button"></button>
        <p class="section__todo-text">${todo.todoValue}</p>
        <button class="section__delete-button"></button>
    </li>`;
  });

  //   Add the last element
  htmlContent += `<li class="section__list-item">
      <span class="section__items-left">
        <span class="section__items-num">${filterActiveTodosLength(todoListItems)}</span> items left
      </span>
      <button class="section__clear-completed">Clear Completed</button>
    </li>`;

  unorderedListElm.innerHTML = htmlContent;
};

const saveToDB = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const initiateOnStart = (todoList) => {
  renderList(todoList);
};

export const updateListOnModify = (todoList) => {
  saveToDB('storedTodo', todoList);
  renderList(todoList);
};
