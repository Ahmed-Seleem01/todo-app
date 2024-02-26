const toggleButton = document.querySelector('.header__toggle-theme-button');
const containerElem = document.querySelector('.container');
toggleButton.addEventListener('click', () => {
  containerElem.classList.toggle('container--isDark');
});

const checkButtons = document.querySelectorAll('.section__check-button');

checkButtons.forEach((checkButton) => {
  checkButton.addEventListener('click', () => {
    console.log(checkButton);
    checkButton.classList.toggle('section__check-button--isChecked');
  });
});



/*
[x] View the optimal layout for the app depending on their device's screen size
[x] See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
[x] Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list
*/
