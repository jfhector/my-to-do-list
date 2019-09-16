## BACKLOG

### Bugs

* If I delete the last item using the keyboard, the focus moves back to the input and presses enter on that

### Improvements

* Add drag and drop

### Refactoring

* Refactor so that model update and view render functions are grouped togehter, and so that I can write utility functions that I use in separate parts of my code. To do this, I could
  * Nest model update functions in TodoList.prototype.modelUpdateMethods., but then I'd need to replace `this` with TodoList. (Which I'm not open to doing before I understand `this` better).
  * OR Refactor this as an ES6 class, which would require looking into how `this` works too, and would require using babel, or TypeScript.
  * OR Refactor as custom elements, which would require using ES6 and hence Babel or typescript
* Refactor using TypeScript!!!
* Redo using custom elements

* find a way to set a CSS custom property from JS without using element.style

* refactor this.$list.addEventListener('keyup', using try {}