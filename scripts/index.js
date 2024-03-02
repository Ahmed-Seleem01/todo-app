import {
  listenAddButton, listenCheckedInput, listenFilterButtons, listenToggleTheme, listenULList,
} from './listeners';

listenToggleTheme();
listenCheckedInput();
listenAddButton();
listenULList();
listenFilterButtons();

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
