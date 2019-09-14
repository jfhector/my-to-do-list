## BACKLOG

* If, after 1 minute, there still hasn't been a touch event, then set _registeredTouchEvents to false, and save in storage
* If false in in storage for _registeredTouchEvents, don't show the buttons from the start (maybe?)
* Add keyboard handling for up and down arrows to go between todo lists using the roving index method. Respond to up and down arrows not just when th efocus is on the checkbox but also when it's anywhere on a todo list item
* Add a button to undo last delete
* Add a button to delete X completed items
* Add drag and drop

* Refactor so that model update and view render functions are grouped togehter, and so that I can write utility functions that I use in separate parts of my code. To do this, I could
  * Nest model update functions in TodoList.prototype.modelUpdateMethods., but then I'd need to replace `this` with TodoList. (Which I'm not open to doing before I understand `this` better).
  * OR Refactor this as an ES6 class, which would require looking into how `this` works too, and would require using babel, or TypeScript.
* Refactor using TypeScript!!!
