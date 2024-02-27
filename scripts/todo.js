import { unorderedListElm } from './elements';

let todoList = [];

const chooseUpdatedButtons = () => {
  const todoCheckButtonsElms = document.querySelectorAll('.section__todo .section__check-button');
  todoCheckButtonsElms.forEach((todoCheckButton) => {
    todoCheckButton.addEventListener('click', (e) => {
      const { position } = e.target.dataset;
      markComplete(position);
    });
  });

  const todoDeleteButtonsElms = document.querySelectorAll('.section__todo .section__delete-button');
  todoDeleteButtonsElms.forEach((todoCheckButton) => {
    todoCheckButton.addEventListener('click', (e) => {
      const { position } = e.target.dataset;
      deleteTodo(position);
    });
  });

  const clearCompleteButtonElm = document.querySelector('.section__clear-completed');

  clearCompleteButtonElm.addEventListener('click', clearCompletedItems);
};

const updateUI = (todoListItems) => {
  let htmlContent = '';
  todoListItems.forEach((todo, index) => {
    htmlContent += `<li class="section__list-item section__todo">
        <button data-position=${index} class="section__check-button ${todo.isChecked && 'section__check-button--isChecked'}"></button>
        <p class="section__todo-text ${todo.isChecked && 'section__todo-text--isDone'}">${todo.todoValue}</p>
        <button data-position=${index} class="section__delete-button"></button>
    </li>`;
  });

  //   Add the last element
  htmlContent += `<li class="section__list-item">
      <span class="section__items-left">
        <span class="section__items-num">${todoListItems.filter((todo) => !todo.isChecked).length} </span>items left
      </span>
      <button class="section__clear-completed">Clear Completed</button>
    </li>`;

  unorderedListElm.innerHTML = htmlContent;

  chooseUpdatedButtons();
};

export default function createTodo(inputValue, checkValue) {
  const todoValue = inputValue;
  if (!todoValue) return;

  const isChecked = checkValue;
  todoList.unshift({ todoValue, isChecked });
  updateUI(todoList);
}

function markComplete(position) {
  todoList[position].isChecked = !todoList[position].isChecked;
  updateUI(todoList);
}

function deleteTodo(position) {
  todoList.splice(position, 1);
  updateUI(todoList);
}

function clearCompletedItems() {
  const updatedTodoList = todoList.filter((item) => !item.isChecked);
  if (todoList.length === updatedTodoList.length) return;
  todoList = updatedTodoList;
  updateUI(updatedTodoList);
}

export function filterItems(position) {
  if (todoList.length) {
    switch (position) {
      case 1:
        updateUI(todoList.filter((item) => !item.isChecked));
        break;
      case 2:
        updateUI(todoList.filter((item) => item.isChecked));
        break;
      default:
        updateUI(todoList);
    }
  }
}
