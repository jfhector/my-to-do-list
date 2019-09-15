## BACKLOG

### Bugs

* Tab order is wrong. It doesn't go through the delete button when going backwards, if the delete button had disappeared.

### Improvements

* Add keyboard handling for up and down arrows to go between todo lists using the roving index method. Respond to up and down arrows not just when th efocus is on the checkbox but also when it's anywhere on a todo list item
  * On the checkboxes
  * On the delete buttons
* Add drag and drop

### Refactoring

* Refactor so that model update and view render functions are grouped togehter, and so that I can write utility functions that I use in separate parts of my code. To do this, I could
  * Nest model update functions in TodoList.prototype.modelUpdateMethods., but then I'd need to replace `this` with TodoList. (Which I'm not open to doing before I understand `this` better).
  * OR Refactor this as an ES6 class, which would require looking into how `this` works too, and would require using babel, or TypeScript.
* Refactor using TypeScript!!!