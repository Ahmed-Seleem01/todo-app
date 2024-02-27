import {
  addTodoElm, checkButtonElm, containerElm, filterButtonElms, todoInputElm, toggleThemeButton,
} from './elements';
import createTodo, { filterItems } from './todo';

toggleThemeButton.addEventListener('click', () => {
  containerElm.classList.toggle('container--isDark');
});

checkButtonElm.addEventListener('click', () => {
  checkButtonElm.classList.toggle('section__check-button--isChecked');
});

const resetInput = () => {
  checkButtonElm.classList.remove('section__check-button--isChecked');
  todoInputElm.value = '';
};

addTodoElm.addEventListener('click', (event) => {
  event.preventDefault();
  const isChecked = checkButtonElm.classList.contains('section__check-button--isChecked');
  createTodo(todoInputElm.value, isChecked);
  resetInput();
});

filterButtonElms.forEach((filterButton, index) => {
  filterButton.addEventListener('click', (e) => {
    filterButtonElms.forEach((elm) => {
      elm.classList.remove('section__filter-option--isSelected');
      e.target.classList.add('section__filter-option--isSelected');
    });
    filterItems(index);
  });
});

/*
[x] View the optimal layout for the app depending on their device's screen size
[x] See hover states for all interactive elements on the page
- Add new todos to the list
   [x] --create array to save the todos
   [x] --make the event handler function
   [x] --Add the saved todo to the ui
[x] Mark todos as complete
[x] Delete todos from the list
[x] Filter by all/active/complete todos
[x] Clear all completed todos
[x] Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list
*/
