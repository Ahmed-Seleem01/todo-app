import {
  addTodoElm,
  checkButtonElm, containerElm, filterButtonElms, todoInputElm, toggleThemeButton, unorderedListElm,
} from './elements';
import {
  clearCompletedItems, createTodo, deleteTodo, filterItems, markComplete, reorderTop,
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
    const { position } = e.target.parentElement.dataset;
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

export function listenDragAndDrop() {
  let draggingElement = null;
  let dragOverElement = null;

  unorderedListElm.addEventListener('dragstart', (event) => {
    if (!event.target.classList.contains('section__todo')) return;

    draggingElement = event.target;
    draggingElement.classList.add('section__todo--dragging');
    console.dir(draggingElement);
    event.dataTransfer.setData('text/plain', ''); // Required for Firefox
  });

  unorderedListElm.addEventListener('dragend', (event) => {
    draggingElement.classList.remove('section__todo--dragging');
    const { position } = draggingElement.dataset;
    const { position: dragOverPosition } = dragOverElement.dataset;
    reorderTop(position, dragOverPosition);
    // console.log(event.target)
    draggingElement = null;
    dragOverElement = null;
  });

  unorderedListElm.addEventListener('dragover', (event) => {
    if (!event.target.classList.contains('section__todo')) return;

    // console.log(draggingElement);
    dragOverElement = event.target;
    event.preventDefault();
    const boundingRect = event.target.getBoundingClientRect();
    const offset = boundingRect.y + boundingRect.height / 2;
    if (event.clientY - offset > 0) {
      event.target.parentNode.insertBefore(
        draggingElement,
        event.target.nextSibling,
      );

      // reorderBottom(position);
    } else {
      event.target.parentNode.insertBefore(draggingElement, event.target);
    }
  });
}
