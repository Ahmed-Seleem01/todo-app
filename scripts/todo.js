import { unorderedListElm } from './elements';
import {
  initiateOnStart, updateListOnModify,
} from './helperFunctions';

// Get the todos items if is stored in local storage
const storedData = JSON.parse(localStorage.getItem('storedTodo'));
const toggleTheme = JSON.parse(localStorage.getItem('toggleTheme'));
let todoList = storedData || [];
const isDark = toggleTheme;

initiateOnStart(todoList, isDark);

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

export const reorderTop = (position, dragOverPosition, direction) => {
  const todoItem = todoList[position];

  if (position < dragOverPosition && direction === 'top') {
    todoList.splice(dragOverPosition, 0, todoItem);
    todoList.splice(position, 1);
  } else if (position < dragOverPosition && direction === 'bottom') {
    todoList.splice(Number(dragOverPosition) + 1, 0, todoItem);
    todoList.splice(position, 1);
  } else if (position > dragOverPosition && direction === 'top') {
    todoList.splice(dragOverPosition, 0, todoItem);
    todoList.splice(Number(position) + 1, 1);
  } else if (position > dragOverPosition && direction === 'bottom') {
    todoList.splice(Number(dragOverPosition) + 1, 0, todoItem);
    todoList.splice(Number(position) + 1, 1);
  }
  updateListOnModify(todoList);
};
