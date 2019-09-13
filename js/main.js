const TodoList = function($module) {
    this.$module = $module;
    this.$addItemInput = undefined;
    this.$list = undefined;
    this._todoItems = {
        current: [],
        deleted: [],
    }
}

TodoList.prototype.init = function() {
    // Get a reference to the input field, assign it to this.$addItemInput
    // Get a reference to the ul element, assign it to this.$list

    // get any saved data from localStorage
        // if it to replace this._todoItems
    // call renderAllTodoItems

    // Listen for click events
        // get event.target

        // if it's coming from a 'delete' button
            // get the corresponding todoItemId
            // call deleteTodo with that id
            // if deleteTodo function returned true
                // stop progagation of the event

        // if it's coming from a 'edit' button
            // check its state: 'edit' or 'done' TODO

            // TODO

    // Listen for 'change' events
        // Make sure that what emited the change event is a checkbox from one of the items
        // get the new 'checked' state of the checkbox
        // use event.target to get the corresponding todoItemId
        // call updateTodo with that id and the new state
        // if updateTodoItemCompletionState function returned true
            // stop progagation of the event

    // Listen for 'submit' events
        // preventDefault

        // if the submit event comes from the $addItemInput
            // get the value of $addItemInput
            // call add todo with that value

            // if addTodo function returned true
                // stop progagation of the event
                // reset the value of $addItemInput

        // if the submit event comes from one of the list items (using node.matches)
            // Somehow blur that input??

    // Listen for click events on the edit button
        // 

    // on each list item's input field,
        // listen for 'enter' event
}

TodoList.prototype.addTodoItem = function(todoItemLabel) {
    // Return true on success, or false on otherwise

    // get a new unique todoItemId
    // add a object with that id and todoItemLabel to this._todoItems
    // update localStorage
    // call renderTodoItem
}

TodoList.prototype.deleteTodoItem = function(todoItemId) {
    // Return true on success, or false on otherwise

    // Filter this._todoItems to exclude any item with todoItemId. Re-assign it to this._todoItems

    // add that item to the deleted items array

    // update localStorage

    // call renderTodoItem
}

TodoList.prototype.updateTodoItemCompletionState = function(todoItemId, newState) {
    // Return true on success, or false on otherwise

    // Use array map to update this._todoItems, changing 'done' state of the correspondong item

    // update localStorage
}

TodoList.prototype.updateTodoItemLabel = function(todoItemId, newLabel) {
    // TODO: add an event listener

    // Return true on success, or false on otherwise

    // Use array map to update this._todoItems, changing label of the correspondong item

    // update localStorage

    // call renderTodoItemLabel(todoItem)
}

TodoList.prototype.renderAllTodoItems = function() {
    // create a fragment
    // for each element in this._todoItems.current
        // create the right notes based on the data
        // append to the fragment
    // append the fragment to the ul
}

TodoList.prototype.deleteTodoItemNode = function(todoItemId) {
        // try to get the node corresponding to todoItemId
        // if there is one, delete it
}

TodoList.prototype.updateTodoItemLabel = function(todoItemId) {
    // TODO: add an event listener
}

const $todoList = document.querySelector('[data-module="todo-list"]');
const todoList = new TodoList($todoList);

// Can I get the focus management for free if the checkboxes are in a fieldset??
// TODO: Add edit button for each item
// TODO: When click/tap on a list item, it gets focused.
    // The background colour changes slightly
    // Delete button appears (and maybe edit button)
    // Enter and space keys are directed to the checkbox (or directly check the checkbox, but that means capturing a different event)
// TODO: Add keyboard handling for up and down arrows to go between todo lists using the roving index method. Respond to up and down arrows not just when th efocus is on the checkbox but also when it's anywhere on a todo list item