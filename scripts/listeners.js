import {
  addTodoElm,
  checkButtonElm, containerElm, filterButtonElms, todoInputElm, toggleThemeButton, unorderedListElm,
} from './elements';
import {
  clearCompletedItems, createTodo, deleteTodo, filterItems, markComplete,
} from './todo';

const resetInput = () => {
  checkButtonElm.classList.remove('section__check-button--isChecked');
  todoInputElm.value = '';
};

export function listenToggleTheme() {
  toggleThemeButton.addEventListener('click', () => {
    containerElm.classList.toggle('container--isDark');
  });
}

export function listenCheckedInput() {
  checkButtonElm.addEventListener('click', () => {
    checkButtonElm.classList.toggle('section__check-button--isChecked');
  });
}

export function listenAddButton() {
  addTodoElm.addEventListener('click', (event) => {
    event.preventDefault();
    // Check the state of the todo id is checked or not when is created
    const isChecked = checkButtonElm.classList.contains('section__check-button--isChecked');
    createTodo(todoInputElm.value, isChecked);
    resetInput();
  });
}

export function listenULList() {
// Handle the actions of each list item
// Using the parent element to not repeat event listener on each list item
  unorderedListElm.addEventListener('click', (e) => {
    const { position } = e.target.dataset;
    if (e.target.classList.contains('section__check-button')) markComplete(position);
    else if (e.target.classList.contains('section__delete-button')) deleteTodo(position);
    else if (e.target.classList.contains('section__clear-completed')) clearCompletedItems();
  });
}

export function listenFilterButtons() {
  filterButtonElms.forEach((filterButton, index) => {
    filterButton.addEventListener('click', () => {
      const selectedButton = document.querySelector('.section__filter-option--isSelected');
      selectedButton.classList.remove('section__filter-option--isSelected');
      filterButton.classList.add('section__filter-option--isSelected');
      filterItems(index);
    });
  });
}
