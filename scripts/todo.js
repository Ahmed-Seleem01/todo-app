import { unorderedListElm } from './elements';
import {
  initiateOnStart, updateListOnModify,
} from './helperFunctions';

// Get the todos items if is stored in local storage
const storedData = JSON.parse(localStorage.getItem('storedTodo'));
let todoList = storedData || [];

initiateOnStart(todoList);

export function createTodo(inputValue, checkValue) {
  const todoValue = inputValue;
  if (!todoValue) return;

  const isChecked = checkValue;
  todoList.unshift({ todoValue, isChecked });
  updateListOnModify(todoList);
}

export function markComplete(position) {
  todoList[position].isChecked = !todoList[position].isChecked;
  updateListOnModify(todoList);
}

export function deleteTodo(position) {
  todoList.splice(position, 1);
  updateListOnModify(todoList);
}

export function clearCompletedItems() {
  if (!todoList.length) return;
  const updatedTodoList = todoList.filter((item) => !item.isChecked);
  if (todoList.length === updatedTodoList.length) return;
  todoList = updatedTodoList;
  updateListOnModify(todoList);
}

export function filterItems(position) {
  if (todoList.length) {
    switch (position) {
      case 1:
        unorderedListElm.classList = ('section__list section__list--active');
        break;
      case 2:
        unorderedListElm.classList = ('section__list section__list--completed');
        break;
      default:
        unorderedListElm.classList = ('section__list section__list--all');
    }
  }
}
