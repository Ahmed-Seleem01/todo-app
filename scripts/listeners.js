import {
  addTodoElm,
  checkButtonElm, containerElm, filterButtonElms, todoInputElm, toggleThemeButton, unorderedListElm,
} from './elements';
import { saveToDB } from './helperFunctions';
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
    const toggleState = containerElm.classList.contains('container--isDark');
    saveToDB('toggleTheme', toggleState);
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
  let direction = '';

  // Handlers for mouse
  const dragStartHandler = (event) => {
    draggingElement = event.target;
    if (!draggingElement.classList.contains('section__todo')) return;

    draggingElement.classList.add('section__todo--dragging');
    event.dataTransfer.setData('text/plain', ''); // Required for Firefox
  };

  const dragOverHandler = (event) => {
    dragOverElement = event.target;
    if (!dragOverElement.classList.contains('section__todo')) return;

    event.preventDefault();
    const boundingRect = dragOverElement.getBoundingClientRect();
    const offset = boundingRect.y + boundingRect.height / 2;
    if (event.clientY - offset > 0) {
      direction = 'bottom';
    } else {
      direction = 'top';
    }
  };

  const dragEndHandler = () => {
    const { position } = draggingElement.dataset;
    const { position: dragOverPosition } = dragOverElement.dataset;
    reorderTop(position, dragOverPosition, direction);
    draggingElement.classList.remove('section__todo--dragging');
    draggingElement = null;
    dragOverElement = null;
  };

  unorderedListElm.addEventListener('dragstart', dragStartHandler);
  unorderedListElm.addEventListener('dragover', dragOverHandler);
  unorderedListElm.addEventListener('dragend', dragEndHandler);

  // Handlers for touch screen
  function onTouchStart(event) {
    const touch = event.touches[0];
    draggingElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!draggingElement.classList.contains('section__todo')) return;
    draggingElement.classList.add('section__todo--dragging');
  }

  function onTouchMove(event) {
    event.preventDefault();
    const touch = event.touches[0];
    dragOverElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!dragOverElement.classList.contains('section__todo')) return;
    const boundingRect = dragOverElement.getBoundingClientRect();
    const offset = boundingRect.y + (boundingRect.height / 2);
    const listTop = unorderedListElm.getBoundingClientRect().y;
    const { position } = draggingElement.dataset;
    draggingElement.style.transform = `translateY(${(touch.clientY - listTop + 10) - (position * 50)}px)`;

    if (touch.clientY - offset > 0) {
      direction = 'bottom';
    } else {
      direction = 'top';
    }
  }

  function onTouchEnd() {
    if (!draggingElement || !dragOverElement) return;
    const { position } = draggingElement.dataset;
    const { position: dragOverPosition } = dragOverElement.dataset;
    reorderTop(position, dragOverPosition, direction);
    draggingElement.classList.remove('section__todo--dragging');
    draggingElement = null;
    dragOverElement = null;
  }

  unorderedListElm.addEventListener('touchstart', onTouchStart);
  unorderedListElm.addEventListener('touchmove', onTouchMove);
  unorderedListElm.addEventListener('touchend', onTouchEnd);

  // document.querySelectorAll('.section__todo').forEach((item) => {
  //   item.addEventListener('touchstart', onTouchStart);
  //   item.addEventListener('touchend', onTouchEnd);
  //   item.addEventListener('touchmove', onTouchMove);
  // });
}
